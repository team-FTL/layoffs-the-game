'use strict';

//Global variables ------------------------------------------------------
const randomNames = ["Malcolm Hull", "Zain Faulk", "Elvin Geiger", "Brock Noe", "Ibrahim Mull", "Alanis Dillon", "Ajay Barrios", "Braydon Braden", "Chaz Nesbitt", "Spencer Saylor", "Romeo Fogle", "Mickayla Shearer", "Madilyn Babcock", "Evelyn McNeal", "Bayley Leon", "Amberly Carrillo", "Annabella Vogel", "Kylie Francisco", "Katy Acosta", "Rayna Balderas", "Jackie Scholl", "Nico Templeton", "Perla Hoyt", "Antwan Plummer", "Zainab Baughman", "Kurt Mojica", "Octavia Hammer", "Maura Swope", "Ashton Gilman", "Beth Keefe", "Priscila Read", "Catherine Rubio", "Reilly Cardona", "Neha Mortensen", "Celia Hagen", "Zaria Schumacher", "Elsa McIntire", "Rylan Walden", "Jaren Burks", "Rylan Volk", "Allyson Dempsey", "Paxton Kroll", "Kenton Knight", "Shelbi Slack", "Demond Doucette", "Trever Epperson", "Cesar Donnell", "Landen Grove", "Juana Gabriel", "Zavier Isbell"];

const clickFX = new Audio('soundtrack/click.mp3')

let listOfSessions = [];

const graphs = ["greenDown", "greenUp", "redDown", "redUp"];

const listOfProfiles = [];

//DOM windows -----------------------------------------------------------------
let formName = document.getElementById('form-name');
let retainButton = document.getElementById('retain');
let fireButton = document.getElementById('fire');
let music = document.querySelector('audio');
let mute = document.getElementById('mute');

//Objects --------------------------------------------------------------------
function Session(name, goodCall) {
  this.name = name;
  this.goodCall = goodCall;
}

//Constructor function for session data
function Profile(name, fileName, fileExt = 'svg') {
  this.name = name;
  this.graph = `img/graphs/${fileName}.${fileExt}`;
}

//Local Storage functions -------------------------------------------------
function saveState() {
  let processedSaveState = JSON.stringify(listOfSessions);
  localStorage.setItem('session', processedSaveState);
}

function checkLocalStorage() {
  let newSession = new Session();

  //if localStore is NOT called session, create empty session
  if (!localStorage.getItem('session')) {
    listOfSessions.push(newSession);
  } else {
    let loadState = localStorage.getItem('session');
    listOfSessions = JSON.parse(loadState);

    listOfSessions.push(newSession);
  }
}

//Sound Functions
function setVolume(audio, num = 0.2) {
  audio.volume = num;
  console.log(audio);
}

function toggleBG() {
  if (!music.paused) {
    music.pause();
    mute.src = 'img/UI/soundoff.svg';
  } else {
    music.play();
    mute.src = 'img/UI/soundon.svg';
  }
}

//Generate Random Profiles -------------------------------------------------
function generateListOfProfiles() {
  randomNames.forEach(name => {
    let randomGraph = pickRandomGraph();

    listOfProfiles.push(new Profile(name, randomGraph));
  });
}

function pickRandomGraph() {
  let randomType = graphs[Math.floor(Math.random() * graphs.length)];
  let randomNumber = Math.floor(Math.random() * 10) + 1;

  return `${randomType}_${randomNumber}`;
}

//Render Functions --------------------------------------------------------
function renderProfile() {
  let employeeName = document.getElementById('employeeName');
  let profileImg = document.getElementById('profileRender');

  let number = Math.floor(Math.random() * listOfProfiles.length)
  let selectedEmployee = listOfProfiles[number].name;

  if (selectedEmployee === listOfSessions[listOfSessions.length - 1].name) {
    employeeName.innerText = `Careful! This is YOUR performance, ${selectedEmployee}.`;
  } else {
    employeeName.innerText = `${selectedEmployee}'s performance`
  }

  profileImg.src = listOfProfiles[number].graph;

  listOfProfiles.splice(number, 1);
}

function clearPlayArea() {
  let playArea = document.getElementById('gameplay-area');
  playArea.innerHTML = '';
}

