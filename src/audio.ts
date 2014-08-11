

class SoundGen {

    context: AudioContext;




    constructor() {
        this.context = new AudioContext();


    }



    bleep(tone: number) {

        // VIEW TYPESCRIPT OPTIONAL PROPERTIES

        console.log('start bleep');

        var oscillator = this.context.createOscillator();
        var gainNode = this.context.createGain();
        var panner = this.context.createPanner();

        oscillator.type = 3;
        oscillator.frequency.value = tone;
        gainNode.gain.value = 0.1;

//        panner.setPosition(x, y);

        oscillator.connect(panner);
        panner.connect(gainNode)
        gainNode.connect(this.context.destination);


        oscillator.start(0);
        var now = this.context.currentTime;
        gainNode.gain.cancelScheduledValues( now );
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0, now+0.29);

        setTimeout(function() {
            oscillator.disconnect();
            console.log('disconnect bleep');
        }, 500);



    }

    playNote(options?: any){

        //DEFAULTS
        var newNote = {
            pitch: 440,
            envelope: [0, 1, 1, 0.4],
            volume: 0.2
        };

        if (options.pitch) {
            newNote.pitch = options.pitch;
        }
        if (options.envelope) {
            newNote.envelope = options.envelope;
        }
        if (options.volume) {
            newNote.volume = options.volume;
        }
        console.log(newNote);
        return newNote;
    }


}

export = SoundGen;