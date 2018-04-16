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

    '{rootElement} rekognized': function(context, $el) {
      this.$find('#result_area').val(JSON.stringify(context.evArg));
      this.$find('#result_area')[0].parentNode.MaterialTextfield.checkDirty();
    },
  };
  h5.core.controller('#container', RootController);
});
