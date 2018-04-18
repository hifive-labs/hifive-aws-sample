'use strict';

$(() => {
  const rekognitionLogic = {
    __name: 'RekognitionLogic',
    apiHost: '',
    // apiHost: 'http://hifive-aws-sample.ap-northeast-1.elasticbeanstalk.com',
    /**
     * サーバのrekognitionエンドポイントにpostリクエストを投げます
     * @param formData rekognitionが受け付けるデータ
     * @returns {promise} jQueryのpromiseオブジェクト
     */
    postImagetoRekognition: function(formData) {
      // 指定したホストの/rekognitionエンドポイントへ、画像をdataとして与えたHTTP POSTリクエストを送信します。
      // (ホストを指定していない場合は自分自身)
      // 結果は以下のようなオブジェクトとして得られます。
      // {"Labels":[{"Name":"ラベル名(例: Animal)","Confidence":信頼度(例: 92.78},...],"OrientationCorrection":"ROTATE_0"}
      const promise = h5.ajax(this.apiHost + '/rekognition', {
        type: 'post',
        processData: false,
        contentType: false,
        data: formData,
        dataType: 'json'
      });
      return promise;
    }
  };
  h5.core.expose(rekognitionLogic);
});
