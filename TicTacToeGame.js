// OPENING THE COLOR Tamplate
// PLEASE INSTALL THE CHALK NPM : npm install chalk
const clr = require('chalk');

// OPENING THE LINE BY LINE USER INPUTES
// PLEASE INSTALL THE READLINE-SYNC: npm install readline-sync
const readByLine = require('readline-sync');

// OPENING
const rl = require('readline');



let humanWin = false;
let computerWin = false;
let twoPlayrsMode;
let counter = 0;
let maxPicks;
let playersTurn;
let winCounter = 0;
let loseCounter = 0;
let validChoices = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
let cyanX = `\u001b[36m\u001b[1mX\u001b[22m\u001b[39m`;
let greenO = `\u001b[32m\u001b[1mO\u001b[22m\u001b[39m`;


// Function to initialize a 2D array of 1 space
const initialPlayBord = (num) => {
  let newArray = [];
  for (let i = 0; i < num; i++) {
      let arr = []
      for (let j = 0; j < num; j++) {
          arr[j] = ' '; 
      }
      newArray[i] = arr;
  }
  return newArray;
}
let playBoard = initialPlayBord(3);

const displayBoard = () => {
  console.log(
  `
    1   2   3
  –––––––––––––
A | ${playBoard[0][0]} | ${playBoard[0][1]} | ${playBoard[0][2]} |
  |–––|–––|–––|
B | ${playBoard[1][0]} | ${playBoard[1][1]} | ${playBoard[1][2]} |
  |–––|–––|–––|
C | ${playBoard[2][0]} | ${playBoard[2][1]} | ${playBoard[2][2]} |
  |___|___|___|
`)
}



const isHorizontalWin = (array2D) => {

  for (let i = 0; i < 3; i++) {
    if (array2D[i][0] === cyanX && array2D[i][1] === cyanX && array2D[i][2] === cyanX) {
      humanWin = true;
      break;
    }
    if (array2D[i][0] === greenO && array2D[i][1] === greenO && array2D[i][2] === greenO) {
      computerWin = true;
      break;
    }
  }
}

const isVerticalWin = (array2D) => {
  for (let i = 0; i < 3; i++) {
    if (array2D[0][i] === cyanX && array2D[1][i] === cyanX && array2D[2][i] === cyanX) {
      humanWin = true;
      break;
    }
    if (array2D[0][i] === greenO && array2D[1][i] === greenO && array2D[2][i] === greenO) {
      computerWin = true;
      break;
    }
  }
}

const isDiagonalWin = (array2D) => {
  if (array2D[0][0] === cyanX && array2D[1][1] === cyanX && array2D[2][2] === cyanX) {
    humanWin = true;
  }
  if (array2D[0][2] === cyanX && array2D[1][1] === cyanX && array2D[2][0] === cyanX) {
    humanWin = true;
  }

  if (array2D[0][0] === greenO && array2D[1][1] === greenO && array2D[2][2] === greenO) {
    computerWin = true;
  }
  if (array2D[0][2] === greenO && array2D[1][1] === greenO && array2D[2][0] === greenO) {
    computerWin = true;
  }
}

const isWin = (arr) => {
  isDiagonalWin(arr);
  isHorizontalWin(arr);
  isVerticalWin(arr);
}
// Function to determin who's playing: true=>Player1, false=>computer/P2
const whosTurn = () => { 
  if (twoPlayrsMode) {
    if (counter % 2 === 0) {
      playersTurn = true;
    } else {
      playersTurn = false;
    }
  }
  else {
    playersTurn = true;
  }
}


const display = () => {
    rl.cursorTo(process.stdout, 0, 0);
    rl.clearScreenDown(process.stdout);

    console.log(`If you wish to quit at anytime, press "control" and "c" to end the game (^c)\n\n`);
    console.log(clr.bold(`The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.\n`));
    console.log(clr.cyan(`Entre your choice in the fellowing form :\n`, clr.red.bold(`A1, A2 ... a character (A,B or C) and a number (1, 2 or 3)\n\n`)));
    console.log(clr.cyan.bold(`General Game progress : \n`, clr.green(`(X) : `, winCounter, clr.keyword('orange')('   (O) : ', loseCounter))));
    displayBoard();
    console.log('\ncounter', counter, `\nturns count`, maxPicks);
    console.log(clr.yellow(`\nPossibles choices : ${clr.keyword('orange')(validChoices)} : `));
}
display();

