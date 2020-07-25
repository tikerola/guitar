import React, { useContext, useEffect, useRef } from 'react'
import { drawScale, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { ScalesContext } from '../../pages/ScalesMastery'



export default function Canvas() {


  const [state] = useContext(ScalesContext)

  const canvasRef = useRef()
  const fretboardRef = useRef()

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef, () => drawScale(canvasRef, state.scale, state.key, state.showNotes, state.highlighted, false, state.betweenFrets, state.betweenStrings))
  }, [state.key, state.scale, state.showNotes, state.highlighted, state.betweenFrets, state.betweenStrings])

  // const isNote = fret => fretsToNotes[fret]

  // const handleMouseDown = e => {

  //   const ctx = canvasRef.current.getContext('2d')
  //   const [x, y] = onMouseDownCoordinates(e, canvasRef)
  //   const fret = inWhichFret(x, y)

  //   if (fret) {
  //     playNote(FRETS_TO_PITCHES[fret], '4n')
  //     drawNote(ctx, fretboardPoints[fret].x, fretboardPoints[fret].y, fretsToNotes[fret]);
  //     drawBackgroundWithDelay(ctx, fretboardRef, 500)
  //   }
  // }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={840}
        height={225}
      // onMouseDown={handleMouseDown}
      />
    </div>
  )
}
