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

var varX = [0, 0]
var varY = [0, 0]

input.forEach((pos) => {
  const key = pos.join()

  if (hexs.has(key)) hexs.set(key, !hexs.get(key))
  else hexs.set(key, true)

  if (pos[0] < varX[0]) varX[0] = pos[0]
  else if (pos[0] > varX[1]) varX[1] = pos[0]

  if (pos[1] < varY[0]) varY[0] = pos[1]
  else if (pos[1] > varY[1]) varY[1] = pos[1]
})

varX[0] -= 2
varY[0] -= 2
varX[1] += 2
varY[1] += 2

const getAdjBCount = (hexs, x, y) => {
  var ret = 0
  for (const [xx, yy] of Object.values(neighbors)) {
    if (hexs.get(x + xx + ',' + (y + yy))) ret++
  }
  return ret
}

var day = 0
while (day < 100) {
  const hexsAux = new Map([...hexs.entries()])
  var newVarX = [...varX]
  var newVarY = [...varY]
  var alternator = (Math.abs(varY[0]) + 2) % 4 === 0 ? 1 : 0

  for (let y = varY[0]; y <= varY[1]; y += 2) {
    for (let x = varX[0] + alternator; x <= varX[1] + alternator; x += 2) {
      const adjC = getAdjBCount(hexsAux, x, y)
      if (hexsAux.get(x + ',' + y)) {
        if (adjC !== 1 && adjC !== 2) {
          hexs.set(x + ',' + y, false)
        }
      } else if (adjC === 2) {
        hexs.set(x + ',' + y, true)

        if (x % 2 === 0) {
          if (newVarX[0] === x) newVarX[0] = newVarX[0] - 2
          else if (newVarX[1] === x) newVarX[1] = newVarX[1] + 2
        } else {
          if (newVarX[0] === x - 1) newVarX[0] = newVarX[0] - 2
          else if (newVarX[1] === x - 1) newVarX[1] = newVarX[1] + 2
        }

        if (newVarY[0] === y) {
          newVarY[0] = y - 2
        } else if (newVarY[1] === y) {
          newVarY[1] = y + 2
        }
      }
    }
    alternator = alternator === 0 ? 1 : 0
  }
  day++

  varX = [...newVarX]
  varY = [...newVarY]
}

console.log([...hexs.values()].filter((b) => b).length)
