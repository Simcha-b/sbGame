"use strict";

//מניעת כניסה למשתמש לא רשום
if (!localStorage.getItem("currentUser")) {
  window.location.href = "/index.html";
}

//פרטי משתמש נוכחי
const currentUser = localStorage.getItem("currentUser");
const userData = JSON.parse(localStorage.getItem(currentUser));

// הצגת פרטי המשתמש
let username = document.querySelector("#username");
let score = document.querySelector("#score");
username.textContent = `plyaer: ${currentUser}`;
score.textContent = `score: ${userData.score}`;

//ניתוק
document.getElementById("logout").addEventListener("click", function () {
  sessionStorage.removeItem("currentUser");
  window.location.href = "/index.html";
});

//חזרה לבחירת משחק
document.querySelector("#home").addEventListener("click", function () {
  window.location.href = "/html/landingpage.html";
});
const bord = document.querySelector(".bord");
let mybord = Array.from(Array(8), () => new Array(8));

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let div = document.createElement("div");
    if ((i + j) % 2 === 0) {
      div.classList.add("white");
    } else {
      div.classList.add("black");
    }
    mybord[i][j] = div;
    bord.append(div);
  }
}
const ston = document.querySelector(".ston");
let currentI = 7;
let currentJ = 7;
mybord[currentI][currentJ].append(ston);

const play = document.querySelector(".play");

play.addEventListener("click", randomston);

function randomston() {
  let randomi, randomj;

  do {
    randomi = Math.floor(Math.random() * 8);
    randomj = Math.floor(Math.random() * 8);
  } while (randomi === currentI && randomj === currentJ);

  mybord[randomi][randomj].append(ston);
  currentI = randomi;
  currentJ = randomj;
}


document.addEventListener("keydown", (event) => {
  // console.log(e.code);
  if (event.key === 'ArrowRight') {
    console.log("rr");
    moveright();
  }
  if (event.key === 'ArrowLeft') {
    console.log("ll");
    moverleft();
  }
});
const stepr = document.querySelector(".stepright");
stepr.addEventListener("click", moveright);

function moveright() {
  if (currentI >= 0 && currentI < 8 && currentJ >0 && currentJ < 8) {
    currentI--;
    currentJ++;
  }
  mybord[currentI][currentJ].append(ston);
}

const stepl = document.querySelector(".stepleft");
stepl.addEventListener("click", moverleft);
function moverleft() {
  if (currentI >=0 && currentI < 8 && currentJ >=0 && currentJ < 8) {
    currentI--;
    currentJ--;
  }
  // else{
  //   currentI++;
  //   currentJ++;
  // }
  mybord[currentI][currentJ].append(ston);
}

