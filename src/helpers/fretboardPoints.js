
export const FRET_WIDTH = 61;
export const FRET_HEIGHT = 25;

export const E_FRET_HEIGHT = 162;
export const A_FRET_HEIGHT = 137;
export const D_FRET_HEIGHT = 112;
export const G_FRET_HEIGHT = 87;
export const B_FRET_HEIGHT = 62;
export const e_FRET_HEIGHT = 37;

const strings = ['E', 'A', 'D', 'G', 'B', 'e']


// Coordinates of first fret of every string

const fretboardPoints = {
  'E0': { x: 21, y: E_FRET_HEIGHT },
  'A0': { x: 21, y: A_FRET_HEIGHT },
  'D0': { x: 21, y: D_FRET_HEIGHT },
  'G0': { x: 21, y: G_FRET_HEIGHT },
  'B0': { x: 21, y: B_FRET_HEIGHT },
  'e0': { x: 21, y: e_FRET_HEIGHT },
}


// Let's initiate fretboard circles for every note up until 12th fret

for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
  for (let nthFret = 1; nthFret <= 12; nthFret++) {
    fretboardPoints[`${strings[stringIndex]}${nthFret}`] = {
      x: fretboardPoints[`${strings[stringIndex]}${nthFret - 1}`].x + FRET_WIDTH,
      y: E_FRET_HEIGHT - stringIndex * FRET_HEIGHT
    }
  }
}

export { fretboardPoints }