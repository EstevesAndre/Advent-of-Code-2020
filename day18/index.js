const { get } = require('http')

const input = require('../filereader.js').readFile('\n', false)

const operations = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
}

const getValue = (expression, precedence) => {
  var ops = [],
    nums = []

  const calc = () => {
    const op = ops.pop()
    const numR = nums.pop()
    const numL = nums.pop()

    nums.push(operations[op](numL, numR))
  }

  var v

  for (const ch of expression) {
    if (ch === ' ') continue

    if ((v = Number(ch))) {
      nums.push(v)
      continue
    }

    if (ch === '(') {
      ops.push(ch)
      continue
    }

    if (ch === ')') {
      while (ops.length > 0 && ops[ops.length - 1] !== '(') {
        calc()
      }
      ops.pop()
      continue
    }

    while (
      ops.length > 0 &&
      precedence[ops[ops.length - 1]] >= precedence[ch]
    ) {
      calc()
    }

    ops.push(ch)
  }

  while (ops.length > 0) {
    calc()
  }

  return nums[0]
}

const precedence_p1 = { '+': 1, '*': 1 }
const precedence_p2 = { '+': 2, '*': 1 }

// part 1
console.log(
  'Part1: ',
  input
    .map((line) => getValue(line.trimEnd(), precedence_p1))
    .reduce((a, b) => a + b)
)

// part 2
console.log(
  'Part2: ',
  input
    .map((line) => getValue(line.trim(), precedence_p2))
    .reduce((a, b) => a + b)
)
