const input = require('../filereader.js').readFile('\r\n', false)

var p1 = input.slice(1, input.length / 2).map(Number)
var p2 = input.slice(input.length / 2 + 1).map(Number)

while (p1.length != 0 && p2.length != 0) {
  const c1 = p1.shift(),
    c2 = p2.shift()

  c1 > c2 ? p1.push(c1, c2) : p2.push(c2, c1)
}

var win = p1.length == 0 ? p2 : p1
const size = win.length

// const result = win.map((v, i) => (size - i) * v).reduce((a, b) => a + b)
const result = win.reverse().reduce((acc, val, i) => acc + val * (i + 1))

console.log(result)
