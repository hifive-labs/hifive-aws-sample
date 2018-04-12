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

    '.close click': function(context) {
      this._dialogController.closeDialog();
    },

    '{rootElement} rekognized': function(context, $el) {
      this.$find('#result_area').val(JSON.stringify(context.evArg));
    },
  };
  h5.core.controller('#container', RootController);
});
