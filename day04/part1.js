const input = require('../filereader.js').readFile('\n', false);

const ENTER = 13;
var count = 0;
var password = [];
var required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

for (let i = 0; i < input.length; i++) {
    if (input[i] !== '\r') {
        input[i].trim().split(" ").forEach(elem => password.push(elem.substring(0, elem.indexOf(":"))));
    }

    if (input[i] === '\r' || i == input.length - 1) {
        // check password
        let valid = true;
        required.forEach(code => {
            if (!password.includes(code)) {
                valid = false;
            }
        });

        if (valid) count++;
        password = [];
    }
}

// OR (simplified)

var total = 0
password = [];

for (const [i, line] of input.entries()) {
    if (line.charCodeAt(0) !== ENTER) {
        line.trim().split(" ").forEach(elem => password.push(elem.substring(0, elem.indexOf(":"))));
    }

    if (line.charCodeAt(0) === ENTER || i === input.length - 1) {
        const missing = required.filter(r => !password.includes(r));
        total += missing.length === 0 ? 1 : 0;
        password = [];
        continue;
    }
}

console.log(count, total);