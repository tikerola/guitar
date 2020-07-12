import React, { useRef, useEffect } from 'react'
import { fretboardPoints } from './fretboardPoints'
import { fretsToNotes } from './fretsToNotes'


const LETTER_HEIGHT_CORRECTION = 4


export default function Canvas() {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current

    const ctx = canvas.getContext("2d")

    const fretboard = new Image()
    fretboardRef.current = fretboard
    fretboard.src = './assets/images/fretboard1.png'

    fretboard.onload = () => {
      ctx.drawImage(fretboard, 0, 0)

      for (let note in fretboardPoints) {

        ctx.beginPath();
        ctx.arc(fretboardPoints[note].x, fretboardPoints[note].y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.font = "10px Arial";
        ctx.fillStyle = 'red'
        ctx.textAlign = 'center'
        ctx.fillText(fretsToNotes[note], fretboardPoints[note].x, fretboardPoints[note].y + LETTER_HEIGHT_CORRECTION)
        ctx.stroke();
      }
    }

  }, [])

  return (
    <div>
      <canvas ref={canvasRef} width={840} height={425} />
    </div>
  )
}
