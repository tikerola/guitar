import React, { useState, createContext } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import Canvas from './components/canvas/Canvas';
import InfoBar from './components/InfoBar';

export const FretboardMasteryCtx = createContext()

function App() {

  const [gameFinished, setGameFinished] = useState(true)

  return (
    <div>
      <NavBar />
      <div className="d-flex flex-row justify-content-between">
        <FretboardMasteryCtx.Provider value={[gameFinished, setGameFinished]} >
          <Canvas />
          <InfoBar />
        </FretboardMasteryCtx.Provider>
      </div>
    </div>
  );
}

export default App;
