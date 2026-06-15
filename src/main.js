import './style.css'
import * as Tone from "tone";

const BTN_START = document.getElementById("BTN_START");
const BTN_END = document.getElementById("BTN_END");

BTN_START.addEventListener("click", async () => {
  await Tone.start(); // 브라우저 오디오 권한 열기
  Tone.Transport.start(); // 예약된 Loop/Sequence 재생 시작
  await rhythm();     
});

BTN_END.addEventListener("click", async () => {
  await Tone.Transport.stop();
});

const START_1 = 0.8;
const LOOP_1 = 1.6;

async function rhythm() {
  const drum = new Tone.MembraneSynth().toDestination();
  new Tone.Loop(t => {
    drum.triggerAttackRelease("C1", "8n", t);
    drum.triggerAttackRelease("C1", "8n", t+0.4);
    // drum.triggerAttackRelease("C2", "8n", t+0.8);
  }, LOOP_1).start(0);

  const hatSet = {
    envelope: {
      attack: 0.01,
      decay: 0.1,
      release: 0.3
    }
  };
  const hat1 = new Tone.MetalSynth(hatSet).toDestination();
  const hat2 = new Tone.MetalSynth(hatSet).toDestination();
  new Tone.Loop(t => {
    hat1.triggerAttackRelease("C2", "8n", t);
    hat2.triggerAttackRelease("D2", "8n", t+0.1);
  }, LOOP_1).start(0.8);

  



  const bass = new Tone.FMSynth({
  oscillator : { type : "amsawtooth" },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain : 0.8,
      release: 0.3
    }
  }).toDestination();
  // bass.triggerAttackRelease("C1", "8n", 0);

  const effect = new Tone.Reverb(3).toDestination();
  const effect2 = new Tone.FrequencyShifter(4).toDestination();
  const anal = new Tone.Analyser("waveform", 1024);
  const melody = new Tone.PolySynth().toDestination();
  melody.set({
    volume : -5,
    oscillator : { type : "sawtooth" },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      release: 5
    }
  }).connect(effect2).connect(effect).fan(anal);
  // melody.triggerAttackRelease(["C1", "E1", "G1"], "8n", 0);
  // melody.triggerAttackRelease("C4", "8n", 0.4);
  // melody.triggerAttackRelease("E4", "8n", 0.8);
  // melody.triggerAttackRelease("G4", "8n", 1.28);

  const high = new Tone.PolySynth().toDestination();
  high.set({
    volume : -15,
    oscillator : { type : "triangle" },
    envelope: {
      attack: 0.01,
      decay: 6,
      release: 12
    }
  }).connect(effect2).connect(effect).fan(anal);
  new Tone.Loop(t => {
    high.triggerAttackRelease("G5", 12, t);
  }, LOOP_1 * 4).start(LOOP_1);
};




/**
 * DRUM
 */
/*
const drum = new Tone.MembraneSynth().toDestination();
new Tone.Loop(t => {
  drum.triggerAttackRelease("C1", "8n", t);
  drum.triggerAttackRelease("C2", "8n", t+0.1);
  drum.triggerAttackRelease("C3", "8n", t+0.2);
  drum.triggerAttackRelease("C4", "8n", t+0.3);
  drum.triggerAttackRelease("C5", "8n", t+0.4);
  drum.triggerAttackRelease("C6", "8n", t+0.5);
  drum.triggerAttackRelease("C7", "8n", t+0.6);
}, 2).start(0);
*/

/**
 * HAT
 */
/*
const hat = new Tone.MetalSynth({
  envelope: {
    attack: 0.01,
    decay: 0.1,
    release: 0.3
  }
}).toDestination();
new Tone.Loop(t => {
  hat.triggerAttackRelease("C1", "8n", t+1.73)
  hat.triggerAttackRelease("C1", "8n", t+1.86)
}, 2).start(0);
*/

/**
 * BASS
 */
/*
const bass = new Tone.FMSynth({
  oscillator : { type : "amsawtooth" },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain : 0.8,
    release: 0.3
  }
}).toDestination();
new Tone.Loop(t => {
  bass.triggerAttackRelease("C1", "8n", t)
  bass.triggerAttackRelease("C2", "8n", t+0.3)
  bass.triggerAttackRelease("C1", "8n", t+0.8)
  bass.triggerAttackRelease("C2", "8n", t+1.2)
  bass.triggerAttackRelease("C1", "8n", t+1.6)
}, 2).start(0);
*/

/**
 * MELODY
 */
/*
const effect = new Tone.Reverb(3).toDestination();
const effect2 = new Tone.FrequencyShifter(4).toDestination();
let anal = new Tone.Analyser("waveform", 1024);
const melody = new Tone.PolySynth().toDestination();
melody.set({
  volume : -5,
  oscillator : { type : "sawtooth" },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    release: 5
  }
}).connect(effect2).connect(effect).fan(anal);
new Tone.Loop(t => {
  melody.triggerAttackRelease(["C4", "C4"], "8n", t)
  melody.triggerAttackRelease("E4", "8n", t+0.4)
  melody.triggerAttackRelease("F4", "8n", t+0.8)
  melody.triggerAttackRelease("E4", "8n", t+1.28)
  melody.triggerAttackRelease(["C4", "C4"], "8n", t+2.0)
  melody.triggerAttackRelease("E4", "8n", t+2.4)
  melody.triggerAttackRelease("F4", "8n", t+2.8)
  melody.triggerAttackRelease("E4", "8n", t+3.28)
}, 4).start(0);
*/

/**
 * HIGH
 */
/*
const high = new Tone.PolySynth().toDestination();
high.set({
  volume : -15,
  oscillator : { type : "triangle" },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    release: 5
  }
});
new Tone.Loop(t => {
  high.triggerAttackRelease("G5", "16n", t)
  high.triggerAttackRelease("B5", "16n", t+0.1)
  high.triggerAttackRelease("C6", "16n", t+0.2)
  high.triggerAttackRelease("G5", "16n", t+0.3)
  high.triggerAttackRelease("B5", "16n", t+0.4)
  high.triggerAttackRelease("C6", "16n", t+0.5)
  high.triggerAttackRelease("G5", "16n", t+0.6)
  high.triggerAttackRelease("B5", "16n", t+0.7)
  high.triggerAttackRelease("C6", "16n", t+0.8)
}, 2).start(0);
*/