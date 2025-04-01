// 'use strict';

// document.addEventListener('DOMContentLoaded', function() {
//   const tabItems = document.querySelectorAll('.tab_item');
//   const tabPanels = document.querySelectorAll('.tab_panel-box');

//   tabItems.forEach(item => {// ここでitemは、tabItemsの各要素を指します
//     item.addEventListener('click', function() {
//       // すべてのタブからis-activeクラスを削除
//       tabItems.forEach(item => item.classList.remove('is-active'));
//       // クリックされたタブにis-activeクラスを追加
//       this.classList.add('is-active');

//       // すべてのパネルからis-showクラスを削除
//       tabPanels.forEach(panel => panel.classList.remove('is-show'));
//       // クリックされたタブに対応するパネルを取得
//       const panelToShow = document.querySelector(`.tab_panel-box[data-panel="${this.dataset.tab}"]`);
//       // 上記で取得したパネルにis-showクラスを追加
//       panelToShow.classList.add('is-show');
//     });
//   });
// });

// window.onload = function() { ... };:で書いたバージョン
// 'use strict';
// window.onload = function() {
//   const tabItems = document.querySelectorAll('.tab_item');
//   const tabPanels = document.querySelectorAll('.tab_panel-box');

//   tabItems.forEach(item => {
//     item.addEventListener('click', function() {
//       // すべてのタブからis-activeクラスを削除
//       tabItems.forEach(item => item.classList.remove('is-active'));
//       // クリックされたタブにis-activeクラスを追加
//       this.classList.add('is-active');

//       // すべてのパネルからis-showクラスを削除
//       tabPanels.forEach(panel => panel.classList.remove('is-show'));
//       // クリックされたタブに対応するパネルを取得
//       const panelToShow = document.querySelector(`.tab_panel-box[data-panel="${this.dataset.tab}"]`);
//       // 上記で取得したパネルにis-showクラスを追加
//       panelToShow.classList.add('is-show');
//     });
//   });
// };

//
// jQueryを使ったコード
//
'use strict';

// onメソッドを使ったバージョン
// $(function(){
//   $('.tab_item').on('click', function(){
//     let index = $('.tab_item').index(this);

//     $('.tab_item').removeClass('is-active');
//     $(this).addClass('is-active');
//     $('.tab_panel-box').removeClass('is-show');
//     $('.tab_panel-box').eq(index).addClass('is-show');
//   });
// });

//clickメソッドを使ったバージョン
$(function(){
  $('.tab_item').click(function(){
    let index = $('.tab_item').index(this);

    $('.tab_item').removeClass('is-active');
    $(this).addClass('is-active');
    $('.tab_panel-box').removeClass('is-show');
    $('.tab_panel-box').eq(index).addClass('is-show');
  });
});

// マウスエンターイベントも追加してみたバージョン
// $(function(){
//   $('.tab_item').on('click mouseenter', function(){
//     let index = $('.tab_item').index(this);

//     // クリックまたはマウスエンター時にタブのクラスを切り替える
//     $('.tab_item').removeClass('is-active');
//     $(this).addClass('is-active');

//     // クリックまたはマウスエンター時にパネルの表示を切り替える
//     $('.tab_panel-box').removeClass('is-show');
//     $('.tab_panel-box').eq(index).addClass('is-show');
//   });
// });


// 犬A、犬Bの画像を切り替える
document.addEventListener('DOMContentLoaded', function () {
  const animationDuration = 400; // アニメーションの時間（ミリ秒）

  // 犬Aの画像だけを表示
  document.getElementById('show_dog_a').addEventListener('click', function () {
    const items = document.querySelectorAll('.item');
    items.forEach(function (item) {
      if (item.classList.contains('dog-a')) {
        item.style.display = 'block';
        item.style.opacity = 0; // 初期状態を不透明に
        item.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], {
          duration: animationDuration,
          fill: 'forwards'
        });
      } else {
        item.style.display = 'none'; // 他のアイテムは非表示
      }
    });
  });

  // 犬Bの画像だけを表示
  document.getElementById('show_dog_b').addEventListener('click', function () {
    const items = document.querySelectorAll('.item');
    items.forEach(function (item) {
      if (item.classList.contains('dog-b')) {
        item.style.display = 'block';
        item.style.opacity = 0; // 初期状態を不透明に
        item.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], {
          duration: animationDuration,
          fill: 'forwards'
        });
      } else {
        item.style.display = 'none'; // 他のアイテムは非表示
      }
    });
  });

  // 全ての画像を表示
  document.getElementById('show_all').addEventListener('click', function () {
    const items = document.querySelectorAll('.item');
    items.forEach(function (item) {
      item.style.display = 'block';
      item.style.opacity = 0; // 初期状態を不透明に
      item.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], {
        duration: animationDuration,
        fill: 'forwards'
      });
    });
  });
});

$(document).ready(function () {
  const $drawerToggle = $("#drawer_toggle");
  const $globalNav = $("#global_nav");

  // ハンバーガーメニューのトグルボタンをクリックしたときの処理
  $drawerToggle.on("click", function () {
    $drawerToggle.toggleClass("open"); // アイコンのアニメーション用クラスを切り替え
    if ($globalNav.hasClass("open")) {
      // メニューが開いている場合は閉じる（フェードアウト）
      $globalNav.fadeOut(400,function () {
        $globalNav.removeClass("open"); // クラスを外す
      });
    } else {
      // メニューが閉じている場合は開く（フェードイン）
      $globalNav.fadeIn(400,function () {
        $globalNav.addClass("open"); // クラスを追加
      });
    }
  });

  // メニュー外をクリックしたときにメニューを閉じる処理
  $(document).on("click", function (e) {
    if (!$(e.target).closest($globalNav).length && !$(e.target).closest($drawerToggle).length) {
      if ($globalNav.hasClass("open")) {
        $globalNav.fadeOut(function () {
          $globalNav.removeClass("open"); // メニューを非表示にする
          $drawerToggle.removeClass("open"); // アイコンのアニメーションをリセット
        });
      }
    }
  });
});

$(document).ready(function () {
  $('.sort_btn').on('click', function () {
    // すべてのボタンから "active" クラスを削除
    $('.sort_btn').removeClass('active');
    // クリックされたボタンに "active" クラスを追加
    $(this).addClass('active');
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const cartButtons = document.querySelectorAll('.js_cart_btn');

  cartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const itemTextbox = this.closest('.item').querySelector('.item_textbox');
      const itemElement = this.closest('.item'); // item要素

      // 「カート」ボタンが押された場合
      if (this.textContent === 'カート') {
        // item_textboxを表示（ホバーに関係なく）
        itemElement.classList.add('show-textbox');
        // ボタンのテキストを「戻る」に変更
        this.textContent = 'もどす';
      }
      // 「戻る」ボタンが押された場合
      else if (this.textContent === 'もどす') {
        // item_textboxを非表示にする（ホバーの挙動に戻す）
        itemElement.classList.remove('show-textbox');
        // ボタンのテキストを「カート」に戻す
        this.textContent = 'カート';
      }
    });
  });
});