// Play Mode (one / two plays) => TRUE:TWO PLAYER_MODE      FALSE:COMPUTER
const playMode = () => {
  let answer = readByLine.question(`Please enter ${clr.yellow.bold(`"1"`)} if you want to play against the computer\n${clr.yellow.bold(`"2"`)} for a two players\n`);
  let userAnswer = (answer.trim()).toLowerCase();

  if (userAnswer == '1') {
      console.log(`${clr.cyan(userAnswer.toUpperCase())}: against the computer\n`);
      return false;
  } else if (userAnswer == '2') {
      console.log(`${clr.cyan(userAnswer.toUpperCase())}: against an other player\n`);
      return true;
  } else {
      console.log(`${clr.cyan(userAnswer.toUpperCase())} is an invalid input\n`);
      playMode();
  }
}
twoPlayrsMode = playMode();
display();
if (twoPlayrsMode) {
  maxPicks = 9;
} else {
  maxPicks = 5;
}


// Function for getting the user's choice 
const getPlayerChoice = () => {
  let answer;
  if (playersTurn) {
      answer = readByLine.question(clr.yellow.bold(`Player1 selection : `));
  } else if (twoPlayrsMode && !playersTurn) {
      answer = readByLine.question(clr.yellow.bold(`Player2 selection : `));
  }
  let userAnswer = (answer.trim()).toLowerCase();

  if (validChoices.includes(userAnswer)) {
    counter++;
    let xy = userAnswer.split('');
    let x = xy[0]; // letter A, B or C
    if (x === 'a') {
        x = 0;
    } else if (x === 'b') {
        x = 1;
    } else if (x === 'c') {
        x = 2;
    }
    let y = parseInt(xy[1]) - 1; // num 0, 1, 2

    if (playersTurn) {
        playBoard[x][y] = clr.cyan.bold('X');
    } else if (twoPlayrsMode && !playersTurn){
        playBoard[x][y] = clr.yellow.bold('O');
    }
    validChoices.splice(validChoices.indexOf(userAnswer), 1);
    
  } else {
    console.log(`${clr.red(userAnswer.toUpperCase())} is an invalid input\n`);
    getPlayerChoice();
  }
  
}



// function calling the playin method : playRandom, playOffensive, playDeffensive
// const setDifficulety = () => {
//   let answer = readByLine.question(`Enter ${clr.yellow.bold(`"1"`)} for Easy mode\n${clr.yellow.bold(`"2"`)} for Medium mode\n${clr.yellow.bold(`"3"`)} for hard mode\n`);
//   let userAnswer = (answer.trim()).toLowerCase();
  
//   if (userAnswer == '1') {
//       playRandom();
//   } else if (userAnswer == '2') {
//       playOffensive();
//   } else if (userAnswer == '3') {
//       playDeffensive();
//   } else {
//       console.log(`${clr.cyan(userAnswer.toUpperCase())} is an invalid input\n`);
//       setDifficulety();
//   }
// }

// Function for Easy Mode
const playRandom = () => {
  let randomIndex = Math.floor(Math.random() * validChoices.length);
  let computerChoice = validChoices[randomIndex];
  let xy = computerChoice.split('');
  let x = xy[0]; // letter A, B or C
  if (x === 'a') {
    x = 0;
  } else if (x === 'b') {
    x = 1;
  } else if (x === 'c') {
    x = 2;
  }
  let y = parseInt(xy[1]) - 1; // num 0, 1, 2

  playBoard[x][y] = clr.green.bold('O');
  validChoices.splice(validChoices.indexOf(computerChoice), 1);
}


// Function for Medium Mode
const playOffensive = () => {

}


// Function for Hard Mode
const playDeffensive = () => {

}

// Function to restart the game
const playAgain = () => {
  let answer = readByLine.question(clr.red.bold(`Game over\n\nWould you like to play again ? ${clr.green.bold(`Y / N`)} :  `));
  let userAnswer = (answer.trim()).toLowerCase();

  if (userAnswer === 'y') {
      computerWin = false;
      humanWin = false;
      counter = 0;
      playBoard();
  } else if (userAnswer = 'n') {
    console.log(coloring.yellow.bold(`\nTHANK YOU FOR PLAYING`)); 
  } else {
      console.log(`${clr.red(userAnswer.toUpperCase())} is an invalid input\n`);
      playAgain();
  }
}



//
const playGame = () => {
  if (!humanWin && !computerWin){
    if (twoPlayrsMode) {
      while (counter < maxPicks && !humanWin && !computerWin) {
        whosTurn()
        getPlayerChoice();
        display();
        isWin(playBoard);
      }
    } else {
      while (counter < maxPicks && !humanWin && !computerWin) {
        whosTurn();
        getPlayerChoice();
        display();
        isWin(playBoard);
        if (!humanWin && !computerWin) {
            //readByLine.question(clr.yellow.bold(`\nPAUSE !!! `));
            playRandom();
            isWin(playBoard);
        }
        counter++;
        display();
        //readByLine.question(clr.yellow.bold(`\nPAUSE !!! `));
      }  
    }

  } else {
      if (humanWin) {
        winCounter++;
      }
      if (computerWin) {
        loseCounter++
      }
      playAgain();
  }
}

playGame();