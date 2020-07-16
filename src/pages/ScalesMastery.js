import React from 'react'
import Canvas from '../components/scalesMastery/Canvas'
import InfoBar from '../components/scalesMastery/InfoBar'

export default function ScalesMastery() {
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
