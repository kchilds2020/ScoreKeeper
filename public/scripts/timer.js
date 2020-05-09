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

timerDiv.innerText=convertToMinAndSec(duration);


function renderPage(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    dbID = urlParams.get('game');

    startBtn.style.backgroundColor= "rgb(27, 223, 141)";

    let scoreTag = document.createElement("a");
    scoreTag.href = `/score?game=${dbID}`;
    scoreTag.innerText = 'Score';
    scoreTag.id = 'timer-links';
    document.querySelector('.links').appendChild(scoreTag);

    let timerTag = document.createElement("a");
    timerTag.href = `/timer?game=${dbID}`;
    timerTag.innerText = 'Timer';
    timerTag.className = 'active';
    timerTag.id = 'timer-links';
    document.querySelector('.links').appendChild(timerTag);
    

    
    
    
    
    
}

function startTimer(){
    start = start ? false : true;
    console.log(start);
    if(current !== 0 && start == false){
        clearInterval(interval);
        startBtn.style.backgroundColor= "rgb(27, 223, 141)";
        startBtn.innerText="Start";
        return;
    }
    else{
        startBtn.innerText="Pause"
        startBtn.style.backgroundColor="#b63f3f"
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
    startBtn.style.backgroundColor= "rgb(27, 223, 141)";
    startBtn.innerText="Start";
    timerDiv.innerText=convertToMinAndSec(duration);
}

function convertToMinAndSec (duration){
    const minutes = Math.floor(duration/60);
    const seconds= duration%60;
    return seconds >= 10 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
}

window.onload = renderPage();