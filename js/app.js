'use strict';

//Global variables ------------------------------------------------------
const randomNames = ["Malcolm Hull", "Zain Faulk", "Elvin Geiger", "Brock Noe", "Ibrahim Mull", "Alanis Dillon", "Ajay Barrios", "Braydon Braden", "Chaz Nesbitt", "Spencer Saylor", "Romeo Fogle", "Mickayla Shearer", "Madilyn Babcock", "Evelyn McNeal", "Bayley Leon", "Amberly Carrillo", "Annabella Vogel", "Kylie Francisco", "Katy Acosta", "Rayna Balderas", "Jackie Scholl", "Nico Templeton", "Perla Hoyt", "Antwan Plummer", "Zainab Baughman", "Kurt Mojica", "Octavia Hammer", "Maura Swope", "Ashton Gilman", "Beth Keefe", "Priscila Read", "Catherine Rubio", "Reilly Cardona", "Neha Mortensen", "Celia Hagen", "Zaria Schumacher", "Elsa McIntire", "Rylan Walden", "Jaren Burks", "Rylan Volk", "Allyson Dempsey", "Paxton Kroll", "Kenton Knight", "Shelbi Slack", "Demond Doucette", "Trever Epperson", "Cesar Donnell", "Landen Grove", "Juana Gabriel", "Zavier Isbell"];

let listOfSessions = [];

const graphs = ["greenDown", "greenUp", "redDown", "redUp"];

const listOfProfiles = [];

//DOM windows -----------------------------------------------------------------
let formName = document.getElementById('form-name');
let retainButton = document.getElementById('retain');
let fireButton = document.getElementById('fire');


// Objects --------------------------------------------------------------------
function Session(name, goodCall) {
  this.name = name;
  this.goodCall = goodCall;
}

// Constructor function for session data
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

// Generate Random Profiles -------------------------------------------------
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

// Render Functions --------------------------------------------------------
function renderProfile() {
  let employeeName = document.getElementById('employeeName');
  let profileImg = document.getElementById('profileRender');
  let gameArea = document.getElementById('employee-profile-container');

  let number = Math.floor(Math.random() * listOfProfiles.length)

  employeeName.innerText = `${listOfProfiles[number].name}'s performance`;
  profileImg.src = listOfProfiles[number].graph;

  listOfProfiles.splice(number, 1);
}

function clearPlayArea() {
  let playArea = document.getElementById('gameplay-area');
  playArea.innerHTML ='';
}

function buildGamePlayArea() {
  let playArea = document.getElementById('gameplay-area');
  playArea.innerHTML = `<div id="play-area" class="play-area-pane">`;
  let innerPlayArea = document.getElementById('play-area');
  
  innerPlayArea.innerHTML = `<div class="left-pane-fire"></div>
    <div class="right-pane-retain"></div>
    <div id="timer-box">Time</div>
    <div id="employee-profile-container">
      <p id="employeeName"></p>
      <img
        id="profileRender"
        src="img/employee_profile_placeholder.svg"
        alt="placeholder image for employee profiles measuring 1000x500px"
      />
    </div>
    <div id="humans-correctly-resourced">
      <p>Employees Processed Correctly: count</p>
    </div>`;
}

// Timer function ---------------------------------------------------------
function startTimer() {
  //add eventHandler for game button
  retainButton.addEventListener('click', retain);
  fireButton.addEventListener('click', fire);
  renderProfile();

  const timerHTML = document.getElementById('timer-box');
  let countDownTimer = 60;

  //function to display number
  let countDown = function () {
    timerHTML.innerHTML = `${countDownTimer--} sec left`;
    if (countDownTimer < 0) {
      clearInterval(startCountDown);
      retainButton.removeEventListener('click', retain);
      fireButton.removeEventListener('click', fire);

      timerHTML.innerHTML = 'Times up';
      saveState();
    }
  };

  //function "countDown" to run every second
  let startCountDown = setInterval(countDown, 1000);
}

//Event Handlers for Form and Game Buttons ------------------------------------
function retain(e) {
  e.preventDefault();

  let imageName = document.getElementById('profileRender').src;
  let gameArea = document.getElementById('employee-profile-container');

  if (imageName.includes('greenUp') || imageName.includes('redDown')) {
    listOfSessions[listOfSessions.length - 1].goodCall++;
  } else {
    renderProfile();
    gameArea.className = 'notify';
  }

  renderProfile();
}

function fire(e) {
  e.preventDefault();

  let imageName = document.getElementById('profileRender').src;
  let gameArea = document.getElementById('employee-profile-container');

  if (imageName.includes('greenDown') || imageName.includes('redUp')) {
    listOfSessions[listOfSessions.length - 1].goodCall++;
  } else {
    renderProfile();
    gameArea.className = 'notify';
  }

  renderProfile();
}

function getName(e) {
  e.preventDefault();
  //user input name stored in a variable = username
  let username = e.target.username.value;

  clearPlayArea();
  buildGamePlayArea();

  listOfSessions[listOfSessions.length - 1].name = username;
  listOfSessions[listOfSessions.length - 1].goodCall = 0;

  startTimer();
}

//Executables -------------------------------------------------------------
checkLocalStorage();
generateListOfProfiles();
formName.addEventListener('submit', getName);