import React, { useEffect, useRef, useReducer } from 'react'
import { playNote } from '../../helpers/tone/playFunctions'
import { drawBackgroundWithDelay, drawNote, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { inWhichFret, onMouseDownCoordinates } from '../../helpers/fretboardHitpoints'
import { fretboardPoints } from '../../helpers/fretboardPoints'
import { fretsToNotes } from '../../helpers/fretsToNotes'
import { pitches } from '../../helpers/pitches'

const initialState = {
  scale: 'minor_pentatonic',
  key: 'A'
}

const reducer = (state, action) => {
  switch (action.type) {

    default:
      return state
  }
}


export default function Canvas() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const canvasRef = useRef()
  const fretboardRef = useRef()

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef)
  }, [])

  // const isNote = fret => fretsToNotes[fret]

  const handleMouseDown = e => {

    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = onMouseDownCoordinates(e, canvasRef)
    const fret = inWhichFret(x, y)

    if (fret) {
      playNote(pitches[fret], '4n')
      drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, fretsToNotes[fret]);
      drawBackgroundWithDelay(ctx, fretboardRef, 500)
    }
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