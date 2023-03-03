var r;
var algsMolecular = {}

algsMolecular.drawSphere = function (x, y, z, radius, color) {
    s = new X.sphere();
    s.radius = radius;
    s.color = color;
    s.center = [x, y, z]
    r.add(s)
    r.render();
}

algsMolecular.drawLine = function()
{

}

algsMolecular.drawOneStep = function () {
    if (algsMolecular.numOfSteps >= algsMolecular.maxNumOfSteps) {
        clearInterval(algsMolecular.loop);
        return false;
    }
    
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