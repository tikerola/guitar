import React, { useRef, useEffect, useState } from 'react'
import {
  fretboardPoints,
  E_FRET_HEIGHT,
  A_FRET_HEIGHT,
  D_FRET_HEIGHT,
  G_FRET_HEIGHT,
  B_FRET_HEIGHT,
  e_FRET_HEIGHT
} from '../../helpers/fretboardPoints'

import { fretsToNotes } from '../../helpers/fretsToNotes'
import * as Tone from 'tone'
import { pitches } from '../../helpers/pitches'
import { fretboardHitpoints } from '../../helpers/fretboardHitpoints'


const STRINGS = [
  E_FRET_HEIGHT,
  A_FRET_HEIGHT,
  D_FRET_HEIGHT,
  G_FRET_HEIGHT,
  B_FRET_HEIGHT,
  e_FRET_HEIGHT
]

const LETTER_HEIGHT_CORRECTION = 4
const STRING_X_STARTING_COORDINATE = 53
const STRING_X_ENDING_COORDINATE = 840


export default function Canvas() {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  //const [state, dispatch] = useContext(FretboardMasteryCtx)

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


  // const isNote = fret => fretsToNotes[fret]

  const drawBackgroundWithDelay = (ctx, ms) => {
    setTimeout(() => {
      ctx.drawImage(fretboardRef.current, 0, 0)
      drawActiveString()
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


    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const x = e.clientX - canvasRef.current.getBoundingClientRect().left
    const y = e.clientY - canvasRef.current.getBoundingClientRect().top

    const fret = fretboardHitpoints(x, y)

    if (fret) {
      const synth = new Tone.Synth();

      // Connect to the speakers.
      synth.toMaster();

      synth.triggerAttackRelease(pitches[fret], '4n')
      drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, fretsToNotes[fret], 'black', 'white');


      drawBackgroundWithDelay(ctx, 500)
    }
  }

  const drawActiveString = () => {
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

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={840}
        height={225}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
