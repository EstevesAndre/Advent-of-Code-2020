const input = require('../filereader.js').readFile('\n', false)

const MAX_VALUE = 9
const ROUNDS = 100

const parseInput = () => {
  return input[0].split('').map(Number)
}

const crabGame = () => {
  var cups = parseInput()
  var curr = { index: 0, value: cups[0] }

  var i = 0
  while (i < ROUNDS) {
    const rem = new Set(cups.splice(curr.index + 1, 3))
    var destination = curr.value - 1 === 0 ? MAX_VALUE : curr.value - 1
    while (rem.has(destination)) {
      destination--
      if (destination === 0) destination = MAX_VALUE
    }

    cups.splice(cups.indexOf(destination) + 1, 0, ...Array.from(rem))
    const newIndex = (cups.indexOf(curr.value) + 1) % MAX_VALUE
    curr = { index: newIndex, value: cups[newIndex] }

    if (curr.index >= MAX_VALUE - 3) {
      cups = [...cups.slice(MAX_VALUE - 4), ...cups.slice(0, MAX_VALUE - 4)]
      curr.index = cups.indexOf(curr.value)
    }
    i++
  }

  return cups.join('').split('1').reverse().join('')
}

console.time('Time')
const result = crabGame()
console.timeEnd('Time')
console.log('Result:', result)
