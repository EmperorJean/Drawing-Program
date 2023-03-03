var r;
var algsMolecular = {}
var numNodes = 0;
let lastCoords = null;
let visitedCoors = [0,0,0]

algsMolecular.drawSphere = function (x, y, z, radius, color) {
    s = new X.sphere();
    s.radius = radius;
    s.color = color;
    s.center = lastCoords ? lastCoords : [x, y, z] 
    let ran = Math.floor(Math.random() * 100 + 1);

    if(ran > 25)
    {
        algsMolecular.drawLine(s.center, [s.center[0]  + Math.floor(Math.random () * algsMolecular.maxLineLength + algsMolecular.minLineLength),s.center[1] + Math.floor(Math.random () * algsMolecular.maxLineLength + algsMolecular.minLineLength),s.center[2]+Math.floor(Math.random () * algsMolecular.maxLineLength + algsMolecular.minLineLength)])
    }else{
        lastCoords = null;
    }
    
    r.add(s)
    r.render();
}

algsMolecular.drawLine = function(start, end)
{
    cylinder = new X.cylinder();
    cylinder.start = start;
    cylinder.end = end;
    cylinder.radius = algsMolecular.lineThickness;
    cylinder.color = [1, 1, 1];
    cylinder.caption = 'cylinder 2';
    lastCoords = end;
    r.add(cylinder)
}

algsMolecular.drawOneStep = function () {
    if (algsMolecular.numOfSteps >= algsMolecular.maxNumOfSteps) {
        clearInterval(algsMolecular.loop);
        return false;
    }

    let x = Math.floor(width * Math.random()) + ++visitedCoors[0]*5;
    let y = Math.floor(width * Math.random()) + ++visitedCoors[1]*5;
    let z = Math.floor(width * Math.random()) + ++visitedCoors[2];
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
    algsMolecular.loop = setInterval(algsMolecular.drawOneStep, algsMolecular.speed);
}