import React from 'react'

export default function Judgement({ answerWasCorrect, ...otherProps }) {

  const correctAnswer = () => (
    <h3 {...otherProps} >Correct!</h3>
  )

  const wrongAnswer = () => (
    <h3 {...otherProps} >Wrong!</h3>
  )

  return (
    <div>
      {answerWasCorrect ? correctAnswer() : wrongAnswer()}
    </div>
  )
}
