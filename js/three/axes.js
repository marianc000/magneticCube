import * as THREE from 'three';

class AxesHelper extends THREE.LineSegments {

    constructor(size = 3) {

        const vertices = [
            //0-x
            0, 0, 0, size, 0, 0,
            0, 1, 0, size, 1, 0,
            0, 2, 0, size, 2, 0,

            //0-y
            0, 0, 0, 0, size, 0,
            0, 0, 1, 0, size, 1,
            0, 0, 2, 0, size, 2,

            1, 0, 0, 1, size, 0,
            2, 0, 0, 2, size, 0,

            //0-z
            0, 0, 0, 0, 0, size,
            0, 1, 0, 0, 1, size,
            0, 2, 0, 0, 2, size,


        ];

        const colors = [
            1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0,
            
            0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0,

            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1


        ];

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.LineBasicMaterial({ vertexColors: true, toneMapped: false });

        super(geometry, material);

        this.type = 'AxesHelper';

    }
 

    dispose() {

        this.geometry.dispose();
        this.material.dispose();

    }

}


export { AxesHelper };