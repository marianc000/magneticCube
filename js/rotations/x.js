import { equals } from '../test/assert.js';
import { rotate90 } from './rotate2d.js';
import { blocks } from '../input/blocks.js';

function splitX(ar) {
    const maxX = ar.length;
    const maxY = ar[0].length;
    const maxZ = ar[0][0].length;
    const r = [];

    for (let x = 0; x < maxX; x++) {
        const ys = [];
        for (let y = 0; y < maxY; y++) {
            const zs = [];
            for (let z = 0; z < maxZ; z++) {
                zs.push(ar[x][y][z]);
            }
            ys.push(zs);
        }
        r.push(ys);
    }
    return r;
}

function fuseX(ar) {
    const maxX = ar.length;
    const maxY = ar[0].length;
    const maxZ = ar[0][0].length;
    const xs = [];

    for (let x = 0; x < maxX; x++) {
        const ys = [];
        for (let y = 0; y < maxY; y++) {
            const zs = [];
            for (let z = 0; z < maxZ; z++) {
                zs.push(ar[x][y][z]);
            }
            ys.push(zs);
        }
        xs.push(ys);
    }
    return xs;
}

export function rotateX(block, times) {
    if (!times) return block;
    return fuseX(splitX(block).map(zy =>rotate90(zy, times)));
}

const [{ block: block1 }, { block: block2 }] = blocks;
console.log(block1, block2);
equals(fuseX(splitX(block2)), block2);
equals(fuseX(splitX(block1)), block1);