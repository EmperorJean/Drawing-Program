// Canvas

const myCanvas2D = document.getElementById("myCanvas");
const myCanvas3D = document.getElementById("myCanvas3D");
var canvas3D = false
myCanvas3D.style.display = 'none';


// Algorithms set up
var algShortName = ["algGP", "algVines", "algDots"];
var algNames = ["Geometric Patterns", "Vines", "Dots (Simple Example)"];
var algCredits = ["Geometric Patterns by Michael Wehar", "Vines by Alyssa Zhang", "Modify This Algorithm!"];
var algorithms = [algGP, algVines, algDots];
var algorithmsPaused = [];
var lastSelected, lastSelected3D;

for (let i = 0; i < algorithms.length; i++) {
    algorithms[i].initialize();
    algorithmsPaused.push(true);
}

// algorithms3D  set up
var algShortName3D = ["neoCity", "conway", "print10", "algsMolecular"];
var algNames3D = ["Neo City", "Conway Game of Life", "10 print (Prototype)", "algsMolecular"];
var algCredits3D = ["NeoCity By Jean Gerard", "Conway Game of Life by Jake Breen", "10 print by Jean Gerard", "algsMolecular by Jean Gerard"];
var algorithms3D = [neoCity, conway, print10, algsMolecular];
var algorithmsPaused3D = [];

for (let i = 0; i < algorithms3D.length; i++) {
    algorithms3D[i].initialize();
    algorithmsPaused3D.push(true);
}


// Algorithm selection set up
var currentSelection = 1;
var currentSelection3D = 1;

// parameter set up
let all_params = param_initialize();
let params_store = create_params_store();

param_display(all_params[currentSelection - 1]);

function selectAlgorithm(id) {
  $('#' + id).css({"border-color": "#86b7fe", "box-shadow": "0 0 0 .25rem rgba(13, 110, 253, .25)"});
}

function setCanvas(boo)
{
    
    canvas3D = boo;
    
    if(boo) // If we are switching to a 3D Canvas
    {

        // pausing all the running algos
        for(let i = 0; i < algorithms.length; i++)
        {
        algorithmsPaused[i] = true;
        algorithms[i].pause();
        }
        changeSelectionModified3D(currentSelection3D); // This saves the last spot in each page
        myCanvas2D.style.display= 'none'; // Setting 2D to no longer display
        myCanvas3D.style.display = 'block'; // Setting 3D to display
    }else{ // Switching back to the 2D canvas
        for(let i = 0; i < algorithms3D.length; i++)
        {
        algorithmsPaused3D[i] = true;
        algorithms3D[i].pause();
        }
        changeSelectionModified(currentSelection);
        myCanvas2D.style.display= 'block'; // Setting the 2D to display
        myCanvas3D.style.display = 'none'; // Setting 3D to no longer display
    }
}
function deselectAlgorithm(id) {
  $('#' + id).css({
      "border-color": "none",
      "box-shadow": "none"
  }).attr("style", "rgba(0, 0, 0, 0.16) 0 1px 4px;");
}

// Functions for user interaction
function changeSelectionModified(id) {
    // reset the prev algo
    param_not_display3D(all_params[all_params.length -1  + currentSelection3D - 1]);
    param_not_display(all_params[currentSelection - 1]);
    deselectAlgorithm(currentSelection);

    // assign the new algo
    currentSelection = id;
    selectAlgorithm(currentSelection);
    param_display(all_params[currentSelection - 1]);
    algoNameUpdate(currentSelection);

    // button display
    if (algorithmsPaused[currentSelection - 1] || algorithmsPaused3D[currentSelection3D - 1]) {
        
        document.getElementById("startButton").style.display = "initial";
        document.getElementById("pauseButton").style.display = "none";
        const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
        tooltip.setContent({'.tooltip-inner': 'Start'});
    } else {
        document.getElementById("startButton").style.display = "none";
        document.getElementById("pauseButton").style.display = "initial";
        const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
        tooltip.setContent({'.tooltip-inner': 'Pause'});
    }
}

