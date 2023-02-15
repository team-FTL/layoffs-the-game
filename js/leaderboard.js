'use strict';

const ctx = document.getElementById('myChart');

// Global variables
// session array initialized here

// let session = [];

let gamerName = [];
let score = [];

if (localStorage.getItem('session') !== null) {
  let loadScores = JSON.parse(localStorage.getItem('session'));
  let sortedHighScores = (array) => {
    return array.sort((a, b) => {
      return b.goodCall - a.goodCall;
    });
    // return array;
  };
  let sortedArray = sortedHighScores(loadScores);
  sortedArray.forEach(playerSession => {
    gamerName.push(playerSession.name);
    score.push(playerSession.goodCall);
  });
  console.log(sortedArray);
};

console.log(gamerName);
console.log(score);


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
