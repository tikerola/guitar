
export const FRETS_TO_PITCHES = {
  'E0': 'E2',
  'E1': 'F2',
  'E2': 'F#2',
  'E3': 'G2',
  'E4': 'G#2',
  'E5': 'A2',
  'E6': 'A#2',
  'E7': 'B2',
  'E8': 'C3',
  'E9': 'C#3',
  'E10': 'D3',
  'E11': 'D#3',
  'E12': 'E3',

  'A0': 'A2',
  'A1': 'A#2',
  'A2': 'B2',
  'A3': 'C3',
  'A4': 'C#3',
  'A5': 'D3',
  'A6': 'D#3',
  'A7': 'E3',
  'A8': 'F3',
  'A9': 'F#3',
  'A10': 'G3',
  'A11': 'G#3',
  'A12': 'A3',

  'D0': 'D3',
  'D1': 'D#3',
  'D2': 'E3',
  'D3': 'F3',
  'D4': 'F#3',
  'D5': 'G3',
  'D6': 'G#3',
  'D7': 'A3',
  'D8': 'A#3',
  'D9': 'B3',
  'D10': 'C4',
  'D11': 'C#4',
  'D12': 'D4',

  'G0': 'G3',
  'G1': 'G#3',
  'G2': 'A3',
  'G3': 'A#3',
  'G4': 'B3',
  'G5': 'C4',
  'G6': 'C#4',
  'G7': 'D4',
  'G8': 'D#4',
  'G9': 'E4',
  'G10': 'F4',
  'G11': 'F#4',
  'G12': 'G4',

  'B0': 'B3',
  'B1': 'C4',
  'B2': 'C#4',
  'B3': 'D4',
  'B4': 'D#4',
  'B5': 'E4',
  'B6': 'F4',
  'B7': 'F#4',
  'B8': 'G4',
  'B9': 'G#4',
  'B10': 'A4',
  'B11': 'A#4',
  'B12': 'B4',

  'e0': 'E4',
  'e1': 'F4',
  'e2': 'F#4',
  'e3': 'G4',
  'e4': 'G#4',
  'e5': 'A4',
  'e6': 'A#4',
  'e7': 'B4',
  'e8': 'C5',
  'e9': 'C#5',
  'e10': 'D5',
  'e11': 'D#5',
  'e12': 'E5'
}

const PITCHES_TO_FRETS = {}

for (let key in FRETS_TO_PITCHES) {
  if (!PITCHES_TO_FRETS[FRETS_TO_PITCHES[key]])
    PITCHES_TO_FRETS[FRETS_TO_PITCHES[key]] = [key]

  else
    PITCHES_TO_FRETS[FRETS_TO_PITCHES[key]].push(key)
}

export { PITCHES_TO_FRETS }