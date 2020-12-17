var gen = require('generatorics')

const input = require('../filereader.js')
  .readFile('\n', false)
  .map((line) =>
    line
      .trim()
      .split('')
      .map((k) => (k === '#' ? 1 : 0))
  )
const CYCLES = 6

const baseDeltas = [...gen.clone.baseN([0, 1, -1])]
const deltas4d = [...gen.clone.cartesian(baseDeltas, [0, 1, -1])]
  .map((x) => x.flat())
  .slice(1)

const surroundByEmptySpace4d = (arr) => {
  const s = arr.length + 2
  const h = arr[0].length + 2
  const d = arr[0][0].length + 2
  const w = arr[0][0][0].length + 2

  return Array.from({ length: s }, (_, t) =>
    Array.from({ length: h }, (_, z) =>
      Array.from({ length: d }, (_, y) =>
        Array.from(
          { length: w },
          (_, x) => arr[t - 1]?.[z - 1]?.[y - 1]?.[x - 1]
        )
      )
    )
  )
}

const countNeighbours4d = (arr, t, z, y, x) => {
  var n = 0
  deltas4d.forEach(
    ([h, i, j, k]) => (n += arr[t + h]?.[z + i]?.[y + j]?.[x + k] ? 1 : 0)
  )

  return n
}

var space = surroundByEmptySpace4d([[input]])
var i = 0

while (i < CYCLES) {
  const spaceCopy = JSON.parse(JSON.stringify(space))

  for (const [t, s] of spaceCopy.entries()) {
    for (const [z, m] of s.entries()) {
      for (const [y, l] of m.entries()) {
        for (const [x, v] of l.entries()) {
          const neighbours = countNeighbours4d(spaceCopy, t, z, y, x)
          if (v) {
            space[t][z][y][x] = neighbours === 3 || neighbours === 2 ? 1 : 0
          } else if (neighbours === 3) space[t][z][y][x] = 1
          else {
            space[t][z][y][x] = 0
          }
        }
      }
    }
  }

  space = surroundByEmptySpace4d(space)
  i++
}

console.log(space.flat(3).filter((v) => v === 1).length)
