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
    var delta = 0;
    if(lastTimestamp != null) {
        delta = (timestamp - lastTimestamp) / 1000;
    }
    lastTimestamp = timestamp;

    shachikuX += shachikuSpeed * delta;

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

var KEY_CODE_W = 87;
var KEY_CODE_A = 65;
var KEY_CODE_S = 83;
var KEY_CODE_D = 68;

/* 必要: キー押しっぱなし判定対応 */

function keyDownHandler(e) {
    switch(e.keyCode) {
        case KEY_CODE_W:
            break;
        case KEY_CODE_A:
            shachikuSpeed = -200;
            break;
        case KEY_CODE_S:
            break;
        case KEY_CODE_D:
            shachikuSpeed = 200;
            break;
        default:
            break;
    }
}

function keyUpHandler(e) {
    switch(e.keyCode) {
        case KEY_CODE_W:
            break;
        case KEY_CODE_A:
            shachikuSpeed = 0;
            break;
        case KEY_CODE_S:
            break;
        case KEY_CODE_D:
            shachikuSpeed = 0;
            break;
        default:
            break;
    }
}