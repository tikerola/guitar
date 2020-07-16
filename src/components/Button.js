import React from 'react'

export default function Button({ children, handleClick, active, width }) {
  return (
    <button className={`btn ${active ? 'btn-primary' : 'btn-secondary'} m-2`} style={{ width }} onClick={handleClick}>
      {children}
    </button>
  )
}
