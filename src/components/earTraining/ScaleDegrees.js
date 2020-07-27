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
    //const quessedNote = state.scaleNotes[value]

    let scaleDegree = scaleDegreeFromANote(state.key, fretsToNotes[state.randomFret])

    if (state.scale !== 'chromatic scale') {
      scaleDegree = scaleDegree.length === 1 ? scaleDegree : scaleDegree.substring(1)
    }

    if (scaleDegree === value.toString()) {

      drawNote(ctx, state.randomFret, scaleDegree !== '0' ? scaleDegree : 'R', 'blue', 'white');
      dispatch({ type: 'SET_PUSHED_FRET', payload: state.randomFret })

      if (state.scale !== 'chromatic scale') {

        const frets = fretsToNearestRoot(state.key, scaleDegree, state.randomFret, state.fretsDrawn)

        setTimeout(() => {
          document.activeElement.blur()
          playSequenceOfNotes(frets, 0.5)
          drawSequenceOfFrets(ctx, state.key, frets, 500)
        }, 0)
      }

    }

    // Let's make sure that the state is changed for Judgement
    else
      dispatch({ type: 'SET_PUSHED_FRET', payload: `${Math.random()}` })
  }

  return (
    <div className="container d-flex flex-row justify-content-around mb-3">

      <div >
        <h5 className="text-center font-weight-bolder">SCALE DEGREES</h5>
        <div className="row">
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(0)}>1</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(2)}>2</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(3)}>3</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(4)}>4</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(5)}>5</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(6)}>6</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick(7)}>7</Button>
        </div>
        <div className={`row ${state.scale === 'chromatic scale' ? 'visible' : 'invisible'}`} style={{ paddingLeft: '58px' }}>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick('b2')}>b2</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick('b3')}>b3</Button>
          <button className={`btn m-2`} style={{ width: '100px', cursor: 'default' }} disabled></button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick('b5')}>b5</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick('b6')}>b6</Button>
          <Button className="col" width="100px" active={false} handleClick={() => handleClick('b7')}>b7</Button>

        </div>
      </div>
    </div>
  )
}
