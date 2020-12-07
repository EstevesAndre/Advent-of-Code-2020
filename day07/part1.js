const input = require('../filereader.js').readFile('\n', false);

const requestedBag = "shiny gold";
var rules = new Map();

input.forEach(rule => {
    const splited = rule.split(" bags contain");
    if (!splited[1].includes("no other bags")) {
        splited[1].split(",").map(elem => elem.trim().slice(elem.indexOf(" ") + 1, elem.indexOf(" bag")).trim()).forEach(elem =>
            rules.has(elem) ? rules.set(elem, new Set([...rules.get(elem), splited[0]])) : rules.set(elem, new Set([splited[0]]))
        );
    }
})

const dfs = (node) => {
    visited.add(node);
    if (!rules.has(node)) return;

    rules.get(node).forEach(elem => dfs(elem));
}

var visited = new Set();
dfs(requestedBag);

console.log(visited.size - 1);
