let duration =  60;
let current = 0;
let timerDiv = document.getElementById('timer');
let startBtn = document.getElementById('start-btn');
let resetBtn = document.getElementById('reset-btn');
let timerVal = document.getElementById('timer-value');
let interval;
let start = false;

let startBtnVal = false;
startBtn.addEventListener('click',startTimer);
resetBtn.addEventListener('click',resetTimer);

resetBtn.style.backgroundColor = 'rgb(89, 116, 189)';
timerDiv.innerText=convertToMinAndSec(duration);

function startTimer(){
    start = start ? false : true;
    console.log(start);
    if(current !== 0 && start == false){
        clearInterval(interval);
        startBtn.style.backgroundColor= "rgb(89, 189, 134)";
        startBtn.innerText="Start";
        return;
    }
    else{
        startBtn.innerText="Stop"
        startBtn.style.backgroundColor="red"
        interval = setInterval(function(){
            if((duration - current) > 0){
                let val = convertToMinAndSec(duration - current);    
                timerDiv.innerText = `${val}`;
                current++;
            }
            else{
                clearInterval(interval);
                timerDiv.innerText = `Time!`;
                return;
            }
        }, 1000);
    }
}

function updateTimer(){
    duration = timerVal.value;
    temp = convertToMinAndSec(duration);
    timerDiv.innerText = `${temp}`;
    
}

function stopTimer(){
    clearInterval(interval);
}

function resetTimer(){
    current = 0;
    clearInterval(interval);
    startBtn.style.backgroundColor= "rgb(89, 189, 134)";
    startBtn.innerText="Start";
    timerDiv.innerText=convertToMinAndSec(duration);
}

function convertToMinAndSec (duration){
    const minutes = Math.floor(duration/60);
    const seconds= duration%60;
    return seconds >= 10 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
}