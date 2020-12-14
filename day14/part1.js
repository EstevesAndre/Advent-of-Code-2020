const input = require('../filereader.js').readFile('\n', false);

const MASK_SIZE = 36;

var mask0 = [];
var mask1 = [];
var mem = new Map();

for (line of input) {
    if (line.startsWith("mask")) {
        const mask = line.slice(7).trim();
        mask0 = mask.replace(/X/g, "1").split("").map(Number);
        mask1 = mask.replace(/X/g, "0").split("").map(Number);
        continue;
    }

    const addr = parseInt(line.slice(4, line.indexOf("]")));
    const value = (line.slice(line.indexOf("=") + 1).trim() >>> 0).toString(2).padStart(MASK_SIZE, "0").split("").map(Number);

    mem.set(addr, parseInt(value.map((v, i) => (v | mask1[i]) & mask0[i]).join(""), 2));
}

console.log([...mem.values()].reduce((a, b) => a + b));
