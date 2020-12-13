const input = require("../filereader.js").readFile("\n", false);

const timestamp = parseInt(input[0]);

const bus = input[1]
  .split(",")
  .filter((b) => b != "x")
  .map((b) => [Math.ceil(timestamp / b) * b, b])
  .sort((a, b) => a[0] - b[0])[0];

console.log((bus[0] - timestamp) * bus[1]);
