import React from 'react'
import Canvas from '../components/earTraining/Canvas'
import InfoBar from '../components/earTraining/InfoBar'
import ScaleDegrees from '../components/earTraining/ScaleDegrees'


export default function IntervalMastery() {
  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <Canvas />
          <ScaleDegrees />
        </div>
        <InfoBar />
      </div>
    </div>
  )
}
