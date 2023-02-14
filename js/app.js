'use strict';


// Timer function
function timer() {
  const timerHTML = document.getElementById('timer-box');
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
