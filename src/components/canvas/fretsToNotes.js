
const notes = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]


const strings = ['E', 'A', 'D', 'G', 'B', 'e']
const firstNoteIndexes = [5, 10, 3, 8, 0, 5]


// Object for converting E1 -> F and A3 -> C etc.

const fretsToNotes = {}

for (let a = 0; a < strings.length; a++) {
  for (let b = 1; b <= 12; b++) {
    fretsToNotes[`${strings[a]}${b}`] = notes[(firstNoteIndexes[a] + b - 1) % 12]
  }
}

export { fretsToNotes }