// - - - - - Select all the necessary elements for manipulation in the page

// - Button AGAIN
const btnAgain = document.querySelector('.again');

// - Button CHECK
const btnCheck = document.querySelector('.check');

// - Paragraph for displaying the message ("Start guessing...")
const messageElem = document.querySelector('.message');

// - Input for entering the number
const guessEl = document.querySelector('.guess');

// - Div with the "?" (where the secret number will be shown)
const secretNumberElem = document.querySelector('.number');

// - Paragraph for the current score
const scoreEl = document.querySelector('.score');

// - Paragraph for the highscore
const highscoreEl = document.querySelector('.highscore');

// - Section for confetti canvas
const canvas = document.querySelector('#confetti');

// - - - - - Create a random number for the game (between 1 and 20) and store it in a variable

let secretNumber = Math.trunc(Math.random() * 20) + 1; // Generates a number between 1 and 20

// - - - - - Set initial values for score and highscore
let score = 20; // Initial score value
let highscore = 0; // Initial highscore

// - - - - - Function to display messages dynamically in the paragraph
function displayMessage(message) {
  messageElem.textContent = message;
}

// - - - - - Main function for checking the number entered by the user
function checkTheNumber() {
  // Store the value entered by the user as a number
  let userGuess = Number(guessEl.value);

  // Scenario for no input or incorrect value entered
  if (!userGuess || userGuess < 1 || userGuess > 20) {
    displayMessage('Incorrect number entered! Enter a number between 1 and 20.');
  }
  // Scenario for number entered different from the one generated by the computer
  else if (userGuess !== secretNumber) {
    // If the user still has attempts left (score > 1)
    if (score > 1) {
      // Display the appropriate message for a number that's too high/low (using a ternary operator)
      displayMessage(userGuess > secretNumber ? 'Too high!' : 'Too low!');
      // Reduce the score by 1 (one attempt less)
      score--;
      // Update the paragraph with the new score value
      scoreEl.textContent = score;
      // Clear the input for a new attempt
      guessEl.value = '';
    }
    // If the user has no more attempts left (score <= 1)
    else {
      displayMessage('You lost the game!');
      document.body.style.backgroundColor = 'red';
      scoreEl.textContent = '0';
    }
  }
  // Scenario for number entered equal to the one generated by the computer
  else if (userGuess === secretNumber) {
    // Show the secret number in the div with the question mark
    secretNumberElem.textContent = secretNumber;
    displayMessage('You won the game! 🎉');
    document.body.style.backgroundColor = 'green';

    // Update the highscore if necessary
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }

    // Celebrate with confetti!
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
}

// - - - - - Add functionality for the "AGAIN" button
btnAgain.addEventListener('click', () => {
  // Reset the score
  score = 20;
  scoreEl.textContent = score;

  // Generate a new secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // Reset the message
  displayMessage('Start guessing...');

  // Reset the background color
  document.body.style.backgroundColor = '#222';

  // Reset the number display to '?'
  secretNumberElem.textContent = '?';

  // Clear the input field
  guessEl.value = '';
});

// - - - - - Set functionality for the "CHECK" button
btnCheck.addEventListener('click', checkTheNumber);

// - - - - - Add functionality for pressing ENTER after entering the guessed number
guessEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkTheNumber();
  }
});
