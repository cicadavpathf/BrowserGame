class object {
    constructor(w, h, x, y) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
    }
}

class character extends object {
    constructor(w, h, x, y) {
        super(w, h, x, y);
        this.xAccel = 0;
        this.yAccel = 0;
        this.jumpTime = 0;
        this.jumping = false;
    }
}