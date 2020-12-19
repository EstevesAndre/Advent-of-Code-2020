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
validMessages = dfs(0)

console.log(
  messages
    .map((m) => (validMessages.includes(m) ? 1 : 0))
    .reduce((a, b) => a + b)
)
