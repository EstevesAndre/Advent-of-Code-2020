const input = require('../filereader.js').readFile('\n', false);

var count = 0;
var password = [];
var contains = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

for (let i = 0; i < input.length; i++) {
    if (input[i] !== '\r') {
        input[i].trim().split(" ").forEach(elem => password.push(elem.substring(0, elem.indexOf(":"))));
    }
    
    if (input[i] === '\r' || i == input.length - 1) {
        // check password
        let valid = true;
        contains.forEach(code => {
            if (!password.includes(code)) {
                valid = false;
            } 
        });

        if (valid) count++;
        password = [];
    }
}

console.log(count);