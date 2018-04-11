$(() => {
  const helloWorldController = {
    __name: 'HelloWorldController',

    '#btn click': () => {
      alert('Hello, World!');
    },

    '#rekognition-form submit': function(context) {
      context.event.preventDefault();
      const fd = new FormData();
      fd.append('image', $('#rekognition-input').prop('files')[0]);
      $.ajax('/rekognition', {
        type: 'post',
        processData: false,
        contentType: false,
        data: fd,
        dataType: 'json',
        success: result => {
          this.trigger('rekognized', {result});
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          alert('ERROR');
          alert(textStatus);
          alert(errorThrown);
        }
      });
    },

    '{rootElement} rekognized': function(context, $el) {
        console.log(context.evArg.result);
    },
  };

  h5.core.controller('#container', helloWorldController);
});
