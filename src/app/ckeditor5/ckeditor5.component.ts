import { AfterViewInit, Component } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { debounce } from 'lodash-es';

import Editor from '../../assets/ckeditor-source-build';
import { getRevisionHistoryAdapter } from './adapters/revision-history-adapter';
import { getUserInit } from './adapters/user-init-adapter';
import { getTrackChangesAdater } from './adapters/track-changes-adapter';
import { getCommentAdapter } from './adapters/comment-adapter';
const debounceSave = debounce((editor) => {
  const revisionTracker = editor.plugins.get('RevisionTracker');
  return revisionTracker.update();
}, 1000);

@Component({
  selector: 'app-ckeditor5',
  templateUrl: './ckeditor5.component.html',
  styleUrls: ['./ckeditor5.component.scss'],
})
export class Ckeditor5Component implements AfterViewInit {
  constructor() {}

  editorConfig!: CKEditor5.Config;
  editor: any = Editor;
  editorInstance!: CKEditor5.Editor;
  revisions: { name: string; id: string }[] = [];
  licenseKey = 'licenseKey here';

  ngAfterViewInit(): void {
    this.setEditorConfig();
    this.editor
      .create(document.querySelector('#editor'), this.editorConfig)
      .then((ck: any) => {
        // ck.isReadOnly = false;
        this.editorInstance = ck;
        this._registerEvents();
        return ck;
      });
  }

  setEditorConfig() {
    this.editorConfig = {
      licenseKey: this.licenseKey,
      initialData: localStorage.getItem('documentHtml') ?? data,
      extraPlugins: [
        getUserInit({ user: { id: 'u2', name: 'User 2' } }),
        getRevisionHistoryAdapter({
          user: { id: 'u2', name: 'User 2' },
          // revisions: this.revisions,
        }),
        getTrackChangesAdater(),
        getCommentAdapter(),
      ],
      sidebar: {
        container: document.querySelector('#sidebar-container'),
      },
      revisionHistory: {
        editorContainer: document.querySelector('#editor-container'),
        viewerContainer: document.querySelector('#revision-viewer-container'),
        viewerEditorElement: document.querySelector('#revision-viewer-editor'),
        viewerSidebarContainer: document.querySelector(
          '#revision-viewer-sidebar'
        ),
      },
      autoSave: { save: debounceSave },
    };
  }

  private _registerEvents() {
    const command = this.editorInstance.commands.get('revisionHistory');
    if (command) {
      command.on('execute', (evt: any) => {
        console.log('bold triggered');
        console.log(evt);
      });
    }
    const elements = document.querySelectorAll(
      '.ck.ck-button.ck-button_with-text'
    ) as NodeListOf<HTMLElement>;
    const openRevisionButton = Array.from(elements).find(
      (elem) => elem.innerText === 'Open revision history'
    );
    openRevisionButton?.addEventListener('click', (evt: MouseEvent) => {
      const elem = this.editorInstance.config.get('revisionHistory')
        .viewerSidebarContainer as HTMLDivElement;
      // elem.style.width = '0';
      // elem.style.visibility = 'hidden';
    });
    this.editorInstance.model.document.on('change:data', (evt: any) => {
      this.editorInstance.config.get('autoSave').save(this.editorInstance);
    });
  }

  getPlugins() {
    let revisionId;
    const revisionHistory = this.editorInstance.plugins.get('RevisionHistory');
    console.log(
      '🚀 ~ file: ckeditor5.component.ts ~ line 80 ~ Ckeditor5Component ~ getPlugins ~ revisionHistory',
      revisionHistory
    );
    const revisionTracker = this.editorInstance.plugins.get('RevisionTracker');
    console.log(
      '🚀 ~ file: ckeditor5.component.ts ~ line 82 ~ Ckeditor5Component ~ getPlugins ~ revisionTracker',
      revisionTracker
    );
    const revisionViewer =
      revisionHistory._viewerEditor.plugins.get('RevisionViewer');
    console.log(
      '🚀 ~ file: ckeditor5.component.ts ~ line 84 ~ Ckeditor5Component ~ getPlugins ~ revisionViewer',
      revisionViewer
    );
    // const revision = revisionViewer.repository.getRevision(revisionId);
    // this.editorInstance.model.change((writer: any) => {
    //   for (const n of Array.from(
    //     this.editorInstance.model.markers.getMarkersGroup('restrictedEditingException'),
    //   ))
    //     writer.removeMarker(n);
    // });
    // const s = await revisionViewer.getRevisionData(revision);
    // console.log(s);
    // this.editorInstance.data.set(s, {
    //   suppressErrorInCollaboration: false,
    // })
  }

  compare(rev1: string, rev2: string) {
    const revisionHistory = this.editorInstance.plugins.get('RevisionHistory');
    if (
      revisionHistory._viewerEditor &&
      revisionHistory._viewerEditor.plugins.has('RevisionViewer')
    ) {
      const revisionViewer =
        revisionHistory._viewerEditor.plugins.get('RevisionViewer');
      rev1 = revisionHistory.getRevision(rev1);
      rev2 = revisionHistory.getRevision(rev2);
      revisionViewer.compare(rev1, rev2);
    }
  }

