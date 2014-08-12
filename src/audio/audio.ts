

class Sound {

    context: AudioContext;


    constructor() {
        this.context = new AudioContext();

    }

    playNote(options?: any){

        //DEFAULTS
        var defaultOptions = {
            frequency: 440,
            oscType: 4,
            envelope: [0, 0.5, 0, 0.1],
            volume: 0.2
        };

        if (typeof options == 'object') {
            options = $.extend(defaultOptions, options);
        } else {
            options = defaultOptions;
        }

        var oscillator = this.context.createOscillator();
        var gainNode = this.context.createGain();

        oscillator.type = options.oscType;
        oscillator.frequency.value = options.frequency;
        gainNode.gain.value = options.volume;

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        //ASDR
        var attack = options.envelope[0],
            sustain = options.envelope[1],
            decay = options.envelope[2],
            release = options.envelope[3],
            now = this.context.currentTime;

        gainNode.gain.cancelScheduledValues( now );
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(options.volume, now + attack);
//        gainNode.gain.linearRampToValueAtTime(options.volume/4, now + attack);
        gainNode.gain.linearRampToValueAtTime(0, now + attack + sustain + decay + release);


        oscillator.start(0);

        setTimeout(function() {
            oscillator.disconnect();
            console.log('disconnect bleep');
        }, (attack + sustain + decay + release)* 1500);

    }
}
export = Sound;

//
//
//class Audio extends SoundGen{
//
//
//    constructor() {
//        var mySource;
//
//    }
//
//    playAudio(source) {
//
////        var thisSound = this;
////        thisSound.source = source;
////        buffer = null;
////        thisSound.isLoaded = false;
////        thisSound.panner = this.context.createPanner();
////        thisSound.volume = this.context.createGain();
//
//        var getSound = new XMLHttpRequest();
//        getSound.open("GET", source, true);
//        getSound.responseType = "arraybuffer";
//        getSound.addEventListener('load', this.bufferSound, false);
//        getSound.send();
//
//
//
//
//    }
//
//    bufferSound(event) {
//        var request = event.target;
//        var source = this.context.createBufferSource();
//        source.buffer = this.context.createBuffer(request.response, false);
//        this.mySource = source;
//    }
//
//}
//
////export = Audio;