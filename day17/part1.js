var gen = require('generatorics');

const input = require('../filereader.js').readFile('\n', false).map(line => line.trim().split("").map(k => (k === '#' ? 1 : 0)));
const CYCLES = 6;

const baseDeltas = [...gen.clone.baseN([0, 1, -1])];
const deltas = baseDeltas.slice(1);

const surroundByEmptySpace = (arr) => {
    const h = arr.length + 2;
    const d = arr[0].length + 2;
    const w = arr[0][0].length + 2;

    return Array.from({ length: h }, (_, z) =>
        Array.from({ length: d }, (_, y) =>
            Array.from({ length: w }, (_, x) => arr[z - 1]?.[y - 1]?.[x - 1],
            ),
        ),
    );
}

const countNeighbours = (arr, z, y, x) => {
    var n = 0;
    deltas.forEach(([i, j, k]) => n += (arr[z + i]?.[y + j]?.[x + k]) ? 1 : 0);

    return n;
}

var space = surroundByEmptySpace([input])
var i = 0;

while (i < CYCLES) {
    const spaceCopy = JSON.parse(JSON.stringify(space));

    for (const [z, m] of spaceCopy.entries()) {
        for (const [y, l] of m.entries()) {
            for (const [x, v] of l.entries()) {
                const neighbours = countNeighbours(spaceCopy, z, y, x);
                if (v) {
                    space[z][y][x] = neighbours === 3 || neighbours === 2 ? 1 : 0;
                } else if (neighbours === 3)
                    space[z][y][x] = 1;
                else {
                    space[z][y][x] = 0;
                }
            }
        }
    }

    space = surroundByEmptySpace(space);
    i++;
}

console.log(space.flat(2).filter(v => v === 1).length);
