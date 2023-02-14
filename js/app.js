'use strict';

//Global variables
const randomNames = ["Malcolm Hull", "Zain Faulk", "Elvin Geiger", "Brock Noe", "Ibrahim Mull", "Alanis Dillon", "Ajay Barrios", "Braydon Braden", "Chaz Nesbitt", "Spencer Saylor", "Romeo Fogle", "Mickayla Shearer", "Madilyn Babcock", "Evelyn McNeal", "Bayley Leon", "Amberly Carrillo", "Annabella Vogel", "Kylie Francisco", "Katy Acosta", "Rayna Balderas", "Jackie Scholl", "Nico Templeton", "Perla Hoyt", "Antwan Plummer", "Zainab Baughman", "Kurt Mojica", "Octavia Hammer", "Maura Swope", "Ashton Gilman", "Beth Keefe", "Priscila Read", "Catherine Rubio", "Reilly Cardona", "Neha Mortensen", "Celia Hagen", "Zaria Schumacher", "Elsa McIntire", "Rylan Walden", "Jaren Burks", "Rylan Volk", "Allyson Dempsey", "Paxton Kroll", "Kenton Knight", "Shelbi Slack", "Demond Doucette", "Trever Epperson", "Cesar Donnell", "Landen Grove", "Juana Gabriel", "Zavier Isbell"]

const graphs = ["greenDown", "greenUp", "redDown", "redUp"];

const listOfProfiles = [];

//Profile Object
function Profile(name, fileName, fileExt = 'svg') {
  this.name = name;
  this.graph = `img/${fileName}.${fileExt}`
}

// Generate Random Profiles
function generateListOfProfiles() {
  randomNames.forEach(name => {
    let randomGraph = graphs[Math.floor(Math.random() * graphs.length)];
    listOfProfiles.push(new Profile(name, randomGraph))
  })
}

//Form - username
let formName = document.getElementById('form-name');
function getName(e){
  event.preventDefault();
  //user input name stored in a variable = username
  let username = e.target.username.value;
  let welcomeUserHTML = document.getElementById('welcome-user');
  let welcomeUser = document.createElement('p');
  welcomeUser.innerText = `Welcome, ${username}!`;
  welcomeUserHTML.appendChild(welcomeUser);
  timer();
}
formName.addEventListener('submit',getName);

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

//Excutables
generateListOfProfiles();

