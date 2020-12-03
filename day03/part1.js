const input = require('../filereader.js').readFile('\n', false);

const slopeR = 3;
const slopeD = 1;
var index = 0;
var counter = 0;

for (let i = slopeD; i < input.length; i += slopeD) {
    index += slopeR;

    if (index >= input[i].length - 2) {
        index %= input[i].length - 1;
    }

    counter += (input[i][index] == '#' ? 1 : 0);
}

console.log(counter);