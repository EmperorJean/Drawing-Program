var print10 = {};
var _dimensions;
var spacing;
var p;
var h_x;
var h_y;
var h_z;
var ii,jj,kk;

print10.initialize = function  () {

	print10.reset();
}


print10.drawOneStep = function () {

	if(print10.numOfSteps >= print10.maxNumOfSteps)
	{
		clearInterval(neoCity.loop)
		console.log("Completed")
		return false;
	}

	var _p = p[Math.floor(Math.random() * 4)];
  
	if(ii < h_x)
	{
		if(jj<h_y)
		{
			if(kk < h_z)
						{
							
				if ( !print10.is3d ) {
					h_z = 0.5;
				}
				print10.drawLine(ii,jj,kk, _p)
				kk++
			}else{
				kk = -h_z;
				jj++;
			}
		}else{
			jj= -h_y;
			ii++;
		}
	}else{
		ii = -h_x;
	}
			// calculate start and end points
		

	print10.numOfSteps++;
}

print10.drawLine = function(a,b,c, _p) {
	var x = _p[0] + a * spacing;
			var y = _p[1] + b* spacing;
			var z = _p[2] + c * spacing;
			var x2 = -_p[0] + a* spacing;
			var y2 = -_p[1] + b * spacing;
			var z2 = -_p[2] + c * spacing;
  
			if ( !print10.is3d ) {
			  z = z2 = 0;
			}

			const material = new THREE.LineBasicMaterial( { color: print10.color } );
			const points = [];
			points.push( new THREE.Vector3( x, y,z ) );
			points.push( new THREE.Vector3( x2, y2, z2 ) );
			const geometry = new THREE.BufferGeometry().setFromPoints( points );
			const line = new THREE.Line( geometry, material );
			scene.add( line );
}

print10.reset = function () {
	_dimensions = print10.dim_x * print10.dim_y* print10.dim_z;
	spacing = print10.spacing;
	p = [ [ -1, 1, 1 ], [ -1, 1, -1 ], [ -1, -1, 1 ], [ -1, -1, -1 ] ];
	h_x = print10.dim_x / 2;
	h_y = print10.dim_y / 2;
	h_z = print10.dim_z / 2;
	ii = -h_x;
	jj = -h_y;
	kk = -h_z;

	print10.pause();
	print10.numOfSteps = 0;
}

print10.pause = function () {
	if("loop" in print10) {
		clearInterval(print10.loop)
	}
}

print10.start = function () {

    print10.maxNumOfSteps = (2*print10.dim_x) * (2*print10.dim_y) * (print10.is3d ? 2 * print10.dim_z : 0.5);
	
	camera.position.set(0, 0, (print10.dim_x * 1.5) + (print10.dim_y * 1.5));
	controls.target.set(0, 0, 0);
	controls.update();
	print10.loop =  setInterval(print10.drawOneStep, print10.speed)
}


 print10.animate = function() {
	animationStarted = true;
	requestAnimationFrame(animate);
	render();

}

print10.render = function () {

	let time = performance.now() * 0.001;
	time += 10000;	
	renderer.render(scene, camera);
	//stats.update();

}

