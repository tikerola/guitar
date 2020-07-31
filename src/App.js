import React from 'react';
import './App.css';
import FretboardMastery from './pages/FretboardMastery'
import IntervalMastery from './pages/IntervalMastery'
import ScalesMastery from './pages/ScalesMastery'
import EarTraining from './pages/EarTraining'
import Caged from './pages/Caged'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';


function App() {

  return (
    <div>
      <Router>
        <NavBar />
        <Route path="/guitar/Fretboard-Mastery" component={FretboardMastery} />
        <Route path="/guitar/Interval-Mastery" component={IntervalMastery} />
        <Route path="/guitar/Scales-Mastery" component={ScalesMastery} />
        <Route path="/guitar/Ear-Training" component={EarTraining} />
        <Route path="/guitar/Caged" component={Caged} />
        <Route exact path="/guitar/" component={Home} />
      </Router>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}

export default App;
