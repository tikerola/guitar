import React, { useState, useEffect, useRef, useContext } from 'react'
import { FretboardMasteryCtx } from '../App'



export default function Counter() {

  const [counter, setCounter] = useState(0)


  const [, dispatch] = useContext(FretboardMasteryCtx)

  const interval = useRef()

  useEffect(() => {

    const handleKeyUp = e => {
      if (e.keyCode === 32) {

        if (interval.current) {
          clearInterval(interval.current)
          interval.current = null
          dispatch({ type: 'FINISH_GAME' })
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
      dispatch({ type: 'START_GAME' })

    if (counter === 0)
      clearInterval(interval.current)
  }, [counter, dispatch])


  const renderCounter = () => {

    return counter <= 60
      ?
      <span>Timer: {counter}</span>
      :
      <span className="text-danger display-3">{counter - 60}</span>
  }

  return (
    <div className="text-center">
      <h2>{renderCounter()}</h2>
    </div>
  )
}
