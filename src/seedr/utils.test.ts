import { selectRandom, randomProse, sentenceFormatter } from './utils'

describe('selectRandom', () => {
  describe('given array containing one string', () => {
    it('returns the given string', () => {
      expect(selectRandom(['a'])).toBe('a')
    })
  })

  describe('given array containing multiple strings', () => {
    it('returns one of the strings', () => {
      const sourceArray = ['a', 'b', 'c']
      const result = selectRandom(sourceArray)
      expect(sourceArray.includes(result)).toBe(true)
    })
  })
})

describe('sentenceFormatted', () => {
  describe('when the given index is 0', () => {
    it('makes the first letter of the first word in a sentence uppercase', () => {
      expect(sentenceFormatter("bleep", 0)).toBe(
        "Bleep"
      )
    })
  })

  describe('when the given index is not 0', () => {
    it('makes the first letter of the first word in a sentence uppercase', () => {
      expect(sentenceFormatter("bloop", 4)).toBe(
        "bloop"
      )
    })
  })
})

describe('randomProse', () => {
  it('makes convincing looking prose', () => {
    const manyBitsOfProse = Array(50).fill(null).map(randomProse)

    // Starts with a capital letter
    // followed by any amount of letters and whitespace
    // followed by punctuation
    // followed by whitespace
    // eg '[I saw one of the babies. ]It looked at me.' one match
    // 'dinosaurs are old' no matches
    // 'Dinosaurs are old' no matches
    // 'Dinosaurs are old.' no matches
    // '[Dinosaurs are old. ]They are all kill' one match
    const sentenceRegex = /[A-Z][a-z\s]+[.|?|!]\s/g

    expect(manyBitsOfProse.every((prose) => 
      prose.match(sentenceRegex)
    )).toBe(true)
  })
})
