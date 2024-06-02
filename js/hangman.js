"use strike";

let options = {
  easy: ["Apple", "Banana", "Mango", "Lemon", "Grape"],
  medium: ["Bicycle", "Airplane", "Scooter", "Subway", "Sailboat"],
  Hard: ["Argentina", "Indonesia", "Switzerland", "Kazakhstan", "Philippines"],
};
const letterContainer = document.querySelector("#letter-container");
let leeters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function criateleters() {
  for (let i = 0; i < leeters.length; i++) {
    let div = document.createElement("button");
    div.textContent = leeters[i];
    div.classList.add(leeters[i]);
    letterContainer.append(div);
  }
}

let word = "";

const optionscontainer = document.querySelector("#options-container");
const userinput = document.querySelector("#user-input-section");
const hangmanContainer = document.querySelector("#hangman-container");
optionscontainer.addEventListener("click", play);

function play(e) {
  optionscontainer.style.display = "none";
  hangmanContainer.style.display = "flex";
  criateleters();
  let level = e.target.classList[0];
  let levelArry = options[level];
  word = levelArry[Math.floor(Math.random() * levelArry.length)];
  word = word.toUpperCase();
  for (let index = 0; index < word.length; index++) {
    let div = document.createElement("div");
    div.textContent = "";
    div.classList.add(word.charAt(index));
    userinput.append(div);
  }
}
const hangmansection = document.querySelector("#hangman-section");

letterContainer.addEventListener("click", play2);
function play2(e) {
  let cl = e.target.classList[0];
  if (word.includes(cl)) {
    let userchos = userinput.querySelectorAll(`.${cl}`);
    for (let j = 0; j < userchos.length; j++) {
      userchos[j].textContent = cl;
    }
    e.target.style.visibility = "hidden";
  } else {
    drawNextPart();
  }
}

const parts = document.querySelectorAll(".part");
let mistakes = 0;
const win = document.querySelector("#winn");
const gameover = document.querySelector("#gameover");

function drawNextPart() {
  if (mistakes < parts.length) {
    parts[mistakes].style.display = "block";
    mistakes++;
  } else {
    gameover.style.display = "block";
  }
}

// Get the modal
const modal = document.getElementById("winn");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal

span.onclick = function () {
  modal.style.display = "none";
  location.reload();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Get the <span> element that closes the modal
const span2 = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), close the modal
span2.onclick = function () {
  gameover.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == gameover) {
    gameover.style.display = "none";
  }
};
