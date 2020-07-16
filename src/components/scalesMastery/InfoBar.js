
import React, { useContext } from 'react'
import Switch from 'react-switch'
import { ScalesContext } from '../../pages/ScalesMastery'


export default function InfoBar() {

  const [state, dispatch] = useContext(ScalesContext)

  const handleChange = checked => {

    dispatch({ type: 'TOGGLE_BETWEEN_NOTES_AND_INTERVALS', payload: checked })
  }

  return (
    <div className="container pt-3">
      <h2 className="text-center">Scales Mastery</h2>
      <p className="pl-3 pt-3 pr-3">
        Scale is an ordered sequence of notes.
        Once you have chosen a scale of your choice, you can toggle between notes and scale degrees.
      </p>
      <div className="pl-3 pr-3 pb-3">


        <label className="d-flex flex-row">
          <span className="mr-3">Scale Degrees</span>
          <Switch
            onChange={handleChange}
            checked={state.showNotes}
            checkedIcon={false}
            uncheckedIcon={false}
            className="align-self-end"
          />
          <span className="ml-3">Notes</span>

        </label>

      </div>


    </div>
  )
}
