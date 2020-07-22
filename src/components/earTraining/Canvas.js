import React, { useEffect, useRef, useContext } from 'react'
import { drawBackgroundWithDelay, drawNote, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { inWhichFret, onMouseDownCoordinates } from '../../helpers/fretboardHitpoints'
import { fretsToNotes } from '../../helpers/fretsToNotes'
import { FRETS_TO_PITCHES } from '../../helpers/pitches'
import { playNote, playSequenceOfNotes } from '../../helpers/tone/playFunctions'
import { EarTrainingCtx } from '../../pages/EarTraining'
import { scaleDegreeFromANote } from '../../helpers/scales/scales'
import * as Tone from 'tone'


export default function Canvas({ setRef }) {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  const [state, dispatch] = useContext(EarTrainingCtx)

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef)
    setRef(canvasRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const isNote = fret => fretsToNotes[fret]

  const handleMouseDown = e => {

    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = onMouseDownCoordinates(e, canvasRef)
    const fret = inWhichFret(x, y)
    dispatch({ type: 'SET_PUSHED_FRET', payload: fret })


    if (fret) {

      playNote(FRETS_TO_PITCHES[fret], '4n')
      drawNote(ctx, fret, fretsToNotes[fret]);

      if (answerIsAMatch(fret, state.randomFret)) {
        dispatch({ type: 'ADD_POINT' })
        const scaleDegree = scaleDegreeFromANote(state.key, fretsToNotes[fret])
        const frets = fretsToNearestRoot(scaleDegree, fret, state.fretsDrawn)

        setTimeout(() => {
          playSequenceOfNotes(frets, 1)
        }, 500)
      }


      //drawBackgroundWithDelay(ctx, fretboardRef, 500)
    }
  }

  const fretsToNearestRoot = (degree, fret, fretsDrawn) => {
    const degreeNumber = degree.length === 1 ? parseInt(degree) : parseInt(degree.substring(1))

    const frets = []
    const index = fretsDrawn.findIndex(f => f === fret)

    if (degreeNumber <= 4) {
      // Let's go to the root 4, 3, 2, 1

      for (let i = 0; i < degreeNumber; i++) {
        frets.push(fretsDrawn[index - i])
      }
    }

    else {
      // 5, 6, 7, 1

      for (let i = 0; i <= 8 - degreeNumber; i++) {
        frets.push(fretsDrawn[index + i])
      }

    }

    return frets
  }

  const answerIsAMatch = (pushedFret, randomFret) => {
    return pushedFret === randomFret
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
