import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { cloneDeep } from 'lodash-es';

import type { User } from './user-init-adapter';

function getRevisionHistoryAdapter(appData: {
  user: User;
  revisions?: { name: string; id: string }[];
}) {
  return class RevisionHistoryAdapter {
    editor: CKEditor5.Editor;
    revisionHistory: any;
    constructor(editor: CKEditor5.Editor) {
      this.editor = editor;
    }

    static get pluginName() {
      return 'RevisionHistoryAdapter';
    }

    static get requires() {
      return ['RevisionHistory'];
    }

    async init() {
      const { user } = appData;
      this.revisionHistory = this.editor.plugins.get('RevisionHistory');
      const allRevisions: any[] =
        JSON.parse(localStorage.getItem('revisions') as string) ?? [];

      this.revisionHistory.adapter = {
        getRevision: ({ revisionId }: { revisionId: string }) => {
          const found = allRevisions.find((rev) => rev.id === revisionId);
          return Promise.resolve(found);
        },
        updateRevisions: (revisionsData: Array<Record<string, any>>) => {
          console.log(this.editor);
          if (revisionsData.length === 1 && !revisionsData[0]['name']) {
            const currentRevision = revisionsData[0];
            currentRevision['name'] = currentRevision['name'] ?? null;
            const found = allRevisions.find(
              (rev) => rev.id === currentRevision['id']
            );
            if (found) {
              found.diffData = currentRevision['diffData'] ?? found.diffData;
              found.toVersion = currentRevision['toVersion'] ?? found.toVersion;
              found.fromVersion =
                currentRevision['fromVersion'] ?? found.fromVersion;
              found.createdAt = currentRevision['createdAt'] ?? found.createdAt;
              // found.creatorId = currentRevision['creatorId'] ?? user.id;
            } else {
              allRevisions.push(currentRevision);
            }
          } else {
            const newRevision = revisionsData[0]['name']
              ? revisionsData[0]
              : revisionsData[1];
            const currentRevision = !revisionsData[0]['name']
              ? revisionsData[0]
              : revisionsData[1];
            if (currentRevision) {
              currentRevision['name'] = currentRevision['name'] ?? null;
              const found = allRevisions.find(
                (rev) => rev.id === currentRevision['id']
              );
              if (found) {
                found.diffData = currentRevision['diffData'];
                found.toVersion = currentRevision['toVersion'];
                found.fromVersion = currentRevision['fromVersion'];
                found.createdAt = currentRevision['createdAt'];
                // found.creatorId = currentRevision['creatorId'] ?? user.id;
              } else {
                allRevisions.push(currentRevision);
              }
            }
            allRevisions.push(newRevision);
          }
          localStorage.setItem('revisions', JSON.stringify(allRevisions));
          localStorage.setItem('documentHtml', this.editor.getData());
          setTimeout(() => {
            console.log(this.revisionHistory.getRevisions({ toJSON: true }));
          }, 2000);
          return Promise.resolve();
        },
      };

      // Add the revisions data for existing revisions.
      // You can either dump the revisions data straight in the source code, or
      // you can fetch the data asynchronously from your database (as this example shows).
      //
      // Note that the revisions data does not contain `diffData` property.
      // `diffData` property may be big and will be fetched on demand by `adapter.getRevision()`.
      //
      let revisionsData = cloneDeep(allRevisions);
      revisionsData = revisionsData.filter((e) => e.name);
      const usersPlugin = this.editor.plugins.get('Users');
      for (const revisionData of revisionsData) {
        revisionData.authorsIds = [];
        try {
          if (revisionData.creatorId) {
            usersPlugin.addUser({ id: revisionData.creatorId });
          }
        } catch (error) {}
      }
      for (const revisionData of revisionsData) {
        if (revisionData) {
          revisionData.createdAt = new Date(revisionData.createdAt);
          revisionData.diffData = undefined;
          this.revisionHistory.addRevisionData(revisionData);
        }
      }
    }

    async _fetchRevisionsData() {
      // Make an asynchronous call to your database.
      return Promise.resolve([
        {
          id: 'initial',
          name: 'Initial revision',
          creatorId: 'u1',
          authorsIds: ['u1'],
          createdAt: '2021-05-27T13:22:59.077Z',
          attributes: {},
          fromVersion: 1,
          toVersion: 1,
        },
        {
          id: 'e6f80e6be6ee6057fd5a449ab13fba25d',
          name: 'Updated with the actual data',
          creatorId: 'u1',
          authorsIds: ['u1'],
          createdAt: '2021-05-27T13:23:52.553Z',
          attributes: {},
          fromVersion: 1,
          toVersion: 20,
        },
        {
          id: 'e6590c50ccbc86acacb7d27231ad32064',
          name: 'Inserted logo',
          creatorId: 'u1',
          authorsIds: ['u1'],
          createdAt: '2021-05-27T13:26:39.252Z',
          attributes: {},
          fromVersion: 20,
          toVersion: 24,
        },
        // Empty current revision:
        {
          id: 'egh91t5jccbi894cacxx7dz7t36aj3k021',
          name: null,
          creatorId: null,
          authorsIds: [],
          createdAt: '2021-05-27T13:26:39.252Z',
          attributes: {},
          fromVersion: 24,
          toVersion: 24,
        },
      ]);
    }
  };
}

export { getRevisionHistoryAdapter };
