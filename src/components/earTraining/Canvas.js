import React, { useContext, useEffect, useRef } from 'react'
import { drawNote, drawSequenceOfFrets, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { inWhichFret, onMouseDownCoordinates } from '../../helpers/fretboardHitpoints'
import { fretsToNotes } from '../../helpers/fretsToNotes'
import { FRETS_TO_PITCHES } from '../../helpers/pitches'
import { scaleDegreeFromANote } from '../../helpers/scales/scales'
import { playNote, playSequenceOfNotes } from '../../helpers/tone/playFunctions'
import { EarTrainingCtx } from '../../pages/EarTraining'
import { fretsToNearestRoot } from '../../helpers/fretsToNearestRoot'


export default function Canvas({ setRef }) {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  const [state, dispatch] = useContext(EarTrainingCtx)

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef)
    setRef(canvasRef.current, fretboardRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const isNote = fret => fretsToNotes[fret]

  const handleMouseDown = e => {

    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = onMouseDownCoordinates(e, canvasRef)
    const fret = inWhichFret(x, y)
    dispatch({ type: 'SET_PUSHED_FRET', payload: fret })


    if (fret) {

      const match = answerIsAMatch(fret, state.randomFret)

      if (!match)
        playNote(FRETS_TO_PITCHES[fret], '4n')

      else {
        dispatch({ type: 'ADD_POINT' })
        const scaleDegree = scaleDegreeFromANote(state.key, fretsToNotes[fret])

        if (scaleDegree === '0')
          playNote(FRETS_TO_PITCHES[fret], '4n')

        drawNote(ctx, fret, scaleDegree !== '0' ? scaleDegree : '1', 'blue', 'white');
        const frets = fretsToNearestRoot(state.key, scaleDegree, fret, state.fretsDrawn)

        setTimeout(() => {
          playSequenceOfNotes(frets, 0.5)
          drawSequenceOfFrets(ctx, state.key, frets, 500)
        }, 0)
      }

    }
  }


  const answerIsAMatch = (pushedFret, randomFret) => {
    return FRETS_TO_PITCHES[pushedFret] === FRETS_TO_PITCHES[randomFret]
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


