import React from 'react'

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="https://google.com">Active</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://google.com">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://google.com">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="https://google.com">Disabled</a>
          </li>
        </ul>
      </nav>

    </div>
  )
}
