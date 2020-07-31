import React from 'react'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function NavBar({ location }) {

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className={`nav-item ${location.pathname === '/guitar/' && 'active'}`}>
            <Link className="nav-link" to="/guitar/">Home</Link>
          </li>
          <li className={`nav-item ${location.pathname === '/guitar/Fretboard-Mastery' && 'active'}`}>
            <Link className="nav-link" to="/guitar/Fretboard-Mastery">Fretboard</Link>
          </li>
          <li className={`nav-item ${location.pathname === '/guitar/Scales-Mastery' && 'active'}`}>
            <Link className="nav-link" to="/guitar/Scales-Mastery">Scales</Link>
          </li>
          <li className={`nav-item ${location.pathname === '/guitar/Ear-Training' && 'active'}`}>
            <Link className="nav-link" to="/guitar/Ear-Training">Ear Training</Link>
          </li>
          {/* <li className={`nav-item ${location.pathname === '/Caged' && 'active'}`}>
            <Link className="nav-link" to="Caged">Caged</Link>
          </li>
          <li className={`nav-item ${location.pathname === '/Interval-Mastery' && 'active'}`}>
            <Link className="nav-link" to="Interval-Mastery">Interval</Link>
          </li> */}

        </ul>
      </nav>

    </div>
  )
})
