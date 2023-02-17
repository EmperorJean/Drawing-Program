    
    var r;
    const width = 400;
    var algSphere = {}

    
    window.onload = function() {
    r = new X.renderer3D();
    // create and initialize a 3D renderer
    r.init();
  // create a cube
    algSphere.start()
    r.camera.position = [0, 400, 0];
    r.onRender = function() {
        
      };
    
    };


    algSphere.drawSphere = function(x, y, z, radius, color) {
      s = new X.sphere();
      s.radius = radius;
      s.color = color;
      s.center = [x,y,z]
      r.add(s)
    }
    
    algSphere.drawOneStep = function () {
      
        let x = Math.floor(width * Math.random());
        let y = Math.floor(width * Math.random());
        let z = Math.floor(width * Math.random());
        algSphere.drawSphere(x, y, z, 15, [1,1,1]);
        
    r.render();
      }
    
    
      algSphere.reset = function () {
      // Check if already running
      algSphere.pause();
      // Initialize values
      algSphere.numOfSteps = 0;
    }
    
    algSphere.initialize = function() {
      algDots.reset();
    }
    
    algSphere.pause = function () {
      if("loop" in algSphere) {
        clearInterval(algSphere.loop);
      }
    }
    algSphere.start = function () {
        algSphere.loop = setInterval(algSphere.drawOneStep, 100);
    }