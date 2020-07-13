import React from 'react';

import './App.css';
import NavBar from './components/NavBar';
import Canvas from './components/canvas/Canvas';
import InfoBar from './components/InfoBar';

function App() {
  return (
    <div>
      <NavBar />
      <div className="d-flex flex-row justify-content-between">
        <Canvas />
        <InfoBar />
      </div>
    </div>
  );
}

export default App;
