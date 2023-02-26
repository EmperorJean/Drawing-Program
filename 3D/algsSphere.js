var r;
var algSphere = {}

algSphere.drawSphere = function (x, y, z, radius, color) {
    s = new X.sphere();
    s.radius = radius;
    s.color = color;
    s.center = [x, y, z]
    r.add(s)
    r.render();
}

algSphere.drawOneStep = function () {
    if (algSphere.numOfSteps >= algSphere.maxNumOfSteps) {
        clearInterval(algSphere.loop);
        return false;
    }
    let x = Math.floor(width * Math.random());
    let y = Math.floor(width * Math.random());
    let z = Math.floor(width * Math.random());
    algSphere.drawSphere(x, y, z, 15, [1, 1, 1]);
    algSphere.numOfSteps++;
}


algSphere.reset = function () {
    // Check if already running
    algSphere.pause();
    // Initialize values
    algSphere.numOfSteps = 0;
}

algSphere.initialize = function () {
    algSphere.reset();
}

algSphere.pause = function () {
    if ("loop" in algSphere) {
        clearInterval(algSphere.loop);
    }
}
algSphere.start = function () {
    algSphere.loop = setInterval(algSphere.drawOneStep, algSphere.speed);
}