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

    /* 分割予定-> */
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
    /* <-分割予定 */

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
