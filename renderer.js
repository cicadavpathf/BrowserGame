let Renderer = {};

Renderer.ctx;

Renderer.render = function() {
    Renderer.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    Object.keys(objs).forEach(key => {
        Renderer.ctx.drawImage(Asset.images[key], objs[key].x, objs[key].y)
    });
}