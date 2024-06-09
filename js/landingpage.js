"use strict";

//מניעת כניסה למשתמש לא רשום
if(!localStorage.getItem("currentUser")){
  window.location.href = "/index.html";
}

//פרטי משתמש נוכחי
const currentUser = localStorage.getItem('currentUser');
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
