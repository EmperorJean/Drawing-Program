var conway = {};
var world;

conway.genCube = function (x, y, z) {
	let geometry = new THREE.BoxGeometry(1, 1, 1);
	let cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: new THREE.Color(0x006ee6), transparent: true }));
	cube.material.opacity = 0.25;
	// set position
	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;
	// make the cube not visible by default
	cube.visible = false;
	scene.add(cube);
	return cube;
}

conway.isAliveNextStep = function (x, y, z) {
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
				if (world[i][j][k].cube.visible == true) { neighbors++; }
			}
		}
	}

	if (neighbors < conway.underpopRule || neighbors > conway.overpopRule) {
		return false;
	}
	return true;
}

conway.drawOneStep = function () {
	// check end of steps
	if (conway.numOfSteps > conway.maxNumOfSteps) {
		clearInterval(conway.loop);
		return false;
	}

	// draw current step of conway
	for (let x = 0; x < conway.worldSize; x++) {
		for (let y = 0; y < conway.worldSize; y++) {
			for (let z = 0; z < conway.worldSize; z++) {
				// if the cube is alive it will become visible
				if (world[x][y][z].cube.visible != world[x][y][z].isAlive) {
					world[x][y][z].cube.visible = world[x][y][z].isAlive;
				}
				// calculate next step
				world[x][y][z].isAlive = conway.isAliveNextStep(x, y, z);
			}
		}
	}
	conway.numOfSteps++;
}

conway.reset = function () {
	conway.pause();
	// gen x-dim
	world = new Array(conway.worldSize);
	// fill x-dim
	for (let x = 0; x < conway.worldSize; x++) {
		// generate y-dim
		world[x] = new Array(conway.worldSize);
		// fill y-dim
		for (let y = 0; y < conway.worldSize; y++) {
			// gen z-dim
			world[x][y] = new Array(conway.worldSize);
			// fill z-dim
			for (let z = 0; z < conway.worldSize; z++) {
				// make cube pairing, every cube should be either alive or dead
				world[x][y][z] = { "cube": conway.genCube(x, y, z), "isAlive": false };
			}
		}
	}
	conway.numOfSteps = 0;
}

conway.initialize = function () {
	conway.reset();
	world[0][0][0].isAlive = true;
	world[0][1][0].isAlive = true;
	world[0][1][1].isAlive = true;
	world[1][1][1].isAlive = true;
	world[1][1][0].isAlive = true;
	world[2][1][1].isAlive = true;
	world[1][1][2].isAlive = true;

}

conway.pause = function () {
	if ("loop" in conway) {
		clearInterval(conway.loop);
	}
}

conway.start = function () {
	conway.loop = setInterval(conway.drawOneStep, conway.speed);
}