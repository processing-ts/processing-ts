

import colorUtils = require("./utils/Color");

export enum RectMode { CORNER, CORNERS, RADIUS, CENTER }
export enum EllipseMode { CORNER, CORNERS, RADIUS, CENTER }

export class PGraphics{

	private static currentRectMode: RectMode = RectMode.CORNER;
	private static currentEllipseMode: EllipseMode = EllipseMode.CENTER;
	private static fillEnabled: boolean = false;
	private static strokeEnabled: boolean = false;

	public static init(){
		window.background = PGraphics.background;
		window.ellipse = PGraphics.ellipse;
		window.ellipseMode = PGraphics.ellipseMode;
		window.fill = PGraphics.fill;
		window.line = PGraphics.line;
		window.noFill = PGraphics.noFill;
		window.noStroke = PGraphics.noStroke;
		window.popMatrix = PGraphics.popMatrix;
		window.pushMatrix = PGraphics.pushMatrix;
		window.rect = PGraphics.rect;
		window.rectMode = PGraphics.rectMode;
		window.rotate = PGraphics.rotate;
		window.scale = PGraphics.scale;
		window.stroke = PGraphics.stroke;
		window.strokeWeight = PGraphics.strokeWeight;
		window.text = PGraphics.text;
		window.translate = PGraphics.translate;

		window.mouseX = null;
		window.mouseY = null;
	}

    public static background(r: number, g?: number, b?: number): void {
		PGraphics.fill(r, g, b);
		PGraphics.rect(0, 0, width, height);
		PGraphics.noFill();
	}

	// draws the current path state.
	private static drawPath(): void{
		if (PGraphics.fillEnabled) context.fill();
		if (PGraphics.strokeEnabled) context.stroke();
	}

	public static ellipse(x: number, y: number, w: number, h?: number) {

    	if (!h) h = w;

    	switch (PGraphics.currentEllipseMode){
			case EllipseMode.CORNER:
				x += (w / 2);
				y += (h / 2);
			break;
			case EllipseMode.CORNERS:
				w *= 0.5;
				h *= 0.5;
				x += (w / 2);
				y += (h / 2);
			break;
			case EllipseMode.RADIUS:
				w *= 2;
				h *= 2;
			break;
		}

    	// if width and height are the same, draw a circle
    	// bypassing context scaling.
    	if (w === h){
    		context.beginPath();
			context.arc(x, y, w / 2, 0, Math.TAU, false);
			context.closePath();

			PGraphics.drawPath();

			return;
    	}

		context.save();

		var r = (h / 2) / (w / 2) || 1;
		context.scale(1, r);
		context.beginPath();
		context.arc(x, y / r, w / 2, 0, Math.TAU, false);
		context.closePath();

    	PGraphics.drawPath();

		context.restore();
    }

    public static ellipseMode(mode: EllipseMode): void{
		PGraphics.currentEllipseMode = mode;
	}

	public static fill(r: number, g?: number, b?: number): void {
		PGraphics.fillEnabled = true;
		PGraphics.setFillStyle(r, g, b);
	}

	public static line(fromX: number, fromY: number, toX: number, toY: number): void{
    	context.beginPath();
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);
		context.stroke();
    }

    public static noFill(): void{
		PGraphics.fillEnabled = false;
	}

	public static noStroke(): void{
		PGraphics.strokeEnabled = false;
	}

	public static popMatrix(): void{
		context.restore();
	}

	public static pushMatrix(): void{
		context.save();
	}

	public static rect(x: number, y: number, w: number, h: number): void {
		context.beginPath();

		switch (PGraphics.currentRectMode){
			case RectMode.CORNERS:
				w -= x;
				h -= y;
			break;
			case RectMode.RADIUS:
				x -= w;
				y -= h;
				w *= 2;
				h *= 2;
			break;
			case RectMode.CENTER:
				x -= (w / 2);
				y -= (h / 2);
			break;
		}

		context.rect(x, y, w, h);

    	context.closePath();

    	PGraphics.drawPath();
	}

	public static rectMode(mode: RectMode): void{
		PGraphics.currentRectMode = mode;
	}

	public static rotate(angle: number): void{
    	context.rotate(angle);
    }

    public static scale(xScale: number, yScale: number): void {
    	context.scale(xScale, yScale);
    }

    private static setFillStyle(r: number, g?: number, b?: number): void{
		context.fillStyle = colorUtils.RGBToHexString([r, g, b]);
	}

	private static setLineWidth(width: number): void{
		context.lineWidth = width;
	}

	private static setStrokeStyle(r: number, g?: number, b?: number): void{
		context.strokeStyle = colorUtils.RGBToHexString([r, g, b]);
	}

    public static stroke(r: number, g?: number, b?: number): void{
		PGraphics.strokeEnabled = true;
		PGraphics.setStrokeStyle(r, g, b);
	}

	public static strokeWeight(weight: number): void{
		PGraphics.setLineWidth(weight);
	}

	public static text(text: string, x: number, y: number): void{
		context.fillText(text, x, y);
	}

    public static translate(x: number, y: number): void{
    	context.translate(x, y);
    }

}