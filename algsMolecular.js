var r;
var algsMolecular = {}
var numNodes = 0;
let lastCoords = null;
var points = [];
let pointStarted = false;
let num;
algsMolecular.width = 400;
algsMolecular.drawSphere = function (x, y, z, radius, color) {
    const geometry = new THREE.SphereGeometry( radius, 32, 32 );
	const material = new THREE.MeshBasicMaterial( { color: 0xAAAAAA} );
    const object = new THREE.Mesh( geometry, material );
        object.position.x = x;
        object.position.y = y;
        object.position.z = z;

        if(Math.random() * 100 + 1 > 75)
        {
           if(!pointStarted)
           {
            pointStarted = true;
            num = Math.random() * 4 + 1;
           }
        }
        

        if(pointStarted)
        {
            if(points.length > num)
            {
                const material = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const line = new THREE.Line( geometry, material );
                scene.add( line );
                points = [];
            }else{
                points.push( new THREE.Vector3( x, y,z ));
                pointStarted = false;
            }
        }
    scene.add(object)
}

algsMolecular.drawOneStep = function () {
    if (algsMolecular.numOfSteps >= algsMolecular.maxNumOfSteps) {
        clearInterval(algsMolecular.loop);
       

        return false;
    }

    let x = Math.random() * algsMolecular.dim_x;
    let y = Math.random() * algsMolecular.dim_y;
    let z = Math.random() * algsMolecular.dim_z;
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
    camera.position.set(-50, 0, 500);
    controls.target.set(0, 0, 0);
    controls.update();
    algsMolecular.loop = setInterval(algsMolecular.drawOneStep, algsMolecular.speed);
}