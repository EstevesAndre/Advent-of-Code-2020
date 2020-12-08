const input = require('../filereader.js').readFile('\n', false);

var instructionsExecutedIds = new Set();
var accumulator = 0;

for (let i = 0; i < input.length; i++) {
    if (instructionsExecutedIds.has(i)) break;
    else instructionsExecutedIds.add(i);
    
    const instruction = input[i].slice(0,3);
    const value = parseInt(input[i].slice(4));

    if (instruction === "acc") accumulator += value;
    else if (instruction === "jmp") i += (value - 1);
}

console.log(accumulator);