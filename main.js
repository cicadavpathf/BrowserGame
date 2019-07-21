window.addEventListener('load', init);
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

let canvas;
let ctx;

function init() {
    canvas = document.getElementById('maincanvas');
    ctx = canvas.getContext('2d');

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    Asset.loadAssets(function () {
        requestAnimationFrame(update);
    });
}

let lastTimestamp;
let objs = {
    [NAME_BACK]: new object(SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0),
    [NAME_SHACHIKU]: new character(100, 140, 0, 460)
};

function update(timestamp) {
    // game処理実行
    gameProcess(timestamp);

    requestAnimationFrame(update);

    // 描画
    render();
}