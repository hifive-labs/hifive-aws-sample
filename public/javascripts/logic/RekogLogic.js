'use strict';

$(() => {
  const rekogLogic = {
    __name: 'RekogLogic',

    /**
     * サーバのrekognitionエンドポイントにpostリクエストを投げます
     * @param formData rekognitionが受け付けるデータ
     * @returns {promise} jQueryのpromiseオブジェクト
     */
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
