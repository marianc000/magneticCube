import { allUniqueRotations } from '../rotations/rotations.js';
import { blocks } from './blocks.js';
import { makeBlock } from '../three/blocks.js';

export const rotated = blocks.map(({ block }, n) => allUniqueRotations(block)
    .map(o => JSON.parse(JSON.stringify(o).replaceAll('1', (n + 1))))); // need to number blocks to eliminte symetric cubes

console.log("rotated",blocks.map(({color},i)=> [color+" "+rotated[i].length] ).join(','));

export function getBlock(blockIdx, rotationIdx = 0) {
    return makeBlock(rotated[blockIdx][rotationIdx], blocks[blockIdx].color);
}