  restore(rev: string) {
    const revisionHistory = this.editorInstance.plugins.get('RevisionHistory');
    revisionHistory._restoreRevision(rev);
  }

  async getPlainData(revisionId: string) {
    const revisionHistory = this.editorInstance.plugins.get('RevisionHistory');
    if (revisionHistory._viewerEditor) {
      const revisionViewer =
        revisionHistory._viewerEditor.plugins.get('RevisionViewer');
      const revision = revisionViewer.repository.getRevision(revisionId);
      const s = await revisionViewer.getRevisionData(revision);
      revisionHistory._viewerEditor.setData(s.main);
    }
  }

  fetchRevisions() {
    const revisionHistory = this.editorInstance.plugins.get('RevisionHistory');
    this.revisions = revisionHistory
      .getRevisions({ toJSON: true })
      .map((item: any) => ({ id: item.id, name: item.name }));
  }

  addNewClauseHelper() {
    let id = Math.floor(Math.random() * 100).toString();
    const clause = {
      id,
      datatype: 'caluse',
      clauseCount: 1,
      clauseTitle: 'title ' + id,
      clauseText: 'description ' + id,
    };
    this.addClause(this.editorInstance, clause);
  }
  addClause(
    editorInstance: any,
    clause: {
      id: string;
      datatype: string;
      clauseCount: number;
      clauseTitle: string;
      clauseText: string;
    }
  ) {
    const clauseTextView = editorInstance.data.processor.toView(
      clause.clauseText ?? ''
    );
    const clauseTextFragment = editorInstance.data.toModel(clauseTextView);
    editorInstance.model.change((writer: any) => {
      const item = this.createSimpleBox(writer, clause, clauseTextFragment);
      const firstPosition =
        editorInstance.model.document.selection.getLastPosition();
      if (firstPosition.findAncestor('simpleBox')) {
        writer.setSelection(firstPosition.findAncestor('simpleBox'), 'after');
      }
      if (firstPosition.findAncestor('table')) {
        writer.setSelection(firstPosition.findAncestor('table'), 'after');
      }
      editorInstance.model.insertContent(item);
      const newPosition = editorInstance.model.createPositionAfter(item);
      const range = editorInstance.model.insertContent(
        writer.createElement('paragraph'),
        newPosition
      );
      writer.setSelection(range, 'on');
    });
  }
  createSimpleBox(
    writer: any,
    clauseData: {
      id: string;
      datatype: string;
      clauseCount: number;
      clauseTitle: string;
      clauseText: string;
    },
    clauseTextFragment: any,
    isEditable = true
  ) {
    const simpleBox = writer.createElement('simpleBox', {
      id: clauseData.id,
      datatype: clauseData.datatype,
    });
    const simpleBoxNumber = writer.createElement('simpleBoxNumber', {
      class: 'simple-box-number',
    });
    const simpleBoxTitle = writer.createElement('simpleBoxTitle', {
      class: 'simple-box-title',
      unselectable: isEditable ? 'off' : 'on',
      contenteditable: isEditable,
    });
    const simpleBoxDescription = writer.createElement('simpleBoxDescription', {
      class: 'simple-box-description',
      unselectable: isEditable ? 'off' : 'on',
      contenteditable: isEditable,
    });
    simpleBox.editable = isEditable;
    simpleBoxDescription.editable = isEditable;
    simpleBoxNumber.editable = false;
    simpleBoxTitle.editable = false;
    if (clauseData.clauseCount) {
      writer.insert(clauseData.clauseCount, simpleBoxNumber);
      writer.append(simpleBoxNumber, simpleBox);
    }
    writer.append(simpleBoxTitle, simpleBox);
    writer.append(simpleBoxDescription, simpleBox);

    writer.insert(clauseData.clauseTitle, simpleBoxTitle);
    writer.append(clauseTextFragment, simpleBoxDescription);
    return simpleBox;
  }
}

// const data = `<figure class="image">
// <img src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/revision-history-demo.png">
// </figure>
// <h1>PUBLISHING AGREEMENT</h1>
// <h3>Introduction</h3>
// <p>This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”.</p>
// <h3>Grant of Rights</h3>
// <p>The Author grants the Publisher full right and title to the following, in perpetuity:</p>
// <ul>
// <li>To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future.</li>
// <li>To create or devise modified, abridged, or derivative works based on the works listed.</li>
// <li>To allow others to use the listed works at their discretion, without providing additional compensation to the Author.</li>
// </ul>
// <p>These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future.</p>
// <p>Any rights not granted to the Publisher above remain with the Author.</p>
// <p>The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature.</p>`;

const data = `<figure class="image">
<img src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/revision-history-demo.png">
</figure>
<h1>PUBLISHING AGREEMENT</h1>
<h3>Introduction</h3>
<p>This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”.</p>
<h3>Grant of Rights</h3>
<p>The Author grants the Publisher full right and title to the following, in perpetuity:</p>`;
