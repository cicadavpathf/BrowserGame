window.addEventListener('load', init);

let key_buff = new Array(256);

// 登場オブジェクト(暫定グローバル)
let objs = {};

function init() {
    window.addEventListener('keydown', Logic.keyDownHandler);
    window.addEventListener('keyup', Logic.keyUpHandler);

    let canvas = document.getElementById('maincanvas');
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    Renderer.ctx = canvas.getContext('2d');
    Asset.assets = [
        { type: 'image', key: NAME_BACK, src: 'assets/back.png' },
        { type: 'image', key: NAME_SHACHIKU, src: 'assets/shachiku.png' }
    ];

    Asset.loadAssets(function () {
        objs[NAME_BACK] = new object(NAME_BACK, Asset.images[NAME_BACK], SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0);
        objs[NAME_SHACHIKU] = new player(NAME_SHACHIKU, Asset.images[NAME_SHACHIKU], 100, 140, 0, 460);
        objs[NAME_FIREWORK] = new firework(NAME_FIREWORK, "", random(60) + 60, 400, 600);
        requestAnimationFrame(update);
    });
}

function update(timestamp) {
    // game処理実行
    Logic.gameProcess(timestamp);

    requestAnimationFrame(update);

    // 描画
    Renderer.render();
}