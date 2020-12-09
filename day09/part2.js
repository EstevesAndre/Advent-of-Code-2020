const input = require("../filereader.js").readFile("\n");

const preamble = 25;
var invalid = 0;

const checkPossibleSum = (index, sum) => {
  for (let i = index - preamble; i < index; i++) {
    for (let j = i + 1; j < index; j++) {
      if (sum === input[i] + input[j]) return true;
    }
  }
  return false;
};

for (let i = preamble; i < input.length; i++) {
  if (!checkPossibleSum(i, input[i])) {
    invalid = input[i];
  }
}

var sum = 0;
var lowerIndex = 0;

for ([i, num] of input.entries()) {
  sum += num;

  while (sum > invalid) {
    sum -= input[lowerIndex];
    lowerIndex++;
  }

  if (sum == invalid) {
    const weakness = input.slice(lowerIndex, i + 1);
    console.log(Math.max(...weakness) + Math.min(...weakness));
    return;
  }
}
