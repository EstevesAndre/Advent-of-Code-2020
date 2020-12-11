var input = require('../filereader.js').readFile('\n', false);

const checkOccupiedSides = (list, i, j) => {
    var count = 0;
    const chr = '#';

    if (i != 0 && j != 0 && list[i - 1][j - 1] === chr) count++; // top left
    if (i != 0 && list[i - 1][j] === chr) count++; // top
    if (i != 0 && j != list[i].length - 1 && list[i - 1][j + 1] === chr) count++; // top right
    if (j != 0 && list[i][j - 1] === chr) count++; // left
    if (j != list[i].length - 1 && list[i][j + 1] === chr) count++; // right
    if (i != list.length - 1 && j != 0 && list[i + 1][j - 1] === chr) count++; // bottom left
    if (i != list.length - 1 && list[i + 1][j] === chr) count++; // bottom
    if (i != list.length - 1 && j != list[i + 1].length - 1 && list[i + 1][j + 1] === chr) count++; // bottom right

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
            if (line[j] === '#' && count >= 4) {
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
