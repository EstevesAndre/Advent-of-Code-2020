const input = require('../filereader.js').readFile('\n', false);

const DIR = new Map([
    [0, [1, 0]],
    [1, [0, -1]],
    [2, [-1, 0]],
    [3, [0, 1]]
]);

var facing = 0;
var EW = 0, NS = 0;

for (inst of input) {
    const value = parseInt(inst.slice(1));

    switch (inst[0]) {
        case 'F':
            EW += value * DIR.get(facing)[0];
            NS += value * DIR.get(facing)[1];
            break;
        case 'N':
            NS += value;
            break;
        case 'S':
            NS -= value;
            break;
        case 'E':
            EW += value;
            break;
        case 'W':
            EW -= value;
            break;
        case 'L':
            facing -= value / 90;
            facing = facing == -1 ? 3 : facing == -2 ? 2 : facing == -3 ? 1 : facing;
            break;
        case 'R':
            facing = (facing + value / 90) % 4;
            break;
    }
}

console.log(Math.abs(EW) + Math.abs(NS));