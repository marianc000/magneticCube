import { equals } from '../test/assert.js';
import { rotate90 } from './rotate2d.js';
import { blocks } from '../input/blocks.js';

function splitY(ar) {
    const maxX = ar.length;
    const maxY = ar[0].length;
    const maxZ = ar[0][0].length;
    const r = [];

    for (let y = 0; y < maxY; y++) {
        const xs = [];
        for (let x = 0; x < maxX; x++) {
            const zs = [];
            for (let z = 0; z < maxZ; z++) {
                zs.push(ar[x][y][z]);
            }
            xs.push(zs);
        }
        r.push(xs);
    }

    return r;
}

function fuseY(ar) {
    const maxY = ar.length;
    const maxX = ar[0].length;
    const maxZ = ar[0][0].length;
    const xs = [];

    for (let x = 0; x < maxX; x++) {
        const ys = [];
        for (let y = 0; y < maxY; y++) {
            const zs = [];
            for (let z = 0; z < maxZ; z++) {
                zs.push(ar[y][x][z]);
            }
            ys.push(zs);
        }
        xs.push(ys);
    }
    return xs;
}

export function rotateY(block, times) {
    if (!times) return block;
    return fuseY(splitY(block).map(xz => rotate90(xz, times)));
}

const [{ block: block1 }, { block: block2 }] = blocks;
equals(fuseY(splitY(block2)), block2);
equals(fuseY(splitY(block1)), block1);