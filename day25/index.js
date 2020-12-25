const input = require('../filereader.js').readFile('\n', true)

const SUB = 7,
  DIVISOR = 20201227,
  INIT = 1

const calcLoopSize = (key) => {
  var value = INIT
  var loop = 0

  while (value != key) {
    value = (value * SUB) % DIVISOR
    loop++
  }

  return loop
}

// console.log(input)

const cardLoopSize = calcLoopSize(input[0])
const doorLoopSize = calcLoopSize(input[1])

// console.log(cardLoopSize, doorLoopSize)

const handshake = (key, loopSize) => {
  var value = INIT,
    i = 0

  while (i < loopSize) {
    value = (value * key) % DIVISOR
    i++
  }

  return value
}

const cardSecretKey = handshake(input[0], doorLoopSize)
const doorSecretKey = handshake(input[1], cardLoopSize)

// console.log(cardSecretKey, doorSecretKey)
console.log(cardSecretKey === doorSecretKey, cardSecretKey)
