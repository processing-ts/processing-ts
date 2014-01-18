
 interface Window {
     webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
     mozRequestAnimationFrame(callback: FrameRequestCallback): number;
     oRequestAnimationFrame(callback: FrameRequestCallback): number;
 }

// math
interface Math {
    TAU: number;
}

// string
interface String{
    format: any;
    startsWith: any;
    ltrim: any;
    rtrim: any;
    fulltrim: any;
    toFileName: any;
}

// array
interface Array<T>{
    clone(): Array<T>;
    last(): T;
}