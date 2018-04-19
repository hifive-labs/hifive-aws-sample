'use strict';

$(() => {
  const RootController = {
    // ref: https://www.htmlhifive.com/conts/web/view/tutorial/controller#H57FA672C69CB6587
    __name: 'RootController',

    // 子コントローラの設定
    // DialogControllerはpublic/javascripts/controllers/DialogController.jsで定義されている
    // LabelTableControllerはpublic/javascripts/controllers/LabelTableController.jsで定義されている
    // ref: https://www.htmlhifive.com/conts/web/view/tutorial/interacting-with-controllers#H5B5030B330F330C830ED30FC30E9306E5B9A7FA9
    _dialogController: DialogController,
    _labelTableController: LabelTableController,

    __meta: {
      _dialogController: {
        // DialogControllerをidがpost-dialogであるDOM要素にバインド
        // ref: https://www.htmlhifive.com/conts/web/view/reference/controller_meta#HrootElement
        rootElement: '#post-dialog'
      },
      _labelTableController: {
        rootElement: '#label-table'
      }
    },

    // 「画像認識をする」ボタンが押されると呼ばれる
    '.show-modal click': function(context) {
      this._dialogController.showDialog();
    },

    // ダイアログで画像が選択されると、DialogControllerでimage-selectedイベントを発火するため、
    // このメソッドが呼ばれる
    '{rootElement} image-selected': function(context, $el) {
      // DialogController内のthis.trigger('image-selected', data)でimage-selectedイベントが発火するとこのメソッドが呼ばれる。
      // triggerで渡されたデータ(このケースでは選択された画像データ)はcontext.evArgに格納されている。
      const imagePreviewDOM = this.$find('#preview-image-wrapper');

      // idがpreview-image-wrapperである要素にimgタグを追加することで、選択された画像のプレビューを表示する
      imagePreviewDOM.empty(); // FIXME
      imagePreviewDOM.append(
        $('<img>').attr({
          src: context.evArg.fileUrl,
          id: 'preview-image',
          title: context.evArg.file.name
        })
      );
    },

    '{rootElement} rekognized': function(context, $el) {
      // this.trigger('rekognized', data)でrekognizedイベントが発火するとこのメソッドが呼ばれる。
      // triggerで渡されたデータ(このケースでは画像識別結果のオブジェクト)はcontext.evArgに格納されている。
      // ref: https://www.htmlhifive.com/conts/web/view/tutorial/controller#H7B2C15F156570FF1A30A430D930F330C830B330F330C630AD30B930C8
      const labels = context.evArg.Labels;

      // テーブルを更新
      this._labelTableController.update(labels);

      // 猫の画像だった場合は背景をピンクにする
      const backgroundColor = hasReliableLabel(labels, 'Cat', 50) ? 'pink' : 'white';
      $(this.rootElement).css('background', backgroundColor);
    }
  };

  // RootControllerを登録
  // ref: https://www.htmlhifive.com/conts/web/view/tutorial/controller#H300C30B330F330C830ED30FC30E95316300D3068306FFF1F
  h5.core.controller('#container', RootController);

  /**
   * 指定された名前のラベルが指定された信頼度以上で存在するかを返す
   * @param labels 検索対象のラベルリスト
   * @param name チェックするラベル名
   * @param confidence ラベルがここで指定した信頼度以上であれば戻り値がtrueになる
   * @returns {boolean} 指定された名前のラベルが指定された信頼度以上で存在するか
   */
  const hasReliableLabel = (labels, name, confidence) => {
    for (const label of labels) {
      if (label.Name === name && label.Confidence >= confidence) {
        return true
      }
    }
    return false
  };
});
