
import React, { useContext } from 'react'
import Switch from 'react-switch'

import { ScalesContext } from '../../pages/ScalesMastery'


export default function InfoBar() {

  const [state, dispatch] = useContext(ScalesContext)

  const handleChange = checked => {
    dispatch({ type: 'TOGGLE_BETWEEN_NOTES_AND_INTERVALS', payload: checked })
  }

  const handleHighlighted = checked => {
    dispatch({ type: 'HIGHLIGHT', payload: checked })
  }


  return (
    <div className="container pt-3">
      <h2 className="text-center">Scales Mastery</h2>
      <p className="pl-3 pt-2 pr-3">
        Scale is an ordered sequence of notes.
        Once you have chosen a scale of your choice, you can toggle between notes and scale degrees.
        Letter (R) represents the root of the scale.
      </p>
      <div className="pl-3 pr-3 pb-2">
        <label className="d-flex flex-row">
          <span className="mr-3 font-weight-bolder">Scale Degrees</span>
          <Switch
            onChange={handleChange}
            checked={state.showNotes}
            checkedIcon={false}
            uncheckedIcon={false}
            className="align-self-end"
          />
          <span className="ml-3 font-weight-bolder">Notes</span>
        </label>
      </div>

      <div className="pl-3 pr-3 pb-3">
        If you wish to see which notes make up a triad chord, you can able highlighted mode below.
        Root is colored red and 3rd's and 5th's are blue. Can you see familiar chord shapes (C, A, G, E, D)?
        
      </div>

      <div className="pl-3 pr-3 pb-2">
        <label className="d-flex flex-row">
          <span className="mr-3 font-weight-bolder">Normal View</span>
          <Switch
            onChange={handleHighlighted}
            checked={state.highlighted}
            checkedIcon={false}
            uncheckedIcon={false}
            className="align-self-end"
          />
          <span className="ml-3 font-weight-bolder">Highlighted</span>

        </label>
        </div>
        <div className="pl-3 pr-3">
          
          You can isolate a part of the fretboard adjusting the sliders below and right of the fretboard.

        
        </div>
      
    </div>
  )
}
