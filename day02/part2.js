const input = require('../filereader.js').readFile("\n", false);

var count = 0;

for (let i = 0; i < input.length; i++) {
    let spliter = input[i].split(":");

    let char = spliter[0][spliter[0].length - 1];
    let numbers = spliter[0].split(" ")[0].split("-");

    let f = spliter[1].trim()[numbers[0] - 1] == char;
    let l = spliter[1].trim()[numbers[1] - 1] == char;

    count += f ^ l;
}

console.log(count);