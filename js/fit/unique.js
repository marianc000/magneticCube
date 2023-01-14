import { allUniqueRotations } from '../rotations/rotations.js';
 
function removeRotationsFromArray(ar, { cube }) {
    const rotations = allUniqueRotations(cube).map(o => JSON.stringify(o));
    return ar.filter(v => !rotations.includes(v.str));
}

export function removeRotations (cubes) {
    cubes.forEach(o => o.str = JSON.stringify(o.cube));

    let unique = [];

    while (cubes.length > 0) {
        const o = cubes[0];
        unique.push(o);
        cubes = removeRotationsFromArray(cubes, o);
    }

    unique.forEach(o => delete o.str);
    return unique;
}
