// ゲームロジック

var key_buff = new Array(256);  // キー押下状態の維持用
var KEY_CODE_W = 87;
var KEY_CODE_A = 65;
var KEY_CODE_S = 83;
var KEY_CODE_D = 68;
var KEY_CODE_SPACE = 32;

// キー押下時の処理
function keyDownHandler(e) {
    // キー押下状態の設定(true)
    key_buff[e.keyCode] = true;
    // 左方向の初速を設定
    switch(e.keyCode) {
        case KEY_CODE_A:
            shachikuXSpeed = -300;
            break;
        case KEY_CODE_D:
            shachikuXSpeed = 300;
            break;
        case KEY_CODE_SPACE:
            shachikuYSpeed = 42;
            jumping = true;
        default:
            break;
    }
}

// キー解放時の処理
function keyUpHandler(e) {
    // キー解放状態の設定(false)
    key_buff[e.keyCode] = false;
}

// キー押下状態によるアクションの維持
function actionKeeper() {
    // 左右同時押しは反映させない
    if(key_buff[KEY_CODE_A] && key_buff[KEY_CODE_D]) {
        return;
    }
    if(key_buff[KEY_CODE_A]) {
        shachikuXSpeed = -300;
        return;
    }
    if(key_buff[KEY_CODE_D]) {
        shachikuXSpeed = 300;
        return;
    }
    
    // キー解放状態の場合
    shachikuXSpeed = 0;
}
