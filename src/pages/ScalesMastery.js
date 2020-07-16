import React, { useReducer, createContext } from 'react'
import Canvas from '../components/scalesMastery/Canvas'
import InfoBar from '../components/scalesMastery/InfoBar'
import ScaleSelects from '../components/scalesMastery/ScaleSelects'

const initialState = {
  scale: 'minor pentatonic',
  key: 'A'
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

    default:
      return state
  }
}

export const ScalesContext = createContext()

export default function ScalesMastery() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <ScalesContext.Provider value={[state, dispatch]}>

        <div className="d-flex flex-row justify-content-between">
          <div>
            <Canvas />
            <ScaleSelects />
          </div>
          <InfoBar />
        </div>

      </ScalesContext.Provider>
    </div>
  )
}
