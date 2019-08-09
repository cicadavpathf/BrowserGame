let Renderer = {};

Renderer.ctx;

Renderer.render = function() {
    // 画面クリア
    Renderer.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // オブジェクト描画
    Object.keys(stage).forEach(key => {
        stage[key].draw(Renderer.ctx);
    });
    Object.keys(objs).forEach(key => {
        objs[key].draw(Renderer.ctx);
    });
}