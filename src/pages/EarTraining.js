import React, { createContext, useEffect, useReducer, useRef } from 'react'
import Canvas from '../components/earTraining/Canvas'
import InfoBar from '../components/earTraining/InfoBar'
import ScaleDegrees from '../components/earTraining/ScaleDegrees'
import { drawScale } from '../helpers/drawFunctions/drawFunctions'
import { FRETS_TO_PITCHES } from '../helpers/pitches'
import { getScaleIntervals, getScaleNotes, triadPitchesFromRoot } from '../helpers/scales/scales'
import { playChord, playRandomNote } from '../helpers/tone/playFunctions'

const initialState = {
  scale: 'major',
  frets: ['E5', 'A5', 'D5', 'G5', 'B5'],
  scaleNotes: [],
  note: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCALE_NOTES':
      return {
        ...state,
        scaleNotes: action.payload
      }

    case 'SET_NOTE':
      return {
        ...state,
        note: action.payload
      }
    default:
      return state
  }
}

export const EarTrainingCtx = createContext()

export default function IntervalMastery() {

  const canvasRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)

  const setRef = ref => {
    canvasRef.current = ref
  }

  useEffect(() => {
    const handleKeyup = e => {
      if (e.keyCode === 32) {
        const fret = state.frets[2]
        const rootPitch = FRETS_TO_PITCHES[fret]
        const rootNote = rootPitch.substring(0, 1)

        const intervals = getScaleIntervals(state.scale)
        const notes = getScaleNotes(rootNote, intervals)
        dispatch({ type: 'SET_SCALE_NOTES', payload: notes })
        const triadPitches = triadPitchesFromRoot(rootPitch, notes)

        playChord(triadPitches, '4n')
        drawScale(canvasRef, state.scale, rootNote, false, false, true, [5, 8])

        setTimeout(() => {
          const randomNote = playRandomNote(notes, rootPitch, '4n')
          console.log(randomNote)
          dispatch({ type: 'SET_NOTE', payload: randomNote })
        }, 1300)
      }
    }

    document.addEventListener('keyup', handleKeyup)

    return () => {
      document.removeEventListener('keyup', handleKeyup)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <EarTrainingCtx.Provider value={[state, dispatch]}>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <Canvas setRef={setRef} />
            <ScaleDegrees canvasRef={canvasRef} />
          </div>
          <InfoBar />
        </div>
      </EarTrainingCtx.Provider>
    </div>
  )
}
