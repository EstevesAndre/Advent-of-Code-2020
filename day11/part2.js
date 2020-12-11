var input = require('../filereader.js').readFile('\n', false);

const OCC = '#';
const FLOOR = '.';
const FREE = 'L';

const directions = new Map([
    ["LEFT", [0, -1]],
    ["RIGHT", [0, 1]],
    ["TOP", [-1, 0]],
    ["BOTTOM", [1, 0]],
    ["TOP_LEFT", [-1, -1]],
    ["TOP_RIGHT", [-1, 1]],
    ["BOTTOM_LEFT", [1, -1]],
    ["BOTTOM_RIGHT", [1, 1]],
]);

const checkOccupiedSides = (list, i, j) => {
    var count = 0;

    for (let [_, v] of directions) {
        for (let l = i + v[0], m = j + v[1]; l >= 0 && l < list.length && m >= 0 && m < list[i].length; l += v[0], m += v[1]) {
            if (list[l][m] === FLOOR)
                continue;
            if (list[l][m] === OCC) {
                count++;
                break;
            } else if (list[l][m] === FREE)
                break;
        }
    }

    return count;
}

var cond = false;

do {
    var update = input.slice();
    cond = false;

    for (const [i, line] of input.entries()) {
        for (let j = 0; j < line.trim().length; j++) {
            if (line[j] === '.') continue;
            const count = checkOccupiedSides(input, i, j);
            if (line[j] === 'L' && count === 0) {
                update[i] = update[i].substr(0, j) + '#' + update[i].substr(j + 1);
                cond = true;
            }
            if (line[j] === '#' && count >= 5) {
                update[i] = update[i].substr(0, j) + 'L' + update[i].substr(j + 1);
                cond = true;
            }
        }
    }

    input = update;
} while (cond);

var count = 0;
for (const line of input.entries())
    count += (String(line).match(new RegExp("#", "g")) || []).length;

console.log(count);
