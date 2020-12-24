const input = require('../filereader.js')
  .readFile('\n', false)
  .map((m) => m.trimEnd())

const hexs = new Map()

const moves = new Map([
  ['se', [1, 2]],
  ['sw', [-1, 2]],
  ['nw', [-1, -2]],
  ['ne', [1, -2]],
  ['e', [2, 0]],
  ['w', [-2, 0]],
])

input.forEach((line) => {
  var ref = line,
    c = '0',
    x = 0,
    y = 0

  for ([dir, to] of moves.entries()) {
    ref = ref.replace(new RegExp(dir, 'g'), c)
    var count = (ref.match(new RegExp(c, 'g')) || []).length

    x += to[0] * count
    y += to[1] * count

    c = String(parseInt(c) + 1)
  }

  const key = x + ',' + y

  if (hexs.has(key)) hexs.set(key, !hexs.get(key))
  else hexs.set(key, true)
})

console.log([...hexs.values()].filter((b) => b).length)
