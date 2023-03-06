
var algSphere = {}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



camera.position.z = 50;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    camera.position.x += .1
    //camera.rotation.z += .01
    camera.position.z += .1;
}
animate();



algSphere.drawSphere = function (radius,x,y,z) {
    const geometry = new THREE.SphereGeometry(1, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = x;
    sphere.position.y = y;
    scene.add(sphere);
}

algSphere.drawOneStep = function () {
    // if (algSphere.numOfSteps >= algSphere.maxNumOfSteps) {
    //     clearInterval(algSphere.loop);
    //     return false;
    // }
    let x = Math.floor(Math.random() * (window.innerWidth/2));
    let y = Math.floor(Math.random() * (window.innerWidth/10));
    let z = Math.floor(Math.random());
    algSphere.drawSphere(algSphere.sphereRadius,x,y,z);
    //algSphere.numOfSteps++;
}


algSphere.reset = function () {
    // Check if already running
    algSphere.pause();
    // Initialize values
    algSphere.numOfSteps = 0;
}

algSphere.initialize = function () {
    algSphere.reset();
}

algSphere.pause = function () {
    if ("loop" in algSphere) {
        clearInterval(algSphere.loop);
    }
}
algSphere.start = function () {
    algSphere.loop = setInterval(algSphere.drawOneStep, 10);
}


algSphere.start()