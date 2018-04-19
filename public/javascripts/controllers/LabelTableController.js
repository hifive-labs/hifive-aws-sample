'use strict';
$(() => {
  const LabelTableController = {
    __name: 'LabelTableController',

    /**
     * テーブルの行を引数のラベルに基づいて更新する
     * @param labels 画像ラベルのリスト
     */
    update: function(labels) {
      // ラベルに応じてテーブルを更新する処理を書く
    },
  };
  h5.core.expose(LabelTableController);

  /**
   * 与えられたラベル名と信頼度からテーブルの行(tr)のjQueryオブジェクトを生成して返す
   * @param labelName ラベル名
   * @param confidence　信頼度
   * @returns {jQuery|HTMLElement} テーブルの行(tr)DnのjQueryオブジェクト
   */
  const createLabelTableRow = (labelName, confidence) => {
    // $('<tr>')で新しいtrDOMを作成します
    const tr = $('<tr>');
    tr.append(
      // $('<td>')で新しいtdDOMを作成します
      // attr()でDOMへ属性を追加します
      // 今回はmdl-data-table__cell--non-numericというMaterial Design Lite用のクラスを追加しています。
      // text()でDOMのテキストを変更します。
      $('<td>')
        .attr({ class: 'mdl-data-table__cell--non-numeric' })
        .text(labelName)
    );
    tr.append($('<td>').text(confidence));
    return tr;
  };
});
