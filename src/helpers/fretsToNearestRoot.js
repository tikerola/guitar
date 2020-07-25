import { scaleDegreeFromANote } from './scales/scales'
import { fretsToNotes } from './fretsToNotes'


export const fretsToNearestRoot = (key, degree, fret, fretsDrawn) => {
  const degreeNumber = degree.length === 1 ? parseInt(degree) : parseInt(degree.substring(1))

  const frets = []
  const index = fretsDrawn.findIndex(f => f === fret)

  let duplicates = 0
  let previousDegree
  let currentDegree

  if (degreeNumber <= 4) {
    // Let's go to the root 4, 3, 2, 1

    for (let i = 0; i < degreeNumber + duplicates; i++) {

      if (index - i < 0)
        break

      currentDegree = scaleDegreeFromANote(key, fretsToNotes[fretsDrawn[index - i]])

      if (i > 0 && currentDegree >= previousDegree) {
        duplicates++
        continue
      }

      frets.push(fretsDrawn[index - i])

      previousDegree = currentDegree
    }
  }

  else {
    // 5, 6, 7, 1

    for (let i = 0; i <= 8 - degreeNumber + duplicates; i++) {

      if (index + i > fretsDrawn.length - 1)
        break

      currentDegree = scaleDegreeFromANote(key, fretsToNotes[fretsDrawn[index + i]])

      if (i > 0 && currentDegree <= previousDegree && !(currentDegree === '0' && previousDegree === '7')) {
        duplicates++
        continue
      }

      frets.push(fretsDrawn[index + i])

      previousDegree = currentDegree

    }
  }

  return frets
}