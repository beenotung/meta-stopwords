export function loadAll() {
  let stopWords = new Set<string>()

  function addStopWord(word: string, type = 'string') {
    if (typeof word !== 'string') {
      throw new TypeError('expected type:' + type)
    }
    stopWords.add(word)
  }

  function addStopWordArray(words: string[]) {
    words.forEach(word => addStopWord(word, 'Array<string>'))
  }

  function addStopWordObject(words: Record<string, string[]>) {
    Object.values(words).forEach(words => {
      if (!Array.isArray(words)) {
        throw new TypeError('expect Record<string, string[]>')
      }
      words.forEach(word => addStopWord(word, 'Record<string, string[]>'))
    })
  }

  require('n-stopwords')()
    .getStopWords()
    .forEach((item: any) => addStopWordArray(item.data))

  addStopWordObject(require('stopwords-json'))

  addStopWordArray(require('is-stopword').getStopwords())
  ;(function () {
    let { removeStopwords, ...langs } = require('stopword')
    addStopWordObject(langs)
  })()

  addStopWordArray(require('nltk-stopwords').load('english'))
  addStopWordObject(require('stopwords-iso'))

  addStopWordArray(require('vietnamese-stopwords'))

  return stopWords
}
