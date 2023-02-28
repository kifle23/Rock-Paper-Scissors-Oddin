const choices = ["rock", "paper", "scissors"];
let winners = [];
let count = 0;

function playRound(playerSelection) {
  count++;

  if (count <= 5) {
    let computerSelection = computerChoice();
    let winner = checkWinner(playerSelection, computerSelection);
    winners.push(winner);
    logRound(playerSelection, computerSelection, winner);
  } else {
    count = 0;
    logWins();
    winners = [];
  }
}

function computerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
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
  let playerWins = winners.filter((x) => x == "Player").length;
  let computerWins = winners.filter((x) => x == "Computer").length;
  let ties = winners.filter((x) => x == "Tie").length;
  clearResultSection();
  postToSummarySection(playerWins, computerWins, ties);
}

function postToSummarySection(playerWins, computerWins, ties) {
  const summary = document.getElementById("summary");
  const ps = document.createElement("p");
  ps.setAttribute("id", "sp");
  ps.setAttribute("style", "white-space: pre;");
  ps.textContent = `Summary: 
    \r\nPlayer Wins: ${playerWins}
    \r\nComputer Wins: ${computerWins}
    \r\nTies: ${ties} 
    \r\n....................................................................`;
  summary.appendChild(ps);
}

function clearResultSection() {
  for (let i = 0; i < 5; i++) {
    let element = document.getElementById("rp");
    element.remove();
  }
}

function logRound(playerChoice, computerChoice, winner) {
  const result = document.getElementById("result");
  const p = document.createElement("p");
  p.setAttribute("id", "rp");
  p.setAttribute("style", "white-space: pre;");
  let str = `Round: ${count} 
  \r\nPlayer Chose: ${playerChoice}
  \r\nComputer Chose: ${computerChoice}
  \r\n${winner} Won the Round
  \r\n....................................................................`;
  p.textContent = str;
  result.appendChild(p);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function playSound(i) {
  const audio = document.querySelector(`audio[data-key="${i}"]`);
  const key = document.querySelector(`div[data-key="${i}"]`);
  console.log(i);
  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