// Create cards function
function createCard(algId) {
    let code = '<div class="card" title="' + algCredits[algId - 1] + '" onclick="changeSelectionModified(' + algId + ')" id="' + algId + '">\
                    <div class="card-background" style="background-image: url(\'thumbnails/' + algShortName[algId - 1] + '.png\');"></div>\
                    <div class="card-body">\
                        <h5 class="card-text">' + algNames[algId - 1] + '</h5>\
                    </div>\
                </div>';
    document.getElementById("alg-cards").innerHTML += code;
}
// Initialize cards
for(let i = 1; i <= algNames.length; i++) {
    createCard(i);
}

// Fill in alg name
algoNameUpdate(currentSelection);
selectAlgorithm(currentSelection);

// start or pause selected algorithm
function start() {

    if(canvas3D)
    {
        if (algorithmsPaused3D[currentSelection3D - 1]) {
            algorithms3D[currentSelection3D - 1].start();
            document.getElementById("startButton").style.display = "none";
            document.getElementById("pauseButton").style.display = "initial";
            const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
            tooltip.setContent({'.tooltip-inner': 'Pause'});
            console.log("Started " + currentSelection3D);
        } else {
            algorithms3D[currentSelection3D - 1].pause();
            document.getElementById("startButton").style.display = "initial";
            document.getElementById("pauseButton").style.display = "none";
            const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
            tooltip.setContent({'.tooltip-inner': 'Start'});
            console.log("Paused " + currentSelection3D);
        }
        algorithmsPaused3D[currentSelection3D - 1] = !algorithmsPaused3D[currentSelection3D - 1];
    }else{
    if (algorithmsPaused[currentSelection - 1]) {
        algorithms[currentSelection - 1].start();
        document.getElementById("startButton").style.display = "none";
        document.getElementById("pauseButton").style.display = "initial";
        const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
        tooltip.setContent({'.tooltip-inner': 'Pause'});
        console.log("Started " + currentSelection);
    } else {
        algorithms[currentSelection - 1].pause();
        document.getElementById("startButton").style.display = "initial";
        document.getElementById("pauseButton").style.display = "none";
        const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
        tooltip.setContent({'.tooltip-inner': 'Start'});
        console.log("Paused " + currentSelection);
    }
    algorithmsPaused[currentSelection - 1] = !algorithmsPaused[currentSelection - 1];
}
}

// reset selected algorithm
function reset() {

    
    document.getElementById("startButton").style.display = "initial";
    document.getElementById("pauseButton").style.display = "none";
    const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
    tooltip.setContent({'.tooltip-inner': 'Start'});

    if(canvas3D)
    {
    algorithms3D[currentSelection3D - 1].reset();
    algorithmsPaused3D[currentSelection3D - 1] = true;
    console.log("Reset " + currentSelection3D);
    }else{
    algorithms[currentSelection - 1].reset();
    algorithmsPaused[currentSelection - 1] = true;
    console.log("Reset " + currentSelection);
    }
}

// Clear canvas
function clearCanvas() {
    if(canvas3D)
    {
        while (scene.children.length > 0) {
            const child = scene.children[0];
            scene.remove(child);

            // Dispose of any materials, geometries, or textures associated with the child object
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                child.material.dispose();
            }
            if (child.texture) {
                child.texture.dispose();
            }
        }
        
        
		algorithms3D[currentSelection3D - 1].initialize();
        reset();
    }else{
    ctx.clearRect(0, 0, width, height);
    }
}

