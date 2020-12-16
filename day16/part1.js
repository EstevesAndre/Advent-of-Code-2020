const input = require("../filereader.js").readFile("\n\n", false);

var ranges = [];
var ticket = [];
var tickets = [];

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

var errorV = [];

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
  for (let i = 0; i < ticket.length; i++) {
    if (!numInRange(ticket[i])) {
      errorV.push(ticket[i]);
      break;
    }
  }
});

console.log(errorV.reduce((acc, curr) => acc + curr));
