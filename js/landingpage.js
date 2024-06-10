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
