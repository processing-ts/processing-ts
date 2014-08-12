

class Sound {

    context: AudioContext;

    NewBlock = Object.create(null, {
        connect: {
            value: function (target) {
                this.output.connect(target);
            }
        },
        disconnect: {
            value: function (target) {
                this.output.disconnect(target);
            }
        }
    });

    /*

    List of audio blocks:

    SOURCE BLOCKS:
        Oscillator
            frequency
            waveform
            volume
            output

        White Noise
            volume
            output

    MODIFIER BLOCKS
        Modulator
            Input
            Frequency
            Depth
            waveform

        Envelope
            Input
            Attack
            Sustain
            Decay
            Release
            Output

        Filter
            Input
            Type
            Frequency
            Q
            Gain
            Output

        Echo
            Input
            Gain
            Feedback
            Time
            Output

        Drive
            Input
            Drive
            Output


    PREFAB:
        object which extends source and modifier attributes

     */


    constructor() {
        this.context = new AudioContext();

    }



    playSynth(options?: any){


        //DEFAULTS
        var defaultOptions = {
            frequency: 440,
            oscType: "sine",
            envelope: [0, 0.5, 0, 0.1],
            volume: 0.2,
            output: this.context.destination
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
        gainNode.connect(options.output);

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
        }, (attack + sustain + decay + release)* 1500);

    }

    Filter(options?: any){
        //DEFAULTS
        var defaultOptions = {
            frequency: {
                value: 800,
                min: 20,
                max: 22050,
                modifiable: true
            },
            Q: {
                value: 1,
                min: 0.001,
                max: 100,
                modifiable: true
            },
            gain: {
                value: 0,
                min: -40,
                max: 40,
                modifiable: true
            },
            filterType: {
                value: 1,
                min: 0,
                max: 7,
                modifiable: false
            },
            output: this.context.destination
        };

        if (typeof options == 'object') {
            options = $.extend(defaultOptions, options);
        } else {
            options = defaultOptions;
        }

        // CONFIG THE FILTER EFFECT HERE
    }
}
export = Sound;

