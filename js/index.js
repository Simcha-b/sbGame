let usersData = [
    {

    }
]

const login = document.querySelector(".Userlogin");
const signp = document.querySelector(".UserSginup");
const signp1_b = document.querySelector("#Signp1");
signp1_b.addEventListener("click", function(){
    signp.style.display = "block";
    login.style.display = "none";
})