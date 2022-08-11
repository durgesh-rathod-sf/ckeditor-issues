import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

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

      this.revisionHistory.adapter = {
        getRevision: (opts: { revisionId: string }) => {
          switch ( opts.revisionId ) {
            case 'initial':
                return Promise.resolve(
                    {
                        "id": "initial",
                        "name": "Initial revision",
                        "creatorId": "u1",
                        "authorsIds": [ "u1" ],
                        "diffData": {
                            "main": {
                                "insertions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ………… by and between The Lower Shelf, the “Publisher”, and …………, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him/herself and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]},{"name":"p","attributes":[],"children":["Publishing formats are enumerated in Appendix A."]}]',
                                "deletions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ………… by and between The Lower Shelf, the “Publisher”, and …………, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him/herself and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]},{"name":"p","attributes":[],"children":["Publishing formats are enumerated in Appendix A."]}]'
                            }
                        },
                        "createdAt": "2021-05-27T13:22:59.077Z",
                        "attributes": {},
                        "fromVersion": 1,
                        "toVersion": 1
                    }
                );
            case 'e6f80e6be6ee6057fd5a449ab13fba25d':
                return Promise.resolve(
                    {
                        "id": "e6f80e6be6ee6057fd5a449ab13fba25d",
                        "name": "Updated with the actual data",
                        "creatorId": "u1",
                        "authorsIds": [ "u1" ],
                        "diffData": {
                            "main": {
                                "insertions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ",{"name":"revision-start","attributes":[["name","insertion:u1:0"]],"children":[]},"1st",{"name":"revision-end","attributes":[["name","insertion:u1:0"]],"children":[]}," ",{"name":"revision-start","attributes":[["name","insertion:u1:1"]],"children":[]},"June 2020 ",{"name":"revision-end","attributes":[["name","insertion:u1:1"]],"children":[]},"by and between The Lower Shelf, the “Publisher”, and ",{"name":"revision-start","attributes":[["name","insertion:u1:2"]],"children":[]},"John Smith",{"name":"revision-end","attributes":[["name","insertion:u1:2"]],"children":[]},", the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]',
                                "deletions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ",{"name":"revision-start","attributes":[["name","deletion:u1:0"]],"children":[]},"…………",{"name":"revision-end","attributes":[["name","deletion:u1:0"]],"children":[]}," by and between The Lower Shelf, the “Publisher”, and ",{"name":"revision-start","attributes":[["name","deletion:u1:1"]],"children":[]},"…………",{"name":"revision-end","attributes":[["name","deletion:u1:1"]],"children":[]},", the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him",{"name":"revision-start","attributes":[["name","deletion:u1:2"]],"children":[]},"/herself",{"name":"revision-end","attributes":[["name","deletion:u1:2"]],"children":[]}," and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature.",{"name":"revision-start","attributes":[["name","deletion:u1:3"]],"children":[]}]},{"name":"p","attributes":[],"children":["Publishing formats are enumerated in Appendix A.",{"name":"revision-end","attributes":[["name","deletion:u1:3"]],"children":[]}]}]'
                            }
                        },
                        "createdAt": "2021-05-27T13:23:52.553Z",
                        "attributes": {},
                        "fromVersion": 1,
                        "toVersion": 20
                    }
                );
            case 'e6590c50ccbc86acacb7d27231ad32064':
                return Promise.resolve(
                    {
                        "id": "e6590c50ccbc86acacb7d27231ad32064",
                        "name": "Inserted logo",
                        "creatorId": "u1",
                        "authorsIds": [ "u1" ],
                        "diffData": {
                            "main": {
                                "insertions": '[{"name":"figure","attributes":[["data-revision-start-before","insertion:u1:0"],["class","image"]],"children":[{"name":"img","attributes":[["src","https://ckeditor.com/docs/ckeditor5/latest/assets/img/revision-history-demo.png"]],"children":[]}]},{"name":"h1","attributes":[],"children":[{"name":"revision-end","attributes":[["name","insertion:u1:0"]],"children":[]},"PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]',
                                "deletions": '[{"name":"h1","attributes":[["data-revision-start-before","deletion:u1:0"]],"children":[{"name":"revision-end","attributes":[["name","deletion:u1:0"]],"children":[]},"PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]'
                            }
                        },
                        "createdAt": "2021-05-27T13:26:39.252Z",
                        "attributes": {},
                        "fromVersion": 20,
                        "toVersion": 24
                    }
                );
                case 'egh91t5jccbi894cacxx7dz7t36aj3k021':
                    return Promise.resolve(
                    {
                        "id": "egh91t5jccbi894cacxx7dz7t36aj3k021",
                        "name": null,
                        "creatorId": null,
                        "authorsIds": [],
                        "diffData": {
                            "main": {
                                "insertions": '[{"name":"figure","attributes":[["class","image"]],"children":[{"name":"img","attributes":[["src","https://ckeditor.com/docs/ckeditor5/latest/assets/img/revision-history-demo.png"]],"children":[]}]},{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]',
                                "deletions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]'
                            }
                        },
                        "createdAt": "2021-05-27T13:26:39.252Z",
                        "attributes": {},
                        "fromVersion": 24,
                        "toVersion": 24
                    }
                );
            default:
              return Promise.resolve();
        }
        },
        updateRevisions: (revisionsData: Array<Record<string, any>>) => {
          // const [_, revisionToSave] = revisionsData;
          console.log(revisionsData);
          // console.log(revisionToSave['id'], revisionToSave['name']);
          // revisions.push({
          //   name: revisionToSave['name'],
          //   id: revisionToSave['id'],
          // });
          // const allRevisions = this.revisionHistory.getRevisions({ toJSON: true });
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
      const revisionsData = await this._fetchRevisionsData();

      for (const revisionData of revisionsData) {
        this.revisionHistory.addRevisionData(revisionData);
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
