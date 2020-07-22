import React, { createContext, useEffect, useReducer, useRef } from 'react'
import Canvas from '../components/earTraining/Canvas'
import InfoBar from '../components/earTraining/InfoBar'
import ScaleDegrees from '../components/earTraining/ScaleDegrees'
import { drawScale } from '../helpers/drawFunctions/drawFunctions'
import { FRETS_TO_PITCHES } from '../helpers/pitches'
import { getScaleIntervals, getScaleNotes, triadPitchesFromRoot } from '../helpers/scales/scales'
import { playChord, playNote } from '../helpers/tone/playFunctions'
import { fretsToNotes } from '../helpers/fretsToNotes'

const initialState = {
  scale: 'major scale',
  frets: ['E5', 'A5', 'D5', 'G5', 'B5'],
  key: '',
  scaleNotes: [],
  note: '',
  fretsDrawn: [],
  pushedFret: '',
  randomFret: '',
  points: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_KEY':
      return {
        ...state,
        key: action.payload
      }
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

    case 'SET_FRETS_DRAWN':
      return {
        ...state,
        fretsDrawn: action.payload
      }

    case 'SET_PUSHED_FRET':
      return {
        ...state,
        pushedFret: action.payload
      }

    case 'ADD_POINT':
      return {
        ...state,
        poinst: state.points + 1
      }

    case 'SET_RANDOM_FRET':
      return {
        ...state,
        randomFret: action.payload
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
        const rootFret = state.frets[2]
        dispatch({ type: 'SET_KEY', payload: fretsToNotes[rootFret] })
        const rootPitch = FRETS_TO_PITCHES[rootFret]
        const rootNote = rootPitch.substring(0, 1)

        const intervals = getScaleIntervals(state.scale)
        const notes = getScaleNotes(rootNote, intervals)
        dispatch({ type: 'SET_SCALE_NOTES', payload: notes })
        const triadPitches = triadPitchesFromRoot(rootPitch, notes)

        playChord(triadPitches, '4n')
        const fretsDrawn = drawScale(canvasRef, state.scale, rootNote, false, false, true, [3, 8])
        const randomFret = getRandomFret(fretsDrawn)
        dispatch({ type: 'SET_RANDOM_FRET', payload: randomFret })

        dispatch({ type: 'SET_FRETS_DRAWN', payload: fretsDrawn })


        setTimeout(() => {
          playNote(FRETS_TO_PITCHES[randomFret], '4n')

        }, 1300)
      }
    }

    document.addEventListener('keyup', handleKeyup)

    return () => {
      document.removeEventListener('keyup', handleKeyup)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRandomFret = frets => {
    return frets[Math.floor(Math.random() * frets.length - 1)]
  }

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
