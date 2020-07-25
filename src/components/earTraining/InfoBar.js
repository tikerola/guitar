
import React, { useContext } from 'react'
import Switch from 'react-switch'
import { EarTrainingCtx } from '../../pages/EarTraining'


export default function InfoBar() {

  const [state, dispatch] = useContext(EarTrainingCtx)

  const handleChange = checked => {
    console.log(checked, state.scale)
    dispatch({ type: 'SET_SCALE', payload: checked ? 'major scale' : 'minor scale' })
    document.activeElement.blur()
  }

  return (
    <div className="container pt-3">
      <h2 className="text-center">Ear Training</h2>
      <p className="pl-3 pt-3 pr-3">
        The idea is to quess the right scale degree of a given scale. You can do that the easier way by
        pressing the numbers below the fretboard, or if you want a bigger challenge, you can
        try to find the scale degree directly on the fretboard.
      </p>
      <div className="pl-3 pr-3 pb-3">
        <span className="mr-3 font-weight-bolder">Minor Scale</span>
        <Switch
          onChange={handleChange}
          checked={state.scale === 'major scale'}
          checkedIcon={false}
          uncheckedIcon={false}
          className="align-self-end"
        />
        <span className="ml-3 font-weight-bolder">Major Scale</span>

      </div>
      <p className="pl-3 pr-3 pb-3">
        Press <kbd>spacebar</kbd> to start a new game.
    </p>

    </div>
  )
}
