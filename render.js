function render() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    Object.keys(objs).forEach(key => {
        ctx.drawImage(Asset.images[key], objs[key].x, objs[key].y)
    });
}