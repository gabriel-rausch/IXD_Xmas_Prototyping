var samples = ["kick", "snare", "hihat", "F", "G", "A", "C", "laugh-1", "laugh-2"];
var audioBuffer = {};
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
window.addEventListener("load", function () {
    document.querySelector("#pad1").addEventListener("touchstart", playSample.bind(this, "kick"));
    document.querySelector("#pad2").addEventListener("touchstart", playSample.bind(this, "snare"));
    document.querySelector("#pad3").addEventListener("touchstart", playSample.bind(this, "hihat"));
    document.querySelector("#pad4").addEventListener("touchstart", playSample.bind(this, "F"));
    document.querySelector("#pad5").addEventListener("touchstart", playSample.bind(this, "G"));
    document.querySelector("#pad6").addEventListener("touchstart", playSample.bind(this, "A"));
    document.querySelector("#pad7").addEventListener("touchstart", playSample.bind(this, "C"));
    document.querySelector("#pad8").addEventListener("touchstart", playSample.bind(this, "laugh-1"));
    document.querySelector("#pad9").addEventListener("touchstart", playSample.bind(this, "laugh-2"));
    document.querySelector("#start").addEventListener("click", startApplication);
});
function playSample(key) {
    console.log("played")
    if (audioContext === null)
        audioContext = new AudioContext();
    var source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = audioBuffer[key];
    source.start(audioContext.currentTime);
}
function startApplication() {
    // hide splashscreen
    document.querySelector("#splashscreen").classList.add("hide");
    document.querySelector("#buttons").classList.add("show");
    var _loop_1 = function (i) {
        console.log(i);
        var request = new XMLHttpRequest();
        request.responseType = "arraybuffer";
        request.open("GET", "assets/" + samples[i] + ".mp3");
        console.log(samples[i]);
        request.addEventListener("load", function () {
            var ac = new AudioContext();
            ac.decodeAudioData(request.response, function (buffer) { return audioBuffer[samples[i]] = buffer; });
        });
        request.send();
    };
    // load audio buffers
    for (var i = 0; i < samples.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=script.js.map