const input = require('../filereader.js').readFile('\n', false);

var waypoint_EW = 10;
var waypoint_NS = 1;
var EW = 0, NS = 0;

for (inst of input) {
    const value = parseInt(inst.slice(1));
    const ang = value * Math.PI / 180;

    switch (inst[0]) {
        case 'F':
            EW += value * waypoint_EW;
            NS += value * waypoint_NS;
            break;
        case 'N':
            waypoint_NS += value;
            break;
        case 'S':
            waypoint_NS -= value;
            break;
        case 'E':
            waypoint_EW += value;
            break;
        case 'W':
            waypoint_EW -= value;
            break;
        case 'L':
            const auxl = waypoint_EW * Math.round(Math.cos(ang)) - waypoint_NS * Math.round(Math.sin(ang));
            waypoint_NS = waypoint_NS * Math.round(Math.cos(ang)) + waypoint_EW * Math.round(Math.sin(ang));
            waypoint_EW = auxl;
            break;
        case 'R':
            const auxr = waypoint_EW * Math.round(Math.cos(-ang)) - waypoint_NS * Math.round(Math.sin(-ang));
            waypoint_NS = waypoint_NS * Math.round(Math.cos(-ang)) + waypoint_EW * Math.round(Math.sin(-ang));
            waypoint_EW = auxr;
            break;
    }
}

console.log(Math.abs(EW) + Math.abs(NS));