import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

export function makeBlock(ar, color = 'yellow', options = {}) {
   
    const material = new THREE.MeshPhongMaterial(Object.assign({ color,shininess: 60 }, options));
    const group = new THREE.Group();
    ar.forEach((ys, x) => ys.forEach((zs, y) => zs.forEach((v, z) => {
        if (v) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            group.add(cube);
        }
    })));

    return group;
}