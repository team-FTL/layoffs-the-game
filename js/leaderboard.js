'use strict';

const ctx = document.getElementById('myChart');

// Global variables, empty arrays to hold our incoming gamerName and score.

let gamerName = [];
let score = [];

// Global functions 

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
      label: 'Score',
      data: score,
      borderWidth: 1
    }]
  },
  options: {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
