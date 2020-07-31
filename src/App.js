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
        <Route path="/Fretboard-Mastery" component={FretboardMastery} />
        <Route path="/Interval-Mastery" component={IntervalMastery} />
        <Route path="/Scales-Mastery" component={ScalesMastery} />
        <Route path="/Ear-Training" component={EarTraining} />
        <Route path="/Caged" component={Caged} />
        <Route exact path="/" component={Home} />
      </Router>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}

export default App;
