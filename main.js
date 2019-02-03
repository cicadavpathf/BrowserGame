var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

window.addEventListener('load', init);
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);


// init update render

var canvas;
var ctx;

function init() {
    canvas = document.getElementById('maincanvas');
    ctx = canvas.getContext('2d');

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    Asset.loadAssets(function () {
        requestAnimationFrame(update);
    });
}

var lastTimestamp = null;
var gravity = 9.8;
var shachikuW = 100;
var shachikuH = 140;
var shachikuX = 0;
var shachikuY = SCREEN_HEIGHT - shachikuH;
var shachikuXSpeed = 0;
var shachikuYSpeed = 0;
var jumpTime = 0;
var jumping = false;

function update(timestamp) {
    // 時差取得
    var delta = 0;
    if(lastTimestamp != null) {
        delta = (timestamp - lastTimestamp) / 1000;
    }
    lastTimestamp = timestamp;

    // キャラクタ座標計算
    actionKeeper();
    if(jumping) {
        jumpTime += delta * 16;
    }
    shachikuX = shachikuX + shachikuXSpeed * delta;
    shachikuY = (0.5 * gravity * jumpTime * jumpTime - shachikuYSpeed * jumpTime) + (canvas.height - shachikuH);

    // 当たり判定
    if(shachikuX > canvas.width - shachikuW) {
        shachikuX = canvas.width - shachikuW;
    }else if(shachikuX < 0) {
        shachikuX = 0;
    }else if(shachikuY > canvas.height - shachikuH) {
        shachikuY = canvas.height - shachikuH;
        shachikuYSpeed = 0;
        jumpTime = 0;
        jumping = false;
    }

    requestAnimationFrame(update);

    // 描画
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(Asset.images['back'], 0, 0);
    ctx.drawImage(Asset.images['shachiku'], shachikuX, shachikuY);
}


// グラフィックアセット読み込み周り

var Asset = {};

Asset.assets = [
    { type: 'image', name: 'back', src: 'assets/back.png' },
    { type: 'image', name: 'shachiku', src: 'assets/shachiku.png' }
];

Asset.images = {};

Asset.loadAssets = function(onComplete) {
    var total = Asset.assets.length;
    var loadCount = 0;
    var onLoad = function() {
        loadCount++;
        if (loadCount >= total) {
            onComplete();
        }
    };

    Asset.assets.forEach(function(asset) {
        switch (asset.type) {
            case 'image':
                Asset._loadImage(asset, onLoad);
                break;
        }
    });
};

Asset._loadImage = function(asset, onLoad) {
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};


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