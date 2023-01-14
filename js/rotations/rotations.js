import { rotateZ } from './z.js';
import { rotateY } from './y.js';
import { rotateX } from './x.js';


function rotate(block, [x, y, z]) {
    block = rotateX(block, x);
    block = rotateY(block, y);
    return rotateZ(block, z);
}

function possibleRotations() {
    const TIMES = 4;
    const rotations = [];
    for (let x = 0; x < TIMES; x++)
        for (let y = 0; y < TIMES; y++)
            for (let z = 0; z < TIMES; z++)
                rotations.push([x, y, z]);

    return rotations;
}

const rotations = possibleRotations();

export function allUniqueRotations(block) {

    const set = new Set(rotations.map(o => JSON.stringify(rotate(block, o))));
    return [...set].map(s => JSON.parse(s));
}