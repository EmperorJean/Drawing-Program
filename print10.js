var print10 = {};
let is3D = false;

let line;
let t = 0, r = 600;
const positions = [];
const colors = [];	
this.i, this.j;

print10.initialize = function  () {
	this.i = 0;
	this.j = 0;

	print10.reset();
	if(!animationStarted){
	animate()
	}
}


print10.drawOneStep = function () {
	print10.numOfSteps++;
}

print10.drawLine = function(width, height, spacing) {

	return object;
}

print10.reset = function () {
	print10.pause();
	print10.numOfSteps = 0;
}

print10.pause = function () {
	if("loop" in print10) {
		clearInterval(print10.loop)
	}
}

print10.start = function () {

	const geometry = new THREE.BufferGeometry();
	const material = new THREE.LineBasicMaterial({ vertexColors: true });
	camera.position.set(100, 100, 1000);

for (let i = 0; i < print10.maxNumOfSteps; i++) {

    const x = Math.random() * r - r / 2;
    const y = Math.random() * r - r / 2;
    const z = 0

    // positions

    positions.push(x, y, z);

    // colors

    colors.push((x / r) + 0.5);
    colors.push((y / r) + 0.5);
    colors.push((z / r) + 0.5);

}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

line = new THREE.Line(geometry, material);
scene.add(line);
	//print10.loop =  setInterval(print10.drawOneStep, print10.speed)
}


function animate() {
	animationStarted = true;
	requestAnimationFrame(animate);
	render();

}

function render() {

	let time = performance.now() * 0.001;
	time += 10000;	
	renderer.render(scene, camera);
	let spd = .5;


	if(print10.scrolling)
	{

	camera.position.x += spd;
	camera.position.z += spd
	}
	//stats.update();

}

