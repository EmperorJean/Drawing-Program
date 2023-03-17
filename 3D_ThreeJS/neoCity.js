var neoCity = {};
let map = [];
neoCity.initialize = function  () {
	neoCity.reset();
}


neoCity.drawOneStep = function () {
	if(neoCity.numOfSteps > neoCity.maxNumOfSteps)
	{
		clearInterval(neoCity.loop)
		console.log("Completed")
		return false;
	}
	let obj = neoCity.drawBuilding(this.buildingSize, this.maxHeight, this.spacing)
	scene.add(obj)
	animate()
	neoCity.numOfSteps++;
}

neoCity.drawBuilding = function(width, height, spacing) {
	height = Math.floor(Math.random() * 300 + 10);
	let geometry = new BoxGeometry(width, height, width)
	let object = new Mesh(geometry, new MeshBasicMaterial({ color: Math.random() * 0xffffff }));
	object.position.x = ((width + spacing) * this.numOfSteps)-600;
	object.position.z = ((width + spacing) * this.numOfSteps)-600;
	object.position.y = height / 2;
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

	stats.update();

}