$(() => {
  const DialogController = {
    __name: 'DialogController',

    _rekogLogic: RekogLogic,

    showDialog: function() {
      this.$find('dialog')[0].showModal();
    },

    closeDialog: function() {
      this.$find('dialog')[0].close();
    },

    '#uploadBtn change': function(context, $el) {
      this.$find('#uploadFile').val($el[0].files[0].name);
    },

    '#rekognition-form submit': function(context) {
      context.event.preventDefault();
      const fd = new FormData();
      fd.append('image', this.$find('#uploadBtn').prop('files')[0]);
      this._rekogLogic.postImagetoRekog(fd).done((data) => {
        this.trigger('rekognized', data);
      }).fail((error) => {
        console.log(error);
      }).always(() => {
        this.closeDialog();
      });
    }
  };
  h5.core.expose(DialogController);
});