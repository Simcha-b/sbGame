"use strict";

//מערך שיכיל את כל פרטי המשתמשים
let usersData = [];

//תיבת התחברות
const login = document.querySelector(".Userlogin");
//כפתור התחברות
const login_b = document.querySelector("#login");

//הודעת שגיאה
const passwordWrong = document.querySelector(".passwordWrong");

//פונקציית בדיקת נכונות סיסמה ושם משתמש
login_b.addEventListener("click", function (e) {
  e.preventDefault();
  passwordWrong.style.display = "none";
  let username = document.querySelector("#user").value;
  let password = document.querySelector("#password1").value;

  usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  //אם שם משתמש וסיסמה נכונים מעבר לדף נחיתה
  let flag = false;
  usersData.forEach((user) => {
    if (user.username === username && user.password === password) {
      //הכנסת משתמש נוכחי לזכרון
      localStorage.setItem(
        "currentUser",
        JSON.stringify([username, user.score])
      );
      flag = true;
    }
  });
  if (flag) {
    document.querySelector(".wolcomback").style.display = "block";
    setTimeout(function () {
      username = "";
      window.location.href = "/html/landingpage.html";
    }, 2000);
  } else {
    passwordWrong.style.display = "block";
  }
});
//כפתור הרשם שמעביר למסך ההרשמה
const signp1_b = document.querySelector("#Signp1");

//תיבת הרשמה
const signp = document.querySelector(".UserSginup");

//פונקציית מעבר למסך הרשמה
signp1_b.addEventListener("click", function () {
  signp.style.display = "flex";
  login.style.display = "none";
});

//כפתור סיום הרשמה
const signp2_b = document.querySelector("#Signp2");

//הודעת שם משתמש קיים כבר
const usernameExists = document.querySelector(".usernameExists");
//הודעת סיסמה אינה תקינה
const unvalidpassword = document.querySelector(".unvalidPassword");
//הודעת הצלחת רישום
const signpSuccess = document.querySelector(".signpSuccess");

//פונקציית יצירת משתמש והכנסה לזכרון
signp2_b.addEventListener("click", function (e) {
  const signUpForm = document.forms["sign-up"];
  if (signUpForm.reportValidity()) e.preventDefault();

  //בדיקה האם קיים כבר כזה משתמש
  if (!validateUsername(document.querySelector("#username").value)) {
    usernameExists.style.display = "block";
    return;
  } else {
    usernameExists.style.display = "none";
  }
  //בדיקה האם הסיסמה חוקית
  if (!validatePassword(document.querySelector("#password2").value)) {
    unvalidpassword.style.display = "block";
    return;
  } else {
    unvalidpassword.style.display = "none";
  }

  //יצירת האובייקט
  let user = {
    firstName: document.querySelector("#firstName").value,
    LastName: document.querySelector("#LastName").value,
    email: document.querySelector("#email").value,
    username: document.querySelector("#username").value,
    password: document.querySelector("#password2").value,
    score: 0,
  };

  //שליפת המערך מהזכרון הפנימי
  usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  //הכנסת המשתמש לזכרון
  usersData.push(user);
  localStorage.setItem("usersData", JSON.stringify(usersData));

  //הצגת הודעה נרשמת בהצלחה
  signpSuccess.style.display = "block";

  //חזרה למסך התחברות
  setTimeout(function () {
    signp.style.display = "none";
    login.style.display = "flex";
  }, 1000);
});

//פונקציית בדיקת שם משתמש יחודי
function validateUsername(username) {
  usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  for (let index = 0; index < usersData.length; index++) {
    const user = usersData[index];
    if (user.username === username) {
      return false;
    }
  }
  return true;
}

// פונקציית בדיקת חוקיות סיסמה
function validatePassword(password) {
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$/;
  return regex.test(password);
}
