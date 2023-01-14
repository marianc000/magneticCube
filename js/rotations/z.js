import { equals } from '../test/assert.js';
import { rotate90 } from './rotate2d.js';
import { blocks } from '../input/blocks.js';

function splitZ(ar) {
    const maxX = ar.length;
    const maxY = ar[0].length;
    const maxZ = ar[0][0].length;
    const r = [];

    for (let z = 0; z < maxZ; z++) {
        const xs = [];
        for (let x = 0; x < maxX; x++) {
            const ys = [];
            for (let y = 0; y < maxY; y++) {
                ys.push(ar[x][y][z]);
            }
            xs.push(ys);
        }
        r.push(xs);
    }

    return r;
}

function fuseZ(ar) {
    const maxZ = ar.length;
    const maxX = ar[0].length;
    const maxY = ar[0][0].length;
    const xs = [];

    for (let x = 0; x < maxX; x++) {
        const ys = [];
        for (let y = 0; y < maxY; y++) {
            const zs = [];
            for (let z = 0; z < maxZ; z++) {
                zs.push(ar[z][x][y]);
            }
            ys.push(zs);
        }
        xs.push(ys);
    }

    return xs;
}

export function rotateZ(block, times = 1) {
    if (!times) return block;
    return fuseZ(splitZ(block).map(xy => rotate90(xy, times)));
}

const [{ block: block1 }, { block: block2 }] = blocks;
const sections2 = [[[1, 0]], [[1, 1]], [[1, 0]]];
equals(splitZ(block2), sections2);
equals(block2, fuseZ(sections2));

const sections1 =
    [[[1, 1], [0, 1]],// z x y
    [[1, 0], [0, 0]]];

equals(splitZ(block1), sections1);
equals(block1, fuseZ(sections1));


let block12 = [[[0, 0], [1, 1]], [[1, 0], [1, 0]]];
let block13 = [[[1, 0], [0, 0]], [[1, 0], [1, 1]]];
let block14 = [[[1, 0], [1, 0]], [[1, 1], [0, 0]]];

equals(block12, rotateZ(block1));
equals(block13, rotateZ(block12));
equals(block14, rotateZ(block13));
equals(block1, rotateZ(block14));


let block22 = [[[1, 1, 1]], [[0, 1, 0]]];
let block23 = [[[0, 1, 0], [1, 1, 1]]];
let block24 = [[[0, 1, 0]], [[1, 1, 1]]];

equals(block22, rotateZ(block2));
equals(block13, rotateZ(block12));
equals(block24, rotateZ(block23));
equals(block2, rotateZ(block24));