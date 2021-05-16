import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { loadAll } from './import'

let dir = join(__dirname, '..', 'data')
if (!existsSync(dir)) {
  mkdirSync(dir)
}
let file = join(dir, 'stopwords.json')
let stopWords = loadAll()
let text = JSON.stringify(Array.from(stopWords))
writeFileSync(file, text)
file = join('.', file.replace('..', ''))
console.log(`saved ${stopWords.size} stop words to ${file}`)
