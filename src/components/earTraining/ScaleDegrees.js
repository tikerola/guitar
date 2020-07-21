import React, { useContext } from 'react'
import Button from '../Button'
import { EarTrainingCtx } from '../../pages/EarTraining'
import { drawNote } from '../../helpers/drawFunctions/drawFunctions'
import { PITCHES_TO_FRETS } from '../../helpers/pitches'




export default function ScaleDegrees({ canvasRef }) {

  const [state, dispatch] = useContext(EarTrainingCtx)

  const handleClick = value => {
    const quessedNote = state.scaleNotes[value]

    let randomNote = ''
    if (isNaN(parseInt(state.note[1])))
      randomNote = state.note.substring(0, 2)

    else
      randomNote = state.note.substring(0, 1)

    console.log(quessedNote, randomNote)

    if (quessedNote === randomNote)
      drawNote(canvasRef.current.getContext('2d'), PITCHES_TO_FRETS[`${quessedNote}3`], quessedNote)

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
