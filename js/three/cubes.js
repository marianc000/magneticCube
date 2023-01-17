import * as THREE from 'three';
import { getBlock } from '../input/rotatedBlocks.js';
import {center} from './components.js';
const SPREAD = 1.025;

export function makeCube(path) {

  const group = new THREE.Group();

  path.forEach((o, i) => {
    const block = getBlock(o.formIdx, o.rotationIdx);
    block.position.set(o.x * SPREAD, o.y * SPREAD, o.z * SPREAD);
    group.add(block);
  });
 
  return center(group);
}

