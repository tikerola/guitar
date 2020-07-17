import React from 'react'
import Button from '../Button'


export default function ScaleDegrees() {


  const handleClick = () => {

  }

  return (
    <div className="container d-flex flex-row justify-content-around">

      <div >
        <h5 className="text-center font-weight-bolder">SCALE DEGREE</h5>
        <div className="row">
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('C')}>Tonic</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('C#')}>Minor 2nd</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D')}>Major 2nd</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D#')}>Minor 3rd</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D#')}>Major 3rd</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D#')}>4th</Button>
        </div>
        <div className="row">
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('C')}>Minor 5th</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('C#')}>Major 5th</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D')}>Minor 6th</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D#')}>Major 6th</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D#')}>Minor 7th</Button>
          <Button className="col" width="120px" active={false} handleClick={() => handleClick('D#')}>Major 7th</Button>
        </div>
      </div>
    </div>
  )
}
