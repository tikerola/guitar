import React from 'react';

import './App.css';
import NavBar from './components/NavBar';
import Canvas from './components/canvas/Canvas';

function App() {
  return (
    <div>
      <NavBar />
      <div className="d-flex flex-row justify-content-between">
        <Canvas />
        <div className="container mt-32">
          <h2 className="text-center">Fretboard Mastery</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
