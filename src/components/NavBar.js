import React from 'react'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function NavBar({ location }) {

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className={`nav-item ${location.pathname === '/' && 'active'}`}>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className={`nav-item ${location.pathname === '/Fretboard-Mastery' && 'active'}`}>
            <Link className="nav-link" to="Fretboard-Mastery">Fretboard Mastery</Link>
          </li>
          <li className={`nav-item ${location.pathname === '/Interval-Mastery' && 'active'}`}>
            <Link className="nav-link" to="Interval-Mastery">Interval Mastery</Link>
          </li>

        </ul>
      </nav>

    </div>
  )
})
