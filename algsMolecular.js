var r;
var algsMolecular = {}
var numNodes = 0;
let lastCoords = null;
let visitedCoors = [0,0,0];
algsMolecular.width = 400;
algsMolecular.drawSphere = function (x, y, z, radius, color) {
    const geometry = new THREE.SphereGeometry( radius, 32, 32 );
	const material = new THREE.MeshBasicMaterial( { color: 0xAAAAAA} );
    const object = new THREE.Mesh( geometry, material );
    if(lastCoords)
    {
        object.position.x = lastCoords[0];
        object.position.y = lastCoords[1];
        object.position.z = lastCoords[2]
    }else{
        object.position.x = x;
        object.position.y = y;
        object.position.z = z;
    }
    let ran = Math.floor(Math.random() * 100 + 1);

    if(ran > 25)
    {
        algsMolecular.drawLine([object.position.x, object.position.y, object.position.z] ,[object.position.x  + Math.floor(Math.random () * algsMolecular.maxLineLength + algsMolecular.minLineLength),object.position.y + Math.floor(Math.random () * algsMolecular.maxLineLength + algsMolecular.minLineLength),object.position.z +Math.floor(Math.random () * algsMolecular.maxLineLength + algsMolecular.minLineLength)])
    }else{
        lastCoords = null;
    }

    scene.add(object)
}

algsMolecular.drawLine = function(start, end)
{
    lastCoords = end;

    const material = new THREE.LineBasicMaterial( { color: 0x0000ff, 
        linewidth: 10});
    const points = [];
points.push( new THREE.Vector3( start[0], start[1], start[2] ) );
points.push( new THREE.Vector3( end[0], end[1], end[2] ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add(line);

}

algsMolecular.drawOneStep = function () {
    if (algsMolecular.numOfSteps >= algsMolecular.maxNumOfSteps) {
        clearInterval(algsMolecular.loop);
        return false;
    }

    let x = Math.floor(algsMolecular.width * Math.random()) + ++visitedCoors[0]*5;
    let y = Math.floor(algsMolecular.width * Math.random()) + ++visitedCoors[1]*5;
    let z = Math.floor(algsMolecular.width * Math.random()) + ++visitedCoors[2];
    algsMolecular.drawSphere(x, y, z, algsMolecular.sphereRadiusMax, algsMolecular.sphereColor);
    algsMolecular.numOfSteps++;
}


algsMolecular.reset = function () {
    // Check if already running
    algsMolecular.pause();
    // Initialize values
    algsMolecular.numOfSteps = 0;
}

algsMolecular.initialize = function () {
    algsMolecular.reset();
}

algsMolecular.pause = function () {
    if ("loop" in algsMolecular) {
        clearInterval(algsMolecular.loop);
    }
}
algsMolecular.start = function () {
    camera.position.set(400, 400, 1200);
    algsMolecular.loop = setInterval(algsMolecular.drawOneStep, algsMolecular.speed);
}