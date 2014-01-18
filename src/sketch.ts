
// import everything for r.js
import graphics = require("./pgraphics");
import math = require("./pmath");
import vector = require("./pvector");
import events = require("./utils/events");
import extensions = require("./utils/extensions");

class Sketch{

    container: HTMLElement;
	startTime: number;
    time: number;

	constructor() {

        // create elements.
        this.container = document.getElementById('main');
        canvas = document.createElement('canvas');

        // empty main element.
        while (this.container.hasChildNodes()) {
            this.container.removeChild(this.container.lastChild);
        }

        this.container.appendChild(canvas);

        // check if the browser supports canvas
        if (!canvas.getContext) {
            alert('Your browser does not support Canvas, sorry!');
            return;
        }

        // check if the browser supports requestAnimationFrame
        if (typeof requestAnimationFrame === 'undefined') {
            alert('Your browser does not support Canvas animations, sorry!');
            return;
        }

        context = canvas.getContext('2d');

        events.addEventListener(this.container, 'mousemove', (e) => {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        });

        events.addEventListener(this.container, 'mousedown', (e) => {
            this.mousePressed();
        });

        events.addEventListener(this.container, 'mouseup', (e) => {
            this.mouseReleased();
        });

        events.addEventListener(window, 'resize', (e) => {
            this.resize();
        });

        // initial sizing.
        this.resize();

        // initialise graphics, math, events.
        extensions.init();
        graphics.PGraphics.init();
        math.PMath.init();

        // start tick loop.
        frameCount = 0;

        requestAnimationFrame((timestamp) => this.tick(timestamp));

        this.setup();
	}

	tick(timestamp: number): void {

        if (!this.startTime) this.startTime = timestamp;

        millis = timestamp - this.startTime;
        frameCount++;

        this.reset();
		this.draw();

        requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

	reset(): void{
		// reset transform.
		context.setTransform(1, 0, 0, 1, 0, 0);

		// clear canvas.
		context.clearRect(0, 0, width, height);

		// reset drawing state.
		noFill();
		noStroke();
        rectMode(graphics.RectMode.CORNER);
        ellipseMode(graphics.EllipseMode.RADIUS);

		// todo: reset all other canvas styles?
	}

	setup(): void {}
	draw(): void {}
    mousePressed(): void{}
    mouseReleased(): void {}

	resize(): void {
        canvas.width = width = this.container.clientWidth;
        canvas.height = height = this.container.clientHeight;
    }
}

export = Sketch;