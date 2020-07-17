import * as Tone from 'tone'

export const playNote = (note, length) => {
  const synth = new Tone.Synth().toMaster();

  synth.triggerAttackRelease(note, length);
}

export const playChord = (notes, length) => {
  const polySynth = new Tone.PolySynth().toMaster()

  polySynth.triggerAttackRelease(notes, length)
}