// Save canvas as jpg
function saveCanvas() {
    var link = document.getElementById('link');
    if(canvas3D)
    {
        link.setAttribute('download', 'artwork3D.png');
        link.setAttribute('href', c3D.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    }else{
        link.setAttribute('download', 'artwork.jpg');
        link.setAttribute('href', c.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
    }
    link.click();
    // var canvas_jpg = c.toDataURL("canvas/jpg").replace("image/jpg", "image/octet-stream");
    // window.location.href = canvas_jpg;
}


/******** Updating functionalities of the Website ********/

// ready to change panels
let offcanvas_start = window.matchMedia("(max-width: 1310px)");
var lastPanel = "#v-pills-algo-tab";
transformPanel(offcanvas_start);
// listen to browser width change
offcanvas_start.addEventListener('change', function () {
    transformPanel(offcanvas_start);
});

// parameter set up
function create_params_store() {
    let store = [];
    for (let id in algorithms) {
        let algo = algorithms[id];
        let algo_copy = {};
        for (let param in algo) {
            if (typeof algo[param] === "boolean" || typeof algo[param] === "number" || typeof algo[param] === "string") {
                algo_copy[param] = algo[param];
            }
        }
        store[id] = algo_copy;
    }
    return store;
}

function param_initialize() {
    let all_params = [];
    for (let id in algorithms) {
        let algo = algorithms[id];
        let curr_params = [];
        let keys = Object.keys(algo).sort();
        for (let index in keys) {
            let param = keys[index];
            let param_id = id + "__" + param;
            if (typeof algo[param] === "number") {
                let num_elem =
                    "<div class='" + param_id + "_wrapper' style='display: none'>" +
                    "<div class='input-group'>" +
                    "<span title='" + param + "' class='input-group-text'>" + param + "</span>" +
                    "<input type='text' class='form-control' aria-label='" + param + "' title='" + algo[param] + "' placeholder='" + algo[param] + "' id='" + param_id + "'>" +
                    "</div></div>";
                if (param.length < 15) {
                    $('.shorter_param').append(num_elem);
                } else {
                    $('.longer_param').append(num_elem);
                }
                curr_params.push(param);
            } else if (typeof algo[param] === "boolean") {
                let bool_elem =
                    "<div class='" + param_id + "_wrapper' style='display: none'>" +
                    "<div class='input-group'>" +
                    "<div class='input-group-text'>" +
                    "<input class='form-check-input mt-0' type='checkbox' aria-label='" + param + "' id='" + param_id + "'";
                // preload checked if true
                if (algo[param]) {
                    bool_elem += " checked";
                }
                bool_elem += ">" +
                    "</div>" +
                    "<span title='" + param + "' class='input-group-text'>" + param + "</span>" +
                    "</div></div>";
                $('.checkbox_param').append(bool_elem);
                curr_params.push(param);
            } else if (typeof algo[param] === "string") {
                let str_elem =
                    "<div class='" + param_id + "_wrapper' style='display: none'>" +
                    "<div class='input-group'>" +
                    "<span title='" + param + "' class='input-group-text'>" + param + "</span>" +
                    "<input type='text' class='form-control' aria-label='" + param + "' title='" + algo[param] + "' placeholder='" + algo[param] + "' id='" + param_id + "'>" +
                    "</div></div>";
                if (param.length < 15) {
                    $('.shorter_param').append(str_elem);
                } else {
                    $('.longer_param').append(str_elem);
                }
                curr_params.push(param);
            }
        }
        all_params.push(curr_params);
    }
    return all_params;
}

function set_to_default() {
    if(canvas3D)
    {
        let id = currentSelection3D - 1;
        let algo = params_store3D[id];
        for(let param in algo) {
            let param_id = id + "__" + param;
            if(algo[param] != algorithms3D[id][param]) {
                console.log("*** Changed ***");
                if(typeof algo[param] === "boolean") {
                    $("#" + param_id).prop('checked', algo[param]);
                }
                $("#" + param_id).val(algo[param]);
                $("#" + param_id).trigger("change");
            }
        }
    }else{
    let id = currentSelection - 1;
    let algo = params_store[id];
    for(let param in algo) {
        let param_id = id + "__" + param;
        if(algo[param] != algorithms[id][param]) {
            console.log("*** Changed ***");
            if(typeof algo[param] === "boolean") {
                $("#" + param_id).prop('checked', algo[param]);
            }
            $("#" + param_id).val(algo[param]);
            $("#" + param_id).trigger("change");
        }
    }
}
}

function save_params() {
    let curParams;
    let textData;
    var link = document.getElementById('linkParams');
  if(canvas3D)
  {
   curParams = create_params_store3D();
   textData = JSON.stringify(curParams[currentSelection3D - 1]);
   link.setAttribute('download', 'params3D.js');
  }else{
    curParams = create_params_store();
    textData = JSON.stringify(curParams[currentSelection - 1]);
    link.setAttribute('download', 'params.js');
  }
  
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textData));
  link.click();
}

