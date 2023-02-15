'use strict';

//Global variables
const randomNames = ["Malcolm Hull", "Zain Faulk", "Elvin Geiger", "Brock Noe", "Ibrahim Mull", "Alanis Dillon", "Ajay Barrios", "Braydon Braden", "Chaz Nesbitt", "Spencer Saylor", "Romeo Fogle", "Mickayla Shearer", "Madilyn Babcock", "Evelyn McNeal", "Bayley Leon", "Amberly Carrillo", "Annabella Vogel", "Kylie Francisco", "Katy Acosta", "Rayna Balderas", "Jackie Scholl", "Nico Templeton", "Perla Hoyt", "Antwan Plummer", "Zainab Baughman", "Kurt Mojica", "Octavia Hammer", "Maura Swope", "Ashton Gilman", "Beth Keefe", "Priscila Read", "Catherine Rubio", "Reilly Cardona", "Neha Mortensen", "Celia Hagen", "Zaria Schumacher", "Elsa McIntire", "Rylan Walden", "Jaren Burks", "Rylan Volk", "Allyson Dempsey", "Paxton Kroll", "Kenton Knight", "Shelbi Slack", "Demond Doucette", "Trever Epperson", "Cesar Donnell", "Landen Grove", "Juana Gabriel", "Zavier Isbell"];

let session = [];

const graphs = ["greenDown", "greenUp", "redDown", "redUp"];

const listOfProfiles = [];

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
  let randomNumber = Math.floor(Math.random() * 10);

  return `${randomType}_${randomNumber}`;
}

// render profile function
function renderProfile() {
  let profileContainer = document.getElementById('timer-box'); //cant get employee-profile-container to work, using timer instead
  let profileImg = document.getElementById('profileRender');
  let profileName = document.createElement('p');
  let rng = function () {
    return Math.floor(Math.random() * listOfProfiles.length);
  };
  let number = rng();
  profileName.innerText = `${listOfProfiles[number].name}'s performance`;
  profileImg.src = listOfProfiles[number].graph;
  profileContainer.appendChild(profileName);
  listOfProfiles.splice(number,1);
}



//Form - username
let formName = document.getElementById('form-name');
function getName(e) {
  e.preventDefault();
  //user input name stored in a variable = username
  let username = e.target.username.value;
  let welcomeUserHTML = document.getElementById('welcome-user');
  let welcomeUser = document.createElement('p');
  welcomeUser.innerText = `Welcome, ${username}!`;
  welcomeUserHTML.appendChild(welcomeUser);
  timer();
}
formName.addEventListener('submit', getName);

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

//Executables
generateListOfProfiles();
renderProfile();
console.log(listOfProfiles);

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

if (!localStorage.getItem('session')) {
  // if localStorage does NOT find something called session, it creates a fresh empty session.
  let createSession = new Session('testUser', 8);
  session.push(createSession);
  console.log(session);
  saveState();
} else {
  let loadState = localStorage.getItem('session');
  session = JSON.parse(loadState);
  console.log(session);
}
// if (!localStorage.getItem('session')) {
//   // if localStorage does NOT find something called session, it creates a fresh empty session.  
//   new Session (); // T0D0: pass in w/ actual form data

//   }





