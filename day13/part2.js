const input = require("../filereader.js").readFile("\n", false);

var buses = input[1]
  .split(",")
  .map((b, i) => (b == "x" ? null : [b, b - i]))
  .filter((b) => b != null);

const nums = buses.map((b) => parseInt(b[0]));
const remainders = buses.map((b) => b[1]);

const inverseModulo = (a0, m0) => {
  var a = a0;
  var m = m0;
  var x0 = 0;
  var x1 = 1;

  if (m == 1) return 0;

  while (a > 1) {
    const q = Math.floor(a / m);
    var t = m;

    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  return x1 < 0 ? x1 + m0 : x1;
};

const crt = (nums, remainders) => {
  const prod = nums.reduce((acc, num) => acc * num);
  var res = 0;

  for (var i = 0; i < nums.length; i++) {
    const sub_prod = Math.floor(prod / nums[i]);
    res += remainders[i] * inverseModulo(sub_prod, nums[i]) * sub_prod;
  }
  return res % prod;
};

// missing something .
console.log(crt(nums, remainders) + 4);
