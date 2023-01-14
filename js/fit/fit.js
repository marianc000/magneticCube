import { clone } from '../utils/utils.js';
import { cube } from './cube.js';
import { equals } from '../test/assert.js';
import { rotated } from '../input/rotatedBlocks.js';
import { removeRotations } from './unique.js';
 
function fit(cube, form, xf, yf, zf) {
    const cubeX = cube.length;
    const fMaxX = form.length;
    const fMaxY = form[0].length;
    const fMaxZ = form[0][0].length;

    if (xf + fMaxX > cubeX || yf + fMaxY > cubeX || zf + fMaxZ > cubeX)
        return

    for (let x = 0; x < fMaxX; x++)
        for (let y = 0; y < fMaxY; y++)
            for (let z = 0; z < fMaxZ; z++)
                if (cube[x + xf][y + yf][z + zf]) {
                    if (form[x][y][z])
                        return;
                } else cube[x + xf][y + yf][z + zf] = form[x][y][z];

    return cube;
}

function fitWherePossible(cubeWithPath, formIdx, rotationIdx) {

    const { cube, path } = cubeWithPath;
    const form = rotated[formIdx][rotationIdx];

    const cubeX = cube.length;
    const fMaxX = form.length;
    const fMaxY = form[0].length;
    const fMaxZ = form[0][0].length;

    const cubes = [];
    for (let x = 0; x <= cubeX - fMaxX; x++)
        for (let y = 0; y <= cubeX - fMaxY; y++)
            for (let z = 0; z <= cubeX - fMaxZ; z++) {
                const filledCube = fit(clone(cube), form, x, y, z);
                if (filledCube) {
                    const newPath = clone(path);
                    newPath.push({ x, y, z, formIdx, rotationIdx });
                    cubes.push({ cube: filledCube, path: newPath });
                }
            }

    return cubes;
}

const cubeWithoutForm1 = [[[5, 5, 5], [5, 5, 5], [5, 5, 5]], [[5, 5, 5], [0, 0, 5], [0, 5, 5]], [[5, 5, 5], [5, 5, 5], [0, 5, 5]]];
const cubeWithForm1 = [[[5, 5, 5], [5, 5, 5], [5, 5, 5]], [[5, 5, 5], [1, 1, 5], [1, 5, 5]], [[5, 5, 5], [5, 5, 5], [1, 5, 5]]];
equals(fitWherePossible({ cube: cubeWithoutForm1, path: [] }, 0, 0)[0].cube, cubeWithForm1);

function fitRotations(cube, formIdx) {
    return rotated[formIdx].flatMap((o,rotationIdx) => fitWherePossible(cube,formIdx,rotationIdx));
}

function run() {
    console.log(">run")
    console.time('start');
    let cubes = [{ cube: cube(), path: [] }];

    rotated.forEach((rotations, formIdx) => {
        console.log('>block', formIdx, cubes.length);

        const currentCubes = cubes;
        cubes = [];
        currentCubes.forEach(c => {
            cubes.push(...fitRotations(c, formIdx));
        });
       console.log('<block', formIdx, cubes.length);
        if (formIdx === 0)
            cubes = removeRotations(cubes);
    });
    console.timeEnd('start');//87014 96022
    console.log("cubes", cubes);
 
    console.log("cubes2", removeRotations(cubes ));
    console.log("cubes3", cubes.map(({ path }) => path));
}

setTimeout(run)