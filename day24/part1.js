const neighbors = {
  se: [1, 2],
  sw: [-1, 2],
  nw: [-1, -2],
  ne: [1, -2],
  e: [2, 0],
  w: [-2, 0],
}

const input = require('../filereader.js')
  .readFile('\n', false)
  .map((line) =>
    line
      .match(/(se|sw|nw|ne|e|w)/g)
      .map((v) => neighbors[v])
      .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
  )

const hexs = new Map()

input.forEach((pos) => {
  const key = pos.join()

  if (hexs.has(key)) hexs.set(key, !hexs.get(key))
  else hexs.set(key, true)
})

console.log([...hexs.values()].filter((b) => b).length)
