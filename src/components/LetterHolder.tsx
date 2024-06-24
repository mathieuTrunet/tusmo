import { FunctionComponent } from 'react'
import { LetterState } from '../Tusmo'

export const LetterHolder: FunctionComponent<{
  key?: string
  state?: LetterState
  letter?: string
}> = ({ key, letter, state }) => (
  <span
    key={key}
    style={getStyle(state)}>
    {letter}
  </span>
)

const getStyle = (state?: LetterState): React.CSSProperties => {
  if (!state || state === 'wrong') return style

  return { backgroundColor: state === 'good' ? 'lime' : 'orange', ...style }
}

const style: React.CSSProperties = {
  textAlign: 'center',
  width: 70,
  height: 70,
  border: '1px solid black',
  display: 'inline-block',
  verticalAlign: 'middle',
  fontSize: 48,
  textTransform: 'uppercase',
  userSelect: 'none',
}
