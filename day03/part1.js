const input = require('../filereader.js').readFile('\n', false);

const slopeR = 3;
const slopeD = 1;
var index = 0;
var counter = 0;

for (let i = slopeD; i < input.length; i += slopeD) {
    const inS = input[i].trim();
    index += slopeR;

    if (index >= inS.length - 1) {
        index %= inS.length;
    }

    counter += (inS[index] == '#' ? 1 : 0);
}

console.log(counter);