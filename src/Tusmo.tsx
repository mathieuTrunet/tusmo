import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { InputRow } from './components/InputRow'

export type LetterState = 'wrong' | 'partial' | 'good'

export type StateParam<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export type UserTry = { input: string; state: LetterState[] }

const handleKeyboard = (
  event: KeyboardEvent,
  inputState: StateParam<string>,
  wordToFind: string,
  progressState: StateParam<UserTry[]>
) => {
  const [, ...restOfTheWord] = wordToFind
  const { key: pressedLetter, isTrusted } = event

  const [input, setInput] = inputState

  if (!isTrusted) return

  if (pressedLetter === 'Backspace') return setInput(input.slice(0, -1))

  if (restOfTheWord.length === input.length) {
    if (pressedLetter !== 'Enter') return

    return handleEnterPress(restOfTheWord.join(''), inputState, progressState)
  }

  if (!pressedLetter.match(/^[a-z]$/i)) return

  setInput(input + pressedLetter)
}

const handleEnterPress = (
  wordToFind: string,
  inputState: StateParam<string>,
  progressState: StateParam<UserTry[]>
) => {
  const [input, setInput] = inputState

  const [progress, setProgress] = progressState

  const userTry = getUserTry(input.toLowerCase(), wordToFind)

  setProgress([...progress, userTry])

  setInput('')
}

const getUserTry = (input: string, wordToFind: string) => {
  console.log(input, wordToFind)
  const compareState = [...input].map((letter, key) => {
    if (letter === wordToFind[key]) return 'good'

    if (wordToFind.includes(letter)) return 'partial'

    return 'wrong'
  })

  console.log(compareState)

  return { input: input, state: compareState }
}

export const Tusmo: FunctionComponent<{ wordToFind: string }> = ({ wordToFind }) => {
  const [input, setInput] = useState<string>('')

  const [progress, setProgress] = useState<UserTry[]>([])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => handleKeyboard(e, [input, setInput], wordToFind, [progress, setProgress]),
    [input, progress, wordToFind]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, true)
    return () => document.removeEventListener('keydown', handleKeyPress, true)
  }, [handleKeyPress])

  return (
    <div>
      <h1 style={{ userSelect: 'none' }}>TUSMO</h1>
      {progress.map((userTry, key) => (
        <InputRow
          key={`input-row-${key}`}
          wordToFind={wordToFind}
          input={userTry.input}
          letterStatelist={userTry.state}
        />
      ))}
      <InputRow
        wordToFind={wordToFind}
        input={input}
      />
    </div>
  )
}
