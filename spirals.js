
var spirals = {};
spirals.initialize = function () {
    spirals.reset();
}
spirals.drawOneStep = function () {
    if (spirals.numOfSteps >= spirals.maxNumOfSteps) {
        clearInterval(spirals.loop);
        console.log("Completed");
        return false;
    }

    const angleStep = spirals.angleStep;
    const radialStep = spirals.radialStep;
    const turns = spirals.turns;
    const spacing = spirals.spacing;

    const angle = spirals.numOfSteps * angleStep;
    const radius = (spirals.numOfSteps % turns) * radialStep;

    const x1 = radius * Math.cos(angle);
    const y1 = radius * Math.sin(angle);

    const x2 = radius * Math.cos(angle + angleStep);
    const y2 = radius * Math.sin(angle + angleStep);

    spirals.drawLine(x1, y1, x2, y2);

    spirals.numOfSteps++;
}

spirals.drawLine = function (x1, y1, x2, y2) {
    const material = new THREE.LineBasicMaterial({ color: spirals.color });
    const points = [];
    points.push(new THREE.Vector3(x1, y1, 0));
    points.push(new THREE.Vector3(x2, y2, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
}

spirals.reset = function () {

    spirals.pause();
    spirals.numOfSteps = 0;
}

spirals.pause = function () {
    if ("loop" in spirals) {
        clearInterval(spirals.loop);
    }
}

spirals.start = function () {
    camera.position.set(0, 0, (spirals.turns * spirals.spacing) / 2);
    controls.target.set(0, 0, 0);
    controls.update();
    spirals.loop = setInterval(spirals.drawOneStep, spirals.speed);
}
