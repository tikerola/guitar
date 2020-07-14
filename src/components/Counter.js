import React, { useState, useEffect, useRef, useContext } from 'react'
import { FretboardMasteryCtx } from '../App'

export default function Counter() {

  const [counter, setCounter] = useState(0)

  const [gameFinished, setGameFinished] = useContext(FretboardMasteryCtx)

  const interval = useRef()

  useEffect(() => {

    const handleKeyUp = e => {
      if (e.keyCode === 32) {

        if (interval.current) {
          clearInterval(interval.current)
          interval.current = null
          setGameFinished(true)
        }
        else {
          interval.current = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1)
          }, 1000)

          setCounter(63)
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

    if (counter === 60)
      setGameFinished(false)

    if (counter === 0)
      clearInterval(interval.current)
  }, [counter, setGameFinished])


  const renderCounter = () => {
    if (counter === 0)
      return null

    return counter <= 60
      ?
      counter
      :
      <span className="text-danger">{counter - 60}</span>
  }

  return (
    <div className="text-center">
      <h1>{renderCounter()}</h1>
    </div>
  )
}
