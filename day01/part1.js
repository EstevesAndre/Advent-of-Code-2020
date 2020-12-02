const input = require('../filereader.js').readFile();
const sum = 2020;

for (let i = 0; i < input.length; i++) {
    let val1 = input[i];
    for (let j = i + 1; j < input.length; j++) {
        let val2 = input[j];

        if (val1 + val2 == sum) {
            console.log(val1 + " * " + val2 + " = " + val1 * val2);
            return;
        }
    }
}