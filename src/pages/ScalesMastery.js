import React, { useReducer, createContext } from 'react'
import Canvas from '../components/scalesMastery/Canvas'
import InfoBar from '../components/scalesMastery/InfoBar'
import ScaleSelects from '../components/scalesMastery/ScaleSelects'
import { Slider } from "shards-react";

const initialState = {
  scale: 'minor blues',
  key: 'A',
  showNotes: false,
  highlighted: false,
  betweenFrets: [0, 12],
  betweenStrings: [1, 6]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_KEY':
      return {
        ...state,
        key: action.payload
      }

    case 'SET_SCALE':
      return {
        ...state,
        scale: action.payload
      }

    case 'TOGGLE_BETWEEN_NOTES_AND_INTERVALS':
      return {
        ...state,
        showNotes: action.payload
      }
    case 'HIGHLIGHT':
      return {
        ...state,
        highlighted: action.payload
      }

    case 'SET_BETWEEN_FRETS':
      return {
        ...state,
        betweenFrets: action.payload
      }

    case 'SET_BETWEEN_STRINGS':
      return {
        ...state,
        betweenStrings: action.payload
      }

    default:
      return state
  }
}

export const ScalesContext = createContext()

export default function ScalesMastery() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleFretSlide = e => {
    const start = e[0]
    const end = e[1]

    dispatch({ type: 'SET_BETWEEN_FRETS', payload: [start, end] })
  }

  const handleStringSlide = e => {

    const start = e[0]
    const end = e[1]

    dispatch({ type: 'SET_BETWEEN_STRINGS', payload: [start, end] })
  }

  return (
    <div>
      <ScalesContext.Provider value={[state, dispatch]}>

        <div className="d-flex flex-row justify-content-between">
          <div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row">
                <Canvas />
                <Slider

                  className="ml-4 mb-5"
                  connect
                  onSlide={handleStringSlide}
                  start={state.betweenStrings}
                  range={{ min: 1, max: 6 }}
                  orientation="vertical"
                />
              </div>
              <Slider
                className="mt-0 ml-4 mr-5 mb-4"
                connect
                onSlide={handleFretSlide}
                start={state.betweenFrets}
                range={{ min: 0, max: 12 }}
              />
            </div>
            <ScaleSelects />
          </div>
          <InfoBar />
        </div>

      </ScalesContext.Provider>
    </div>
  )
}
