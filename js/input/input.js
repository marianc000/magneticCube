import * as THREE from 'three';
import { getCamera, getControls, getScene, getLight, center, getDiv } from '../three/components.js';
import { blocks } from '../input/blocks.js';
import { makeBlock } from '../three/blocks.js';
import { resizeRendererToDisplaySize } from '../three/resize.js';
import { AxesHelper } from '../three/axes.js';


const components = blocks.map(({ block, color }, i) => {
    const div = getDiv(i);
    const canvas = document.createElement('canvas');
    div.append(canvas);
    canvasesDiv.append(div);

    const renderer = new THREE.WebGLRenderer({ canvas });

    const piece = makeBlock(block, color, { opacity: 0.5, transparent: true, side: THREE.DoubleSide });

    const light = getLight([3, 4, 5]);
    const scene = getScene(
        piece,
        light,
        new AxesHelper(3)
    );

    const camera = getCamera([2, 2, 3]);

    getControls(camera, canvas);

    return {
        div,
        scene,
        camera,
        piece,
        renderer,
        light
    }
});

const inputs = [xInput, yInput, zInput];

inputs.forEach(i => i.addEventListener('change', adjustLight));

function adjustLight() {
    const p = inputs.map(i => parseInt(i.value));
    console.log("adjustLight", p);
    components.forEach(o => o.light.position.set(...p));
}


function render({ scene, camera, renderer }) {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
}

function renderAll(time) {
    components.forEach(render);

    requestAnimationFrame(renderAll);
}

requestAnimationFrame(renderAll);
