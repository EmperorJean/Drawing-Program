var topographic = {};
var simplex = new SimplexNoise();
let noise = function(x,y) { return simplex.noise2D(x,y)};
let geometry = null;

topographic.drawOneStep = function() {
    if(topographic.numOfSteps > topographic.maxNumOfSteps) {
		clearInterval(topographic.loop)
		return false;
	}

    let v = new THREE.Vector2();

    for (let i = 0; i < Math.ceil(geometry.attributes.position.count / topographic.maxNumOfSteps); i++) {
        vertice = i + topographic.numOfSteps * Math.ceil(geometry.attributes.position.count / topographic.maxNumOfSteps);
        vertice %= geometry.attributes.position.count;

        v.fromBufferAttribute(geometry.attributes.uv, vertice).multiplyScalar(topographic.frequency);
        let h = topographic.scale * noise(v.x, v.y);
        geometry.attributes.position.setY(vertice, h);
        // console.log('finished vertice: ' + vertice + ' on step: ' + topographic.numOfSteps);
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;

    topographic.numOfSteps++;
}

topographic.initialize = function() {
    let light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.setScalar(1);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

    topographic.reset();
}

topographic.reset = function() {
    topographic.pause();

    topographic.numOfSteps = 0;
}

topographic.pause = function() {
    if ("loop" in topographic) {
        clearInterval(topographic.loop);
    }
}

topographic.start = function() {
    
	//camera.position.set(0, topographic.size, 0); for full screen camera view and top down
	camera.position.set(topographic.size, topographic.size+10, 0);
	controls.target.set(0, 0, 0);
    controls.update(); // this line should do nothing, but the algo is invisible without it for some reason

    if (topographic.numOfSteps == 0) {
        geometry = new THREE.PlaneGeometry(topographic.size, topographic.size, topographic.vertices, topographic.vertices);
        geometry.rotateX(-Math.PI * 0.5);
        const material = new THREE.MeshLambertMaterial({color: topographic.color});

        let hills = new THREE.Mesh(geometry, material);
        scene.add(hills);
    }

    topographic.loop = setInterval(topographic.drawOneStep, topographic.speed);
}