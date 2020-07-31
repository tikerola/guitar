import React, { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { drawBackgroundWithDelay, drawNote, initializeFretboard } from '../../helpers/drawFunctions/drawFunctions'
import { inWhichFret, onMouseDownCoordinates } from '../../helpers/fretboardHitpoints'
import { fretsToNotes } from '../../helpers/fretsToNotes'
import { FRETS_TO_PITCHES } from '../../helpers/pitches'
import { playNote } from '../../helpers/tone/playFunctions'



export default function Canvas() {

  const canvasRef = useRef()
  const fretboardRef = useRef()

  useEffect(() => {
    initializeFretboard(canvasRef, fretboardRef, initializeMic)
  }, [])


  const initializeMic = () => {

    const analyser = new Tone.Analyser('waveform')
    const mic = new Tone.UserMedia().connect(analyser);
    mic.open().then(() => {
      // promise resolves when input is available
      console.log("mic ope");
      // print the incoming mic levels in decibels
      //setInterval(() => console.log(gain.toFrequency('4n')), 100);
      console.log(analyser.getValue())
    }).catch(e => {
      // promise is rejected when the user doesn't have or allow mic access
      console.log("mic not open");
    });
  }

  const handleMouseDown = e => {

    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = onMouseDownCoordinates(e, canvasRef)
    const fret = inWhichFret(x, y)

    if (fret) {
      playNote(FRETS_TO_PITCHES[fret], '4n')
      drawNote(ctx, fret, fretsToNotes[fret]);
      drawBackgroundWithDelay(ctx, fretboardRef, 500)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={840}
        height={225}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
