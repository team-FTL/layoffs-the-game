## Vision

Team FTL is making a fun, simple browser game briefly simulating working as a harried HR manager at Seattle tech company.  Our vision is to create a game that is easy to learn and fun to play in a very short amount of time.  As a high-score chase, our game relieves our users' tedium with a sub-minute entertainment product that can be played multiple times without a 'loss,' making it a good stress reliever.  The theme of the game is topical for people in the tech industry, which distinguishes it from most competing micro-games.


## Scope (In/Out)

### IN - What will your product do

- The game will render simple instructions asking the user to Resource as many Humans as possible within a time limit by using two mouse-click inputs: FIRE and RETAIN.  Basic visual instructions are provided indicating what kind of employee chart represents a productive employee or a not productive employee.  
- The game will ask the user for their name, and begin the game when the user submits their name.
- When the game begins, a 60-second timer begins to count over the play area and an Employee Profile is displayed, consisting of an employee name and a performance chart.  The Profile is displayed between the FIRE and RETAIN buttons.
- The player will attempt to correctly fire or retain as many employees as possible in the time limit.  
- When the time is up, the game is over and the player's score is logged to the Leaderboard page and rendered visually over the play area with two buttons: Again? and Leaderboard.  Again? will refresh the page and restart the game, while Leaderboard will take the user to the Leaderboard page.

### OUT - What will your product not do.

- Our game will not have persistent leaderboards across multiple devices.  We are purely utilizing local storage on the browser to track scores over multiple sessions.
- Any data collected from our game will not be sold.


#### Stretch

- Add functionality limiting rapid-fire random hire/fire selection, possibly with a div window popping up over the play area requiring user disposition, or possibly by a time penalty applied to time remaining.
- Add random variation of productivity to employee constructor instead of just pulling from a hard coded list.
- Add multiple chart.js type options leaderboard.
- Add a light mode/dark mode.
- Allow keyboard OR mouse input for accessibility/fun.
- Include more ambiguous graphs in the arrays of employee productivity images.
- Add a subscribe to our mailing list

#### Functional Requirements

- Users can begin a game after loading the page, and view their recorded scores after completing a round of play.
- User name can be changed from game to game, and results tracked on leaderboards per name.
- Users can know how many good decisions they made over the course of the game.
- Users can learn more about the dev team if desired.


#### Data Flow

- User arrives at the page, and is asked for their name and to begin the game.
- The game timer begins, an employee profile and name are rendered from arrays, and the game is ready to receive user input for FIRE and RETAIN.
- The user's GOOD decisions are incremented up when the user FIREs an employee with a un-productive profile, or when they RETAIN an employee with a productive profile.
- After selecting FIRE or RETAIN a new employee name and profile is rendered for the user to FIRE or RETAIN.
- When the time limit is up, the event handlers for FIRE and RETAIN are removed, the final score is written to the leaderboard, and the user is shown the option to Play Again or View Scores.  Play Again will reload the page.

