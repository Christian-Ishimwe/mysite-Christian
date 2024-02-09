const toggleBtn= document.querySelector("div#nav i")
const navBar= document.querySelector("nav")
toggleBtn.addEventListener("click", () =>{
    navBar.classList.contains("shownav") ? navBar.classList.remove("shownav"): navBar.classList.add("shownav")
})