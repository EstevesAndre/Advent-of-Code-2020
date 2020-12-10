var input = require('../filereader.js').readFile('\n', true).sort(function (a, b) { return a - b });

input = [0, ...input, input[input.length - 1] + 3]

const dfs = (i) => {
    if (cache.has(i)) return cache.get(i);

    cache.set(i,
        [1, 2, 3].map(j => (i + j < input.length && input[i + j] <= input[i] + 3) ? dfs(i + j) : 0).reduce((a, b) => a + b, 0));

    return cache.get(i);
}

var cache = new Map([[input.length - 1, 1]]);
console.log(dfs(0));
