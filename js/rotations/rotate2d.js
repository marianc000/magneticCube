import { equals } from '../test/assert.js';

export function rotate90(ar, times=1) {
    for (let i = 0; i < times; i++)
        ar = ar[0].map((val, index) => ar.map(row => row[index]).reverse());
    return ar;
}

const ar1 = [
    ['a', 'b'],
    ['0', 'c'],
    ['0', 'd']
];

const ar2 = [
    ['0', '0', 'a'],
    ['d', 'c', 'b']
];

const ar3 = [
    ['d', '0'],
    ['c', '0'],
    ['b', 'a']
];

const ar4 = [
    ['b', 'c', 'd'],
    ['a', '0', '0']
];


equals(rotate90(ar1), ar2);
equals(rotate90(ar2), ar3);
equals(rotate90(ar3), ar4);
equals(rotate90(ar4), ar1);
