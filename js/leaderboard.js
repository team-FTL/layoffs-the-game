'use strict';

const ctx = document.getElementById('myChart');

if (!localStorage.getItem('session')) {
  // if localStorage does NOT find something called session, it creates a fresh empty session.  
  new Session;

} else {
  let loadState = localStorage.getItem('session'); 
  session = JSON.parse(loadState);
  console.log(session);
}


// TODO: replace gamerName, score with array from localstorage
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
