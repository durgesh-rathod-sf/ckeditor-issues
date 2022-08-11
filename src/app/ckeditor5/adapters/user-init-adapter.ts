import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

export type User = {
  id: string;
  name: string;
};

function getUserInit(appData: { user: User }) {
  return class UsersInit {
    editor: CKEditor5.Editor;
    constructor(editor: CKEditor5.Editor) {
      this.editor = editor;
    }

    static get pluginName() {
      return 'UsersInit';
    }

    static get requires() {
      return ['Users'];
    }

    init() {
      const users = this.editor.plugins.get('Users');

      users.addUser(appData.user);
      users.defineMe(appData.user.id);
    }
  };
}

export { getUserInit };
