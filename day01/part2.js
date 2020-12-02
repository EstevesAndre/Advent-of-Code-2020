const input = require('../filereader.js').readFile();
const sum = 2020;

for (let i = 0; i < input.length; i++) {
    let val1 = input[i];
    for (let j = i + 1; j < input.length; j++) {
        let val2 = input[j];
        for (let k = j + 1; k < input.length; k++) {
            let val3 = input[k];

            if (val1 + val2 + val3 == sum) {
                console.log(val1 + " * " + val2 + " * " + val3 + " = " + val1 * val2 * val3);
                return;
            }
        }
    }
}