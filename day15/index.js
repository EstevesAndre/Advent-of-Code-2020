const input = "1,12,0,20,8,16".split(",").map(Number);

const getLastSpoken = (round) => {
    var turn = input.length;
    var lastSpoken = input[input.length - 1];
    var turns = new Map();

    input.forEach((v, i) => turns.set(v, [i + 1]));

    do {
        turn++;

        const t = turns.get(lastSpoken);
        var newV = t.length === 1 ? 0 : t[1] - t[0];

        turns.has(newV) ?
            turns.set(newV, turns.get(newV).slice(-1).concat(turn))
            : turns.set(newV, [turn]);

        lastSpoken = newV;
    } while (turn < round);

    return lastSpoken;
}

console.time("Time")
console.log(getLastSpoken(2020));
console.timeEnd("Time")

console.time("Time")
console.log(getLastSpoken(30000000));
console.timeEnd("Time")
