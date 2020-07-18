
import { STRINGS, STRING_X_STARTING_COORDINATE, STRING_X_ENDING_COORDINATE, LETTER_HEIGHT_CORRECTION } from '../constants'
import { getScaleIntervals, getScaleNotes, getHalfNotes } from '../scales/scales'
import { SCALE_DEGREES } from '../scales/constants'
import { fretsToNotes } from '../fretsToNotes'
import { fretboardPoints } from '../fretboardPoints'
import { triad } from '../scales/scales'

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


const draw = (ctx, key, halfNotes, notes, showNotes, highlighted, betweenFrets = [0, 12]) => {
  for (const fret in fretboardPoints) {

    const fretNum = fret.substring(1)

    if (parseInt(fretNum) < betweenFrets[0] || parseInt(fretNum) > betweenFrets[1])
      continue

    let note = fretsToNotes[fret]

    if (notes.includes(note)) {
      if (note === key) {
        if (showNotes)
          drawNote(ctx, fret, note, 'red', 'white')
        else
          drawNote(ctx, fret, 'R', 'red', 'white')
      }

      else if (triad.includes(SCALE_DEGREES[halfNotes[note] - 1]))
        if (showNotes)
          if (highlighted)
            drawNote(ctx, fret, note, 'blue', 'white')
          else
            drawNote(ctx, fret, note)

        else {
          if (highlighted)
            drawNote(ctx, fret, SCALE_DEGREES[halfNotes[note] - 1], 'blue', 'white')
          else
            drawNote(ctx, fret, SCALE_DEGREES[halfNotes[note] - 1])
        }

      else
        if (showNotes)
          if (highlighted)
            drawNote(ctx, fret, note, 'white', 'black')

          else
            drawNote(ctx, fret, note)

        else
          if (highlighted)
            drawNote(ctx, fret, SCALE_DEGREES[halfNotes[note] - 1], 'white', 'black')
          else
            drawNote(ctx, fret, SCALE_DEGREES[halfNotes[note] - 1])
    }
  }
}
