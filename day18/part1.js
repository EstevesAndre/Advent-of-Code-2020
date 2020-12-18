const input = require('../filereader.js').readFile('\n', false)

var sum = 0

// precedence +:1, *:1
const getSum = (str, i) => {
  var t = 0,
    op = '',
    v = 0

  while (i < str.length) {
    if (str[i] === ' ') {
      op = str[i + 1]
      i += 2
    } else if (str[i] === '(') {
      var res

      if (op === '+') {
        res = getSum(str, i + 1)
        t += res[0]
      } else if (op === '*') {
        res = getSum(str, i + 1)
        t *= res[0]
      } else {
        res = getSum(str, i + 1)
        t = res[0]
      }

      i = res[1]
    } else if (str[i] === ')') {
      return [t, i]
    } else if ((v = Number(str[i]))) {
      if (op === '+') t += v
      else if (op === '*') t *= v
      else t = v
    }

    i++
  }

  return [t, i]
}

for (op of input) {
  sum += getSum(op.trim(), 0)[0]
}

console.log(sum)
