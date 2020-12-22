const input = require('../filereader.js').readFile('\r\n', false)

var p1 = input.slice(1, input.length / 2).map(Number)
var p2 = input.slice(input.length / 2 + 1).map(Number)

const game = (p1, p2) => {
  const d1 = new Set(),
    d2 = new Set()

  while (p1.length > 0 && p2.length > 0) {
    const d1pre = p1.join()
    const d2pre = p2.join()
    if (d1.has(d1pre) && d2.has(d2pre)) return { isP1: true, deck: p1 }

    d1.add(d1pre)
    d2.add(d2pre)

    const a = p1.shift(),
      b = p2.shift()

    const p1WinRound =
      a <= p1.length && b <= p2.length
        ? game(p1.slice(0, a), p2.slice(0, b)).isP1
        : a > b

    p1WinRound ? p1.push(a, b) : p2.push(b, a)
  }

  return p1.length > 0 ? { isP1: true, deck: p1 } : { isP1: false, deck: p2 }
}

const { deck } = game(p1, p2)

const result = deck.reverse().reduce((acc, val, i) => acc + val * (i + 1))

console.log(result)
