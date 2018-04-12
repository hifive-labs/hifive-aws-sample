$(() => {
  const rekogLogic = {
    __name: 'RekogLogic',

    postImagetoRekog: (formData) => {
      const promise = h5.ajax('/rekognition', {
        type: 'post',
        processData: false,
        contentType: false,
        data: formData,
        dataType: 'json',
        // success: result => {
        //   this.trigger('rekognized', {result});
        // },
        // error: (XMLHttpRequest, textStatus, errorThrown) => {
        //   alert('ERROR');
        //   alert(textStatus);
        //   alert(errorThrown);
        // }
      });
      return promise;
    },
  };

  h5.core.expose(rekogLogic);
});
