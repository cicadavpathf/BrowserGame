class object {
    constructor(key, image, w, h, x, y) {
        this.key = key;
        this.image = image;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

class character extends object {
    constructor(key, image, w, h, x, y) {
        super(key, image, w, h, x, y);
        this.xAccel = 0;
        this.yAccel = 0;
        this.jumpTime = 0;
        this.jumping = false;
    }
}

class player extends character {
    constructor(key, image, w, h, x, y) {
        super(key, image, w, h, x, y);
    }
    move(delta) {
        if(this.jumping) {
            this.jumpTime += delta * 16;
        }
        this.x = this.x + this.xAccel * delta;
        this.y = (0.5 * GRAVITY * this.jumpTime * this.jumpTime - this.yAccel * this.jumpTime) + (SCREEN_HEIGHT - this.h);
    }
}