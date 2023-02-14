'use strict';


// Timer function
function timer() {
  const timerHTML = document.getElementById('timer');
  let countDownTimer = 60;
  let countDown = function () {
    timerHTML.innerHTML = `${countDownTimer--} sec left`;
    if (countDownTimer < 0) {
      clearInterval(startCountDown);
      // TODO: remove eventListeners + render results + option to restart the game

      timerHTML.innerHTML = 'Times up';
      // window.location.reload(); // auto refresh page function CAN be used with restart button
    }
  };
  let startCountDown = setInterval(countDown, 1000);
}
timer();


// Local Storage functions
// We're creating local storage functions that saves the results of the game to a leaderboard: the user name, number of correct choices, and number of incorrect choices.  We also initialize the local storage if it has not been done before, and we DON'T initialize a new local storage if it has so we don't wipe the leaderboard.  Game results are contained in a object called session.

const Session () {
  this.name = name;
  this.goodCall = goodCall;
  this.badCall = badCall; 
}
  

// saveState can save game session results to localStorage
function saveState() {
  let processedSaveState = JSON.stringify(session);
  localStorage.setItem('session', processedSaveState);
}

if (!localStorage.getItem('session')) {
  // if localStorage does NOT find something called session, it creates a fresh empty session.  
  new Session;

  }