// display params of the current algo
function param_display(curr_params) {
    for (let i in curr_params) {
        // console.log((curr_params[i]));
        let temp = currentSelection - 1;
        $('.' + temp + '__' + curr_params[i] + '_wrapper').css("display", "flex");
    }
}

// hide the params of the previous algo
function param_not_display(curr_params) {
    for (let i in curr_params) {
        // console.log((curr_params[i]));
        let temp = currentSelection - 1;
        $('.' + temp + '__' + curr_params[i] + '_wrapper').css("display", "none");
    }
}

// parameter panel subtitle update
function algoNameUpdate(currentSelection) {
    console.log("Is3D: " + canvas3D)
    if(canvas3D)
    {
        $('.current_algo').text(algNames3D[currentSelection3D - 1]);
    }else{
        $('.current_algo').text(algNames[currentSelection - 1]);
    }
}

// update offcanvas content
function transformPanel(curr) {
    if (curr.matches) { // If media query matches
        console.log("match");
        // change tab properties
        $('#v-pills-algo-tab').attr("data-bs-toggle", "offcanvas")
            .attr("aria-controls", "offcanvasRight").attr("data-bs-target", "#offcanvasRight");
        $('#v-pills-params-tab').attr("data-bs-toggle", "offcanvas")
            .attr("aria-controls", "offcanvasRight").attr("data-bs-target", "#offcanvasRight");
        $('#v-pills-algo3D-tab').attr("data-bs-toggle", "offcanvas")
            .attr("aria-controls", "offcanvasRight").attr("data-bs-target", "#offcanvasRight");    
        $('#v-pills-action-tab').attr("data-bs-toggle", "offcanvas")
            .attr("aria-controls", "offcanvasRight").attr("data-bs-target", "#offcanvasRight");
        $('#v-pills-about-tab').attr("data-bs-toggle", "offcanvas")
            .attr("aria-controls", "offcanvasRight").attr("data-bs-target", "#offcanvasRight")
            .attr("class", "nav-link");

        // check last opened panel
        if ($('#v-pills-algo-tab').attr("class") === "nav-link active") {
            $('#v-pills-algo-tab').attr("class", "nav-link");
            lastPanel = "#v-pills-algo-tab";
        }else if ($('#v-pills-algo3D-tab').attr("class") === "nav-link active") {
            $('#v-pills-algo3D-tab').attr("class", "nav-link");
            lastPanel = "#v-pills-algo3D-tab";
        } else if ($('#v-pills-params-tab').attr("class") === "nav-link active") {
            $('#v-pills-params-tab').attr("class", "nav-link");
            lastPanel = "#v-pills-params-tab";
        } else if ($('#v-pills-action-tab').attr("class") === "nav-link active") {
            $('#v-pills-action-tab').attr("class", "nav-link");
            lastPanel = "#v-pills-action-tab";
        } else {
            $('#v-pills-about-tab').attr("class", "nav-link");
            lastPanel = "#v-pills-about-tab";
        }

        // initialize offcanvas
        $('#offcanvasRight').append($('.algo_panel').hide());
        $('#offcanvasRight').append($('.param_panel').hide());
        $('#offcanvasRight').append($('.history_panel').hide());
        $('#offcanvasRight').append($('.about_panel').hide());
        let prev_panel = "";

        // update offcanvas
        $('.sideSelection .nav button').click(function () {
            if (prev_panel !== "") {
                if (prev_panel === "v-pills-algo-tab") {
                    $('.algo_panel').hide();
                }else if (prev_panel === "v-pills-algo3D-tab") {
                    $('.algo3D_panel').hide();
                } else if (prev_panel === "v-pills-params-tab") {
                    $('.param_panel').hide();
                } else if (prev_panel === "v-pills-action-tab") {
                    $('.history_panel').hide();
                } else {
                    $('.about_panel').hide();
                }
            }

            if (this.id === "v-pills-algo-tab") {
                $('.algo_panel').show();
            }else if (this.id === "v-pills-algo3D-tab") {
                $('.algo3D_panel').show();
            } else if (this.id === "v-pills-params-tab") {
                $('.param_panel').show();
            } else if (this.id === "v-pills-action-tab") {
                $('.history_panel').show();
            } else {
                $('.about_panel').show();
            }
            prev_panel = this.id;
        });

    } else {
        console.log("not match");
        // change back tab properties
        $('#v-pills-algo-tab').attr("data-bs-toggle", "pill")
            .attr("aria-controls", "v-pills-algo").attr("data-bs-target", "#v-pills-algo");
        $('#v-pills-algo3D-tab').attr("data-bs-toggle", "pill")
            .attr("aria-controls", "v-pills-algo3D").attr("data-bs-target", "#v-pills-algo3D");
        $('#v-pills-params-tab').attr("data-bs-toggle", "pill")
            .attr("aria-controls", "v-pills-params").attr("data-bs-target", "#v-pills-params");
        $('#v-pills-action-tab').attr("data-bs-toggle", "pill")
            .attr("aria-controls", "v-pills-action").attr("data-bs-target", "#v-pills-action");
        $('#v-pills-about-tab').attr("data-bs-toggle", "pill")
            .attr("aria-controls", "v-pills-about").attr("data-bs-target", "#v-pills-about");
        $(lastPanel).attr("class", "nav-link active");

        // reshow panels
        $('#v-pills-algo').append($('.algo_panel').show());
        $('#v-pills-params').append($('.param_panel').show());
        $('#v-pills-action').append($('.history_panel').show());
        $('#v-pills-about').append($('.about_panel').show());

        // hide offcanvas
        $('#offcanvas_close').click();
    }
}

