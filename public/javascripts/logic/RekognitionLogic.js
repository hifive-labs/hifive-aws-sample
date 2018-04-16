'use strict';

$(() => {
  const rekognitionLogic = {
    __name: 'RekognitionLogic',
    apiHost: '',
    // apiHost: 'http://hifive-eb-sample.imbbjfxxgq.ap-northeast-1.elasticbeanstalk.com',
    /**
     * サーバのrekognitionエンドポイントにpostリクエストを投げます
     * @param formData rekognitionが受け付けるデータ
     * @returns {promise} jQueryのpromiseオブジェクト
     */
    postImagetoRekognition: function(formData) {
      const promise = h5.ajax(this.apiHost + '/rekognition', {
        type: 'post',
        processData: false,
        contentType: false,
        data: formData,
        dataType: 'json',
      });
      return promise;
    },
  };
  h5.core.expose(rekognitionLogic);
});
