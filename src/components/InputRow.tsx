import { FunctionComponent } from 'react'
import { LetterHolder } from './LetterHolder'
import { LetterState } from '../Tusmo'

export const InputRow: FunctionComponent<{
  key?: string
  wordToFind: string
  input: string
  letterStatelist?: LetterState[]
}> = ({ key, wordToFind, input, letterStatelist }) => {
  const [firstLetter, ...restOfTheWord] = wordToFind

  return (
    <div key={key}>
      <LetterHolder
        state='good'
        letter={firstLetter}
      />
      {restOfTheWord.map((_letter, key) => (
        <LetterHolder
          key={`letter-holder-${key}`}
          letter={[...input][key] ?? '_'}
          state={letterStatelist ? letterStatelist[key] : undefined}
        />
      ))}
    </div>
  )
}
