window.onload = function () {
    //材料を用意
    const cart_btns = document.querySelectorAll('.js_cart_btn'); // ①カートボタン
    const cart_cnt_icon = document.getElementById('js_cart_cnt'); //①カートの個数アイコン
    cart_cnt = 0; //①カートのアイテム数
    let clicked = []; // ④カート解除, 押されたボタンのindexのみを配列clickedに格納, ユーザーがカートに追加した商品のindexのみが保存
    let save_items = []; // ⑦ローカルストレージ保存用の配列,カートに追加された全ての商品の情報が保存
    const items = JSON.parse(localStorage.getItem("items"));  //⑩ローカルストレージから商品データを取り出して非文字列に変換したもの


    //  11 すでにカートに商品が入っている場合、カートアイコンのカウント表示とカートボタンをアクティブにする
    if (items) {
        //商品のIDを一時的に保存するための変数を定義
        let cartItemId;
        // 商品リスト(items)の各要素について、以下の処理を繰り返す
        for (let i = 0; i < items.length; i++) {
            // 現在の商品IDを変数に代入
            cartItemId = items[i].id;

            // 現在の商品情報を保存用配列に追加
            save_items.push(items[i]);

            // クリックされた商品のindexを、index配列(clicked)に追加
            clicked.push(cartItemId);

            activate_btn(cartItemId);
        }

        // もし商品が一つ以上入っていたら、カートアイコンを表示します
        if (items.length != 0) {
            // カートアイコンの親要素から"hidden"クラスを削除
            cart_cnt_icon.parentNode.classList.remove('hidden');
        }
    }


    // ① カートボタンを押した際の処理
    cart_btns.forEach(function (cart_btn,index) {
        cart_btn.addEventListener('click',function () {
            // ④カート解除
            // カートボタンが既に押されているか否かの判定
            if (clicked.indexOf(index) >= 0) {
                //ボタンのindexが配列に既に含まれている場合、配列から削除
                for (let i = 0; i < clicked.length; i++) {
                    if (clicked[i] == index) {
                        clicked.splice(i,1);

                        // ⑨ ローカルストレージjからデータを削除, データ保管用配列から商品データを削除
                        save_items.splice(i,1);
                    }
                }

                inactivate_btn(index);
            }

            // ボタンのindexが配列に含まれていない場合、配列に追加
            else if (clicked.indexOf(index) == -1) {

                // ⑥ ローカルストレージに保存のため、カートボタンの属性にdata-nameとdate-priceを取得
                let name = cart_btn.dataset.name;
                let price = Number(cart_btn.dataset.price);

                // ⑦ ローカルストレージにデータを保存, データ保存用配列に商品データを追加(保存)
                save_items.push({
                    id: index,
                    name: name,
                    price: price
                });

                // ①押されたボタンのindexをclicked配列に追加
                clicked.push(index);

                activate_btn(index);
            }

            // ⑧,⑩ ローカルストレージの商品データをセット(上書き,保管)
            localStorage.setItem("items",JSON.stringify(save_items));
        });
    });


    function activate_btn(index){
        // ② カウント表示(増)
        // ボタンを押されたらカートの個数アイコンを1増やす
        cart_cnt++;
        // cart_cntが以上なら、HTMLのカ個数アイコンからclass「hidden」を外す→カートの個数アイコンを表示
        if( cart_cnt >= 1 ) {
            cart_cnt_icon.parentNode.classList.remove('hidden');
        }
        //カートの個数アイコンにカウントを出力
        cart_cnt_icon.innerHTML = cart_cnt;

        // ③ カートボタンをクリックしたアクティブにする
        cart_btns[index].classList.add('item_cart_btn_active');
    };


    function inactivate_btn(index){
        // ⑤ カウント表示(減)
        // ボタンを押されたらカートの個数アイコンを1減らす
        cart_cnt--;
        // 0の時はカートアイコンを表示させない
        if (cart_cnt == 0) {
            cart_cnt_icon.parentNode.classList.add('hidden');
        }
        // カートの個数アイコンにカウントを出力
        cart_cnt_icon.innerHTML = cart_cnt;

        // カートボタンをクリックした非アクティブにする
        cart_btns[index].classList.remove('item_cart_btn_active');
    };

};
