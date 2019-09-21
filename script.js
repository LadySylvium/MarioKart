var racers = document.querySelectorAll("div#racers img");
var stoplight = document.getElementById("stoplight");
var winner = document.getElementById("winner");
var width = window.outerWidth;
var interval;

// starts race
function startRace() {
  stoplight.removeEventListener("click", startRace);
  stoplight.src = "lakigo.png";
  interval = setInterval(moveRight, 100);
}

// moves all racers to the right randomly
function moveRight(numbers=setRandomArray()) {
  for (let i=0; i < racers.length; i++) {
    let currentPos = parseFloat(racers[i].style.left, 10);
    racers[i].style.left = currentPos + numbers[i] + "px";
    if (parseFloat(racers[i].style.left, 10) > .75 * width) {
      endRace(racers[i]);
    }
  }
}

// sets array of random numbers
function setRandomArray() {
  var numArray = [];
  for (let racer of racers) {
    numArray.push(5 + Math.floor(25 * Math.random()));
  }
  return numArray;
}

// ends race with the winner's pic displayed
function endRace(raceWinner) {
  clearInterval(interval);
  winner.addEventListener("click", reset, false);
  for (let racer of racers) {
    racer.style.display = "none";
  }
  winner.src = raceWinner.id + "win.png";
}

// resets page
function reset() {
  stoplight.addEventListener("click", startRace, false);
  winner.removeEventListener("click", reset);
  winner.src = "ranking.png";
  stoplight.src = "lakistop.png";
  for (let racer of racers) {
    racer.style.display = "block";
    racer.style.left = "0px";
  }
}

reset();
getWidth();
