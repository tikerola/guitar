import React, { useState, useEffect, useRef } from 'react'

export default function Counter() {

  const [counter, setCounter] = useState(0)


  const interval = useRef()

  useEffect(() => {

    const handleKeyUp = e => {
      if (e.keyCode === 32) {

        if (interval.current) {
          clearInterval(interval.current)
          interval.current = null
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
  }, [])

  useEffect(() => {
    if (counter === 0)
      clearInterval(interval.current)
  }, [counter])


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
