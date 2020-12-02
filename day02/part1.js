const input = require('../filereader.js').readFile("\n", false);

var count = 0;

for (let i = 0; i < input.length; i++) {
    let spliter = input[i].split(":");

    let char = spliter[0][spliter[0].length - 1];
    let numbers = spliter[0].split(" ")[0].split("-");

    let counter = (spliter[1].match(new RegExp(char, "g")) || []).length;

    if (counter >= numbers[0] && counter <= numbers[1])
        count++;
}

console.log(count);