export const initialState = {
  scale: 'major scale',
  frets: ['E5', 'A5', 'D5', 'G5', 'B5'],
  key: '',
  scaleNotes: [],
  note: '',
  fretsDrawn: [],
  pushedFret: '',
  randomFret: '',
  points: 0,
  betweenFrets: [4, 8],
  disableRestart: false
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCALE':
      return {
        ...state,
        scale: action.payload
      }
    case 'SET_KEY':
      return {
        ...state,
        key: action.payload
      }
    case 'SET_SCALE_NOTES':
      return {
        ...state,
        scaleNotes: action.payload
      }

    case 'SET_NOTE':
      return {
        ...state,
        note: action.payload
      }

    case 'SET_FRETS_DRAWN':
      return {
        ...state,
        fretsDrawn: action.payload
      }

    case 'SET_PUSHED_FRET':
      return {
        ...state,
        pushedFret: action.payload
      }

    case 'ADD_POINT':
      return {
        ...state,
        points: state.points + 1
      }

    case 'SET_RANDOM_FRET':
      return {
        ...state,
        randomFret: action.payload
      }
    case 'SET_BETWEEN_FRETS':
      return {
        ...state,
        betweenFrets: action.payload
      }
    case 'SET_DISABLE_RESTART':
      return {
        ...state,
        disableRestart: action.payload
      }
    default:
      return state
  }
}