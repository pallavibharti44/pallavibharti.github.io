
var sessionVal;//default session time
var breakVal; //default break time
var intervalHandle;
var isPaused;
var isSession;
var session_cpy;
var break_cpy;
var newSession;
var newBreak;

//controls
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var sound = new Audio("alarm.mp3");

function initialize(){
    sessionVal = 25 * 60; //default session time
    breakVal = 5 * 60; //default break time
    session_cpy = sessionVal;
    break_cpy = breakVal; //creating copies 
    document.getElementById("b").style.color = "white";
    document.getElementById("ses").style.color = "white";
    newBreak = true;
    newSession = true;
    isPaused = false;
    isSession = true;
}

function resetF(){
    clearInterval(intervalHandle);
    document.getElementById("time-display").textContent = "25:00";
    document.querySelector("#session").value = "";
    document.querySelector("#break").value = "";
    initialize();
}

reset.addEventListener("click", resetF); //reset button functionality

play.addEventListener('click', function(){
    isPaused = false;
    clearInterval(intervalHandle);
    if(isSession)
        {
            startSession();
        }
    else
        {
            startBreak();
        }
            });

pause.addEventListener('click', function(){
    isPaused = true;
    clearInterval(intervalHandle);
    });

function tickSession(){
    if(!isPaused){
        var display = document.getElementById("time-display");
        var min = Math.floor(sessionVal/60);
        var sec = sessionVal - (min*60) ;
        if (sec < 10) {
            sec="0"+sec;
            }
        var message = min.toString()+":"+sec;
        display.textContent = message;
        if(sessionVal === 0){
            sound.play();
            clearInterval(intervalHandle);
            newBreak = true;
            startBreak();
            }
        sessionVal--;
    }
}


function tickBreak(){
    if (!isPaused){
        var display = document.getElementById("time-display");
        var min = Math.floor(breakVal/60);
        var sec = breakVal - (min*60) ;
        if (sec < 10) {
            sec="0"+sec;
            }
        var message = min.toString()+":"+sec;
        display.textContent = message;
        if(breakVal === 0){
            sound.play();
            clearInterval(intervalHandle);
            newSession = true;
            startSession();
            }
        breakVal--;
    }
}

function startBreak(){
    document.getElementById("ses").style.color = "white";
    document.getElementById("b").style.color = "#273238";
    isSession = false;
	intervalHandle = setInterval(tickBreak, 1000);
}

function startSession(){
    isSession = true;
    var inpTimeX = document.querySelector("#session");
    inpTime = inpTimeX.value;
    inpTimeX.value = '';
    document.getElementById("b").style.color = "white";
    document.getElementById("ses").style.color = "#273238";
    if (inpTime){
        sessionVal = inpTime * 60;
        session_cpy = sessionVal;
    }
    else if(newSession){
        sessionVal = session_cpy; // when resetting
    }
    var inpTimeX = document.querySelector("#break");
    inpTime = inpTimeX.value;
    inpTimeX.value = '';
    if (inpTime){
        breakVal = inpTime * 60;
        break_cpy = breakVal;
        }
    else if(newBreak){
        breakVal = break_cpy; // when resetting
        }
    console.log(inpTime)
    newBreak = false;
    newSession = false;
	intervalHandle = setInterval(tickSession, 1000);
	}

initialize();