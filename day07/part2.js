const input = require('../filereader.js').readFile('\n', false);

const requestedBag = "shiny gold";
var rules = new Map();

input.forEach(rule => {
    const splited = rule.split(" bags contain");
    rules.set(splited[0],
        splited[1].includes("no other bags") ?
            [] :
            splited[1].split(",").map(elem =>
                [elem.trim().slice(elem.indexOf(" ") + 1, elem.indexOf(" bag")).trim(), parseInt(elem.trim())]
            )
    );
})

const getAmount = (bag) => {
    if (!rules.has(bag) || rules.get(bag).size == 0) return 1;
    // Hmm, okay x)
    const amount = rules.get(bag).map(elem => getAmount(elem[0]) * elem[1]).reduce((a, b) => a + b, 0);
    return amount + 1;
}

console.log(getAmount(requestedBag) - 1);
