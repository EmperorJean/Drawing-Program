var r;
var algsMolecular2 = {}
var numNodes = 0;
let lastCoords2 = null;
let visitedCoors2 = [0,0,0];

algsMolecular2.drawSphere = function (x, y, z, radius, color) {
    s = new X.sphere();
    s.radius = radius;
    s.color = color;
    s.center = lastCoords2 ? lastCoords2 : [x, y, z] 
    let ran = Math.floor(Math.random() * 100 + 1);

    algsMolecular2.drawLine(s.center, [x+ Math.floor(Math.random () * 50 + 50),y+Math.floor(Math.random () * 50 + 50),z+Math.floor(Math.random () * 50 + 50)])
    
    r.add(s)
    r.render();
}

algsMolecular2.drawLine = function(start, end)
{
    cylinder = new X.cylinder();
    cylinder.start = start;
    cylinder.end = end;
    cylinder.radius = algsMolecular.lineThickness;
    cylinder.color = [1, 1, 1];
    cylinder.caption = 'cylinder 2';
    lastCoords2 = end;
    r.add(cylinder)
}

algsMolecular2.drawOneStep = function () {
    if (algsMolecular.numOfSteps >= algsMolecular.maxNumOfSteps) {
        clearInterval(algsMolecular2.loop);
        return false;
    }

    let x = Math.floor((width + 500) * Math.random());
    let y = Math.floor((width + 500) * Math.random());
    let z = Math.floor((width + 500) * Math.random());
    algsMolecular2.drawSphere(x, y, z, algsMolecular.sphereRadiusMax, algsMolecular.sphereColor);
    algsMolecular.numOfSteps++;
}


algsMolecular2.reset = function () {
    // Check if already running
    algsMolecular2.pause();
    // Initialize values
    algsMolecular.numOfSteps = 0;
}

algsMolecular2.initialize = function () {
    algsMolecular2.reset();
}

algsMolecular2.pause = function () {
    if ("loop" in algsMolecular2) {
        clearInterval(algsMolecular2.loop);
    }
}
algsMolecular2.start = function () {
    algsMolecular2.loop = setInterval(algsMolecular2.drawOneStep, algsMolecular.speed);
}