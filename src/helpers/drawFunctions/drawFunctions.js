
import { STRINGS, STRING_X_STARTING_COORDINATE, STRING_X_ENDING_COORDINATE, LETTER_HEIGHT_CORRECTION } from '../constants'

export const drawBackgroundWithDelay = (ctx, imageRef, ms) => {
  setTimeout(() => {
    ctx.drawImage(imageRef.current, 0, 0)
  }, ms)
}

export const drawNote = (ctx, x, y, note, bgColor = 'black', color = 'white') => {
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

export const initializeFretboard = (canvasRef, fretboardRef) => {
  const ctx = canvasRef.current.getContext("2d")

  const fretboard = new Image()
  fretboardRef.current = fretboard
  fretboard.src = './assets/images/fretboard1.png'

  fretboard.onload = () => {
    ctx.drawImage(fretboard, 0, 0)
  }
}
