import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let controls, clock;
let raycaster, mouse;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

let score = 0;
let health = 100;
const scoreElement = document.getElementById('score');
const healthElement = document.getElementById('health');

init();
animate();

function init() {
    // Set up scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    // Set up camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up controls
    controls = new PointerLockControls(camera, document.body);

    document.addEventListener('click', () => {
        controls.lock();
    });

    controls.addEventListener('lock', function () {
        console.log('Pointer locked');
    });

    controls.addEventListener('unlock', function () {
        console.log('Pointer unlocked');
    });

    scene.add(controls.getObject());

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Set up raycaster and mouse for shooting
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Load textures and add objects to the scene
    const textureLoader = new THREE.TextureLoader();
    const boxTexture = textureLoader.load('path/to/texture.jpg');

    createComplexObject(boxTexture);

    // Set up event listener for shooting
    document.addEventListener('mousedown', onMouseDown, false);

    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', onWindowResize, false);
}

function createComplexObject(texture) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    scene.add(cube);
}

function onMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        scene.remove(intersectedObject);
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        createComplexObject(intersectedObject.material.map); // Create a new target with the same texture
    } else {
        health -= 10;
        healthElement.textContent = `Health: ${health}`;
        if (health <= 0) {
            alert('Game Over');
            resetGame();
        }
    }
}

function resetGame() {
    score = 0;
    health = 100;
    scoreElement.textContent = `Score: ${score}`;
    healthElement.textContent = `Health: ${health}`;
    // Remove all objects from the scene
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    // Recreate the initial objects
    const textureLoader = new THREE.TextureLoader();
    const boxTexture = textureLoader.load('path/to/texture.jpg');
    createComplexObject(boxTexture);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked === true) {
        const delta = clock.getDelta();
        const speed = 5 * delta;

        if (moveForward) controls.moveForward(speed);
        if (moveBackward) controls.moveBackward(speed);
        if (moveLeft) controls.moveRight(-speed);
        if (moveRight) controls.moveRight(speed);
    }

    renderer.render(scene, camera);
}
