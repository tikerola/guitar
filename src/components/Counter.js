import React, { useState, useEffect, useRef, useContext } from 'react'
import { FretboardMasteryCtx } from '../App'


const GAME_DURATION = 60

export default function Counter() {

  const [counter, setCounter] = useState(GAME_DURATION + 4)
  const [, dispatch] = useContext(FretboardMasteryCtx)

  const interval = useRef(null)
  const counterRef = useRef(counter)

  useEffect(() => {

    const handleKeyUp = e => {
      if (e.keyCode === 32) {

        // Game time ended

        if (counterRef.current === 0 && interval.current) {
          clearInterval(interval.current)
          setCounter(GAME_DURATION + 3)

          interval.current = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1)
          }, 1000)
        }

        // Game time still left

        else if (interval.current) {

          clearInterval(interval.current)
          interval.current = null
          dispatch({ type: 'FINISH_GAME' })
        }

        // First game starting

        else {
          interval.current = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1)
          }, 1000)

          setCounter(GAME_DURATION + 3)
        }
      }
    }

    document.addEventListener('keyup', handleKeyUp)

    return () => {
      clearInterval(interval.current)
      document.removeEventListener('keyup', handleKeyUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    // This needed for event listener
    counterRef.current = counter

    if (counter === GAME_DURATION) {
      dispatch({ type: 'START_GAME' })
      dispatch({ type: 'NEW_NOTE' })
    }

    if (counter === 0) {
      clearInterval(interval.current)
      dispatch({ type: 'FINISH_GAME' })
    }
  }, [counter, dispatch])


  const renderCounter = () => {

    return counter <= GAME_DURATION
      ?
      <span>Timer: {counter}</span>
      :
      <span className="text-danger display-3 font-weight-bolder">{interval.current && counter - GAME_DURATION}</span>
  }

  return (
    <div className="text-center">
      <h2>{renderCounter()}</h2>
    </div>
  )
}
