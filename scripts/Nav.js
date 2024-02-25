const openIcon = document.getElementById("menuIcon")
const closeIcon= document.getElementById("closeIcon")
const navul = document.querySelector("nav ul")
const nav = document.querySelector("nav")
openIcon.addEventListener("click", () =>{
    navul.style.display="block"
    openIcon.style.display="none"
    closeIcon.style.display="inherit"
    nav.classList.contains("open-nav")? nav.classList.remove("open-nav"): nav.classList.add("open-nav")
})

closeIcon.addEventListener("click", ()=>{
    navul.style.display="none"
    closeIcon.style.display="none"
    openIcon.style.display="inherit"
    nav.classList.contains("open-nav")? nav.classList.remove("open-nav"): nav.classList.add("open-nav")
})