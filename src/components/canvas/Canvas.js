import React, { useRef, useEffect, useContext } from 'react'
import { fretboardPoints } from './fretboardPoints'
import { fretsToNotes } from './fretsToNotes'
import { Synth } from 'tone'
import { pitches } from './pitches'
import { fretboardHitpoints } from './fretboardHitpoints'
import { FretboardMasteryCtx } from '../../App'


const LETTER_HEIGHT_CORRECTION = 4


export default function Canvas() {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  const [gameFinished] = useContext(FretboardMasteryCtx)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const fretboard = new Image()
    fretboardRef.current = fretboard
    fretboard.src = './assets/images/fretboard1.png'

    fretboard.onload = () => {
      ctx.drawImage(fretboard, 0, 0)
    }

  }, [])

  const isNote = fret => fretsToNotes[fret]

  const drawBackgroundWithDelay = (ctx, ms) => {
    setTimeout(() => {
      ctx.drawImage(fretboardRef.current, 0, 0)
    }, ms)
  }

  const drawNote = (ctx, x, y, note, bgColor, color) => {
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

  const handleMouseDown = e => {

    // You can play notes only when game is on
    if (gameFinished)
      return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const x = e.clientX - canvasRef.current.getBoundingClientRect().left
    const y = e.clientY - canvasRef.current.getBoundingClientRect().top

    const fret = fretboardHitpoints(x, y)

    if (fret) {
      const synth = new Synth().toMaster()
      synth.triggerAttackRelease(pitches[fret], '4n')
      drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, fretsToNotes[fret], 'yellow', 'red');

      drawBackgroundWithDelay(ctx, 500)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={840}
        height={425}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
