import React, { createContext, useReducer } from 'react';
import { notes } from '../helpers/fretsToNotes';
import Canvas from '../components/fretboardMastery/Canvas'
import '../components/fretboardMastery/styles/FretboardMastery.css';
import InfoBar from '../components/fretboardMastery/InfoBar';
import Results from '../components/fretboardMastery/Results';


export const FretboardMasteryCtx = createContext()

const initialState = {
  gameFinished: true,
  points: 0,
  noteToQuess: 'C',
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
        gameFinished: false,
        points: 0
      }
    case 'NEW_NOTE':
      let newNote = notes[Math.floor(Math.random() * notes.length)]

      while (newNote === state.noteToQuess) {
        newNote = notes[Math.floor(Math.random() * notes.length)]
      }

      return {
        ...state,
        noteToQuess: newNote
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

function FretboardMastery() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
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

export default FretboardMastery;
