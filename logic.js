// ゲームロジック
let key_buff = new Array(256);  // キー押下状態の維持用

// キー押下時の処理
function keyDownHandler(e) {
    // キー押下状態の設定(true)
    key_buff[e.keyCode] = true;
    // 左方向の初速を設定
    switch(e.keyCode) {
        case KEY_CODE_A:
            objs[NAME_SHACHIKU].xAccel = -300;
            break;
        case KEY_CODE_D:
            objs[NAME_SHACHIKU].xAccel = 300;
            break;
        case KEY_CODE_SPACE:
            objs[NAME_SHACHIKU].yAccel = 42;
            objs[NAME_SHACHIKU].jumping = true;
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
        objs[NAME_SHACHIKU].xAccel = -300;
        return;
    }
    if(key_buff[KEY_CODE_D]) {
        objs[NAME_SHACHIKU].xAccel = 300;
        return;
    }
    
    // キー解放状態の場合
    objs[NAME_SHACHIKU].xAccel = 0;
}

function gameProcess(timestamp) {
    // 時差取得
    var delta = 0;
    if(lastTimestamp != null) {
        delta = (timestamp - lastTimestamp) / 1000;
    }
    lastTimestamp = timestamp;

    // キャラクタ座標計算
    actionKeeper();
    if(objs[NAME_SHACHIKU].jumping) {
        objs[NAME_SHACHIKU].jumpTime += delta * 16;
    }
    objs[NAME_SHACHIKU].x = objs[NAME_SHACHIKU].x + objs[NAME_SHACHIKU].xAccel * delta;
    objs[NAME_SHACHIKU].y = (0.5 * GRAVITY * objs[NAME_SHACHIKU].jumpTime * objs[NAME_SHACHIKU].jumpTime - objs[NAME_SHACHIKU].yAccel * objs[NAME_SHACHIKU].jumpTime) + (SCREEN_HEIGHT - objs[NAME_SHACHIKU].h);

    // 当たり判定
    if(objs[NAME_SHACHIKU].x > SCREEN_WIDTH - objs[NAME_SHACHIKU].w) {
        objs[NAME_SHACHIKU].x = SCREEN_WIDTH - objs[NAME_SHACHIKU].w;
    }else if(objs[NAME_SHACHIKU].x < 0) {
        objs[NAME_SHACHIKU].x = 0;
    }else if(objs[NAME_SHACHIKU].y > SCREEN_HEIGHT - objs[NAME_SHACHIKU].h) {
        objs[NAME_SHACHIKU].y = SCREEN_HEIGHT - objs[NAME_SHACHIKU].h;
        objs[NAME_SHACHIKU].yAccel = 0;
        objs[NAME_SHACHIKU].jumpTime = 0;
        objs[NAME_SHACHIKU].jumping = false;
    }
}