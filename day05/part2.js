const input = require('../filereader.js').readFile('\n', false);

var seatList = [];

for (let i = 0; i < input.length; i++) {
    const row = input[i].substring(0, 7).replace(/F/g, '0').replace(/B/g, '1');
    const column = input[i].substring(7).replace(/L/g, '0').replace(/R/g, '1');

    const seat = parseInt(row, 2) * 8 + parseInt(column, 2);

    seatList.push(parseInt(seat,10));
}

seatList.sort(function(a, b){return a-b});

for (let i = 0;i < seatList.length; i++) {
    if (i != 0 && i != seatList.length -1)
        if (seatList[i] - seatList[i-1] == 2) {
            console.log(seatList[i] - 1);
            return;
        }
}
