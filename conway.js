var conway = {};
var conway_mesh = null;
var conway_list = null;

conway.drawCubes = function () {
	var dummy = new THREE.Object3D();
	for (let i = 0; i < conway_list.length; i++) {
		if (conway_list[i].alive) {
			dummy.position.set(i % conway.worldSize, (i / conway.worldSize) % conway.worldSize, i / Math.pow(conway.worldSize, 2));
			dummy.updateMatrix();
			conway_mesh.setMatrixAt(i, dummy.matrix);
		}
	}
}

conway.drawOneStep = function () {
	if(conway.numOfSteps > conway.maxNumOfSteps) {
		clearInterval(conway.loop)
		return false;
	}

	// materials
	const geometry = new THREE.BoxGeometry(1,1,1);
	const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x006ee6), transparent: true , opacity: 0.15});

	// dispose old mesh
	if (conway_mesh != null) { 
		conway_mesh.material.dispose();
		conway_mesh.geometry.dispose();
		scene.remove(conway_mesh);
	 }

	// create new mesh
	conway_mesh = new THREE.InstancedMesh(geometry, material, Math.pow(conway.worldSize, 3));

	// draw each cube
	conway.drawCubes();

	// calculate next step
	for (let i = 0; i < conway_list.length; i++) {
		let x = i % conway.worldSize
		let y = (i / conway.worldSize) % conway.worldSize
		let z = i / Math.pow(conway.worldSize, 2)
		conway_list[i].aliveNext = conway.isAliveNextStep(x, ~~y, ~~z);
	}

	for (let i = 0; i < conway_list.length; i++) { conway_list[i].alive = conway_list[i].aliveNext; }

	// final
	scene.add(conway_mesh);
	conway_mesh.instanceMatrix.needsUpdate = true;
	conway.numOfSteps++;
	
}

conway.isAliveNextStep = function(x,y,z) {
	let neighbors = 0;
	for (let i = x - 1; i <= x + 1; i++) {
		// validate i
		if (i == -1 || i == conway.worldSize) { continue; }

		for (let j = y - 1; j <= y + 1; j++) {
			// validate j
			if (j == -1 || j == conway.worldSize) { continue; }

			for (let k = z - 1; k <= z + 1; k++) {
				// validate k
				if (k == -1 || k == conway.worldSize) { continue; }
				// dont check itself as a neighbor
				if (i == x && j == y && k == z) { continue; }

				// check if neighbor is alive on current step
				if (conway_list[k + (j + i*conway.worldSize) * conway.worldSize].alive) { neighbors++; }
			}
		}
	}

	if (neighbors < conway.underpopRule || neighbors > conway.overpopRule) {
		return false;
	}
	return true;
}

conway.initialize = function() {
	conway.reset();
}

conway.reset = function () {
	conway.pause();
	conway_list = new Array(Math.pow(conway.worldSize, 3));

	for (let i = 0; i < conway_list.length; i++) {
		conway_list[i] = {"alive": false, "aliveNext": false};
	}
	for (let i = 0; i < conway.initialAlive.length; i++) {
		x = conway.initialAlive[i].x;
		y = conway.initialAlive[i].y;
		z = conway.initialAlive[i].z;

		conway_list[z + (y + x*conway.worldSize) * conway.worldSize].alive = true;
	}

	conway.numOfSteps = 0;
}

conway.pause = function () {
	if("loop" in conway) {
		clearInterval(conway.loop)
	}
}

conway.start = function () {
	camera.position.set(conway.worldSize * 1.65, conway.worldSize * 1.65, conway.worldSize * 1.65);
	controls.target.set(0, 0, 0);
	controls.update(); // this line should do nothing, but the algo is invisible without it for some reason
	conway.loop = setInterval(conway.drawOneStep, conway.speed);
}