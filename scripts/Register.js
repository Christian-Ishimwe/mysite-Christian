const registerForm = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("cpassword");
const nameField = document.getElementById("name");
const err= document.querySelector(".err")
let passworErr = document.querySelector(".field-set .cspan");
let passwordErr = document.querySelector(".field-set .span");
let users= JSON.parse(localStorage.getItem('Users')) || []
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (confirmpassword.value !== password.value) {
        passworErr.innerHTML = "Password Must Match";
        passworErr.style.color = "red";
        passworErr.style.margin = "10px 0";
        passworErr.style.fontSize = "14px";
        return;
    }

    let new_user = {
        id: Date.now(),
        email: email.value,
        password: password.value,
        comments: [],
        dateJoined: Date().toLocaleUpperCase,
        name: nameField.value,
    };
    let currentUser = users.find(
        (element) =>
            element["email"] ===email.value
            
    );
    if (currentUser) {
        err.style.display="block"
        return;
    }
    users.push(new_user);
    localStorage.setItem("Users", JSON.stringify(users));
    alert("User successfully registered");
    window.location.href = "http://127.0.0.1:5500/login.html";
});




confirmpassword.addEventListener("input", () => {
    if (confirmpassword.value != password.value) {
        passworErr.innerHTML = "Password Must Match";
        passworErr.style.color = "red";
        passworErr.style.margin = "10px 0";
        passworErr.style.fontSize = "14px";
    } else {
        passworErr.innerHTML = "";
    }
});

function getPasswordStrength(password) {
    var score = true;
    var hasNumber = /\d/.test(password);
    var hasLetter = /[a-zA-Z]/.test(password);
    var hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasLetter && hasNumber && hasSpecial) {
        score = true;
    } else {
        score = false;
    }

    return score;
}


password.addEventListener("input", () => {
    if (!getPasswordStrength(password.value)) {
        passwordErr.innerHTML =
            "Password must have at least 8 characters including numbers, letters, and characters.";
        passwordErr.style.color = "red";
        passwordErr.style.margin = "10px 0";
        passwordErr.style.fontSize = "14px";
    } else {
        passwordErr.innerHTML = "";
    }
});
