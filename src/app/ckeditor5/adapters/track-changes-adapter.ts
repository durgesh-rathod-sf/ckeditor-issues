export function getTrackChangesAdater() {
  return class TrackChangesAdapter {
    editor: any;
    constructor(editor: any) {
      this.editor = editor;
    }

    init() {
      if (!this.editor.plugins.has('TrackChanges')) {
        return;
      }
      const trackChangesPlugin = this.editor.plugins.get('TrackChanges');

      // Set the adapter to the `TrackChanges#adapter` property.
      trackChangesPlugin.adapter = {
        getSuggestion: (suggestionId: string) => {
          console.log('Getting suggestion', suggestionId);

          // Write a request to your database here.
          // The returned `Promise` should be resolved with the suggestion
          // data object when the request has finished.
          switch (suggestionId) {
            case 'suggestion-1':
              return Promise.resolve({
                id: suggestionId,
                type: 'insertion',
                authorId: 'user-2',
                createdAt: new Date(),
                data: null,
                attributes: {},
              });
            case 'suggestion-2':
              return Promise.resolve({
                id: suggestionId,
                type: 'deletion',
                authorId: 'user-1',
                createdAt: new Date(),
                data: null,
                attributes: {},
              });
            default: // 'suggestion-3':
              return Promise.resolve({
                id: suggestionId,
                type: 'formatInline:886cqig6g8rf',
                authorId: 'user-1',
                createdAt: new Date(2019, 2, 8, 10, 2, 7),
                data: {
                  commandName: 'bold',
                  commandParams: [{ forceValue: true }],
                },
                attributes: {},
              });
          }
        },

        addSuggestion: (suggestionData: any) => {
          console.log('Suggestion added', suggestionData);

          // Write a request to your database here.
          // The returned `Promise` should be resolved when the request
          // has finished. When the promise resolves with the suggestion data
          // object, it will update the editor suggestion using the provided data.
          return Promise.resolve({
            createdAt: new Date(), // Should be set on the server side.
          });
        },

        updateSuggestion: (id: string, suggestionData: any) => {
          console.log('Suggestion updated', id, suggestionData);

          // Write a request to your database here.
          // The returned `Promise` should be resolved when the request
          // has finished.
          return Promise.resolve();
        },
      };

      // In order to load comments added to suggestions, you
      // should also integrate the comments adapter.
    }
  };
}
