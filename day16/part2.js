const input = require("../filereader.js").readFile("\n\n", false);

var ranges = [];
var ticket = [];
var tickets = [];
var validTickets = [];

input[0].split("\n").forEach((range) => {
  const aux = range.split(" or ");
  ranges.push([
    ...aux[0]
      .slice(aux[0].indexOf(":") + 1)
      .trim()
      .split("-")
      .map(Number),
    ...aux[1].trim().split("-").map(Number),
  ]);
});

ticket = input[1].split("\n")[1].split(",").map(Number);

input[2]
  .trim()
  .split("\n")
  .slice(1)
  .forEach((ticket) => tickets.push(ticket.trim().split(",").map(Number)));

const numInRange = (num) => {
  for (let i = 0; i < ranges.length; i++) {
    if (
      (num >= ranges[i][0] && num <= ranges[i][1]) ||
      (num >= ranges[i][2] && num <= ranges[i][3])
    )
      return true;
  }

  return false;
};

tickets.forEach((ticket) => {
  var valid = true;
  for (let i = 0; i < ticket.length; i++) {
    if (!numInRange(ticket[i])) {
      valid = false;
      break;
    }
  }

  if (valid) validTickets.push(ticket);
});

var ticketPositions = new Map();

var rangePossiblePositions = new Map();

for (const [i, range] of ranges.entries()) {
  var possible = new Set();

  for (const [j, _] of ranges.entries()) {
    var valid = true;
    for (const t of validTickets) {
      if (
        !(
          (t[j] >= range[0] && t[j] <= range[1]) ||
          (t[j] >= range[2] && t[j] <= range[3])
        )
      )
        valid = false;
    }

    if (
      !(
        (ticket[j] >= range[0] && ticket[j] <= range[1]) ||
        (ticket[j] >= range[2] && ticket[j] <= range[3])
      )
    )
      valid = false;

    if (valid) possible.add(j);
  }

  rangePossiblePositions.set(i, possible);
}

var orderedRange = new Map(
  [...rangePossiblePositions.entries()].sort((a, b) => a[1].size - b[1].size)
);

var assigned = [];

const orderedRangeSize = orderedRange.size;

for (let i = 0; i < orderedRangeSize; i++) {
  const newAssign = orderedRange.entries().next().value;

  assigned.push([newAssign[0], newAssign[1].values().next().value]);

  for (const [k, v] of orderedRange.entries()) {
    if (k === newAssign[0]) {
      orderedRange.delete(k);
    } else {
      v.delete(newAssign[1].values().next().value);
    }
  }
}

assigned.sort((a, b) => a[0] - b[0]);

console.log(
  assigned
    .slice(0, 6)
    .map(([i, k]) => ticket[k])
    .reduce((acc, cur) => acc * cur)
);
