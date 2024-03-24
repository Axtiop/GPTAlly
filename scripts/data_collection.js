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

let video = document.getElementById('myVideo');
const changeVideoBtn1 = document.getElementById('FilePathBtn1');
const changeVideoBtn2 = document.getElementById('FilePathBtn2');
var img = document.getElementById("my_image");
const title = document.getElementById('experiment_id');

let videoCounterBtn1 = 1; let videoCounterBtn2 = 1; let videoCounterBtn3 = 1; let videoCounterBtn4 = 1; let videoCounterBtn5 = 1;
let newSource =  `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/Video.mp4`;
let newImg = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/Image.png`;
let csvSource = `https://axtiop.github.io/GPTGuardian_display/data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/data.csv`;

function changeVideoSource(newSource) {
    video.src = newSource;
    video.load();
}

changeVideoBtn1.addEventListener('click', function() {
    videoCounterBtn4 = (videoCounterBtn4 - 1) || 4;

    // Decrement counter 3 if counter 4 rolled over to 0
    if (videoCounterBtn4 === 4) {
        videoCounterBtn3 = (videoCounterBtn3 - 1) || 3;
    
        // Decrement counter 2 if counter 3 rolled over to 0
        if (videoCounterBtn3 === 3) {
            videoCounterBtn2 = (videoCounterBtn2 - 1) || 2;
    
            // Decrement counter 1 if counter 2 rolled over to 0
            if (videoCounterBtn2 === 2) {
                videoCounterBtn1 = (videoCounterBtn1 - 1) || 2;
            }
        }
    }
    experiment_id.textContent = `Experiment: ${(videoCounterBtn1-1)*24 + (videoCounterBtn2-1)*12 + (videoCounterBtn3-1)*4 + videoCounterBtn4}`;
    newSource = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/Video.mp4`;
    img.src = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/Image.png`;
    changeVideoSource(newSource);
    csvSource = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/data.csv`;
    clearChartData();
    clearInterval(interval);
    restartVideo();
    fetch_data(csvSource);
});

changeVideoBtn2.addEventListener('click', function() {
    prevideoCounterBtn4 = (videoCounterBtn4 % 4 )
    videoCounterBtn4 = prevideoCounterBtn4 + 1;
    if(prevideoCounterBtn4 === 0){
        prevideoCounterBtn3 = (videoCounterBtn3 % 3 )
        videoCounterBtn3 = prevideoCounterBtn3 + 1;
        if(prevideoCounterBtn3 === 0){
            prevideoCounterBtn2 = (videoCounterBtn2 % 2 )
            videoCounterBtn2 = prevideoCounterBtn2 + 1;
            if(prevideoCounterBtn2 === 0){
                videoCounterBtn1 = (videoCounterBtn1 % 2 ) + 1;
            }
        }
    }
    experiment_id.textContent = `Experiment: ${(videoCounterBtn1-1)*24 + (videoCounterBtn2-1)*12 + (videoCounterBtn3-1)*4 + videoCounterBtn4}`;
    newSource = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/Video.mp4`;
    img.src = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/Image.png`;
    
    changeVideoSource(newSource);
    csvSource = `data_decision/L1N${videoCounterBtn1}/L2N${videoCounterBtn2}/L3N${videoCounterBtn3}/L4N${videoCounterBtn4}/L5N${videoCounterBtn5}/data.csv`;
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

window.onload = function() {
    fetch_data("https://axtiop.github.io/GPTGuardian_display/data_decision/L1N1/L2N1/L3N1/L4N1/L5N1/data.csv");
}; 


// find elements
$("#staticform").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: 'https://api.staticforms.xyz/submit', // url where to submit the request
      type: "POST", // type of action POST || GET
      dataType: 'json', // data type
      data: $("#staticform").serialize(), // post data || get data
      success: function(result) {
        // you can see the result from the console
        // tab of the developer tools
        alert(JSON.parse(result));
      },
      error: function(xhr, resp, text) {
        alert(xhr, resp, text);
      }
    })
  });
  