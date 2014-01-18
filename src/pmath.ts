
export class PMath{

	public static init(){
		window.acos = PMath.acos;
		window.asin = PMath.asin;
		window.atan = PMath.atan;
		window.atan2 = PMath.atan2;
		window.clamp = PMath.clamp;
		window.constrain = PMath.constrain;
		window.cos = PMath.cos;
		window.degrees = PMath.degrees;
		window.dist = PMath.dist;
		window.lerp = PMath.lerp;
		window.mag = PMath.mag;
		window.map = PMath.map;
		window.norm = PMath.norm;
		window.radians = PMath.radians;
		window.random = PMath.random;
		window.sin = PMath.sin;
		window.sq = PMath.sq;
		window.tan = PMath.tan;
	}

	public static acos(angle: number): number {
		return Math.acos(angle);
	}

	public static asin(angle: number): number {
		return Math.asin(angle);
	}

	public static atan(angle: number): number {
		return Math.atan(angle);
	}

	public static atan2(y: number, x: number): number {
		return Math.atan2(y, x);
	}

	public static clamp(amt: number, low: number, high: number): number{
		return Math.min(Math.max(amt, low), high);
	}

	public static constrain(amt: number, low: number, high: number): number{
		return clamp(amt, low, high);
	}

	public static cos(angle: number): number {
		return Math.cos(angle);
	}

	public static degrees(radians: number): number {
		return (radians * 360) / Math.TAU;
	}

	public static dist(x1: number, y1: number, x2: number, y2: number): number {
	    return Math.sqrt(sq(x2 - x1) + sq(y2 - y1));
	}

	public static lerp(start: number, stop: number, amt: number): number {
		return start + (stop-start) * amt;
	}

	public static mag(a: number, b: number, c: number): number {
	    return Math.sqrt(a*a + b*b + c*c);
	}

	public static map(value: number,
                      start1: number, stop1: number,
                      start2: number, stop2: number): number {
    	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
	}

	public static norm(value: number, start: number, stop: number): number {
		return (value - start) / (stop - start);
	}

	public static radians(degrees: number): number {
		return Math.TAU * (degrees / 360);
	}

    public static random(low: number, high?: number): number {
		if (!high){
			high = low;
			low = 0;
		}

		if (low >= high) return low;

		return low + (high-low) * Math.random();
	}

	public static sin(angle: number): number {
		return Math.sin(angle);
	}

	public static sq(n: number): number {
	    return n*n;
	}

	public static tan(angle: number): number {
		return Math.tan(angle);
	}

}