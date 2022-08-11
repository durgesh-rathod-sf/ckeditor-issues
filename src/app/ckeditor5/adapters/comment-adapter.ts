export function getCommentAdapter() {
  return class CommentsAdapter {
    editor: any;
    constructor(editor: any) {
      this.editor = editor;
    }

    static get requires() {
      return ['CommentsRepository'];
    }

    init() {
      const commentsRepositoryPlugin =
        this.editor.plugins.get('CommentsRepository');

      // Set the adapter on the `CommentsRepository#adapter` property.
      commentsRepositoryPlugin.adapter = {
        addComment(data: any) {
          console.log('Comment added', data);

          // Write a request to your database here. The returned `Promise`
          // should be resolved when the request has finished.
          // When the promise resolves with the comment data object, it
          // will update the editor comment using the provided data.
          return Promise.resolve({
            createdAt: new Date(), // Should be set on the server side.
          });
        },

        updateComment(data: any) {
          console.log('Comment updated', data);

          // Write a request to your database here. The returned `Promise`
          // should be resolved when the request has finished.
          return Promise.resolve();
        },

        removeComment(data: any) {
          console.log('Comment removed', data);

          // Write a request to your database here. The returned `Promise`
          // should be resolved when the request has finished.
          return Promise.resolve();
        },

        getCommentThread(data: any) {
          console.log('Getting comment thread', data);

          // Write a request to your database here. The returned `Promise`
          // should resolve with the comment thread data.
          return Promise.resolve({
            threadId: data.threadId,
            comments: [
              {
                commentId: 'comment-1',
                authorId: 'user-2',
                content:
                  '<p>Are we sure we want to use a made-up disorder name?</p>',
                createdAt: new Date(),
                attributes: {},
              },
            ],
            isFromAdapter: true,
          });
        },
      };
    }
  };
}
