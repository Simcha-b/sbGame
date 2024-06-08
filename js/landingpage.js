   // הצגת פרטי המשתמש
   document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("username").innerText = `שם משתמש: ${loggedInUser}`;
    } else {
        window.location.href = "/html/index.html";
    }
});

document.getElementById("logout").addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "/index.html";

    
});

