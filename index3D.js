// algorithms3D 2D set up
var algShortName3D = ["neoCity"];
var algNames3D = ["Neo City"];
var algCredits3D = ["NeoCity By Jean Gerard"];

var algorithms3D = [neoCity];
var algorithmsPaused3D = [];
for (let i = 0; i < algorithms3D.length; i++) {
    algorithms3D[i].initialize();
    algorithmsPaused3D.push(true);
}

// Algorithm selection set up
var currentSelection3D = 1;

// parameter set up
let all_params3D = param_initialize3D();
let params_store3D = create_params_store3D();
param_display3D(all_params3D[currentSelection3D - 1]);

function selectAlgorithm3D(id) {
  $('#' + id).css({"border-color": "#86b7fe", "box-shadow": "0 0 0 .25rem rgba(13, 110, 253, .25)"});
}

function deselectAlgorithm3D(id) {
  $('#' + id).css({
      "border-color": "none",
      "box-shadow": "none"
  }).attr("style", "rgba(0, 0, 0, 0.16) 0 1px 4px;");
}

// Functions for user interaction
function changeSelectionModified3D(id) {
    // reset the prev algo
    param_not_display3D(all_params[currentSelection3D - 1]);
    deselectAlgorithm3D(currentSelection3D);

    // assign the new algo
    currentSelection3D = id;
    selectAlgorithm3D(currentSelection3D);
    param_display3D(all_params3D[currentSelection3D - 1]);
    algoNameUpdate3D(currentSelection3D);

    // button display
    if (algorithmsPaused3D[currentSelection3D - 1]) {
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
function createCard3D(algId) {
    let code = '<div class="card" title="' + algCredits3D[algId - 1] + '" onclick="changeSelectionModified(' + algId + ')" id="' + algId + '">\
                    <div class="card-background" style="background-image: url(\'thumbnails/' + algShortName3D[algId - 1] + '.png\');"></div>\
                    <div class="card-body">\
                        <h5 class="card-text">' + algNames3D[algId - 1] + '</h5>\
                    </div>\
                </div>';
    document.getElementById("alg-cards").innerHTML += code;
}
// Initialize cards
for(let i = 1; i <= algNames3D.length; i++) {
    createCard3D(i);
}
// Fill in alg name
algoNameUpdate3D(currentSelection3D);
selectAlgorithm3D(currentSelection3D);

// start or pause selected algorithm
function start3D() {
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
}

// reset selected algorithm
function reset() {
    algorithms3D[currentSelection3D - 1].reset();
    document.getElementById("startButton").style.display = "initial";
    document.getElementById("pauseButton").style.display = "none";
    const tooltip = bootstrap.Tooltip.getInstance("#start_pause_button");
    tooltip.setContent({'.tooltip-inner': 'Start'});
    algorithmsPaused3D[currentSelection3D - 1] = true;
    console.log("Reset " + currentSelection3D);
}

// Clear canvas
function clearCanvas3D() {
    ctx.clearRect(0, 0, width, height);
}

// Save canvas as jpg
function saveCanvas3D() {
    var link = document.getElementById('link');
    link.setAttribute('download', 'artwork.jpg');
    link.setAttribute('href', c.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
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
function create_params_store3D() {
    let store = [];
    for (let id in algorithms3D) {
        let algo = algorithms3D[id];
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

function param_initialize3D() {
    let all_params = [];
    for (let id in algorithms3D) {
        let algo = algorithms3D[id];
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

function set_to_default3D() {
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
}

function save_params3D() {
  let curParams = create_params_store3D();
  let textData = JSON.stringify(curParams[currentSelection3D - 1]);
  var link = document.getElementById('linkParams');
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textData));
  link.setAttribute('download', 'params.js');
  link.click();
}

// display params of the current algo
function param_display3D(curr_params) {
    for (let i in curr_params) {
        // console.log((curr_params[i]));
        let temp = currentSelection3D - 1;
        $('.' + temp + '__' + curr_params[i] + '_wrapper').css("display", "flex");
    }
}

// hide the params of the previous algo
function param_not_display3D(curr_params) {
    for (let i in curr_params) {
        // console.log((curr_params[i]));
        let temp = currentSelection3D - 1;
        $('.' + temp + '__' + curr_params[i] + '_wrapper').css("display", "none");
    }
}

// parameter panel subtitle update
function algoNameUpdate3D(currentSelection3D) {
    $('.current_algo').text(algNames[currentSelection3D - 1]);
}

// update offcanvas content
function transformPanel3D(curr) {
    if (curr.matches) { // If media query matches
        console.log("match");
        // change tab properties
        $('#v-pills-algo-tab').attr("data-bs-toggle", "offcanvas")
            .attr("aria-controls", "offcanvasRight").attr("data-bs-target", "#offcanvasRight");
        $('#v-pills-params-tab').attr("data-bs-toggle", "offcanvas")
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
    let id = currentSelection3D - 1;
    let param = $(this).attr("id").split("__")[1];
    console.log(typeof algorithms3D[id][param] + ", " + param);
    console.log("before", algorithms3D[id][param]);
    if(typeof algorithms3D[id][param] === "number") {
        algorithms3D[id][param] = JSON.parse($(this).val());
    } else {
      algorithms3D[id][param] = $(this).val();
    }
    $(this).attr("title", $(this).val());
    $(this).attr("placeholder", $(this).val());
    $(this).val("");
    console.log("after", algorithms3D[id][param]);
});

$('.inner_param .form-check-input').change(function () {
    let id = currentSelection3D - 1;
    let param = $(this).attr("id").split("__")[1];
    console.log(typeof algorithms3D[id][param] + ", " + param);
    console.log("before", algorithms3D[id][param]);
    if (!$(this).is(':checked')) {
        algorithms3D[id][param] = false;
        $(this).removeClass('checked');
        $(this).val("false");
    } else {
        algorithms3D[id][param] = true;
        $(this).addClass('checked');
        $(this).val("true");
    }
    console.log("after", algorithms3D[id][param]);
});
