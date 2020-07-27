
import React, { useContext } from 'react'
import { FormSelect } from 'shards-react'
import { EarTrainingCtx } from '../../pages/EarTraining'


export default function InfoBar() {

  const [state, dispatch] = useContext(EarTrainingCtx)

  const handleChange = event => {

    dispatch({ type: 'SET_SCALE', payload: event.target.value })
    document.activeElement.blur()
  }

  return (
    <div className="container pt-3">
      <h2 className="text-center">Ear Training</h2>
      <p className="pl-3 pt-2 pr-3">
        You'll hear a triad and after that a random scale note. The idea is to quess the right scale degree of a given scale (choose below). You can do that the easier way by
        pressing the numbers below the fretboard, or if you want a bigger challenge,
        try to find the scale degree directly on the fretboard.
      </p>

      <div className="pl-3 pr-3 pb-2">
        <FormSelect onChange={handleChange}>
          <option defaultValue={state.scale === 'major scale'} value="major scale">Major Scale</option>
          <option defaultValue={state.scale === 'minor scale'} value="minor scale">Minor Scale</option>
          <option defaultValue={state.scale === 'chromatic scale'} value="chromatic scale">Chromatic Scale</option>
        </FormSelect>
      </div>
      <p className="pl-3 pt-2 pr-3">
        When you make a right quess, hear and see (...with major and minor scales) how the scale degrees are played
        up (degrees: 5, 6, 7, R) or down (degrees: 4, 3, 2, R) to the nearest tonic (R). Try to sing along. Ideally you want to be
        able to sing the notes in your head before making a quess.
      </p>
      <p className="pl-3 pr-3 pb-3">
        Press <kbd>spacebar</kbd> to start a new round.
    </p>

    </div>
  )
}
