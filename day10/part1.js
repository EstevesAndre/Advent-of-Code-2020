const input = require('../filereader.js').readFile('\n', true).sort(function (a, b) { return a - b });

var jolt_1 = input[0] === 1 ? 1 : 0, jolt_3 = input[0] === 3 ? 1 : 0;

for (let i = 1; i < input.length; i++) {
    const jolt = input[i] - input[i - 1];
    jolt === 1 ? jolt_1++ : jolt_3++;
}

jolt_3++;

console.log(jolt_1, jolt_3, jolt_1 * jolt_3);