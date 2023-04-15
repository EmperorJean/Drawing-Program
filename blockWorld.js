var blockWorld = {};
var perlin;
var currentX = 0;
var currentZ = 0;
var currentY;

blockWorld.initialize = function () {
    blockWorld.reset();
};

blockWorld.createInstancedMeshes = function () {
    const geometry = new THREE.BoxGeometry(
        blockWorld.blockSize,
        blockWorld.blockSize,
        blockWorld.blockSize
    );

    blockWorld.grassMesh = blockWorld.createInstancedMesh(
        geometry,
        blockWorld.grassColor,
        blockWorld.maxNumOfSteps
    );
    blockWorld.stoneMesh = blockWorld.createInstancedMesh(
        geometry,
        blockWorld.stoneColor,
        blockWorld.maxNumOfSteps
    );
    blockWorld.dirtMesh = blockWorld.createInstancedMesh(
        geometry,
        blockWorld.dirtColor,
        blockWorld.maxNumOfSteps
    );

    const outlineGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(
        blockWorld.blockSize,
        blockWorld.blockSize,
        blockWorld.blockSize
    ));
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    blockWorld.grassOutlineMesh = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    blockWorld.stoneOutlineMesh = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    blockWorld.dirtOutlineMesh = new THREE.LineSegments(outlineGeometry, outlineMaterial);

    scene.add(blockWorld.grassOutlineMesh);
    scene.add(blockWorld.stoneOutlineMesh);
    scene.add(blockWorld.dirtOutlineMesh);
};

blockWorld.createOutline = function (x, y, z, outlineMesh) {
    const outline = outlineMesh.clone();
    outline.position.set(
        x * blockWorld.blockSize,
        y * blockWorld.blockSize,
        z * blockWorld.blockSize
    );
    scene.add(outline);
};


blockWorld.createInstancedMesh = function (geometry, color, instanceCount) {
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.InstancedMesh(geometry, material, instanceCount);
    scene.add(mesh);
    return mesh;
};

blockWorld.reset = function () {
    blockWorld.pause();
    blockWorld.numOfSteps = 0;
    currentX = 0;
    currentZ = 0;
    currentY = 0;
};

blockWorld.drawOneStep = function () {
    if (blockWorld.numOfSteps >= blockWorld.maxNumOfSteps) {
        clearInterval(blockWorld.loop);
        console.log("Completed");
        return false;
    }

    const elevation = blockWorld.getElevation(currentX, currentZ);
    const yGrass = Math.floor(elevation * blockWorld.maxElevation);

    if (currentY === yGrass) {
        blockWorld.createBlock(currentX, currentY, currentZ, blockWorld.grassMesh);
        blockWorld.createOutline(currentX, currentY, currentZ, blockWorld.grassOutlineMesh);
    } else if (currentY < yGrass) {
        const blockType = Math.random() < 0.5 ? "stone" : "dirt";
        blockWorld.createBlock(currentX, currentY, currentZ, blockWorld[blockType + "Mesh"]);
        blockWorld.createOutline(currentX, currentY, currentZ, blockWorld[blockType + "OutlineMesh"]);
    }

    currentY++;
    if (currentY > yGrass) {
        currentY = 0;
        currentX++;
        if (currentX >= blockWorld.worldSize) {
            currentX = 0;
            currentZ++;
        }
    }

    blockWorld.numOfSteps++;
};


blockWorld.getElevation = function (x, z) {
    const nx = x / blockWorld.worldSize - 0.5;
    const nz = z / blockWorld.worldSize - 0.5;
    return (
        perlin.noise2D(nx * blockWorld.noiseScale, nz * blockWorld.noiseScale) * 0.5 +
        0.5
    );
};

blockWorld.createBlock = function (x, y, z, mesh, outlineMesh) {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(
        x * blockWorld.blockSize,
        y * blockWorld.blockSize,
        z * blockWorld.blockSize
    );
    mesh.setMatrixAt(blockWorld.numOfSteps, matrix);
    mesh.instanceMatrix.needsUpdate = true;
};


blockWorld.pause = function ()
{
    if ("loop" in blockWorld) {
		clearInterval(blockWorld.loop)
	}
}
blockWorld.start = function () {

    camera.position.set(blockWorld.cameraDistance, blockWorld.cameraDistance, blockWorld.cameraDistance);
    controls.target.set(100, 0, 0);
    controls.update();
    perlin = new SimplexNoise();
    blockWorld.createInstancedMeshes();
    blockWorld.loop = setInterval(blockWorld.drawOneStep, blockWorld.speed);
};
