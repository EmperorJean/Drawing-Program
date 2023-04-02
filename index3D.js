
// parameter set up
let all_params3D = param_initialize3D();
let params_store3D = create_params_store3D();

function selectAlgorithm3D(id) {
  $('#3D_' + id).css({"border-color": "#86b7fe", "box-shadow": "0 0 0 .25rem rgba(13, 110, 253, .25)"});
}

function deselectAlgorithm3D(id) {
  $('#3D_' + id).css({
      "border-color": "none",
      "box-shadow": "none"
  }).attr("style", "rgba(0, 0, 0, 0.16) 0 1px 4px;");
}

// Functions for user interaction
function changeSelectionModified3D(id) {
    // reset the prev algo
    param_not_display3D(all_params[all_params.length -1  + currentSelection3D - 1]);
    param_not_display(all_params[currentSelection - 1]);

    deselectAlgorithm3D(currentSelection3D);
    // assign the new algo
    currentSelection3D = id;
    selectAlgorithm3D(currentSelection3D);
    param_display3D(all_params3D[all_params.length -1 + currentSelection3D - 1]);
    algoNameUpdate(currentSelection3D);

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
    let code = '<div class="card" title="' + algCredits3D[algId - 1] + '" onclick="changeSelectionModified3D(' + algId + ')" id="3D_' + algId + '">\
                    <div class="card-background" style="background-image: url(\'thumbnails/' + algShortName3D[algId - 1] + '.png\');"></div>\
                    <div class="card-body">\
                        <h5 class="card-text">' + algNames3D[algId - 1] + '</h5>\
                    </div>\
                </div>';
    document.getElementById("alg3D-cards").innerHTML += code;

    console.log("Creating " + algNames3D[algId - 1])
}
// Initialize cards
for(let i = 1; i <= algNames3D.length; i++) {
    createCard3D(i);
}

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
    console.log(all_params)
    return all_params;
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


// parameter change detection
$('.inner_param .form-control').change(function () {
    if(!canvas3D) return;
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
    if(!canvas3D) return;
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
