const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn"); 
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let paused = true;
let intervalId;

// starts timer if not paused
startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000)
    }
});

// pauses timer
pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;

        // stops updating intervalId
        clearInterval(intervalId);
    }
});

// resets timer to 0
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
});

// updates timer
function updateTime() {
    elapsedTime = Date.now() - startTime;

    let secs = Math.floor((elapsedTime/ 1000) % 60);
    let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

// adds proper padding to time unit for display purposes
function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}
