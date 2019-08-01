// ゲームロジック
let Logic = {};

Logic.lastTimestamp;

// キー押下時の処理
Logic.keyDownHandler = function(e) {
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
Logic.keyUpHandler = function(e) {
    // キー解放状態の設定(false)
    key_buff[e.keyCode] = false;
}

// キー押下状態によるアクションの維持と調整
Logic.actionKeeper = function() {
    // ジャンプ維持
    if(key_buff[KEY_CODE_SPACE]) {
        objs[NAME_SHACHIKU].jumping = true;
    }else if(!objs[NAME_SHACHIKU].jumping) {
        objs[NAME_SHACHIKU].yAccel = 0;
    }
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
    objs[NAME_SHACHIKU].xAccel = 0;
}

Logic.gameProcess = function(timestamp) {
    // 時差取得
    let delta = 0;
    if(Logic.lastTimestamp != null) {
        delta = (timestamp - Logic.lastTimestamp) / 1000;
    }
    Logic.lastTimestamp = timestamp;

    let player = objs[NAME_SHACHIKU];

    // キャラクタ座標計算
    Logic.actionKeeper();

    player.move(delta);

    // 当たり判定
    if(player.x > SCREEN_WIDTH - player.w) {
        player.x = SCREEN_WIDTH - player.w;
    }else if(player.x < 0) {
        player.x = 0;
    }if(player.y > SCREEN_HEIGHT - player.h) {
        player.y = SCREEN_HEIGHT - player.h;
        player.jumpTime = 0;
        player.jumping = false;
    }
}