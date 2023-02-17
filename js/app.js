'use strict';

//Global variables ------------------------------------------------------
const randomNames = ["Bridget Bridges", "Tyra Fabian", "Tiera Gannon", "Brice Jaime", "Aden Portillo", "Acacia Michaud", "Malika Schweitzer", "Kendra Davidson", "Eric Harper", "Trystan Poston", "Arnold Peralta", "Randall Hackett", "Mark Rooney", "Reilly Blalock", "Travis Pruitt", "Bilal Mansfield", "Celia Castle", "Erich Ridgeway", "Eduardo Samuels", "Norman Conklin", "Abdullah Shumaker", "Maranda Weldon", "Belinda Chu", "Luisa Anderson", "Maddison Mattox", "Elexis Tirado", "Chelsie Duarte", "Abner Shultz", "Immanuel Flowers", "Mathew Bagwell", "Orlando Richard", "Bret Montague", "Alize Donnelly", "Nina French", "Frederick Peacock", "Sonya Yoon", "Marisela Huffman", "Ian Neal", "Bronson Griswold", "Alessandro Albert", "Beatrice Smyth", "Demarcus Valerio", "Tyrone Patton", "Tyana Kahn", "Alexzander Lipscomb", "Victor Gustafson", "Ahmed Cortes", "Martha Bess", "Robin Vincent", "Aiden Storm", "Abdullah Rector", "Zion McKenna", "Anisa Walden", "Gunner Wilhelm", "Brissa Jeffers", "Alora Carl", "Jarrett Seaton", "Stephon Tyson", "Brittney Bean", "Jasper Coe", "Aliya Cloud", "Dalton Horan", "Edgar Neil", "Julissa Casper", "Delanie Haley", "Brynn Burger", "Klarissa Gunderson", "Izabella Perry", "Madison Libby", "Cristina Negrete", "Denis Fletcher", "Uriel Fanning", "Leah Rowe", "Kennedy Gifford", "Ari Fanning", "Jeremy Hull", "Johan Mayer", "Nayeli Roe", "Jordyn Graham", "Clifford Schrock", "Yasmin Rhoades", "Shekinah Desantis", "Connie See", "Keegan Gomes", "Ellen Johns", "Alessandra Kemp", "Laura Jacobsen", "Rayne Dasilva", "Sky Mullin", "Deontae Do", "Zion Gillette", "Marlon Richter", "Fabiola Shepherd", "Brendan Mondragon", "Ryland Myers", "Karson Groves", "Gianni Leggett", "Lonnie Corrales", "Glen Outlaw", "Jada Conrad", "Katrina Lombardo", "Shreya Katz", "Roman Streeter", "Summer McCloskey", "Aden Hobbs", "Ciara Laughlin", "Rivka Kasper", "Makala Hampton", "Jailyn Duvall", "Haley Ryan", "Jamie Longo", "Vicente Bynum", "Makaylah Painter", "Tylor Broughton", "Amani Baird", "Naya Pace", "Amos Blair", "Maxwell Free", "Kristi Slone", "Natalya Kramer", "John Kirby", "Louie Chau", "Thea Joiner", "Alessandra Hastings", "Meagan Lehman", "Misty Hedrick", "Jacoby Schulze", "Diego Corral", "Annabelle Eckert", "Heriberto Angel", "Colin Cook", "Eve Nielsen", "Shira Lantz", "Derick Mcvey", "Tia Cisneros", "Kiarra Barksdale", "Muhammad Guerra", "Sage Coley", "Semaj Clary", "Matthew Montague", "Charlie Ontiveros", "Easton Mosher", "Nakia Cone", "Jakobe Sadler", "Michaela Fine", "Makala Muhammad", "Lacey Fay", "Xavier Kyle", "Annie Eubanks", "Sherman Schulte", "Lucia Cardwell", "Abdullah McClanahan", "Jarod Ragland", "Thea Minton", "Jamie McDonald", "Allan Rahman", "Mari Gilley", "Sarai Lorenzo", "Dante Bagwell", "Jaylen Rea", "Ernesto Spaulding", "Daisy Seifert", "Samara Villa", "Jasmyn Tyson", "Deshaun Kendall", "Rosalinda Geiger", "Theo Marcus", "Keisha Sorensen", "Molly Kline", "Stewart Costa", "Tre Lind", "Jaylan Harris", "Xochitl Tejada", "Mackenna Ott", "Kyle Stine", "Darrell Tolliver", "Jodie Schubert", "Magdalena Souza", "Zack Tyson", "Denis Derosa", "Rebecca Morgan", "Alea Wharton", "Dallin Branson", "Mallorie Daniel", "Stacy Becerra", "Juancarlos Keener", "Gary Caputo", "Shaniya Downey", "Kalob Gatlin", "Caelan Farrar", "Breonna Calvert", "Dwight Tom", "Talia Bellamy", "Chyna Cronin", "Manuel Driver", "Krista Givens", "Joaquin Nolan", "Rico Tobin", "Susan Pendleton", "Carlo Rouse"];

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
  let randomNumber = Math.floor(Math.random() * 40) + 1;

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
  let countDownTimer = 20;

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
setVolume(music, 0.1);
setVolume(clickFX, 1);
checkLocalStorage();
formName.addEventListener('submit', getName);
mute.addEventListener('click', toggleBG);


