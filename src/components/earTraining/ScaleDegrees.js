import React, { useContext } from 'react'
import { drawSequenceOfFrets, drawNote } from '../../helpers/drawFunctions/drawFunctions'
import { fretsToNearestRoot } from '../../helpers/fretsToNearestRoot'
import { playSequenceOfNotes } from '../../helpers/tone/playFunctions'
import { EarTrainingCtx } from '../../pages/EarTraining'
import Button from '../Button'
import { scaleDegreeFromANote } from '../../helpers/scales/scales'
import { fretsToNotes } from '../../helpers/fretsToNotes'


export default function ScaleDegrees({ canvasRef, fretboardRef }) {

  const [state, dispatch] = useContext(EarTrainingCtx)

  const handleClick = value => {

    if (!state.note)
      return

    const ctx = canvasRef.current.getContext('2d')
    const quessedNote = state.scaleNotes[value]

    if (quessedNote === state.note) {
      const scaleDegree = scaleDegreeFromANote(state.key, fretsToNotes[state.randomFret])
      const frets = fretsToNearestRoot(state.key, scaleDegree, state.randomFret, state.fretsDrawn)
      drawNote(ctx, state.randomFret, scaleDegree !== '0' ? scaleDegree : '1', 'blue', 'white');

      setTimeout(() => {
        document.activeElement.blur()
        playSequenceOfNotes(frets, 0.5)
        drawSequenceOfFrets(ctx, state.key, frets, 500)
        dispatch({ type: 'ADD_POINT' })
      }, 0)

    }
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
