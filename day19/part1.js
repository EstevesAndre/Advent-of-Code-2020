const input = require('../filereader.js').readFile('\n\r', false)

var rules = new Map()
var validMessages = []
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

const dfs = (i) => {
  if (cache.has(i)) {
    return cache.get(i)
  }

  if (typeof rules.get(i) === 'string') {
    cache.set(i, [rules.get(i)])
    return [rules.get(i)]
  }

  cache.set(
    i,
    rules
      .get(i)
      .map((j) =>
        j.length === 1
          ? dfs(j[0])
          : [dfs(j[0]), dfs(j[1])]
              .reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e])))
              .map((z) => z.join(''))
      )
      .flat()
  )

  return cache.get(i)
}

var cache = new Map()

console.time('Time')
validMessages = dfs(0)
const res = messages.filter((m) => validMessages.includes(m)).length
console.timeEnd('Time')

console.log('Solution 1 (dfs):', res)

// Code enhancement (REGEX)
cache.clear()

const regex = (i) => {
  if (cache.has(i)) return cache.get(i)

  const ors = []
  var ret = ''

  for (const rule of rules.get(i)) {
    var re = ''
    for (const child of rule) {
      re += Number.isInteger(child) ? regex(child) : child
    }
    ors.push(re)
  }

  ret = ors.length == 1 ? ors[0] : `(?:${ors.join('|')})`

  cache.set(i, ret)

  return ret
}

console.time('Time')
const rexText = regex(0)
const rex = new RegExp(`^${rexText}$`, 'u')
const ret = messages.filter((m) => rex.test(m)).length
console.timeEnd('Time')

console.log('Solution 2 (regex):', ret)
