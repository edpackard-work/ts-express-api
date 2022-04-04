import randomWords, { Options, WordFormatter } from 'random-words'

export const selectRandom = <arrEl>(pool: arrEl[]): arrEl => {
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}

export const titlize = (word: string): string =>
  word.slice(0, 1).toUpperCase().concat(word.slice(1))

export const sentenceFormatter: WordFormatter = (word, index) => {
  return index === 0 ? titlize(word) : word
}

export const randomTitle = (options?: Options) =>
  randomWords({
    min: 1,
    max: 3,
    formatter: (word) => titlize(word),
    join: ' ',
    ...options,
  })

export const randomProse = (options?: Options): string => {
  // min and max define the number of sentences
  return randomWords({
    min: 3,
    max: 7,
    wordsPerString: Math.floor(5 + Math.random() * 20),
    join: selectRandom(['. ', '! ', '? ']),
    formatter: sentenceFormatter,
    ...options,
  })
}

export const randomNumber = ({
  min,
  max,
  postfixPool
}: {
  min?: number
  max: number,
  postfixPool?: number[]
}): number => Math.floor(Math.random() * max + (min || 0)) + (postfixPool ? selectRandom(postfixPool) : 0)
