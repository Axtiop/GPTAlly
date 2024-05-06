let data = [];
let data2 = [];
let dataIndex = 0;
let interval = null;
let isPaused = false;

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Speed [m/s]',
            data: data,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },{
            label: 'SI [-]',
            data: data2,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                  display: true,
                  text: 'Time [100 ms]',
                  color: 'rgba(0, 0, 0, 0.5)',
                  font: {
                    family: 'Times',
                    size: 20,
                    style: 'normal',
                    lineHeight: 1.2
                  },
                  padding: {top: 20, left: 0, right: 0, bottom: 0}
                }
            },
            y: {
                min: 0, // Set minimum value for y-axis scale
                max: 1, // Set maximum value for y-axis scale
                display: true,
                title: {
                  display: true,
                  text: 'Value',
                  color: 'rgba(0, 0, 0, 0.5)',
                  font: {
                    family: 'Times',
                    size: 20,
                    style: 'normal',
                    lineHeight: 1.2
                  },
                  padding: {top: 30, left: 0, right: 0, bottom: 0}
                }
            }
            }
        }
    });

const video = document.getElementById('myVideo');
const changeVideoBtn1 = document.getElementById('FilePathBtn1');
const changeVideoBtn3 = document.getElementById('FilePathBtn3');
const changeVideoBtn4 = document.getElementById('FilePathBtn4');
var img = document.getElementById("my_image");
let videoCounterBtn1 = 1; let videoCounterBtn3 = 1; let videoCounterBtn4 = 1;
let newSource =  `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/Video.mp4`;
let newImg = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/img.png`;
const namesBtn1 = ['Picking', 'Placing']; 
//const namesBtn2 = ['SI', 'Path-Planning']; 
const namesBtn2 = ['SI'];
const namesBtn3 = ['Short dist', 'Moderate dist', 'Long dist']; 
const namesBtn4 = ['Layout 1', 'Layout 2', 'Layout 3', 'Layout 4'];
const namesBtn5 = ['Prompt 1'];
let csvSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/data.csv`;

function changeVideoSource(newSource) {
    stopVideo();
    video.src = newSource;
    video.load();
}

changeVideoBtn1.addEventListener('click', function() {
    videoCounterBtn1 = (videoCounterBtn1 % namesBtn1.length ) + 1;
    changeVideoBtn1.textContent = namesBtn1[videoCounterBtn1 - 1]
    newSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/Video.mp4`;
    img.src = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/img.png`;
    changeVideoSource(newSource);
    csvSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/data.csv`;
    clearChartData();
    clearInterval(interval);
    restartVideo();
    fetch_data(csvSource);
});

changeVideoBtn3.addEventListener('click', function() {
    videoCounterBtn3 = (videoCounterBtn3 % namesBtn3.length ) + 1;
    changeVideoBtn3.textContent = namesBtn3[videoCounterBtn3 - 1]
    newSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/Video.mp4`;
    img.src = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/img.png`;
    changeVideoSource(newSource);
    csvSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/data.csv`;
    clearChartData();
    clearInterval(interval);
    restartVideo();
    fetch_data(csvSource);
});
changeVideoBtn4.addEventListener('click', function() {
    videoCounterBtn4 = (videoCounterBtn4 % namesBtn4.length ) + 1;
    changeVideoBtn4.textContent = namesBtn4[videoCounterBtn4 - 1]
    newSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/Video.mp4`;
    img.src = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/img.png`;
    changeVideoSource(newSource);
    csvSource = `data_decision/L1N${videoCounterBtn1}/L2N1/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N1/data.csv`;
    clearChartData();
    clearInterval(interval);
    restartVideo();
    fetch_data(csvSource);
});

let CounterBtn1 = 1; let CounterBtn2 = 1
startBtn = document.getElementById('displayDataBtn');
var stopBtn = document.getElementById('stopDataBtn');

var classdanger =  ["btn", "btn-danger" ,"mb-3"]
var classwarning = ["btn", "btn-warning" ,"mb-3"]

document.getElementById('displayDataBtn').addEventListener('click', function () {
    if(CounterBtn1 === 0){
        CounterBtn1 = 1;
        classdanger.forEach(function(className) {
            stopBtn.classList.remove(className);
        });
        classwarning.forEach(function(className) {
            stopBtn.classList.add(className);
        });
        stopBtn.textContent = "Pause";
        startBtn.textContent = "Resume";
    }
    start_typing();
    updateChart();
    playVideo();
    interval = setInterval(updateChart, 100);
});

