'use strict';

const ctx = document.getElementById('myChart');

// Global variables, empty arrays to hold our incoming gamerName and score.

let gamerName = [];
let score = [];

// Global functions 

document.getElementById('resetLeaderboard').addEventListener('click', clearLeaderboard);
function clearLeaderboard() {
  localStorage.clear();
} // empties local storage on clicking the reset button. localStorage is only used for the leaderboard in this application.



let sortedHighScores = (array) => {
  return array.sort((a, b) => {
    return b.goodCall - a.goodCall;
  });
};  // takes an array of objects and sorts them in descending numerical order by the goodCall property.

function saveValuesToArray(anArray) {
  anArray.forEach(playerSession => {
    gamerName.push(playerSession.name);
    score.push(playerSession.goodCall);
  });
}  // takes an array of playerSession(s) and fills out the gamerName and score arrays with the playerSession's respective values.

if (localStorage.getItem('session') !== null) {
  let loadScores = JSON.parse(localStorage.getItem('session'));
  let sortedArray = sortedHighScores(loadScores);  // fetches the array of playerSession(s) from localStorage, sorts by score.
  
  saveValuesToArray(sortedArray);  // saves the sorted values to the leaderboard score arrays for chart.js to digest.
}

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: gamerName,
    datasets: [{
      label: 'Profiles processed',
      data: score,
      borderWidth: 1
    }]
  },
  options: {
    layout: {
      padding: {
        left: 10,
        right: 10,
      },
    },
    backgroundColor: [
      'rgb(72,116,196)'
    ],
    borderColor: [
      'rgb(72,116,196)'
    ],
    barThickness: '30',
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
