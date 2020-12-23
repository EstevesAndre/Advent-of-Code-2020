const LinkedList = require('./LinkedList')
const input = require('../filereader.js').readFile('\n', false)

const MAX_VALUE = 1000000
const ROUNDS = 10000000

const parseInput = () => {
  return input[0].split('').map(Number)
}

const mod = (a, b) => {
  const x = a % b
  return x < 0 ? x + b : x
}

const getDestination = (picked, start, len, sub = 1) => {
  let dest = mod(start - sub, len + 1)
  return picked.includes(dest) || dest === 0
    ? getDestination(picked, start, len, sub + 1)
    : dest
}

const crabGame = () => {
  var cups = parseInput().concat(
    Array.from({ length: MAX_VALUE - 9 }, (_, i) => i + 10)
  )

  const len = cups.length
  const links = new Map()
  cups.forEach((num, i) => links.set(num, cups[(i + 1) % len]))

  var i = 0,
    curr = cups[i]

  const picked = new Array(3)

  while (i < ROUNDS) {
    picked[0] = links.get(curr)
    picked[1] = links.get(picked[0])
    picked[2] = links.get(picked[1])
    links.set(curr, links.get(picked[2]))

    const destination = getDestination(picked, curr, len)
    const end = links.get(destination)
    links.set(destination, picked[0])
    links.set(picked[2], end)

    curr = links.get(curr)
    i++
  }

  const v1 = links.get(1)
  const v2 = links.get(v1)
  return v1 * v2
}

console.time('Time')
const result = crabGame()
console.timeEnd('Time')
console.log('Result:', result)
