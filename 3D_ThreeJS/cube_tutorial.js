const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new BoxGeometry(1,1,1);
const material = new MeshBasicMaterial( {color: 0x00ff00 } );
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
controls.update();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();