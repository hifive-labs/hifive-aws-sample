'use strict';

$(() => {
  const DialogController = {
    __name: 'DialogController',

    _rekognitionLogic: RekognitionLogic,

    /**
     * ダイアログを表示する
     */
    showDialog: function() {
      this.$find('dialog')[0].showModal();
    },

    /**
     * ダイアログを閉じる
     */
    closeDialog: function() {
      this.$find('dialog')[0].close();
    },

    /**
     * ファイル添付ボタンの状態が変わった時に呼び出される
     * @param context context情報
     * @param $el DOMのElement
     */
    '#uploadBtn change': function(context, $el) {
      const file = $el[0].files[0];
      this.$find('#uploadFile').val(file.name);

      const self = this;
      const reader = new FileReader();
      // ファイル読み込みが完了した際のイベント登録
      reader.onload = (file => {
        return e => {
          self.trigger('image-selected', { file, fileUrl: e.target.result });
        };
      })(file);
      reader.readAsDataURL(file);
    },

    /**
     * closeボタンが押された時に呼び出される
     */
    '.close click': function() {
      this.closeDialog();
    },

    /**
     * submitボタンが押された時に呼び出される
     * @param context context情報
     */
    '#rekognition-form submit': function(context) {
      // バブリングを阻止して、submitとしての役割を止める
      context.event.preventDefault();

      const fd = new FormData();
      fd.append('image', this.$find('#uploadBtn').prop('files')[0]);

      this._rekognitionLogic
        .postImagetoRekognition(fd)
        .done(data => {
          // 成功したら、親コントローラーにイベントを飛ばす
          this.trigger('rekognized', data);
        })
        .fail(error => {
          // 失敗した場合はログを出す
          console.error(error);
        })
        .always(() => {
          // 成功、失敗に関わらずダイアログを閉じる
          this.closeDialog();
        });
    }
  };
  h5.core.expose(DialogController);
});
