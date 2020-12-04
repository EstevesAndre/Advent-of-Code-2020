const { parse } = require('path');

const input = require('../filereader.js').readFile('\n', false);

var count = 0;
var password = [];
var content = [];
var contains = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

for (let i = 0; i < input.length; i++) {
    if (input[i] !== '\r') {
        input[i].trim().split(" ").forEach(elem => {
            password.push(elem.substring(0, elem.indexOf(":")));
            content.push(elem.substring(elem.indexOf(":") + 1));
        });
    }

    if (input[i] === '\r' || i == input.length - 1) {
        let valid = true;

        for (let j = 0; j < contains.length; j++) {
            let code = contains[j];
            let index;

            if ((index = password.indexOf(code)) == -1) {
                valid = false;
                break;
            }
            else {
                switch (code) {
                    case "byr":
                        if (!(parseInt(content[index]) >= 1920 && parseInt(content[index]) <= 2002))
                            valid = false;
                        break;
                    case "iyr":
                        if (!(parseInt(content[index]) >= 2010 && parseInt(content[index]) <= 2020))
                            valid = false;
                        break;
                    case "eyr":
                        if (!(parseInt(content[index]) >= 2020 && parseInt(content[index]) <= 2030))
                            valid = false;
                        break;
                    case "hgt":
                        if (content[index].length >= 2) {
                            if (content[index].substring(content[index].length - 2) == "cm") {
                                if (!(parseInt(content[index]) >= 150 && parseInt(content[index]) <= 193)) {
                                    valid = false;
                                }
                            }
                            else if (content[index].substring(content[index].length - 2) == "in") {
                                if (!(parseInt(content[index]) >= 59 && parseInt(content[index]) <= 76)) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        } else {
                            valid = false;
                        }
                        break;
                    case "hcl":
                        if (content[index].length == 7 && content[index][0] == "#") {
                            const hair = content[index].substring(1);
                            for (let k = 0; k < hair.length; k++) {
                                if (!(["a", "b", "c", "d", "e", "f"].includes(hair[k]) || parseInt(hair[k]) !== NaN)) {
                                    valid = false;
                                    break;
                                }
                            }
                        } else {
                            valid = false;
                        }
                        break;
                    case "ecl":
                        const check = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                        if (!check.includes(content[index])) {
                            valid = false;
                        }
                        break;
                    case "pid":
                        if (content[index].length == 9) {
                            for (let k = 0; k < content[index].length; k++) {
                                if (parseInt(content[index][k]) == NaN) {
                                    valid = false;
                                    break;
                                }
                            }
                        } else {
                            valid = false;
                        }
                        break;
                }
            }

            if (valid == false) break;
        }

        if (valid) count++;
        password = [];
        content = [];
    }
}

console.log(count);