// activate all tooltips
$(document).ready(function () {
    $('[data-bs-toggle=tooltip]').tooltip(
        {trigger: 'hover'}
    );
});

// parameter change detection
$('.inner_param .form-control').change(function () {
    if(canvas3D) return;
    let id = currentSelection - 1;
    let param = $(this).attr("id").split("__")[1];
    console.log(typeof algorithms[id][param] + ", " + param);
    console.log("before", algorithms[id][param]);
    if(typeof algorithms[id][param] === "number") {
        algorithms[id][param] = JSON.parse($(this).val());
    } else {
      algorithms[id][param] = $(this).val();
    }
    $(this).attr("title", $(this).val());
    $(this).attr("placeholder", $(this).val());
    $(this).val("");
    console.log("after", algorithms[id][param]);
});

$('.inner_param .form-check-input').change(function () {
    if(canvas3D)return;
    let id = currentSelection - 1;
    let param = $(this).attr("id").split("__")[1];
    console.log(typeof algorithms[id][param] + ", " + param);
    console.log("before", algorithms[id][param]);
    if (!$(this).is(':checked')) {
        algorithms[id][param] = false;
        $(this).removeClass('checked');
        $(this).val("false");
    } else {
        algorithms[id][param] = true;
        $(this).addClass('checked');
        $(this).val("true");
    }
    console.log("after", algorithms[id][param]);
});
