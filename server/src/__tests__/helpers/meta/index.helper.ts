
let index = 100000;
const used: Array<number> = [0];

export function getIndex() {
    while (used.indexOf(index) !== -1) index++;
    used.push(index);
    return index;
}

