const registerForm = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("cpassword");
const nameField = document.getElementById("name");
const err= document.querySelector(".err")
let passworErr = document.querySelector(".field-set .cspan");
let passwordErr = document.querySelector(".field-set .span");
let users= JSON.parse(localStorage.getItem('Users')) || []
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (confirmpassword.value !== password.value) {
        passworErr.innerHTML = "Password Must Match";
        passworErr.style.color = "red";
        passworErr.style.margin = "10px 0";
        passworErr.style.fontSize = "14px";
        return;
    }

    let new_user = {
        email: email.value,
        password: password.value,
        dateJoined: Date().toLocaleUpperCase,
        name: nameField.value,
    };
    const subBtn = document.getElementById("subBtn")
    subBtn.disabled = true; // Disable the button
    subBtn.innerText = 'Loading...'; // Change the text
    subBtn.classList.toggle('disabled')
    let UserResponse = await registerUser(new_user)
    console.log(UserResponse)
    if(UserResponse.status == 409){
        err.style.display="block"
        err.innerHTML=UserResponse.message
    }
    else if(UserResponse.status==201){
        err.innerHTML=UserResponse.message
        err.style.display="block"
        err.style.backgroundColor ='green'
        
    }
    else{
        err.style.display="block"
        err.innerHTML=UserResponse.message
    }
     setTimeout(function() {
        subBtn.innerText = 'Sign up'// Change the text
        subBtn.classList.toggle('disabled')
        subBtn.disabled=false
      }, 2000); 
    }
    
);




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


async function registerUser(user){
    try{
        const response = await fetch('https://mysite-backend-wdua.onrender.com/auth/register', {
             method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
        const data = await response.json()
        return data
    }catch(err){
        console.log("error: ", err)
    }
}