
export const FRET_WIDTH = 61;
export const FRET_HEIGHT = 25;

export const E_FRET_HEIGHT = 162;
export const A_FRET_HEIGHT = 137;
export const D_FRET_HEIGHT = 112;
export const G_FRET_HEIGHT = 87;
export const B_FRET_HEIGHT = 62;
export const e_FRET_HEIGHT = 37;

const ZERO_FRET_X = 21

const strings = ['E', 'A', 'D', 'G', 'B', 'e']


// Coordinates of first fret of every string
// Initiation not necessary but gives an idea how points are constructed

const fretboardPoints = {
  // 'E0': { x: ZERO_FRET_X, y: E_FRET_HEIGHT },
  // 'A0': { x: ZERO_FRET_X, y: A_FRET_HEIGHT },
  // 'D0': { x: ZERO_FRET_X, y: D_FRET_HEIGHT },
  // 'G0': { x: ZERO_FRET_X, y: G_FRET_HEIGHT },
  // 'B0': { x: ZERO_FRET_X, y: B_FRET_HEIGHT },
  // 'e0': { x: ZERO_FRET_X, y: e_FRET_HEIGHT },
}


// Let's initiate fretboard circles for every note up until 12th fret

for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
  for (let nthFret = 0; nthFret <= 12; nthFret++) {
    fretboardPoints[`${strings[stringIndex]}${nthFret}`] = {
      x: nthFret > 0 ? fretboardPoints[`${strings[stringIndex]}${nthFret - 1}`].x + FRET_WIDTH : ZERO_FRET_X,
      y: E_FRET_HEIGHT - stringIndex * FRET_HEIGHT
    }
  }
}

// LEGACY

// for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
//   for (let nthFret = 1; nthFret <= 12; nthFret++) {
//     fretboardPoints[`${strings[stringIndex]}${nthFret}`] = {
//       x: fretboardPoints[`${strings[stringIndex]}${nthFret - 1}`].x + FRET_WIDTH,
//       y: E_FRET_HEIGHT - stringIndex * FRET_HEIGHT
//     }
//   }
// }

export { fretboardPoints }