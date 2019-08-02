class shape {
    constructor(key, x, y) {
        this.key = key;
        this.x = x;
        this.y = y;
    }
}

class object extends shape {
    constructor(key, image, w, h, x, y) {
        super(x, y);
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

class firework extends shape {
    constructor(key, color, radius, x, y) {
        super(key, x, y);
        this.color = color;
        this.radius = radius;
        this.initialize();
    }

    initialize() {
        this.count = 0;
        this.scale = 0;
        this.xAccel = -3 + random(6);
        this.yAccel = -3 - random(8);
        if(!this.color) {
            this.color = firework_colors[random(firework_colors.length)];
        }
    }

    move(delta) {
        this.x += this.xAccel;
        this.y += this.yAccel;

        this.yAccel += 0.1;
        this.xAccel /= 1.01;
    }

    draw(ctx) {
        if (this.yAccel < -1) { // going up
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        else {  // exploded
            this.count++;
            for (let t = 0 ; t < 4 ; t++) {
                this.scale += 0.06 / this.count;
                let rad = this.radius * this.scale;
                for (let i = 0 ; i < Math.PI * 2 ; i += 0.6) {
                    let dx = Math.cos(i) * rad;
                    let dy = Math.sin(i) * rad;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x + dx, this.y + dy, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            if (this.count > 80) {
                this._afterDrawing();
            }
        }
    }

    afterDrawing(func) {
        this._afterDrawing = func;
    }
    _afterDrawing(){}
}