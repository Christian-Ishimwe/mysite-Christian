
const loginPassword = document.getElementById("loginPassword");
const loginEmail = document.getElementById("loginEmail");
const loginForm = document.getElementById("loginForm");
const err= document.querySelector(".err")
let users =JSON.parse(localStorage.getItem("Users")) ||  [];


loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let currentUser = users.find(
        (element) =>
            element["email"] === loginEmail.value &&
            element["password"] === loginPassword.value
    );
    if (currentUser) {
        if(currentUser['email']=="christianinja3@gmail.com" && currentUser['password'] == 'karire2020.'){
            window.location.href = "http://127.0.0.1:5500/dashboard/index.html";
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert(`${currentUser['name']} Successvul Signed In`)
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
    else {
        err.style.display="block"
    }
});