function buildGamePlayArea() {
  let playArea = document.getElementById('gameplay-area');
  // playArea.innerHTML = `<div id="play-area" class="play-area-pane">`;
  // let innerPlayArea = document.getElementById('play-area');

  playArea.innerHTML = `
    <div id="timer-box">Loading...</div>
    <div id="employee-profile-container">
      <p id="employeeName"></p>
      <img
        id="profileRender"
        src="img/employee_profile_placeholder.svg"
        alt="placeholder image for employee profiles measuring 1000x500px"
      />
    </div>`;
}

function renderEndScreen() {
  let playArea = document.getElementById('gameplay-area');
  let scoreCard = document.createElement('div');

  scoreCard.setAttribute('id', 'scoreCard');

  let leaderboardBtn = document.createElement('div');
  let restartBtn = document.createElement('div');
  
  let currentPlayer = listOfSessions[listOfSessions.length - 1]
  console.log(currentPlayer.goodCall);

  if (currentPlayer.goodCall === 1) {
    scoreCard.innerText = `Employee ${listOfSessions[listOfSessions.length - 1].name} processed ${listOfSessions[listOfSessions.length - 1].goodCall} profile. Quota has not been met. You've been arbitrarily laid off.`;
  } else {
    scoreCard.innerText = `Employee ${listOfSessions[listOfSessions.length - 1].name} processed ${listOfSessions[listOfSessions.length - 1].goodCall} profiles. Quota has not been met. You've been arbitrarily laid off.`;
  }

  leaderboardBtn.innerHTML = '<a href="leaderboard.html"> Go to Leaderboard</a>';
  leaderboardBtn.setAttribute('id', 'leaderboardBtn');
  restartBtn.textContent = 'Restart';
  restartBtn.setAttribute('id', 'restartBtn');

  playArea.appendChild(scoreCard);
  playArea.appendChild(leaderboardBtn);
  playArea.appendChild(restartBtn);

  restartBtn.addEventListener('click', restart);

}

//Timer function ---------------------------------------------------------
function startTimer() {
  //add eventHandler for game button
  retainButton.addEventListener('click', retain);
  fireButton.addEventListener('click', fire);
  renderProfile();

  const timerHTML = document.getElementById('timer-box');
  let countDownTimer = 2;

  //function to display number
  let countDown = function () {
    timerHTML.innerHTML = `${countDownTimer--} sec left`;
    if (countDownTimer < 0) {
      clearInterval(startCountDown);
      retainButton.removeEventListener('click', retain);
      fireButton.removeEventListener('click', fire);

      saveState();

      clearPlayArea();
      renderEndScreen();
    }
  };

  //function "countDown" to run every second
  let startCountDown = setInterval(countDown, 1000);
}

//Event Handlers for Form and Game Buttons ------------------------------------
function retain(e) {
  e.preventDefault();
  clickFX.play();

  let imageName = document.getElementById('profileRender').src;
  let gameArea = document.getElementById('employee-profile-container');

  if (imageName.includes('greenUp') || imageName.includes('redDown')) {
    listOfSessions[listOfSessions.length - 1].goodCall++;
  } else {

    gameArea.className = 'notify';
    setTimeout(() => {
      gameArea.classList = '';
    }, 100)
    renderProfile();
  }
  renderProfile();
}

function fire(e) {
  e.preventDefault();
  clickFX.play();

  let imageName = document.getElementById('profileRender').src;
  let gameArea = document.getElementById('employee-profile-container');

  if (imageName.includes('greenDown') || imageName.includes('redUp')) {
    listOfSessions[listOfSessions.length - 1].goodCall++;
  } else {
    gameArea.className = 'notify';
    setTimeout(() => {
      gameArea.classList = '';
    }, 100)
    renderProfile();

  }
  renderProfile();
}

function getName(e) {
  e.preventDefault();
  clickFX.play();
  //user input name stored in a variable = username
  let username = e.target.username.value;

  randomNames.push(username);
  generateListOfProfiles();
  clearPlayArea();
  buildGamePlayArea();

  listOfSessions[listOfSessions.length - 1].name = username;
  listOfSessions[listOfSessions.length - 1].goodCall = 0;

  startTimer();
}

function restart() {
  clickFX.play();
  location.reload();
}


//Executables----------------------------------------------------------------
setVolume(music, 0.2);
setVolume(clickFX, 1);
checkLocalStorage();
formName.addEventListener('submit', getName);
mute.addEventListener('click', toggleBG);


