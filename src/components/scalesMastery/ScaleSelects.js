import React, { useContext } from 'react'
import Button from '../Button'
import { ScalesContext } from '../../pages/ScalesMastery'

export default function ScaleSelects() {

  const [state, dispatch] = useContext(ScalesContext)

  const handleClick = key => {
    dispatch({ type: 'SET_KEY', payload: key })
  }

  const handleScaleChange = scale => {
    dispatch({ type: 'SET_SCALE', payload: scale })
  }

  return (
    <div className="container d-flex flex-row justify-content-around">

      <div >
        <h5 className="text-center font-weight-bolder">KEY</h5>
        <div className="row">
          <Button className="col" width="70px" active={state.key === 'C'} handleClick={() => handleClick('C')}>C</Button>
          <Button className="col" width="70px" active={state.key === 'C#'} handleClick={() => handleClick('C#')}>C#</Button>
          <Button className="col" width="70px" active={state.key === 'D'} handleClick={() => handleClick('D')}>D</Button>
          <Button className="col" width="70px" active={state.key === 'D#'} handleClick={() => handleClick('D#')}>D#</Button>
        </div>

        <div className="row">
          <Button className="col" width="70px" active={state.key === 'E'} handleClick={() => handleClick('E')}>E</Button>
          <Button className="col" width="70px" active={state.key === 'F'} handleClick={() => handleClick('F')}>F</Button>
          <Button className="col" width="70px" active={state.key === 'F#'} handleClick={() => handleClick('F#')}>F#</Button>
          <Button className="col" width="70px" active={state.key === 'G'} handleClick={() => handleClick('G')}>G</Button>
        </div>

        <div className="row">
          <Button className="col" width="70px" active={state.key === 'G#'} handleClick={() => handleClick('G#')}>G#</Button>
          <Button className="col" width="70px" active={state.key === 'A'} handleClick={() => handleClick('A')}>A</Button>
          <Button className="col" width="70px" active={state.key === 'A#'} handleClick={() => handleClick('A#')}>A#</Button>
          <Button className="col" width="70px" active={state.key === 'B'} handleClick={() => handleClick('B')}>B</Button>
        </div>

      </div>

      <div >
        <h5 className="text-center font-weight-bolder">SCALE</h5>
        <div className="row">
          <Button className="col" active={state.scale === 'major scale'} handleClick={() => handleScaleChange('major scale')}>Major</Button>
          <Button className="col" active={state.scale === 'minor scale'} handleClick={() => handleScaleChange('minor scale')}>Minor</Button>
          <Button className="col" active={state.scale === 'major pentatonic'} handleClick={() => handleScaleChange('major pentatonic')}>Maj Pentatonic</Button>
        </div>

        <div className="row">
          <Button className="col" active={state.scale === 'minor pentatonic'} handleClick={() => handleScaleChange('minor pentatonic')}>Min Pentatonic</Button>
          <Button className="col" active={state.scale === 'dorian'} handleClick={() => handleScaleChange('dorian')}>Dorian</Button>
          <Button className="col" active={state.scale === 'phrygian'} handleClick={() => handleScaleChange('phrygian')}>Phrygian</Button>
        </div>
        <div className="row">
          <Button className="col" active={state.scale === 'lydian'} handleClick={() => handleScaleChange('lydian')}>Lydian</Button>
          <Button className="col" active={state.scale === 'mixolydian'} handleClick={() => handleScaleChange('mixolydian')}>Mixolydian</Button>
          <Button className="col" active={state.scale === 'locrian'} handleClick={() => handleScaleChange('locrian')}>Locrian</Button>
        </div>

        <div className="row">
          <Button className="col" active={state.scale === 'major blues'} handleClick={() => handleScaleChange('major blues')}>Blues Major</Button>
          <Button className="col" active={state.scale === 'minor blues'} handleClick={() => handleScaleChange('minor blues')}>Blues Minor</Button>

        </div>

      </div>

    </div>
  )
}
