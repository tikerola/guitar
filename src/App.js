import React, { createContext, useReducer, useEffect } from 'react';
import './App.css';
import Canvas from './components/canvas/Canvas';
import InfoBar from './components/InfoBar';
import NavBar from './components/NavBar';
import Results from './components/Results'
import { notes } from './components/canvas/fretsToNotes'


export const FretboardMasteryCtx = createContext()

const initialState = {
  gameFinished: true,
  points: 0,
  noteToQuess: '',
  userQuess: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FINISH_GAME':
      return {
        ...state,
        gameFinished: true
      }
    case 'START_GAME':
      return {
        ...state,
        gameFinished: false
      }
    case 'NEW_NOTE':
      return {
        ...state,
        noteToQuess: notes[Math.floor(Math.random() * notes.length)]
      }
    case 'ADD_POINT':
      return {
        ...state,
        points: state.points + 1
      }
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.gameFinished)
      dispatch({ type: 'NEW_NOTE' })

  }, [state.gameFinished])

  return (
    <div>
      <NavBar />
      <FretboardMasteryCtx.Provider value={[state, dispatch]} >
        <div className="d-flex flex-row justify-content-between">
          <div>
            <Canvas />
            <Results />
          </div>
          <InfoBar />
        </div>
      </FretboardMasteryCtx.Provider>
    </div>
  );
}

export default App;
