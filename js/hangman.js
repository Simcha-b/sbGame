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
//הצגת הוראות
document
  .querySelector("#insroction_b")
  .addEventListener("mouseover", function () {
    document.querySelector(".insroction").style.display = "block";
  });
document
  .querySelector("#insroction_b")
  .addEventListener("mouseout", function () {
    document.querySelector(".insroction").style.display = "none";
  });

//מערך הרמות עם המילים
let options = {
  easy: ["Apple", "Banana", "Mango", "Lemon", "Grape"],
  medium: ["Bicycle", "Airplane", "Scooter", "Subway", "Sailboat"],
  Hard: ["Argentina", "Indonesia", "Switzerland", "Kazakhstan", "Philippines"],
};

//פונקציית בניית המקלדת
const letterContainer = document.querySelector("#letter-container");
let leeters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function criateleters() {
  letterContainer.innerHTML = "";
  for (let i = 0; i < leeters.length; i++) {
    let div = document.createElement("button");
    div.textContent = leeters[i];
    div.classList.add(leeters[i]);
    letterContainer.append(div);
  }
}

//המילה שתיבחר רנדומלית
let word = "";

//הכפתורים של הרמות
const levels = document.querySelector("#levels");
//הקוביות של הניחושים
const userinput = document.querySelector("#user-input-section");

//איזור האיש התולה
const hangmanContainer = document.querySelector("#hangman-container");

levels.addEventListener("change", play);
//בחירת רמה והתחלת משחק
function play() {
  hangmanContainer.style.display = "flex";
  resetGame();
  criateleters();

  let level = levels.value;
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
let cntwin = 0;
const win = document.querySelector("#winn");
const gameover = document.querySelector("#gameover");

//ניחוש אות
letterContainer.addEventListener("click", play2);
function play2(e) {
  let cl = e.target.classList[0];
  if (word.includes(cl)) {
    let userchos = userinput.querySelectorAll(`.${cl}`);
    for (let j = 0; j < userchos.length; j++) {
      //הכנס למשבצת את האות המתאימה
      userchos[j].textContent = cl;
      cntwin++;
    }
    //העלמת האות מהמקלדת
    e.target.style.visibility = "hidden";

    //נצחון
    if (cntwin == word.length) {
      win.style.display = "block";
      currentUser[1] += 5;
      let newScore = currentUser[1];
      updateScore(newScore);
      playWinSound();
    }
  } else {
    //ציור האיש
    drawNextPart();
  }
}

//פונקציית ציור האיש
const parts = document.querySelectorAll(".part");
let mistakes = 0;
function drawNextPart() {
  if (mistakes < parts.length) {
    parts[mistakes].style.display = "block";
    mistakes++;

    //הפסד
    if (mistakes == parts.length) {
      gameover.style.display = "block";
      playLoseSound();
    }
  }
}

const nuwgame = document.querySelector(".nuwgame");
//התחלת משחק חוזר
nuwgame.addEventListener("click", function () {
  window.location.reload();
});

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

const span2 = document.getElementsByClassName("close")[1];
span2.onclick = function () {
  gameover.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == gameover) {
    gameover.style.display = "none";
  }
};

//ניקוי המשחק
function resetGame() {
  userinput.innerHTML = "";
  hangmanContainer
    .querySelectorAll(".part")
    .forEach((part) => (part.style.display = "none"));
  mistakes = 0;
  cntwin = 0;
}

//עדכון הציון
function updateScore(newScore) {
  const users = JSON.parse(localStorage.getItem("usersData"));

  // עדכון הציון של המשתמש הנוכחי
  for (let user of users) {
    if (user.username === currentUser[0]) {
      user.score = newScore;
      break;
    }
  }
  // שמירת המערך המעודכן 
  localStorage.setItem("usersData", JSON.stringify(users));

  // עדכון הציון של המשתמש הנוכחי 
  currentUser.score = newScore;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // עדכון הצגת הציון על המסך
  score.textContent = `score: ${currentUser.score}`;
}

//play win
function playWinSound() {
  const winSound = document.getElementById("winSound");
  winSound.play();
}

// פונקציה לניגון צליל הפסד
function playLoseSound() {
  const loseSound = document.getElementById("loseSound");
  loseSound.play();
}
