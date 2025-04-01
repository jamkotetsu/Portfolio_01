window.onload = function () {
    // ① ローカルストレージから商品データを取り出して非文字列に変換したもの
    const items = JSON.parse(localStorage.getItem("items"));
    // ⑥ フラグメント(トレー)を作成&用意
    const fragment = document.createDocumentFragment();
    // ⑦ ローカルストレージに追加された商品を追加する要素 ul
    const ele = document.getElementById('js_shopping_list');
    // ⑧ 合計金額
    let total = 0;
    // ⑧ 商品の合計金額表示用の要素
    const total_ele = document.getElementById('js_total');
    // ⑩ 購入確定アラート
    const confirm_btn = document.getElementById('js_confirm');


    // ② ローカルストレージのデータがある場合
    if (items) {
        // ②カートの商品分、要素を生成
        for (let i = 0; i < items.length; i++) {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            const price = document.createElement('div');

        // ③生成した要素にクラスを追加
        price.classList.add('price');

        // ④各要素に商品データを追加
        h2.appendChild(document.createTextNode(items[i].name));
        price.appendChild(document.createTextNode(items[i].price));

        // ⑤商品名と価格の要素をliに追加
        li.appendChild(h2);
        li.appendChild(price);

        //⑥ 作成したliをフラグメントトレーに追加
        fragment.appendChild(li);

        // ⑧ 合計金額の加算
        total = total + items[i].price;
        }

    }

    // ⑦作成したliをulに追加
    ele.appendChild(fragment);

    // ⑨ 合計金額の表示
    total_ele.innerHTML = total;

    // ⑩ 購入が確定しました
  confirm_btn.addEventListener('click', function () {
      if (items) {
          window.alert('購入が確定しました');
          localStorage.removeItem('items');
          window.location.href = 'index.html'; // トップページのURLに変更
      } else {
          window.alert('カートに商品がありません');
      }
  });

    document.getElementById('js_back').addEventListener('click', function() {
    window.location.href = 'index.html#3';
  });
};
