const input = require('../filereader.js').readFile('\n', false);

const ENTER = 13;
var count = 0;
var answered = [];

for (let i = 0; i < input.length; i++) {
    if (input[i].charCodeAt(0) === ENTER || i === input.length - 1) {
        count += answered.length;
        answered = [];
        continue;
    }

    for (let j = 0; j < input[i].trim().length; j++) {
        answered.includes(input[i][j]) ? null : answered.push(input[i][j]);
    }
}

console.log(count);