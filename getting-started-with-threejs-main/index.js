import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75; // field of view, 75 degrees, 5 degrees would be narrow, 90 is wide.
const aspect = w / h; // typically the canvas width / height so that the scene is rendered without distortion
const near = 0.1; // anything closer than 0.1 will not be rendered
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 2; // move camera back 2 units
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// This gets one of the primitives from three.js, a basical material and a mesh
// which is a container for geometry and material
const geo = new THREE.IcosahedronGeometry(1, 2);
// const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // basic material doesn't interact with light
const mat = new THREE.MeshStandardMaterial({ 
    color: 0xff0000,
    flatShading: true
}); // needs a light in the scene.
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.003) // This is just to make the wireframe a bit bigger and stop flickering.
mesh.add(wireMesh);

// Add a light to the scene
const white = 0xFFFFFF;
const black = 0x000000;
const hemiLight = new THREE.HemisphereLight(white, black);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate); // This calls the animation recursively every second
    mesh.rotation.x += 0.001;
    mesh.rotation.y -= 0.001;
    controls.update();
    renderer.render(scene, camera);
}

animate()