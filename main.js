window.addEventListener('load', init);
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

function init() {
    let canvas = document.getElementById('maincanvas');
    let ctx = canvas.getContext('2d');

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    Renderer.ctx = ctx;
    Asset.assets = [
        { type: 'image', name: NAME_BACK, src: 'assets/back.png' },
        { type: 'image', name: NAME_SHACHIKU, src: 'assets/shachiku.png' }
    ];
    Asset.loadAssets(function () {
        requestAnimationFrame(update);
    });
}

let objs = {
    [NAME_BACK]: new object(SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0),
    [NAME_SHACHIKU]: new character(100, 140, 0, 460)
};

function update(timestamp) {
    // game処理実行
    gameProcess(timestamp);

    requestAnimationFrame(update);

    // 描画
    Renderer.render();
}