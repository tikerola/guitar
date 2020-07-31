import React from 'react'
import Canvas from '../components/caged/Canvas'
import InfoBar from '../components/caged/InfoBar'

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
