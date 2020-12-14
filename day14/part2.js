const input = require('../filereader.js').readFile('\n', false);

const MASK_SIZE = 36;

var mask = [];
var floats = [];
var mem = new Map();

for (line of input) {
    if (line.startsWith("mask")) {
        const m = line.slice(7).trim();
        mask = m.split("").map(Number);
        floats = [...m.matchAll(/X/g)].map(x => x.index)
        continue;
    }

    const addr = (line.slice(4, line.indexOf("]")).trim() >>> 0).toString(2).padStart(MASK_SIZE, "0").split("").map(Number);
    const value = parseInt(line.slice(line.indexOf("=") + 1).trim());

    const result = addr.map((v, i) => v | mask[i]);

    for (let i = 0; i < 2 ** floats.length; i++) {
        i.toString(2)
            .padStart(floats.length, "0")
            .split("")
            .forEach((v, i) => result[floats[i]] = Number(v))

        mem.set(parseInt(result.join(""), 2), value);
    }
}

console.log([...mem.values()].reduce((a, b) => a + b));
