var neoCity = {};
let map = [];
let animationStarted = false;


var texture;


let i, j;
neoCity.initialize = function () {
	i = 0;
	j = 0;

	neoCity.reset();
	if (!animationStarted) {
		animate()
	}
}


neoCity.drawOneStep = function () {
	radius = (neoCity.citySize + neoCity.spacing) * (neoCity.citySize + + neoCity.spacing);
	if (neoCity.numOfSteps >= neoCity.maxNumOfSteps) {
		clearInterval(neoCity.loop)
		return false;
	}
	let obj = neoCity.drawBuilding(neoCity.buildingSize, neoCity.maxHeight, neoCity.spacing)
	scene.add(obj)
	if (j > 1) {
        const road = neoCity.drawRoad(neoCity.buildingSize, neoCity.spacing, neoCity.spacing);
        scene.add(road);
    }
	
	neoCity.numOfSteps++;
}
neoCity.drawBuilding = function (width, height, spacing) {
	if (j >= Math.ceil(Math.sqrt(neoCity.maxNumOfSteps))) {
		i++;
		j = 0;
	}
	j++;





	texture = new THREE.CanvasTexture(generateTexture());
	texture.magFilter = THREE.NearestFilter;
	texture.wrapT = THREE.RepeatWrapping;
	texture.wrapS = THREE.RepeatWrapping;
	texture.repeat.set(Math.random() * 1 + 2, Math.random() * 2 + 4);
	height = Math.floor(Math.random() * (neoCity.maxHeight-neoCity.minHeight) + neoCity.minHeight);
	let l = new THREE.Group()
	let geometry = new THREE.BoxGeometry(width, height, width)
	let col = Math.random() * 0xffffff;
	let material = new THREE.MeshBasicMaterial({ color: col });
	let object = new THREE.Mesh(geometry, material);

	object.position.x = (width + spacing) * i
	object.position.z = (width + spacing) * j
	object.position.y = height / 2

	l.add(object);
	if (neoCity.windows) {
		const materials = [
			new THREE.MeshBasicMaterial({ map: texture, color: col }), // Left side (with repeat)
			new THREE.MeshBasicMaterial({ map: texture, color: col }), // Right side (with repeat)
			new THREE.MeshBasicMaterial({ color: 0x000000 }), // Top side (no texture)
			new THREE.MeshBasicMaterial({ map: texture, color: col }), // Bottom side (with repeat)
			new THREE.MeshBasicMaterial({ map: texture, color: col }), // Front side (with repeat)
			new THREE.MeshBasicMaterial({ map: texture, color: col }), // Back side (with repeat)
		];

		geometry = new THREE.BoxGeometry(width, height, width)
		object = new THREE.Mesh(geometry, materials);
		object.position.x = (width + spacing) * i
		object.position.z = (width + spacing) * j
		object.position.y = height / 2
		l.add(object);
	}
	return l;
}

neoCity.reset = function () {
	j = 0, i = 0;
	neoCity.pause();
	neoCity.numOfSteps = 0;
}

neoCity.pause = function () {
	if ("loop" in neoCity) {
		clearInterval(neoCity.loop)
	}
}

neoCity.start = function () {
	camera.position.set(0, neoCity.maxHeight + 50, 0);
	controls.target.set(neoCity.maxHeight / 3, neoCity.maxHeight + 10, neoCity.maxHeight / 3);
	controls.update();

	if (neoCity.sun) {
		const sunGeometry = new THREE.SphereGeometry(neoCity.sunRadius, 32, 32);
		const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, emissive: 0xffa000 });
		const sun = new THREE.Mesh(sunGeometry, sunMaterial);
		sun.position.set(neoCity.maxNumOfSteps  * neoCity.spacing + neoCity.sunRadius, neoCity.maxHeight + neoCity.sunRadius, neoCity.maxNumOfSteps * neoCity.spacing + neoCity.sunRadius); // Set the position of the sun object
		scene.add(sun);
	}


	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	for (let i = 0; i < 10000; i++) {

		vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
		vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
		vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z

	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

	const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xFFFFFF }));
	scene.add(particles);
	neoCity.loop = setInterval(neoCity.drawOneStep, neoCity.speed)
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


	if (neoCity.scrolling) {

		camera.position.x += spd;
		camera.position.z += spd
	}
	//stats.update();

}


neoCity.drawRoad = function (width, length, spacing) {
    const roadWidth = width;
    const roadLength = length;
    const roadHeight = 0.5;
    const roadGeometry = new THREE.BoxGeometry(roadWidth, roadHeight, roadLength);
    const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);

    road.position.x = (width + spacing) * i + (width / 2);
    road.position.z = (width + spacing) * (j - 1) + (width / 2);
    road.position.y = -roadHeight / 2;

    return road;
};


function generateTexture() {

	const canvas = document.createElement('canvas');
	canvas.width = 4;
	canvas.height = 4;

	const context = canvas.getContext('2d');
	context.fillStyle = 'white';
	context.fillRect(1, 2, 2, 3);

	return canvas;

}