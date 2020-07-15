import React, { useContext } from 'react'
import { FretboardMasteryCtx } from './FretboardMastery'

export default function Results() {

  const [state] = useContext(FretboardMasteryCtx)

  return (
    <div className="w-100">
      <div className="d-flex flex-row justify-content-center">
        <div className={`mr-4 display-2 font-weight-bolder ${state.gameFinished ? 'text-muted' : 'text-danger'}`}>{state.noteToQuess}</div>
        <h2 className="text-muted">{state.points} points</h2>
      </div>
    </div>
  )
}