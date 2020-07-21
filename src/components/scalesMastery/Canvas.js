import React, { useEffect, useRef, useContext } from 'react'
import { playNote } from '../../helpers/tone/playFunctions'
import { drawBackgroundWithDelay, drawNote, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { inWhichFret, onMouseDownCoordinates } from '../../helpers/fretboardHitpoints'
import { fretboardPoints } from '../../helpers/fretboardPoints'
import { fretsToNotes } from '../../helpers/fretsToNotes'
import { FRETS_TO_PITCHES } from '../../helpers/pitches'
import { drawScale } from '../../helpers/drawFunctions/drawFunctions'
import { ScalesContext } from '../../pages/ScalesMastery'



export default function Canvas() {


  const [state] = useContext(ScalesContext)

  const canvasRef = useRef()
  const fretboardRef = useRef()

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef, () => drawScale(canvasRef, state.scale, state.key, state.showNotes, state.highlighted, false, state.betweenFrets, state.betweenStrings))
  }, [state.key, state.scale, state.showNotes, state.highlighted, state.betweenFrets, state.betweenStrings])

  // const isNote = fret => fretsToNotes[fret]

  const handleMouseDown = e => {

    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = onMouseDownCoordinates(e, canvasRef)
    const fret = inWhichFret(x, y)

    if (fret) {
      playNote(FRETS_TO_PITCHES[fret], '4n')
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
      // onMouseDown={handleMouseDown}
      />
    </div>
  )
}
