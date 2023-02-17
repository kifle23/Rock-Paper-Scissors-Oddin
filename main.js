const choices = ["rock", "paper", "scissors"];
let winners = [];

function game() {
  for (let i = 1; i <= 5; i++) {
    playRound(i);
  }
  document.querySelector("button").textContent = "New game";
  logWins();
}

function playRound(round) {
  let computerSelection = computerChoice();
  let playerSelection = playerChoice();
  let winner = checkWinner(playerSelection, computerSelection);
  winners.push(winner);
  logRound(playerSelection, computerSelection, winner, round);
}

function playerChoice() {
  let input = null;
  while(input==null){
    input=prompt("Type Rock, Paper, or Scissors");
  }
  input = input.toLowerCase();
  if(validateInput(input)){
    return input;
  }
  else{
    playerChoice();
  }
}

function computerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function validateInput(choice) {
  return choices.includes(choice);
}

function checkWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Tie";
  } else if (
    (playerChoice === "rock" && computerChoice == "scissors") ||
    (playerChoice === "paper" && computerChoice == "rock") ||
    (playerChoice === "scissors" && computerChoice == "paper")
  ) {
    return "Player";
  } else {
    return "Computer";
  }
}

function logWins() {
  let playerWins = winners.filter(x => x == "Player").length;
  let computerWins = winners.filter(x => x == "Computer").length;
  let ties = winners.filter(x => x == "Tie").length;
  console.log("Results:");
  console.log("Player Wins:", playerWins);
  console.log("Computer Wins:", computerWins);
  console.log("Ties:", ties);
}

function logRound(playerChoice, computerChoice, winner, round) {
  console.log("Round:", round);
  console.log("Player Chose:", playerChoice);
  console.log("Computer Chose:", computerChoice);
  console.log(winner, "Won the Round");
  console.log(".........................");
}
