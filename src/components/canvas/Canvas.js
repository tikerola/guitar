import React, { useRef, useEffect, useContext, useState } from 'react'
import {
  fretboardPoints,
  E_FRET_HEIGHT,
  A_FRET_HEIGHT,
  D_FRET_HEIGHT,
  G_FRET_HEIGHT,
  B_FRET_HEIGHT,
  e_FRET_HEIGHT
} from './fretboardPoints'

import { fretsToNotes } from './fretsToNotes'
import { Synth } from 'tone'
import { pitches } from './pitches'
import { fretboardHitpoints } from './fretboardHitpoints'
import { FretboardMasteryCtx } from '../../App'

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

  const [activeString, setActiveString] = useState()

  const canvasRef = useRef()
  const fretboardRef = useRef()

  const [state, dispatch] = useContext(FretboardMasteryCtx)

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

  useEffect(() => {
    if (!state.gameFinished) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.drawImage(fretboardRef.current, 0, 0)
      drawActiveString()
    }
  }, [state.gameFinished])

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

    // You can play notes only when game is on
    if (state.gameFinished)
      return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const x = e.clientX - canvasRef.current.getBoundingClientRect().left
    const y = e.clientY - canvasRef.current.getBoundingClientRect().top

    const fret = fretboardHitpoints(x, y, activeString)

    if (fret) {
      const synth = new Synth().toMaster()
      synth.triggerAttackRelease(pitches[fret], '4n')
      drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, fretsToNotes[fret], 'black', 'white');

      if (fretsToNotes[fret] === state.noteToQuess)
        dispatch({ type: 'ADD_POINT' })

      dispatch({ type: 'NEW_NOTE' })

      drawBackgroundWithDelay(ctx, 500)
    }
  }

  const drawActiveString = () => {
    const stringIndex = Math.floor(Math.random() * STRINGS.length)
    const string = STRINGS[stringIndex]
    setActiveString(string)
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