document.getElementById('stopDataBtn').addEventListener('click', function () {
    if(CounterBtn1 === 1){
        CounterBtn1 = 0;
        classwarning.forEach(function(className) {
            stopBtn.classList.remove(className);
        });
        classdanger.forEach(function(className) {
            stopBtn.classList.add(className);
        });
        stopBtn.textContent = "Stop";
        startBtn.textContent = "Resume";
        clearInterval(interval);
        stopVideo();
    } else {
        CounterBtn1 = 1;
        classdanger.forEach(function(className) {
            stopBtn.classList.remove(className);
        });
        classwarning.forEach(function(className) {
            stopBtn.classList.add(className);
        });
        stopBtn.textContent = "Pause";
        startBtn.textContent = "Display Data";
        // there the data should also be stopped
        remove_writing();
        clearChartData();
        clearInterval(interval);
        restartVideo();
    }

});


var speeds = [];
var SI = [];
function fetch_data(name_csv){
    speeds = []
    SI = []
    dataIndex = 0;
    fetch(name_csv)
    .then(response => response.text())
    .then(data => {
        // Split the CSV data by lines
        const rows = data.trim().split('\n');
        // Parse each row and extract data
        rows.forEach(row => {
            const columns = row.split(',');
            speeds.push(parseFloat(columns[0]));
            SI.push(parseFloat(columns[1]));
        });
    })
    .catch(error => console.error('Error fetching CSV file:', error));
};

function updateChart() {
if (dataIndex >= SI.length) {
    clearChartData();
    restartVideo();
}
if (dataIndex >= 100) {
    data.shift();
    data2.shift();
}
    data.push(SI[dataIndex]);
    data2.push(speeds[dataIndex]);

    const labels = Array.from({ length: data.length }, (_, i) => (i + 1).toString());
    myChart.data.labels = labels.map((_, i) => (i + 1 + dataIndex - data.length).toString());
    myChart.data.datasets[0].data = data;
    myChart.data.datasets[1].data = data2;
    myChart.update();
    dataIndex++;
}
function clearChartData() {
    dataIndex = 0;
    data = [];
    data2 = [];
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    myChart.data.datasets[1].data = [];
    myChart.update();
}

function playVideo() {
    video.play();
}

function stopVideo() {
    video.pause();
}

function restartVideo() {
video.currentTime = 0; // Set current time to 0 (start of the video)
}

const text = "Coming soon..."; // Text to be displayed
const delay = 80; // Delay between each character (in milliseconds)

const textElement = document.getElementById('typewriter-text');

let index = 0;
let baseFontSize = 24; // Initial font size for example

function type() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;

        // Check if the text exceeds the width of the container
        if (textElement.offsetWidth < textElement.scrollWidth) {
            // Reduce font size if the text overflows
            baseFontSize -= 1;
            textElement.style.fontSize = baseFontSize + "px";
        }
        setTimeout(type, delay);
    }
}

function waiting_typing(){
    textElement.innerHTML = '_';
    waiting_interval = setInterval(() => {
    // Add or remove the cursor effect
    if (textElement.innerHTML.endsWith('|')) {
        textElement.innerHTML = textElement.innerHTML.slice(0, -1);
    } else {
        textElement.innerHTML += '|';
    }
}, 500);
}

// Start the typewriter effect when the page loads
function start_typing() {
clearInterval(waiting_interval);
textElement.innerHTML = ''; // Clear existing text
type();
global_interval = setInterval(() => {
    // Add or remove the cursor effect
    if(index >= text.length){
        if (textElement.innerHTML.endsWith('|')) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        } else {
            textElement.innerHTML += '|';
        }
    }
}, 500); // Adjust the blinking speed of the cursor (in milliseconds)

};

function remove_writing() {
    clearInterval(global_interval);
    const removeInterval = setInterval(() => {
        if (textElement.innerHTML.length > 0) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        } else {
            clearInterval(removeInterval); // Clear interval when text is empty
            index = 0;
            waiting_typing();

            // Reset font size to 24 if it was decreased
            if (baseFontSize !== 24) {
                baseFontSize = 24;
                textElement.style.fontSize = baseFontSize + "px";
            }
        }
    }, delay);
}


window.onload = function() {
    waiting_typing();
    fetch_data("data_decision/L1N1/L2N1/L3N1/L4N1/L5N1/data.csv");
}; 