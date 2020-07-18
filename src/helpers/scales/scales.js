
import { drawNote } from '../drawFunctions/drawFunctions'
import { fretboardPoints } from '../fretboardPoints'
import { fretsToNotes } from '../fretsToNotes'

import {
  MAJOR_TRIAD,
  MINOR_TRIAD,
  MINOR_PENTATONIC_SCALE,
  MAJOR_PENTATONIC_SCALE,
  MAJOR_SCALE,
  MINOR_SCALE,
  DORIAN,
  PHRYGIAN,
  LOCRIAN,
  LYDIAN,
  MIXOLYDIAN,
  MAJOR_BLUES,
  MINOR_BLUES,
  NOTES,
  NOTESOBJ,
  SCALE_DEGREES
} from './constants'

let triad = ''


export const getScaleIntervals = scaleName => {
  switch (scaleName) {
    case 'minor pentatonic':
      triad = MINOR_TRIAD
      return MINOR_PENTATONIC_SCALE

    case 'major pentatonic':
      triad = MAJOR_TRIAD
      return MAJOR_PENTATONIC_SCALE

    case 'major scale':
      triad = MAJOR_TRIAD
      return MAJOR_SCALE

    case 'minor scale':
      triad = MINOR_TRIAD
      return MINOR_SCALE

    case 'dorian':
      triad = MINOR_TRIAD
      return DORIAN

    case 'phrygian':
      triad = MINOR_TRIAD
      return PHRYGIAN

    case 'lydian':
      triad = MAJOR_TRIAD
      return LYDIAN

    case 'mixolydian':
      triad = MAJOR_TRIAD
      return MIXOLYDIAN

    case 'locrian':
      triad = MINOR_TRIAD
      return LOCRIAN

    case 'major blues':
      triad = MAJOR_TRIAD
      return MAJOR_BLUES

    case 'minor blues':
      triad = MINOR_TRIAD
      return MINOR_BLUES

    default:
      triad = MINOR_TRIAD
      return MINOR_SCALE
  }
}

export const drawScale = (canvasRef, scale, key, showNotes, highlighted, betweenFrets) => {
  const ctx = canvasRef.current.getContext('2d')

  // For major scale for instance [2, 2, 1, 2, 2, 2, 1]
  const scaleIntervals = getScaleIntervals(scale)

  // Gets the notes of the scale
  const notes = getScaleNotes(key, scaleIntervals)

  // How many halfnotes each note is from the key root
  const halfNotes = getHalfNotes(scaleIntervals, notes)

  // Draw scale
  draw(ctx, key, halfNotes, notes, showNotes, highlighted, betweenFrets)
}



export const getScaleNotes = (key, scaleIntervals) => {
  let currentIndex = NOTESOBJ[key]

  const notes = scaleIntervals.map(interval => {
    currentIndex = currentIndex + interval < 12 ? currentIndex + interval : currentIndex + interval - 12
    return NOTES[currentIndex]
  })

  return notes
}

export const triadFromNotes = notes => {
  return [notes[notes.length - 1], notes[1], notes[3]]
}

export const triadPitchesFromRoot = (root, notes) => {
  let triadArray = [root]
  const note = root.substring(0, 1)
  const rootNumber = root.substring(1)

  const rootIndex = NOTESOBJ[note]

  if (NOTESOBJ[notes[1]] < rootIndex)
    triadArray.push(`${notes[1]}${parseInt(rootNumber) + 1}`)

  else
    triadArray.push(`${notes[1]}${rootNumber}`)

  if (NOTESOBJ[notes[3]] < rootIndex)
    triadArray.push(`${notes[3]}${parseInt(rootNumber) + 1}`)

  else
    triadArray.push(`${notes[3]}${rootNumber}`)


  return triadArray
}

export const seventhChordFromNotes = notes => {
  return [notes[notes.length - 1], notes[1], notes[3], notes[5]]
}

export const getRandomScaleNote = (notes) => {
  return notes[Math.floor(Math.random() * notes.length)]
}

export const getPreviousAndNextPitch = (rootPitch, note) => {
  const rootNote = rootPitch.substring(0, 1)
  const rootPitchNumber = parseInt(rootPitch.substring(1))

  const rootIndex = NOTESOBJ[rootNote]
  const noteIndex = NOTESOBJ[note]

  let pitches = []

  if (noteIndex <= rootIndex) {
    pitches.push(`${note}${rootPitchNumber}`)
    pitches.push(`${note}${rootPitchNumber + 1}`)
  }

  else {
    pitches.push(`${note}${rootPitchNumber - 1}`)
    pitches.push(`${note}${rootPitchNumber}`)
  }

  return pitches
}


export const getHalfNotes = (scaleIntervals, notes) => {
  const halfNotes = {}

  for (let i = 0; i < scaleIntervals.length; i++) {
    if (i === 0)
      halfNotes[notes[i]] = scaleIntervals[i]
    else
      halfNotes[notes[i]] = scaleIntervals[i] + halfNotes[notes[i - 1]]
  }

  return halfNotes
}

const draw = (ctx, key, halfNotes, notes, showNotes, highlighted, betweenFrets = [0, 12]) => {
  for (const fret in fretboardPoints) {

    const fretNum = fret.substring(1)

    if (parseInt(fretNum) < betweenFrets[0] || parseInt(fretNum) > betweenFrets[1])
      continue

    let note = fretsToNotes[fret]

    if (notes.includes(note)) {
      if (note === key) {
        if (showNotes)
          drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note, 'red', 'white')
        else
          drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, 'R', 'red', 'white')
      }

      else if (triad.includes(SCALE_DEGREES[halfNotes[note] - 1]))
        if (showNotes)
          if (highlighted)
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note, 'blue', 'white')
          else
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note)

        else {
          if (highlighted)
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, SCALE_DEGREES[halfNotes[note] - 1], 'blue', 'white')
          else
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, SCALE_DEGREES[halfNotes[note] - 1])
        }

      else
        if (showNotes)
          if (highlighted)
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note, 'white', 'black')

          else
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note)

        else
          if (highlighted)
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, SCALE_DEGREES[halfNotes[note] - 1], 'white', 'black')
          else
            drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, SCALE_DEGREES[halfNotes[note] - 1])
    }
  }
}

