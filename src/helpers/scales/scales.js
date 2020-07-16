
import { fretboardPoints } from '../fretboardPoints'
import { fretsToNotes } from '../fretsToNotes'
import { drawNote } from '../drawFunctions/drawFunctions'

export const NOTES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

const MAJOR_SCALE = [2, 2, 1, 2, 2, 2, 1]
const MINOR_SCALE = [2, 1, 2, 2, 1, 2, 2]
const MAJOR_PENTATONIC_SCALE = [2, 2, 3, 2, 3]
const MINOR_PENTATONIC_SCALE = [3, 2, 2, 3, 2]
const DORIAN = [2, 1, 2, 2, 2, 1, 2]
const PHRYGIAN = [1, 2, 2, 2, 1, 2, 2]
const LYDIAN = [2, 2, 2, 1, 2, 2, 1]
const MIXOLYDIAN = [2, 2, 1, 2, 2, 1, 2]
const LOCRIAN = [1, 2, 2, 1, 2, 2, 2]
const MAJOR_BLUES = [2, 1, 1, 3, 2, 3]
const MINOR_BLUES = [3, 2, 1, 1, 3, 2]

const SCALE_DEGREES = ['b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', 'R']

const returnScale = scaleName => {
  switch (scaleName) {
    case 'minor pentatonic':
      return MINOR_PENTATONIC_SCALE

    case 'major pentatonic':
      return MAJOR_PENTATONIC_SCALE

    case 'major scale':
      return MAJOR_SCALE

    case 'minor scale':
      return MINOR_SCALE

    case 'dorian':
      return DORIAN

    case 'phrygian':
      return PHRYGIAN

    case 'lydian':
      return LYDIAN

    case 'mixolydian':
      return MIXOLYDIAN

    case 'locrian':
      return LOCRIAN

    case 'major blues':
      return MAJOR_BLUES

    case 'minor blues':
      return MINOR_BLUES

    default:
      return MINOR_SCALE
  }
}

export const drawScale = (canvasRef, scale, key, showNotes) => {
  const ctx = canvasRef.current.getContext('2d')

  let currentIndex = NOTES.findIndex(note => note === key)

  const scaleIntervals = returnScale(scale)

  const notes = scaleIntervals.map(interval => {
    currentIndex = currentIndex + interval < 12 ? currentIndex + interval : currentIndex + interval - 12
    return NOTES[currentIndex]
  })


  let halfNotes = {}

  if (!showNotes) {
    for (let i = 0; i < scaleIntervals.length; i++) {
      if (i === 0)
        halfNotes[notes[i]] = scaleIntervals[i]
      else
        halfNotes[notes[i]] = scaleIntervals[i] + halfNotes[notes[i - 1]]
    }
  }


  for (const fret in fretboardPoints) {
    let note = fretsToNotes[fret]

    if (notes.includes(note)) {
      if (note === key) {
        if (showNotes)
          drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note, 'red', 'white')
        else
          drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, 'R', 'red', 'white')
      }

      else
        if (showNotes)
          drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note)

        else
          drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, SCALE_DEGREES[halfNotes[note] - 1])
    }
  }
}