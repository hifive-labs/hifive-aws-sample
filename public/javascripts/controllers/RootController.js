'use strict';

$(() => {
  const RootController = {
    __name: 'RootController',

    _dialogController: DialogController,

    __meta: {
      _dialogController: {
        rootElement: '#post-dialog',
      }
    },

    '.show-modal click': function(context) {
      this._dialogController.showDialog();
    },

    '{rootElement} image-selected': function(context, $el) {
      const imagePreviewDOM = this.$find('#preview-image-wrapper');
      imagePreviewDOM.empty(); // FIXME もうちょっといい書き方がある気がする
      imagePreviewDOM.append($('<img>').attr({
        src: context.evArg.fileUrl,
        id: "preview-image",
        title: context.evArg.file.name,
      }));
    },

    '{rootElement} rekognized': function(context, $el) {
      this.$find('#result_area').val(JSON.stringify(context.evArg));
      this.$find('#result_area')[0].parentNode.MaterialTextfield.checkDirty(); // これをやらないとテキストエリアのlabelが消えない
    },
  };
  h5.core.controller('#container', RootController);
});
