const input = require('../filereader.js').readFile('\n', false);

const getFoundTrees = (slopeR, slopeD) => {
    var index = 0;
    var counter = 0;

    for (let i = slopeD; i < input.length; i += slopeD) {
        const inS = input[i].trim();
        index += slopeR;

        if (index >= inS.length - 1) {
            index %= inS.length;
        }

        counter += (inS[index] == '#' ? 1 : 0);
    }

    return counter;
}

const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

var trees = [];

slopes.forEach(slope => {
    trees.push(getFoundTrees(slope[0], slope[1]));
});

console.log(trees, "*=", trees.reduce((a, b) => a * b));
