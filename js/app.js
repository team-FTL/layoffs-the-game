'use strict';

//Global variables
const randomNames = ["Malcolm Hull", "Zain Faulk", "Elvin Geiger", "Brock Noe", "Ibrahim Mull", "Alanis Dillon", "Ajay Barrios", "Braydon Braden", "Chaz Nesbitt", "Spencer Saylor", "Romeo Fogle", "Mickayla Shearer", "Madilyn Babcock", "Evelyn McNeal", "Bayley Leon", "Amberly Carrillo", "Annabella Vogel", "Kylie Francisco", "Katy Acosta", "Rayna Balderas", "Jackie Scholl", "Nico Templeton", "Perla Hoyt", "Antwan Plummer", "Zainab Baughman", "Kurt Mojica", "Octavia Hammer", "Maura Swope", "Ashton Gilman", "Beth Keefe", "Priscila Read", "Catherine Rubio", "Reilly Cardona", "Neha Mortensen", "Celia Hagen", "Zaria Schumacher", "Elsa McIntire", "Rylan Walden", "Jaren Burks", "Rylan Volk", "Allyson Dempsey", "Paxton Kroll", "Kenton Knight", "Shelbi Slack", "Demond Doucette", "Trever Epperson", "Cesar Donnell", "Landen Grove", "Juana Gabriel", "Zavier Isbell"];

let listOfSessions = [];

const graphs = ["greenDown", "greenUp", "redDown", "redUp"];

const listOfProfiles = [];

//DOM windows
let formName = document.getElementById('form-name');
let retainButton = document.getElementById('retain');
let fireButton = document.getElementById('fire');


//Profile Object
function Profile(name, fileName, fileExt = 'svg') {
  this.name = name;
  this.graph = `img/graphs/${fileName}.${fileExt}`;
}

// Generate Random Profiles
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

// render profile function
function renderProfile() {
  let profileContainer = document.getElementById('timer-box');

  let employeeName = document.getElementById('employeeName');
  let profileImg = document.getElementById('profileRender');
  let rng = function () {
    return Math.floor(Math.random() * listOfProfiles.length);
  };
  let number = rng();
  employeeName.innerText = `${listOfProfiles[number].name}'s performance`;
  profileImg.src = listOfProfiles[number].graph;
  listOfProfiles.splice(number, 1);
}



//Form - username

function getName(e) {
  e.preventDefault();
  //user input name stored in a variable = username
  let username = e.target.username.value;
  let welcomeUserHTML = document.getElementById('welcome-user');
  let welcomeUser = document.createElement('p');
  welcomeUser.innerText = `Welcome, ${username}!`;
  welcomeUserHTML.appendChild(welcomeUser);

  listOfSessions[listOfSessions.length - 1].name = username;
  listOfSessions[listOfSessions.length - 1].goodCall = 0;

  startTimer();
}

// Timer function
function startTimer() {
  //add eventHandler for game button
  retainButton.addEventListener('click', retain);
  fireButton.addEventListener('click', fire);
  renderProfile();

  const timerHTML = document.getElementById('timer-box');
  let countDownTimer = 10;

  //function to display number
  let countDown = function () {
    timerHTML.innerHTML = `${countDownTimer--} sec left`;
    if (countDownTimer < 0) {
      clearInterval(startCountDown);
      retainButton.removeEventListener('click', retain);
      fireButton.removeEventListener('click', fire);
      // TODO: remove eventListeners + render results + option to restart the game

      timerHTML.innerHTML = 'Times up';
      // window.location.reload(); // auto refresh page function CAN be used with restart button

      saveState();
    }
  };

  //function "countDown" to run every second
  let startCountDown = setInterval(countDown, 1000);
}

//Event Handlers for Game Buttons
function retain(e) {
  e.preventDefault();

  let image = document.querySelector('#employee-profile-container img').src;

  if (image.includes('greenUp') || image.includes('redDown')) {
    listOfSessions[listOfSessions.length - 1].goodCall++
  }
  renderProfile();
}

function fire(e) {
  e.preventDefault();

  let image = document.querySelector('#employee-profile-container img').src;

  if (image.includes('greenDown') || image.includes('redUp')) {
    listOfSessions[listOfSessions.length - 1].goodCall++
  }
  renderProfile();
}

// Local Storage functions
// We're creating local storage functions that saves the results of the game to a leaderboard: the user name, number of correct choices, and number of incorrect choices.  We also initialize the local storage if it has not been done before, and we DON'T initialize a new local storage if it has so we don't wipe the leaderboard.  Game results are contained in a object called session.

// function Session (name, goodCall, badCall) {
//   this.name = name;
//   this.goodCall = goodCall;
//   this.badCall = badCall; 
// }


// saveState can save game session results to localStorage
function saveState() {
  let processedSaveState = JSON.stringify(session);
  localStorage.setItem('session', processedSaveState);
}


// Constructor function for session data
function Session(name, goodCall) {
  this.name = name;
  this.goodCall = goodCall;
  // this.badCall = badCall; 
}


function checkLocalStorage() {
  let newSession = new Session();

  if (!localStorage.getItem('session')) {
    // if localStorage does NOT find something called session, it creates a fresh empty session.
    listOfSessions.push(newSession);
  } else {
    let loadState = localStorage.getItem('session');
    listOfSessions = JSON.parse(loadState);

    listOfSessions.push(newSession);
  }
}

// innerHTML 

// When used after the form is complete, playArea clears uses innerHTML to clear out everything under the gameplay-area after the 

function clearPlayArea() {
  let playArea = document.getElementById('gameplay-area');
  console.log(playArea);
  playArea.innerHTML ='';
}

// then we use innerHTML to rebuild the gameplay area

function buildGamePlayArea() {
  let playArea = document.getElementById('gameplay-area');
  playArea.innerHTML = `<div id="play-area" class="play-area-pane">`;
  let innerPlayArea = document.getElementById('play-area');
  
  innerPlayArea.innerHTML = `<div class="left-pane-fire"></div>
    <div class="right-pane-retain"></div>
    <div id="timer-box">Time</div>
    <div id="employee-profile-container">
      <img
        src="img/employee_profile_placeholder.svg"
        alt="placeholder image for employee profiles measuring 1000x500px"
      />
    </div>
    <div id="humans-correctly-resourced">
      <p>Employees Processed Correctly: count</p>
    </div>`;
}

//Executables
checkLocalStorage();
generateListOfProfiles();
formName.addEventListener('submit', getName);



// // // When used after the form is complete, playArea clears uses innerHTML to clear out everything under the gameplay-area after the 
// let playArea = document.getElementsById('gameplay-area');
// document.playArea.innerHTML = '';

// // then we use innerHTML to rebuild the gameplay area

// let div = document.playArea.createElement('div');
// div.innerHTML = `<div id="play-area" class="play-area-pane">`;
// let innerPlayArea = document.getElementsById('play-area')
// let div = document.innerPlayArea.createElement('div');
// div.innerHTML = `<div class="left-pane-fire"></div>`;
// div.innerHTML = `<div class="right-pane-retain"></div>`;

// let div = document.playArea.createElement('div');
// div.innerHTML = `<div id="timer-box">Time</div>`;
// div.innerHTML = `<div id="employee-profile-container">
//           <img
//             src="img/employee_profile_placeholder.svg"
//             alt="placeholder image for employee profiles measuring 1000x500px"
//           />
//         </div>`;
// div.innerHTML = `<div id="humans-correctly-resourced">
//           <p>Employees Processed Correctly: ${count}</p>
//         </div>`;
// div.innerHTML = `<div id="retain">Retain</div>`;