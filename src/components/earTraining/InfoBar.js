
import React, { useContext } from 'react'
import { FormSelect } from 'shards-react'
import { EarTrainingCtx } from '../../pages/EarTraining'


export default function InfoBar() {

  const [state, dispatch] = useContext(EarTrainingCtx)

  const handleChange = event => {
    console.log(event.target.value, state.scale)
    dispatch({ type: 'SET_SCALE', payload: event.target.value })
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
        <FormSelect onChange={handleChange}>
          <option selected={state.scale === 'major scale'} value="major scale">Major Scale</option>
          <option selected={state.scale === 'minor scale'} value="minor scale">Minor Scale</option>
          <option selected={state.scale === 'chromatic scale'} value="chromatic scale">Chromatic Scale</option>
        </FormSelect>
      </div>
      <p className="pl-3 pr-3 pb-3">
        Press <kbd>spacebar</kbd> to start a new game.
    </p>

    </div>
  )
}
