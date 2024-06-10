"use strict";

//מניעת כניסה למשתמש לא רשום
if (!localStorage.getItem("currentUser")) {
  window.location.href = "/index.html";
}

//פרטי משתמש נוכחי
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// הצגת פרטי המשתמש
let username = document.querySelector("#username");
let score = document.querySelector("#score");
username.textContent = `plyaer: ${currentUser[0]}`;
score.textContent = `score: ${currentUser[1]}`;

//ניתוק
document.getElementById("logout").addEventListener("click", function () {
  sessionStorage.removeItem("currentUser");
  window.location.href = "/index.html";
});

//חזרה לבחירת משחק
document.querySelector("#home").addEventListener("click", function () {
  window.location.href = "/html/landingpage.html";
});


const box = document.querySelector(".box");
const start = document.querySelector(".start");
let cnt = 5;
function randomNumber() {
  return Math.floor(Math.random() * 9);
}

start.addEventListener("click", gameon);

function gameon() {
  // location.reload();
  box.children[randomNumber()].classList.add("treasure");
  start.style.display = "none";
}

const caunter = document.querySelector(".caunter");

box.addEventListener("click", play);

function play(event) {
  let x = event.target;
  if (x.className != "box") {
    cnt--;
    caunter.textContent = `${cnt} :מספר נסיונות שנותרו`;
    if (cnt == 0) {
      document.querySelector("#gameover").style.display = "block";
    } else {
      if (x.className === "treasure") {
        x.style.backgroundColor = "yellow";
        document.querySelector("#winn").style.display = "block";
        updateScore(userData.score+5);
      } else {
        x.style.backgroundColor = "brown";
      }
    }
  }
}

const nuwgame = document.querySelector(".nuwgame");
nuwgame.addEventListener("click", function(){
  location.reload();
})


const modal = document.getElementById("winn");
const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
      location.reload();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    
  }
};

const modal2 = document.getElementById("gameover");
const span2 = document.getElementsByClassName("close")[1];
span2.onclick = function () {
  modal2.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

//עדכון הציון
function updateScore(newScore) {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    let userData = JSON.parse(localStorage.getItem(currentUser));
    userData.score = newScore;
    localStorage.setItem(currentUser, JSON.stringify(userData));
  }
}