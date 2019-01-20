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
var shachikuX = 0;
var shachikuSpeed = 0;

function update(timestamp) {
    // 時差取得
    var delta = 0;
    if(lastTimestamp != null) {
        delta = (timestamp - lastTimestamp) / 1000;
    }
    lastTimestamp = timestamp;

    // キャラクタ座標計算
    actionController();
    shachikuX += shachikuSpeed * delta;

    // 壁判定
    if(shachikuX > 700) {
        shachikuX = 700;
    }else if(shachikuX < 0) {
        shachikuX = 0;
    }

    requestAnimationFrame(update);

    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(Asset.images['back'], 0, 0);
    ctx.drawImage(Asset.images['shachiku'], shachikuX, 350);
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


// ゲームプレイ用ロジック

var key_buff = new Array(256);
var KEY_CODE_W = 87;
var KEY_CODE_A = 65;
var KEY_CODE_S = 83;
var KEY_CODE_D = 68;

function keyDownHandler(e) {
    key_buff[e.keyCode] = true;
}

function keyUpHandler(e) {
    key_buff[e.keyCode] = false;
}

function actionController() {
    if(key_buff[KEY_CODE_A] && !key_buff[KEY_CODE_D]) {
        shachikuSpeed = -300;
        return;
    }
    if(key_buff[KEY_CODE_D] && !key_buff[KEY_CODE_A]) {
        shachikuSpeed = 300;
        return;
    }

    shachikuSpeed = 0;
}