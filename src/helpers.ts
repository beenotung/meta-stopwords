import { stopWords } from './stopwords'

export function isStopWord(word: string) {
  return stopWords.has(word)
}

export function isNotStopWord(word: string) {
  return !stopWords.has(word)
}

export function addStopWord(word: string) {
  stopWords.add(word)
}

export function removeStopWord(word: string) {
  stopWords.delete(word)
}

export function getStopWords() {
  return stopWords
}

type Options = {
  preserveStopWords?: boolean
}

let _segment: any
function getChineseSegment() {
  if (_segment) {
    return _segment
  }
  let Segment = require('novel-segment')
  _segment = new Segment()
  _segment.useDefault()
  return _segment
}

export function splitChineseText(text: string, options?: Options): string[] {
  let segment = getChineseSegment()
  let words = segment.doSegment(text, { simple: true })
  text = words.join(' ')
  return splitText(text, options)
}

export function splitText(text: string, options?: Options): string[] {
  let skipStopWords = !options?.preserveStopWords
  let words = [text]
  function split(char: string) {
    let res: string[] = []
    words.forEach(word => word.split(char).forEach(word => res.push(word)))
    words = res
  }
  split(' ')
  if (skipStopWords) {
    words = words.filter(isNotStopWord)
  }
  split(',')
  split('(')
  split(')')
  split('“')
  split('”')
  split('@')
  split('?')
  split(':')
  split(';')
  split('!')
  split('...')
  split('…')
  words = words
    .map(word =>
      word
        .replace(/\.$/, '')
        .replace(/"$/, '')
        .replace(/^"/, '')
        .replace(/'$/, '')
        .replace(/^'/, ''),
    )
    .filter(word => Number.isNaN(+word))
  if (skipStopWords) {
    words = words.filter(isNotStopWord)
  }
  return words
}
