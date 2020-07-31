
import React from 'react'
import Counter from './Counter'

export default function InfoBar() {
  return (
    <div className="container pt-3">
      <h2 className="text-center">Fretboard Mastery</h2>
      <p className="pl-3 pt-3 pr-3">
        Find the right note at the right fret. Try to guess as many as you can in 60 seconds.
      </p>
      <p className="pl-3 pr-3 pb-3">
        The big note
        under the fretboard tells which note to find next.
        The string where you need to find a given note is highlighted during a game.
      </p>

      <p className="pl-3 pr-3 pb-3">
        Press <kbd>spacebar</kbd> to start a new game.
      </p>
      <p className="pl-3 pr-3 pb-3">
        Happy Gaming! <span role="img" aria-label="thumbs up">👍</span>
      </p>
      <Counter />
    </div>
  )
}
