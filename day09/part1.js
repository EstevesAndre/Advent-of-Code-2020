const input = require("../filereader.js").readFile("\n");

const preamble = 25;

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
    console.log(input[i]);
    return;
  }
}
