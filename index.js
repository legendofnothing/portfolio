const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    5,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

let model;
const mtlLoader = new THREE.MTLLoader();

mtlLoader.load('model.mtl', function (materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load('model.obj', function (obj) {
        model = obj;
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });
}, undefined, function (error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.x = 0.5;
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

animate();