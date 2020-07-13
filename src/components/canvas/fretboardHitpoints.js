
import { FRET_WIDTH, fretboardPoints as fP } from './fretboardPoints'
const Y_MARGIN = 10


export const fretboardHitpoints = (x, y) => {
  for (const fret in fP) {
    if (fP[fret].x > (x - FRET_WIDTH / 2) && fP[fret].x < (x + FRET_WIDTH / 2)) {
      if (fP[fret].y > (y - Y_MARGIN) && fP[fret].y < (y + Y_MARGIN)) {
        return fret
      }
    }
  }

  return false
}