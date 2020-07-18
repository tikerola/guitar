import React, { useContext } from 'react'
import Button from '../Button'
import { EarTrainingCtx } from '../../pages/EarTraining'




export default function ScaleDegrees() {

  const [state, dispatch] = useContext(EarTrainingCtx)

  const handleClick = value => {
    const quessedNote = state.scaleNotes[value]

    if (quessedNote === state.note.substring(0, 1))
      console.log('Bulls Eye')

    else
      console.log('You Suck', quessedNote, state.note)
  }

  return (
    <div className="container d-flex flex-row justify-content-around">

      <div >
        <h5 className="text-center font-weight-bolder">SCALE DEGREES</h5>
        <div className="row">
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(6)}>1</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(0)}>2</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(1)}>3</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(2)}>4</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(3)}>5</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(4)}>6</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(5)}>7</Button>
        </div>
      </div>
    </div>
  )
}
