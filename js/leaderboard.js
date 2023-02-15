'use strict';

const ctx = document.getElementById('myChart');

// Global variables
// session array initialized here

let session = [];

// pulling saved scores from localStorage, then using a sorting function to sort the array of high scores

if (localStorage.getItem('session') !== null) {
  let loadScores = JSON.parse(localStorage.getItem('session'));
  let sortedHighScores = (loadScores) => {
    return loadScores.sort((a, b) => {
      return b.goodCall - a.goodCall;
    } );
  }
  sortedHighScores();
  console.log(sortedHighScores);
}

// TODO: replace gamerName, score with array from localStorage
let gamerName = ['David', 'Tony', 'Alex'];
let score = [10, 16, 22];

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
