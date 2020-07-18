import * as Tone from 'tone'
import { getRandomScaleNote, getPreviousAndNextPitch } from '../scales/scales';

export const playNote = (note, length) => {
  const synth = new Tone.Synth().toMaster();

  synth.triggerAttackRelease(note, length);
}

export const playChord = (notes, length) => {
  const polySynth = new Tone.PolySynth().toMaster()

  polySynth.triggerAttackRelease(notes, length)
}


export const playRandomNote = (scaleNotes, rootPitch, length) => {
  const note = getRandomScaleNote(scaleNotes)

  const [lower, higher] = getPreviousAndNextPitch(rootPitch, note)

  if (Math.random() < 0.5) {
    playNote(lower, length)
    return lower
  }

  else {
    playNote(higher, length)
    return higher
  }


}