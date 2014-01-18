

class PVector {

    constructor(
        public x: number,
        public y: number
    ) {}

    get(): PVector {
        return new PVector(this.x, this.y);
    }

    set(x: number, y: number): void{
        this.x = x;
        this.y = y;
    }

    add(v: PVector): void {
        this.x += v.x;
        this.y += v.y;
    }

    static add(v1: PVector, v2: PVector): PVector {
        return new PVector(v1.x + v2.x, v1.y + v2.y);
    }

    sub(v: PVector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    static sub(v1: PVector, v2: PVector): PVector {
        return new PVector(v1.x - v2.x, v1.y - v2.y);
    }

    mult(n: number): void {
        this.x = this.x * n;
        this.y = this.y * n;
    }

    static mult(v1: PVector, v2: PVector): PVector {
        return new PVector(v1.x * v2.x, v1.y * v2.y);
    }

    static multN(v1: PVector, n: number): PVector {
        return new PVector(v1.x * n, v1.y * n);
    }

    div(n: number): void {
        this.x = this.x / n;
        this.y = this.y / n;
    }

    static div(v1: PVector, v2: PVector): PVector {
        return new PVector(v1.x / v2.x, v1.y / v2.y);
    }

    static divN(v1: PVector, n: number): PVector {
        return new PVector(v1.x / n, v1.y / n);
    }

    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    magSq(): number {
        return (this.x * this.x + this.y * this.y);
    }

    normalize(): void {
        var m = this.mag();
        if (m != 0 && m != 1) {
            this.div(m);
        }
    }

    limit(max: number){
        if (this.magSq() > max * max) {
            this.normalize();
            this.mult(max);
        }
    }

    heading() {
        var angle = Math.atan2(-this.y, this.x);
        return -1*angle;
    }

    static random2D(): PVector{
        return PVector.fromAngle((Math.random() * Math.TAU));
    }

    static fromAngle(angle: number): PVector {
        return new PVector(Math.cos(angle), Math.sin(angle));
    }
}

export = PVector;