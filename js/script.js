// set the tempo based on user input
function setTempo(currentTempo) {
    // set upper tempo limit
    if (currentTempo > 240) currentTempo = 240;
    // set lower limit
    if (currentTempo < 80) currentTempo = 80;
    $('.bpm-display').val(currentTempo);
}

// colourize the active beat
function displayBeat(beat) {
    if (beat == 1) {
        // first beat is red
        colour = '#f00';
    } else {
        colour = '#555';
    }
    // clear previous colour states and then set accordingly
    $('.beat').css('background', '#000');
    $('.beat' + beat).css('background', colour);
}

// set beatCount to 0
var beatCount = 0;

function tick(t) {
    // increase beatCount by 1 on every tick
    beatCount ++;

    // reset beatCount to 1 if the 4 beats are complete
    if(t % 4 === 1) {
        beatCount = 1;
    }

    // display which beat is current
    displayBeat(beatCount);
}

function done() {
    $("#startstop").html("start");
}

// initialize metronome
var paper = Raphael("metronome-container", 155, 230);
var m = metronome({
        len: 200,
        angle: 20,
        tick: tick,
        complete: done,
        paper: paper,
        audio: "https://github.com/wilson428/metronome/blob/master/tick.wav?raw=true"
});
m.make_input("#inputs");
m.shapes().outline.attr("fill", "#999");
m.shapes().arm.attr("stroke", "#EEE");

$(document).ready(function() {
    // initialize popover
    $('[data-toggle="popover"]').popover();

    // initialize tempo at 120bpm, the low end of allegro
    setTempo(120);

    // listen for increase of tempo
    $('.tempo-up').click(function() {
        var currentTempo = $('.bpm-display').val();
        currentTempo ++;
        setTempo(currentTempo);
    });

    // listen for decrease of tempo
    $('.tempo-down').click(function() {
        var currentTempo = $('.bpm-display').val();
        currentTempo --;
        setTempo(currentTempo);
    });

    // set the tempo if the user types it in
    $('.bpm-display').change(function() {
        setTempo($(this).val());
    });
});