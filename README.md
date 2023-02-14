# layoffs-the-game

Team FTL: Kyle Freemantle, Jonathan Tsai, Thomas Lau

## Description

It's 2023, and the layoffs are happening! Leadership has put everyone in Performance Improvement Plan for the past month and asked you to go through the current stack of employees and decide who gets to stay.

This web game will utilize a left-right decision making mechanism simulating a overworked HR manager at a big tech company. The user will be presented with a simulated graph of an employee's progress in their Perfomance Improvement Plan (PIP) and will have to make a binary descision to retain or fire the worker. The employees are either in good standing (represented by green scorecard) or in bad standing (represented by red scorecard). On the scorecard, there is a progress graph indicated if they are improving or worsening in their standing. The user will have to swipe right to keep or swipe left to fire. When the time ends, the user will be presented how many employees they've processed correctly. They will then be able to brag to their friends about their cutthroat business acumen!

## User Story

1) Inputs received by page
The webpage will let the user input their name and be able to start the game

- Create form element to accept user name
- Create Button, or Submit process
- Attach eventHandler to Button/Submit

2) Display instructions for game
Instructions will be present on page load, always accessible

- Create a `<section>` below the game for instructions
- Images for what's "correct", 4 images to show of correct decisions to make
- Text about what who you are and what your objectives are
- Click instructions presented to show how to interact with the game

3) Timer
User gets XX amount of seconds to process

- Need a section for timer
- Game ends after timer ends
- All game function is removed to prevent interactions
- Page loads ending blurb

4) Game function
Graph of employee progress in PIP

- Graph is displayed
- User clicks keep or fire buttons
- Left is fire, right is keep

5) Game Logic
Graphs have correct answers for the user to interpret

- Green graph going up is keep
- Red graph going down is keep
- Green graph going down is fire
- Red graph going up is fire

6) Game Ends
The timer runs out, the user is presented with a blurb that obscure the game itself

- The blurb will display how many employees they processed
- The blurb will also block the actual game field
- A link to leaderboard will be presented so user can check their scores

7) Leaderboard page
The user will be able to see their score on a leaderboard.

- Leaderboard will keep previous score and keep the scores all ranked in order by amount of processed
- Will utilize local storage to keep previous rounds scores with name and employees processed

8) About the team
There will be a page to introduce the web developers who worked on this project

- A short bio of each team member is presented
- A photo of team member is also shown


## Domain Modeling and Wireframing


![Domain Modeling and Wireframing](img/WireframeAndUML.png)
