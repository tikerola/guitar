
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

    default:
      return MINOR_SCALE
  }
}

export const drawScale = (canvasRef, scale, key) => {
  const ctx = canvasRef.current.getContext('2d')

  let currentIndex = NOTES.findIndex(note => note === key)

  const scaleIntervals = returnScale(scale)

  const notes = scaleIntervals.map(interval => {
    currentIndex = currentIndex + interval < 12 ? currentIndex + interval : currentIndex + interval - 12
    return NOTES[currentIndex]
  })

  for (const fret in fretboardPoints) {
    let note = fretsToNotes[fret]
    if (notes.includes(note)) {
      if (note === key)
        drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note, 'red', 'white')

      else
        drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, note)
    }
  }
}