import React from 'react'

export default function Home() {
  return (
    <div className="w-100">
      <div className="d-flex flex-row justify-content-center bg-dark w-100">
        <img src="./assets/images/key.png" alt="guitar" height="120" />
        <div className="d-flex flex-column">
          <img src="./assets/images/title.png" className="text-right mb-3 p-3 text-white" alt="title" />
          <div className="text-muted position-absolute animated bounce infinite" style={{ top: '150px', left: '500px', textDecoration: 'underline' }}>
            Take your playing to the next level</div>
        </div>
        <img src="./assets/images/key1.png" alt="guitar" height="120" />
      </div>
      <div className="d-flex flex-row justify-content-around container">
        <div className="m-5 w-25">
          <h3>About Us</h3>
          <p className="">This page is dedicated to help guitarists to learn more about their instrument:
            notes, fretboard, intervals, scales etc.</p>
          <p>
            Browse through and see if there's something that meets your particular needs.
          </p>
        </div>
        <div className="m-5 w-50 d-flex flex-row align-self-center">
          <img src="./assets/images/yoda.png" alt="happy customer" height="120" />
          <div>
            <q><i>This page with it's explicit content has given me so much through the years... LOL, that
            funny came out.</i></q>
            <div className="text-right">
              <i>David B. Hernandez</i>
            </div>
          </div>
        </div>




      </div>
    </div>
  )
}
