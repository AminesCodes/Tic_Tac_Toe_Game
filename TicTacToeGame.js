// OPENING THE COLOR Tamplate
// PLEASE INSTALL THE CHALK NPM : npm install chalk
const clr = require('chalk');

// OPENING THE LINE BY LINE USER INPUTES
// PLEASE INSTALL THE READLINE-SYNC: npm install readline-sync
const readByLine = require('readline-sync');

// OPENING READING FROM CONSOLE
const rl = require('readline');



let humanWin = false;
let computerWin = false;
let twoPlayrsMode = false;
let counter = 0;
let maxPicks;
let playersTurn;
let winCounter = 0;
let loseCounter = 0;
let validChoices = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
let cyanX = `\u001b[36m\u001b[1mX\u001b[22m\u001b[39m`;
let greenO = `\u001b[32m\u001b[1mO\u001b[22m\u001b[39m`;
let p1Name;
let p2Name;
let whoStartsPlaying;


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


const eraseScreen = () => {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
}

eraseScreen();

const display = () => {
  eraseScreen();
  console.log(`If you wish to quit at anytime, press "control" and "c" to end the game (^c)\n\n`);
  console.log(clr.bold(`The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.\n`));
  console.log(clr.cyan(`Entre your choice in the fellowing form :\n`, clr.red.bold(`A1, A2 ... a character (A,B or C) and a number (1, 2 or 3)\n\n`)));
  console.log(clr.cyan.bold(`General Game progress : \n`, clr.green(`${p1Name} (X) : `, winCounter, clr.keyword('orange')(`    ${p2Name} (O) : `, loseCounter))));
  displayBoard();
  console.log(clr.yellow(`\nPossibles choices : ${clr.keyword('orange')(validChoices)} : `));
}

// Play Mode (one / two plays) => TRUE:TWO PLAYER_MODE      FALSE:Vs COMPUTER
const playMode = () => {
  let answer = readByLine.question(`Please enter ${clr.yellow.bold(`"1"`)} if you want to play against the computer
             ${clr.yellow.bold(`"2"`)} for a two players mode\n`);
  let userAnswer = (answer.trim()).toLowerCase();

  if (userAnswer === '1') {
      p1Name = readByLine.question(`Enter Player 1 name : `);
      p2Name = "Computer";
      twoPlayrsMode = false;
  } else if (userAnswer === '2') {
      p1Name = readByLine.question(`Enter Player 1 name : `);
      p2Name = readByLine.question(`Enter Player 2 name : `);
      twoPlayrsMode = true;
  } else {
      console.log(`${clr.cyan(userAnswer.toUpperCase())} is an invalid input\n`);
      playMode();
  }
  whoStartsPlaying = p1Name;
  whosTurn();
}

playMode();

const getMaxPicks = () => {
  if (twoPlayrsMode) {
    maxPicks = 9;
  } else {
    maxPicks = 5;
  }
}
getMaxPicks();
display();


// Function for getting the user's choice 
const getPlayerChoice = () => {
  let answer;
  if (playersTurn) {
      answer = readByLine.question(clr.yellow.bold(`${p1Name} selection : `));
  } else if (twoPlayrsMode && !playersTurn) {
      answer = readByLine.question(clr.yellow.bold(`${p2Name} selection : `));
  }
  let userAnswer = (answer.trim()).toLowerCase();

  if (validChoices.includes(userAnswer)) {
    counter +=1;
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
        playBoard[x][y] = cyanX;
    } else if (twoPlayrsMode && !playersTurn){
        playBoard[x][y] = greenO;
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

  playBoard[x][y] = greenO;
  validChoices.splice(validChoices.indexOf(computerChoice), 1);
}


// Function for Medium Mode
const playOffensive = () => {
  switch (counter) {
    case 1 : let playerPick = playBoard
      break;
    case 2 :
  }

}


// Function for Hard Mode
const playDeffensive = () => {

}

const initializeAll = () => {
  computerWin = false;
  humanWin = false;
  counter = 0;
  validChoices = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
  playBoard = initialPlayBord(3);
  getMaxPicks();
  if (whoStartsPlaying === p1Name) {
    whoStartsPlaying = p2Name;
  } else if (whoStartsPlaying === p2Name) {
    whoStartsPlaying = p1Name;
  }
}

// Function to restart the game
const playAgain = () => {
  let answer = readByLine.question(clr.red.bold(`\n\nWould you like to continue playing ? ${clr.green.bold(`Y / N`)} :  `));
  let userAnswer = (answer.trim()).toLowerCase();

  if (userAnswer === 'y') {
      initializeAll();
      display();
      playGame();
  } else if (userAnswer = 'n') {
      console.log(clr.yellow.bold(`\nTHANK YOU FOR PLAYING`));
      if (winCounter > loseCounter) {
        console.log(`${p1Name} WON THE GAME`);
      } else if (winCounter < loseCounter) {
        console.log(`${p2Name} WON THE GAME`);
      } else {
        console.log(`THE GAME WAS A TIE`);
      }
  } else {
      console.log(`${clr.red(userAnswer.toUpperCase())} is an invalid input\n`);
      playAgain();
  }
}

const isGridFull = () => {
  let noEmptyCase = true;
  for (let arr of playBoard) {
    for (let element of arr) {
      if (element === " ") {
        noEmptyCase = false;
      }
    } 
  }
  return noEmptyCase;
  // if (counter >= maxPicks) {
  //   return true;
  // }
}

//
const playGame = () => {
    if (twoPlayrsMode) {
      while (!isGridFull() && !humanWin && !computerWin) {
        whosTurn();
        getPlayerChoice();
        display();
        isWin(playBoard);
      }
    } else {
      while (!isGridFull() && !humanWin && !computerWin) {
        if (whoStartsPlaying === p1Name){
          whosTurn();
          getPlayerChoice();
          display();
          isWin(playBoard);
         
          if (!humanWin && !computerWin && !isGridFull()) {
            sleep(1000);
            playRandom();
            display();
            isWin(playBoard);
          }
        } else if (whoStartsPlaying === p2Name) {
              sleep(1000);
              playRandom();
              display();
              isWin(playBoard);

              if (!humanWin && !computerWin && !isGridFull()) {
                whosTurn();
                getPlayerChoice();
                display();
                isWin(playBoard);
              }
        }
      }  
    }

    if (humanWin) {
      winCounter += 1;
      display();
      console.log(`${p1Name} won this battle!!`)
    }
    if (computerWin) {
      loseCounter += 1;
      display();
      console.log(`${p2Name} won this battle!!`)
    }
    if (isGridFull()) {
      display();
      console.log(`TIE BATTLE`);
    }
    playAgain();
}

playGame();

// Function to simulate JS waiting
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1; i--) { //infinit loop
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}