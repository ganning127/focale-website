let interval;
let paused = false;
let timerInfo = {
  minutes: "",
  secondsRemain: ""
}
if (Notification.permission !== 'granted')
  Notification.requestPermission();
// buttons
let resetButton = document.getElementById("reset-button");
let pauseButton = document.getElementById("pause-button");
let submitButton = document.getElementById("start-button");
let minuteInput = document.getElementById("minute-input");
let timer = document.getElementById("timer");
let timerRow = document.getElementById("timer-row");
let inputRow = document.getElementById("inputs");
let headingSeparator = document.querySelector('.heading-separator');
let errorText = document.querySelector('.error-text');

resetButton.addEventListener('click', function() {
  clearInterval(interval);
  show("inputs");
  visible(headingSeparator, true);
  document.title = "Focale";
});

pauseButton.addEventListener('click', function() {
  if (paused) {
    paused = false;
    pauseButton.innerHTML = "Pause"
  }
  else {
    paused = true;
    pauseButton.innerHTML = "Resume"
  }
})

submitButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }

  timerInfo.minutes = document.getElementById("minute-input").value; // get how many mins the user inputted

  if (timerInfo.minutes === "" || timerInfo.minutes <= 0 || timerInfo.minutes >= 1000) {
    console.log("HERE");
    visible(errorText, true);
    errorText.classList.remove("hidden");
    return;
  }

  timer.innerHTML = formatTime(timerInfo.minutes * 60)
  show("timer");
  visible(headingSeparator, false);
  paused = false;
  visible(errorText, false);
  
  console.log(formatTime(timerInfo.minutes * 60))
  startTimer(timerInfo.minutes); // start the timer

  minuteInput.value = ""; // reset the input to 0 mins
})

function startTimer(minutes) {

  timerInfo.secondsRemain = seconds = minutes * 60; // seconds remaining
  
  interval = setInterval(function() {
    
    
    if (paused) {
      return;
    }
    if (timerInfo.secondsRemain <= 0) {
      // timer has reached 0
      show("inputs");
      visible(headingSeparator, true);
      document.title = "Timer Complete!";
      clearInterval(interval)

      let imgPath = "./img/favicon128.png"
      let notiText = `Focale ${timerInfo.minutes} minute timer complete!`
      let finishNoti = new Notification("Focale", {
        body: notiText,
        icon: imgPath
      });
      return;
    }

    timerInfo.secondsRemain -= 1; // decreasing timer remaining seconds
    let timeToSet = formatTime(timerInfo.secondsRemain)

    timer.innerHTML = `${timeToSet}` // shows time left on screen
    document.title = `${timeToSet}`; // shows time left on page title

    show("timer");
  }, 1000)
}


function show(rowType) {
  if (rowType === "inputs") {
    timerRow.classList.add('hidden');
    inputRow.classList.remove("hidden");
  }
  else if (rowType === "timer") {
    timerRow.classList.remove('hidden');
    inputRow.classList.add("hidden");
  }
}

function visible(element, visibleBool) {
  if (visibleBool) {
    element.classList.remove("hidden");
  }
  else {
    element.classList.add("hidden");
  }
}

function formatTime(seconds) {
  // seconds to hh:mm:ss
  dateObj = new Date(seconds * 1000);
  hours = dateObj.getUTCHours();
  minsInHours = hours * 60;
  minutes = dateObj.getUTCMinutes() + minsInHours;
  seconds = dateObj.getSeconds();
  timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  return timeString;
}
