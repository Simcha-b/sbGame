let usersData = [];
localStorage.setItem('usersData', JSON.stringify(usersData));

const login = document.querySelector(".Userlogin");
//כפתור התחברות
const login_b = document.querySelector("#login");

const signp = document.querySelector(".UserSginup");
//כפתור הרשם שמעביר להרשמה
const signp1_b = document.querySelector("#Signp1");
//כפתור הרשם ששולח את הפרטים
const signp2_b = document.querySelector("#Signp2");
//מעביר למסך הרשמה
signp1_b.addEventListener("click", function(){
    signp.style.display = "block";
    login.style.display = "none";
})
//יצירת משתמש והכנסה לזכרון
signp2_b.addEventListener("click", function(e){
    e.preventDefault();
    let user = {
        firstNema: document.querySelector("#firstNema").value,        
        LastNema: document.querySelector("#LastNema").value,        
        email: document.querySelector("#email").value,        
        username: document.querySelector("#firstNema").value,        
        pasword: document.querySelector("#pasword").value,        
    }
    usersData = JSON.parse(localStorage.getItem('usersData'));
    usersData.push(user);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    //לכתוב פה הודעת רישום בהצלחה
    signp.style.display = "none";
    login.style.display = "block";
})

login_b.addEventListener("click" ,function(){
    let username = document.querySelector("#user");
    let pasword = document.querySelector("#password");
    usersData = JSON.parse(localStorage.getItem('usersData'));
    usersData.forEach(user => {
        if((user.username ===username)&&(user.pasword===pasword)){
            //עבור לעמוד הבא
        } 
    });

})