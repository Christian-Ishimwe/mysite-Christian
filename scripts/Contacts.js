const contactForm= document.getElementById("contactForm")
const notify= document.getElementById("form-msg")
let messages=JSON.parse(localStorage.getItem("Messages")) || []
contactForm.addEventListener("submit", (event) =>{
    event.preventDefault()
    const nameField = document.getElementById("name").value
    const emailField= document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value
    const tel = (document.getElementById("phone") ?document.getElementById("phone").value :null )
    let currentDate= new Date()

    let new_msg= {
        id: `msg_${Date.now()}`,
        name: nameField,
        email: emailField,
        tel: tel,
        subject: subject,
        message: message,
        replied: false,
        reply: null,
        dateAdded: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
    }
    messages.push(new_msg)
    localStorage.setItem(("Messages"), JSON.stringify(messages))
    notify.style.display="block"
    setTimeout(function(){
        notify.style.display="none"
    }, 10000)
})   
