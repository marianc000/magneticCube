import * as THREE from 'three';
import results from './assembled.js';
import { getCamera, getControls, getScene, getLight, getDiv } from '../three/components.js';
import { makeCube } from '../three/cubes.js';
import { resizeRendererToDisplaySize } from '../three/resize.js';
import { index } from '../utils/utils.js';

import { Tail } from '../utils/Tail.js';

console.log(results);

const CANVAS_NUM = 16;
const tail = new Tail(CANVAS_NUM);

const freeRenderers = Array.from({ length: CANVAS_NUM }, () =>
  new THREE.WebGLRenderer({ canvas: document.createElement('canvas') })
);

const io = new IntersectionObserver(entries =>
  tail.add(...entries.filter(e => e.isIntersecting).map(e => index(e.target))),
  {
    trackVisibility: false
  });

const corner = [0, 2];
const corners = corner.flatMap(x => corner.flatMap(y => corner.map(z => ({ x, y, z }))));
 
const inside3 = [];
const corner3 = [];

results.forEach((o, i) => {
  const conerBlocks = corners.map(({ x, y, z }) => o.cube[x][y][z]);
  const conerBlock3 = conerBlocks.find(n => n === 3);
  if (conerBlock3) corner3.push(o);
  else inside3.push(o);
});

console.log("inside3, corner3", inside3, corner3);

const components = [...inside3, ...corner3].map(({ path }, i) => {
  const div = getDiv(i);
  canvasesDiv.append(div);

  const cube = makeCube(path);

  const scene = getScene(
    cube,
    getLight([4, 5, 6]),
    getLight([-4, -5, -6])
  );

  const camera = getCamera([2.5, 3, 3]);

  io.observe(div);

  return {
    div,
    scene,
    camera,
    cube
  }
});


function render({ scene, camera, cube, renderer }, time) {

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

    cube.rotation.x = time/5000;
    cube.rotation.y = time/3000; 
  //cube.rotation.z = time;
  renderer.render(scene, camera);
}

function renderAll(time) {

  const visibleIdxs = tail.getTail();

  components.filter((o, i) => o.renderer && !visibleIdxs.includes(i))
    .forEach(o => {
      freeRenderers.push(o.renderer);
      delete o.renderer;
      o.controls.dispose();
    });

  visibleIdxs.map(i => components[i])
    .forEach(o => {
      if (!o.renderer) {
        o.renderer = freeRenderers.pop();
        const canvas = o.renderer.domElement;
        o.div.append(canvas);
        o.controls = getControls(o.camera, canvas);
      }

      render(o, time);
    });

  requestAnimationFrame(renderAll);
}

requestAnimationFrame(renderAll);

