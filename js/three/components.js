import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

export function getLight(position, intensity = 1.5, color = 'white') {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    return light;
}

export function getCamera(position, aspect = 1, far = 50) {
    const fov = 75;
    const near = 0.1;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(...position);
    return camera;
}

export function getControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();
    return controls;
}

export function getScene(...objects) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
    objects.forEach(o => scene.add(o));
    return scene;
}

export function getDiv(i) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = i + 1;
    div.append(p);

    return div;
}

export function center(o) {
    new THREE.Box3().setFromObject(o).getCenter(o.position).multiplyScalar(- 1);
    o.position.x+=0.001;
    const group = new THREE.Group();
    group.add(o);
    return group;
}