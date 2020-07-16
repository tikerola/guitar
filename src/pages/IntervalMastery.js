import React from 'react'
import Canvas from '../components/intervalMastery/Canvas'
import InfoBar from '../components/intervalMastery/InfoBar'

export default function IntervalMastery() {
  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <Canvas />
        </div>
        <InfoBar />
      </div>
    </div>
  )
}
