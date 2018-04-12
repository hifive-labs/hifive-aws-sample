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
      });
      return promise;
    },
  };
  h5.core.expose(rekogLogic);
});
