import React, { createContext, useEffect, useReducer, useRef, useState } from 'react'
import Canvas from '../components/earTraining/Canvas'
import InfoBar from '../components/earTraining/InfoBar'
import ScaleDegrees from '../components/earTraining/ScaleDegrees'
import { drawScale } from '../helpers/drawFunctions/drawFunctions'
import { fretsToNotes } from '../helpers/fretsToNotes'
import { FRETS_TO_PITCHES } from '../helpers/pitches'
import { getScaleIntervals, getScaleNotes, triadPitchesFromRoot } from '../helpers/scales/scales'
import { playChord, playNote } from '../helpers/tone/playFunctions'
import { Slider } from "shards-react";
import Judgement from '../components/earTraining/Judgement'

import { reducer, initialState } from '../components/earTraining/state/reducer'

export const EarTrainingCtx = createContext()

export default function IntervalMastery() {

  const canvasRef = useRef()
  const fretboardRef = useRef()
  const stateRef = useRef()
  const trackFirstRenderRef = useRef(true)
  const [state, dispatch] = useReducer(reducer, initialState)

  const [quessMade, setQuessMade] = useState(false)
  const [disableRestart, setDisableRestart] = useState(false)

  const restartRef = useRef(false)

  const setRef = (cRef, fRef) => {
    canvasRef.current = cRef
    fretboardRef.current = fRef
  }

  useEffect(() => {
    stateRef.current = state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.scale, state.betweenFrets])

  useEffect(() => {

    if (!trackFirstRenderRef.current) {
      setQuessMade(true)

      setTimeout(() => {
        setQuessMade(false)
      }, 1000)
    }

    else
      trackFirstRenderRef.current = false

  }, [state.pushedFret])

  useEffect(() => {
    restartRef.current = disableRestart
  }, [disableRestart])

  useEffect(() => {
    const handleKeyup = e => {
      if (e.keyCode === 32 && !restartRef.current) {

        dispatch({ type: 'SET_DISABLE_RESTART', payload: true })
        setDisableRestart(true)
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
          dispatch({ type: 'SET_DISABLE_RESTART', payload: false })
          setDisableRestart(false)
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
              {
                quessMade &&
                <Judgement
                  className="w-50 m-auto rounded text-center bg-dark p-1 text-warning"
                  answerWasCorrect={state.randomFret === state.pushedFret}
                />
              }
            </div>
          </div>
          <InfoBar />
        </div>
      </EarTrainingCtx.Provider>
    </div>
  )
}
