
import { STRINGS, STRING_X_STARTING_COORDINATE, STRING_X_ENDING_COORDINATE, LETTER_HEIGHT_CORRECTION } from '../constants'
import { getScaleIntervals, getScaleNotes, getHalfNotes } from '../scales/scales'
import { SCALE_DEGREES } from '../scales/constants'
import { fretsToNotes } from '../fretsToNotes'
import { fretboardPoints } from '../fretboardPoints'
import { triad } from '../scales/scales'

const stringToANumber = { 'e': 1, 'B': 2, 'G': 3, 'D': 4, 'A': 5, 'E': 6 }

export const drawBackgroundWithDelay = (ctx, imageRef, ms) => {
  setTimeout(() => {
    ctx.drawImage(imageRef.current, 0, 0)
  }, ms)
}

export const drawNote = (ctx, fret, note, bgColor = 'black', color = 'white') => {
  const x = fretboardPoints[fret].x
  const y = fretboardPoints[fret].y

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = bgColor
  ctx.fill()
  ctx.font = "10px Arial";
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.fillText(note, x, y + LETTER_HEIGHT_CORRECTION)
  ctx.stroke();
}

export const drawActiveString = (canvasRef) => {
  const stringIndex = Math.floor(Math.random() * STRINGS.length)
  const string = STRINGS[stringIndex]

  const ctx = canvasRef.current.getContext('2d')

  ctx.beginPath();
  ctx.moveTo(STRING_X_STARTING_COORDINATE, string)
  ctx.fillStyle = 'red'
  ctx.lineWidth = 5

  ctx.lineTo(STRING_X_ENDING_COORDINATE, string)
  ctx.stroke();
}

export const initializeFretboard = (canvasRef, fretboardRef, cb) => {

  const ctx = canvasRef.current.getContext("2d")

  const fretboard = new Image()
  fretboardRef.current = fretboard
  fretboard.src = './assets/images/fretboard1.png'

  fretboard.onload = () => {
    ctx.drawImage(fretboard, 0, 0)
    if (cb)
      cb()
  }
}

export const drawScale = (canvasRef, scale, key, showNotes, highlighted, blank, betweenFrets, betweenStrings) => {
  const ctx = canvasRef.current.getContext('2d')

  // For major scale for instance [2, 2, 1, 2, 2, 2, 1]
  const scaleIntervals = getScaleIntervals(scale)

  // Gets the notes of the scale
  const notes = getScaleNotes(key, scaleIntervals)

  // How many halfnotes each note is from the key root
  const halfNotes = getHalfNotes(scaleIntervals, notes)

  // Draw scale
  draw(ctx, key, halfNotes, notes, showNotes, highlighted, blank, betweenFrets, betweenStrings)
}


const isBetweenFrets = (fret, betweenFrets) => {
  const fretNum = fret.substring(1)

  if (parseInt(fretNum) < betweenFrets[0] || parseInt(fretNum) > betweenFrets[1])
    return false

  return true
}

const isBetweenStrings = (fret, betweenStrings) => {
  const string = fret.substring(0, 1)

  if (stringToANumber[string] < betweenStrings[0] || stringToANumber[string] > betweenStrings[1])
    return false

  return true
}


const draw = (ctx, key, halfNotes, notes, showNotes, highlighted, blank, betweenFrets = [0, 12], betweenStrings = [1, 6]) => {
  for (const fret in fretboardPoints) {

    // Don't bother drawing if outside of fret boundaries
    if (!isBetweenFrets(fret, betweenFrets))
      continue

    if (!isBetweenStrings(fret, betweenStrings))
      continue

    const note = fretsToNotes[fret]
    const scaleDegree = SCALE_DEGREES[halfNotes[note] - 1]

    // from all fretboard notes, is this in scale
    if (notes.includes(note)) {

      // root note?
      if (note === key) {
        if (showNotes)
          drawNote(ctx, fret, note, 'red', 'white')
        else
          drawNote(ctx, fret, 'R', 'red', 'white')
      }

      else if (blank) {
        drawNote(ctx, fret, '', 'white', 'black')
      }

      // not root, but 3rd or 5th
      else if (triad.includes(scaleDegree))
        if (showNotes)
          if (highlighted)
            drawNote(ctx, fret, note, 'blue', 'white')
          else
            drawNote(ctx, fret, note)

        else {
          if (highlighted)
            drawNote(ctx, fret, scaleDegree, 'blue', 'white')
          else
            drawNote(ctx, fret, scaleDegree)
        }

      // scale notes other than 1, 3 or 5
      else
        if (showNotes)
          if (highlighted)
            drawNote(ctx, fret, note, 'white', 'black')

          else
            drawNote(ctx, fret, note)

        else
          if (highlighted)
            drawNote(ctx, fret, scaleDegree, 'white', 'black')
          else
            drawNote(ctx, fret, scaleDegree)
    }
  }
}
