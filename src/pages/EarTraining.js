import React, { createContext, useEffect, useReducer, useRef } from 'react'
import Canvas from '../components/earTraining/Canvas'
import InfoBar from '../components/earTraining/InfoBar'
import ScaleDegrees from '../components/earTraining/ScaleDegrees'
import { drawScale } from '../helpers/drawFunctions/drawFunctions'
import { fretsToNotes } from '../helpers/fretsToNotes'
import { FRETS_TO_PITCHES } from '../helpers/pitches'
import { getScaleIntervals, getScaleNotes, triadPitchesFromRoot } from '../helpers/scales/scales'
import { playChord, playNote } from '../helpers/tone/playFunctions'
import { Slider } from "shards-react";

const initialState = {
  scale: 'major scale',
  frets: ['E5', 'A5', 'D5', 'G5', 'B5'],
  key: '',
  scaleNotes: [],
  note: '',
  fretsDrawn: [],
  pushedFret: '',
  randomFret: '',
  points: 0,
  betweenFrets: [4, 8]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCALE':
      return {
        ...state,
        scale: action.payload
      }
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
        points: state.points + 1
      }

    case 'SET_RANDOM_FRET':
      return {
        ...state,
        randomFret: action.payload
      }
    case 'SET_BETWEEN_FRETS':
      return {
        ...state,
        betweenFrets: action.payload
      }
    default:
      return state
  }
}

export const EarTrainingCtx = createContext()

export default function IntervalMastery() {

  const canvasRef = useRef()
  const fretboardRef = useRef()
  const stateRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)

  const setRef = (cRef, fRef) => {
    canvasRef.current = cRef
    fretboardRef.current = fRef
  }

  useEffect(() => {
    stateRef.current = state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.scale, state.betweenFrets])


  useEffect(() => {
    const handleKeyup = e => {
      if (e.keyCode === 32) {

        const rootFret = state.frets[Math.floor(Math.random() * state.frets.length)]
        dispatch({ type: 'SET_KEY', payload: fretsToNotes[rootFret] })
        const rootPitch = FRETS_TO_PITCHES[rootFret]
        const rootNote = rootPitch.substring(0, 1)

        const intervals = getScaleIntervals(stateRef.current.scale)
        const notes = getScaleNotes(rootNote, intervals)
        dispatch({ type: 'SET_SCALE_NOTES', payload: notes })

        if (stateRef.current.scale !== 'chromatic scale') {
          const triadPitches = triadPitchesFromRoot(rootPitch, notes)

          playChord(triadPitches, '4n')
        }

        else {
          playNote(rootPitch, '4n')
        }

        canvasRef.current.getContext('2d').drawImage(fretboardRef.current, 0, 0)
        const fretsDrawn = drawScale(canvasRef, stateRef.current.scale, rootNote, false, false, true, stateRef.current.betweenFrets)
        const randomFret = getRandomFret(fretsDrawn)
        const randomNote = fretsToNotes[randomFret]
        dispatch({ type: 'SET_RANDOM_FRET', payload: randomFret })
        dispatch({ type: 'SET_NOTE', payload: randomNote })


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

  const handleFretSlide = e => {
    const start = parseInt(e[0])
    const end = parseInt(e[1])

    dispatch({ type: 'SET_BETWEEN_FRETS', payload: [start, end] })
  }

  return (
    <div>
      <EarTrainingCtx.Provider value={[state, dispatch]}>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <div className="d-flex flex-column pb-5">
              <Canvas setRef={setRef} />
              <Slider
                className="mt-0 ml-4 mr-5 mb-4"
                pips={{
                  mode: 'values',
                  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  density: 12,
                  stepped: true
                }}
                connect
                onSlide={handleFretSlide}
                start={state.betweenFrets}
                range={{ min: 0, max: 12 }}
              />
            </div>
            <ScaleDegrees canvasRef={canvasRef} fretboardRef={fretboardRef} />
          </div>
          <InfoBar />
        </div>
      </EarTrainingCtx.Provider>
    </div>
  )
}
