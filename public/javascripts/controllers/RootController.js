$(() => {
  const RootController = {
    __name: 'RootController',

    _dialogController: DialogController,

    __meta: {
      _dialogController: {
        rootElement: '#post-dialog',
      }
    },

    _dialog: null,

    __ready: function() {
      this._dialog = this.$find('dialog')[0];
    },

    '.show-modal click': function(context) {
      this._dialog.showModal();
    },

    '.close click': function(context) {
      this._dialog.close();
    },

    // '#rekognition-form submit': function(context) {
    //   context.event.preventDefault();
    //   const fd = new FormData();
    //   fd.append('image', this.$find('#uploadBtn').prop('files')[0]);
    //   this._rekogLogic.postImagetoRekog(fd).done((data) => {
    //
    //   }).fail((error) => {
    //     console.log(error);
    //   });
    // },

    '{rootElement} rekognized': function(context, $el) {
      this.$find('#result_area').val(JSON.stringify(context.evArg));
      this._dialog.close();
    },
  };

  h5.core.controller('#container', RootController);
});
