$(() => {
  const DialogController = {
    __name: 'DialogController',

    _rekogLogic: RekogLogic,

    '#rekognition-form submit': function(context) {
      context.event.preventDefault();
      const fd = new FormData();
      fd.append('image', this.$find('#uploadBtn').prop('files')[0]);
      this._rekogLogic.postImagetoRekog(fd).done((data) => {
        this.trigger('rekognized', data);
      }).fail((error) => {
        console.log(error);
      });
    }
  };

  h5.core.expose(DialogController);
});
