const samples: string[] = ["kick", "snare", "hihat", "F", "G", "A", "C", "laugh-1", "laugh-2"];
let audioBuffer: object = {};
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;

window.addEventListener("load", function (): void {
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

function playSample(key: string): void {
    if (audioContext === null)
      audioContext = new AudioContext();
    const source: AudioBufferSourceNode = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = audioBuffer[key];
    source.start(audioContext.currentTime);
}


function startApplication(): void {
    // hide splashscreen
    document.querySelector("#splashscreen").classList.add("hide");
    document.querySelector("#buttons").classList.add("show");

    // load audio buffers
    for (let i: number = 0; i < samples.length; i++) {
        console.log(i);
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.responseType = "arraybuffer";
        request.open("GET", "assets/" + samples[i] + ".mp3");
        console.log(samples[i]);
        request.addEventListener("load", () => {
            const ac: AudioContext = new AudioContext();
            ac.decodeAudioData(request.response, (buffer) => audioBuffer[samples[i]] = buffer);
        });

        request.send();
    }
}
