var constellations = {};
  
  constellations.initialize = function() {
    constellations.reset();
  };
  
  constellations.reset = function() {
    constellations.pause();
    constellations.stars = [];
    constellations.numOfSteps = 0;
  };

  constellations.pause = function () {
    if ("loop" in constellations) {
      clearInterval(constellations.loop)
    }
  }

  constellations.drawOneStep = function() {
    if (constellations.numOfSteps >= constellations.maxNumOfSteps) {
      clearInterval(constellations.loop);
      console.log("Completed");
      return false;
    }
  
    // Create an star at a random position
    const x = Math.random() * constellations.worldSizeMax - constellations.worldSizeMin;
    const y = Math.random() * constellations.worldSizeMax - constellations.worldSizeMin;
    const z = Math.random() * constellations.worldSizeMax - constellations.worldSizeMin;
  
    const star = new THREE.Vector3(x, y, z);
    constellations.stars.push(star);
  
    // Create the star's sphere geometry and material
    const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: constellations.sphereColor });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(x, y, z);
    if(!constellations.hideStars)
    {
    scene.add(sphere);
    }
  
    // Check and draw connections between stars
    for (let i = 0; i < constellations.stars.length - 1; i++) {
      const starA = constellations.stars[i];
      const starB = constellations.stars[constellations.stars.length - 1];
      const distance = starA.distanceTo(starB);
  
      if (
        distance >= constellations.minDistance &&
        distance <= constellations.maxDistance
      ) {
        const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
          starA,
          starB,
        ]);
        const connectionMaterial = new THREE.LineBasicMaterial({ color: constellations.lineColor });
        const connection = new THREE.Line(connectionGeometry, connectionMaterial);
        scene.add(connection);
      }
    }
  
    constellations.numOfSteps++;
  };
  
  constellations.start = function() {
    camera.position.set(0, 0, 150);
    controls.target.set(0, 0, 0);
    controls.update();
    constellations.loop = setInterval(constellations.drawOneStep, constellations.speed);
  };
  