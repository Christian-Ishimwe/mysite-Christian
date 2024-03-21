
const loginPassword = document.getElementById("loginPassword");
const loginEmail = document.getElementById("loginEmail");
const loginForm = document.getElementById("loginForm");
const err= document.querySelector(".err")
const subBtn = document.getElementById('subBtn')
let users =JSON.parse(localStorage.getItem("Users")) ||  [];


loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let email = loginEmail.value.trim()
    let password = loginPassword.value.trim()
    subBtn.classList.toggle('disabled')
    subBtn.innerText="loading..."
    subBtn.disabled=true
    const user = await fetchloginUser(email, password)
    if(user){
        const token = user['token']
        const name= user['name']
        const email = user['email']
        const userDetails= {
            token,
            name, 
            email
        }
        localStorage.setItem('currentUser',JSON.stringify(userDetails))
        if(email=="christianinja3@gmail.com"){
          err.style.display="block"
            err.style.backgroundColor="green"
            err.style.padding='0.4rem'
            err.innerText="Successful signed in, You will be redirected to Dashboard!"
            window.location.href = ("https://christian-ishimwe.github.io/mysite-Christian/index.html")
           
            
        }else{
            err.style.display="block"
            err.style.backgroundColor="green"
            err.innerText="Successful signed in, You will be redirected to homepage!"
            window.location.href = ("https://christian-ishimwe.github.io/mysite-Christian/index.html")
            
           
        }
    }else {
         err.style.display="block"
    }
    setTimeout(()=>{
      subBtn.classList.toggle('disabled')
      subBtn.innerText='Sign in'
      subBtn.disabled=false
    }, 2000)
});


async function fetchloginUser(email, password){
        try {
          const response = await fetch("https://mysite-backend-wdua.onrender.com/auth/login", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
            });
          if (!response.ok) {
            console.log(response.json())
            throw Error("There was an error fetching the Blogs!");
          }
          const data = await response.json();
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
}

