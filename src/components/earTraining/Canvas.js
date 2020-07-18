import React, { useEffect, useRef } from 'react'
import { playNote } from '../../helpers/tone/playFunctions'
import { drawBackgroundWithDelay, drawNote, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { inWhichFret, onMouseDownCoordinates } from '../../helpers/fretboardHitpoints'
import { fretboardPoints } from '../../helpers/fretboardPoints'
import { fretsToNotes } from '../../helpers/fretsToNotes'
import { pitches } from '../../helpers/pitches'
import Tone from 'tone'


export default function Canvas() {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef)
    setTimeout(() => {
      const synth = new Tone.PolySynth().toMaster()

      synth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], '4n')
    }, 1000)
  }, [])

  // const isNote = fret => fretsToNotes[fret]

  const handleMouseDown = e => {

    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = onMouseDownCoordinates(e, canvasRef)
    const fret = inWhichFret(x, y)

    if (fret) {
      playNote([pitches[fret]], '4n')
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