import React from 'react'

export default function Home() {
  return (
    <div className="w-100">
      <div className="d-flex flex-row justify-content-center bg-dark w-100">
        <img src="./assets/images/key.png" alt="guitar" height="120" />
        <img src="./assets/images/title.png" className="text-right mb-3 p-3 text-white" alt="title" />
        <img src="./assets/images/key1.png" alt="guitar" height="120" />
      </div>
      <div className="d-flex flex-row justify-content-around container">
        <div className="w-30">
          <p className="card-body">This is a page dedicated to help guitarists to learn more about their instrument:
notes on the fretboard, intervals, scales etc.</p>
        </div>
        <div className="w-30">
          <p className="card-body">This is a page dedicated to help guitarists to learn more about their instrument:
notes on the fretboard, intervals, scales etc.</p>
        </div>




      </div>
    </div>
  )
}
