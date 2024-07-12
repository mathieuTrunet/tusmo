import { FunctionComponent } from 'react'
import { LetterHolder } from './LetterHolder'
import { LetterState } from '../Tusmo'

export const InputRow: FunctionComponent<{
  key?: string
  wordToFind: string
  children: string
  letterStatelist?: LetterState[]
}> = ({ key, wordToFind, children: input, letterStatelist }) => {
  const [firstLetter, ...restOfTheWord] = wordToFind

  return (
    <div key={key}>
      <LetterHolder state='good'>{firstLetter}</LetterHolder>
      {restOfTheWord.map((_letter, key) => (
        <LetterHolder
          key={`letter-holder-${key}`}
          state={letterStatelist?.[key]}>
          {[...input][key] ?? '_'}
        </LetterHolder>
      ))}
    </div>
  )
}
