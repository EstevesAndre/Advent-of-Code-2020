var input = require('../filereader.js').readFile('\n\r', false)

var rules = new Map()
var messages = input[1]
  .split('\n')
  .slice(1)
  .map((m) => m.trim())

input[0].split('\n').forEach((rule) => {
  const sep = rule.split(':')
  const ruleN = parseInt(sep[0])

  if (sep[1].includes('"')) {
    rules.set(ruleN, sep[1].trim().split('"')[1])
  } else {
    var matches = []
    sep[1]
      .split('|')
      .forEach((match) => matches.push(match.trim().split(' ').map(Number)))
    rules.set(ruleN, matches)
  }
})

rules.set(8, [[42], [42, 8]])
rules.set(11, [
  [42, 31],
  [42, 11, 31],
])

var cache = new Map()

const regex = (i) => {
  if (cache.has(i)) return cache.get(i)

  const ors = []
  var ret = ''

  if (i === 8) {
    ret = `${regex(42)}+`
  } else if (i === 11) {
    const left = regex(42)
    const right = regex(31)
    var ll = '',
      rr = ''
    for (var j = 0; j < 4; j++) {
      ll += left
      rr += right
      ors.push(ll + rr)
    }
    ret = `(?:${ors.join('|')})`
  } else {
    for (const rule of rules.get(i)) {
      var re = ''
      for (const child of rule) {
        re += Number.isInteger(child) ? regex(child) : child
      }
      ors.push(re)
    }
    ret = ors.length == 1 ? ors[0] : `(?:${ors.join('|')})`
  }

  cache.set(i, ret)

  return ret
}

console.time('Time')
const rexText = regex(0)
const rex = new RegExp(`^${rexText}$`, 'u')
const ret = messages.filter((m) => rex.test(m)).length
console.timeEnd('Time')

console.log('Solution (regex):', ret)
