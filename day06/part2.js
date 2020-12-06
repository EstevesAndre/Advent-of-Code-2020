const input = require('../filereader.js').readFile('\n', false);

const ENTER = 13;
var count = 0;
var answered = [];

const getSameCount = (str1, list) => {
    let sameCount = 0;
    var listChar = list.map(elem => elem.split(''));
    for (str of str1) {
        var auxCount = 0;
        listChar.forEach(obj => obj.findIndex(s => s === str) > -1 ? auxCount++ : null);
        if (auxCount == listChar.length) sameCount++;
    }
    return sameCount;
}

for (let i = 0; i < input.length; i++) {
    if (input[i].charCodeAt(0) === ENTER || i === input.length - 1) {
        answered.sort(function (a, b) { return a.length - b.length });
        count += answered.length == 1 ? answered[0].length : getSameCount(answered[0], answered.slice(1))
        answered = [];
        continue;
    }
    answered.push(input[i].trim().split('').sort().join(''));
}

console.log(count);