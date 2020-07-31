import * as Tone from 'tone'
import { getRandomScaleNote, getPreviousAndNextPitch } from '../scales/scales';
import { FRETS_TO_PITCHES } from '../pitches';

const synth = new Tone.PluckSynth({
  attackNoise: 1,
  release: 5,
  dampening: 100,
  resonance: 0.99
}).toDestination()

const polySynth = new Tone.PolySynth().toDestination()

export const playNote = (note, length) => {

  //const vibrato = new Tone.Vibrato({ depth: 0.1 }).toDestination()

  synth.triggerAttackRelease(note, length);
}

export const playChord = (notes, length) => {

  polySynth.triggerAttackRelease(notes, length)
}

export const playSequenceOfNotes = (frets, timeBetweenNotes) => {

  //schedule a series of notes, one per second
  const time = Tone.context.currentTime.toFixed(1)

  let index = 1
  for (const fret of frets) {
    synth.triggerAttackRelease(FRETS_TO_PITCHES[fret], '4n', parseFloat(time) + index * timeBetweenNotes)
    index++
  }
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