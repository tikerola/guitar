import React, { useContext } from 'react'
import { FretboardMasteryCtx } from '../../pages/FretboardMastery'

export default function Results() {

  const [state] = useContext(FretboardMasteryCtx)

  return (
    <div className="w-100 d-flex flex-column">
      <div className="d-flex flex-row justify-content-center">
        <div className={`mr-4 display-2 font-weight-bolder ${state.gameFinished ? 'text-muted' : 'text-danger'}`}>{state.noteToQuess}</div>
        <h2 className="text-muted">{state.points} points</h2>
      </div>

      <div className="align-self-center mt-4">
        <div className="row">
          <div className="col">
            <span className="pr-3 d-inline-block font-weight-bolder" style={{ width: '70px' }}>30 - </span>
            <span>Not sure if you need any more training, champ!</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span className="pr-3 d-inline-block font-weight-bolder" style={{ width: '70px' }}>20 - 30</span>
            <span>You're fast, but you still have to think some notes.</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span className="pr-3 d-inline-block font-weight-bolder" style={{ width: '70px' }}>10 - 20</span>
            <span>Not bad! Just a little more practise</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span className="pr-3 d-inline-block font-weight-bolder" style={{ width: '70px' }}>5 - 10</span>
            <span>Hey, you already know some. Keep going!</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span className="pr-3 d-inline-block font-weight-bolder" style={{ width: '70px' }}>0 - 5</span>
            <span>The start is always the hardest</span>
          </div>
        </div>
      </div>
    </div>
  )
}
