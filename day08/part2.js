const input = require('../filereader.js').readFile('\n', false);

var instructionsExecutedIds = new Set();
var accumulator = 0;

const doesItFix = (i) => {
    var setAux = new Set(instructionsExecutedIds.values());
    var accAux = accumulator;

    for (; i < input.length; i++) {
        if (setAux.has(i)) return false;
        else setAux.add(i);

        const instruction = input[i].slice(0, 3);
        const value = parseInt(input[i].slice(4));

        if (instruction === "acc") accAux += value;
        else if (instruction === "jmp") i += (value - 1);
    }

    accumulator = accAux;
    return true;
}


for (let i = 0; i < input.length; i++) {
    if (instructionsExecutedIds.has(i)) break;
    else instructionsExecutedIds.add(i);

    const instruction = input[i].slice(0, 3);
    const value = parseInt(input[i].slice(4));

    if (instruction === "acc") accumulator += value;
    else if (instruction === "jmp") {
        // Does it fix it was nop instruction (i + 1)
        if (doesItFix(i + 1)) break;
        else i += (value - 1);
    } else if (instruction === "nop") {
        // Does it fix it was nop instruction (i + value)
        if (doesItFix(i + value)) break;
    }
}

console.log(accumulator);