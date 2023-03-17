var neoCity = {};
let map = [];

let i, j;
neoCity.initialize = function  () {
	i = 0;
	j = 0;
	neoCity.reset();


	// let s = Math.floor(Math.sqrt(neoCity.maxNumOfSteps)) * (neoCity.buildingSize + neoCity.spacing)
	// const geometry = new BoxGeometry(s,neoCity.maxHeight,s );

	// 			const material = new MeshPhongMaterial( {
	// 				color: 0xFFD700,
	// 				shininess: 10,
	// 				specular: 0x111111,
	// 				side: BackSide
	// 			} );

	// 			const mesh = new Mesh( geometry, material );
	// 			mesh.position.y = neoCity.maxHeight/2;
	// 			mesh.position.x = s/2
	// 			mesh.position.z = s/2
	// 			mesh.receiveShadow = true;
	// 			scene.add( mesh );
}


neoCity.drawOneStep = function () {
	if(neoCity.numOfSteps > neoCity.maxNumOfSteps)
	{
		clearInterval(neoCity.loop)
		console.log("Completed")
		return false;
	}
	let obj = neoCity.drawBuilding(neoCity.buildingSize, neoCity.maxHeight, neoCity.spacing)
	scene.add(obj)
	animate()
	neoCity.numOfSteps++;
}
neoCity.drawBuilding = function(width, height, spacing) {
	if(j >= Math.ceil(Math.sqrt(neoCity.maxNumOfSteps)))
	{
		i++;
		j=0;
	}
	j++;
	
	height = Math.floor(Math.random() * neoCity.maxHeight + 10);
	let geometry = new BoxGeometry(width, height, width)
	let object = new Mesh(geometry, new MeshBasicMaterial({ color: Math.random() * 0xffffff }));
	object.position.x = (width + spacing) * i
	object.position.z = (width + spacing) * j
	object.position.y = height/2

	
	return object;
}

neoCity.reset = function () {
	neoCity.pause();
	neoCity.numOfSteps = 0;
}

neoCity.pause = function () {
	if("loop" in neoCity) {
		clearInterval(neoCity.loop)
	}
}

neoCity.start = function () {
	const geometry = new BufferGeometry();
	const vertices = [];

	for ( let i = 0; i < 10000; i ++ ) {

		vertices.push( MathUtils.randFloatSpread( 2000 ) ); // x
		vertices.push( MathUtils.randFloatSpread( 2000 ) ); // y
		vertices.push( MathUtils.randFloatSpread( 2000 ) ); // z

	}

	geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

	const particles = new Points( geometry, new PointsMaterial( { color: 0x888888 } ) );
	scene.add( particles );
	neoCity.loop =  setInterval(neoCity.drawOneStep, neoCity.speed)
}


function animate() {

	requestAnimationFrame(animate);
	render();

}

function render() {

	let time = performance.now() * 0.001;
	time += 10000;	
	renderer.render(scene, camera);
	//stats.update();

}