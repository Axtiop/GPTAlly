let changeVideoBtn = document.getElementById("changeData");
let changePromptBtn = document.getElementById("changeprompt");
let video = document.getElementById('dataVideo');
let newSource =  `data_functions/P1/P1/Video.mp4`;
let promptsrc = 1;
let pointCounter = 1;

function changeVideoSource(i) {
    promptsrc = i;
    newSource = `data_functions/P${i}/P${pointCounter}/Video.mp4`;
    video.src = newSource;
    video.load();
    restartVideo();
}

for (let i = 1; i <= 10; i++) {
    let prompt = document.getElementById(`prompt${i}`);
    console.log(`prompt${i}`);
    prompt.addEventListener('click', function(event) {
        event.preventDefault();
        changeVideoSource(i);
    });
}

changeVideoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    pointCounter = (pointCounter % 3 ) + 1;
    changeVideoSource(promptsrc);
});


function playVideo() {
    video.play();
}

function stopVideo() {
    video.pause();
}

function restartVideo() {
    video.currentTime = 0; // Set current time to 0 (start of the video)
}

