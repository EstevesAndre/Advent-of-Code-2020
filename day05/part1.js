const input = require('../filereader.js').readFile('\n', false);

var highest = 0;

for (let i = 0; i < input.length; i++) {
    const row = input[i].substring(0, 7).replace(/F/g, '0').replace(/B/g, '1');
    const column = input[i].substring(7).replace(/L/g, '0').replace(/R/g, '1');

    const seat = parseInt(row, 2) * 8 + parseInt(column, 2);

    highest = highest > seat ? highest : seat;
}

// OR (simplified)
var max = 0;

for (line of input) {
    const seatId = parseInt(line.replace(/F|L/g, 0).replace(/B|R/g, 1), 2);
    max = seatId > max ? seatId : max;
}

console.log(highest, max);