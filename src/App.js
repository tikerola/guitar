import React from 'react';
import './App.css';
import FretboardMastery from './pages/FretboardMastery'
import IntervalMastery from './pages/IntervalMastery'
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
        <Route exact path="/" component={Home} />
      </Router>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}

export default App;
