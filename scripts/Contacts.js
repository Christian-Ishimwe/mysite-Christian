window.addEventListener("DOMContentLoaded", () =>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let messages = JSON.parse(localStorage.getItem("Messages")) || []

    const contactForm = document.getElementById("contactForm")
    if(currentUser){
        contactForm.innerHTML=`
         <span id="form-msg">Your message has been submitted successfully!</span>
            <div class="field-set">
                <input type="hidden" value="${currentUser.name}" id="name" placeholder="Name" name="name">
            </div>
            <div class="field-set">
                <label for="tel">Telephone (optional)</label>
                <input type="tel" id="phone" placeholder="Your Telephone" name="tel">
            </div>
            <div class="field-set">
                <input type="hidden" id="email" value="${currentUser.email}" placeholder="Your Email" name="email">
            </div>
            <div class="field-set">
                <label for="subject">Subject</label>
                <input type="text" id="subject" placeholder="Subject" name="subject">
            </div>
            <div class="field-set">
                <label for="subject">Message</label>
                <textarea name="subject" id="message" placeholder="Message"></textarea>
            </div>
            <button type="submit" id="subBtn">Send</button>
        `
    } else {
        contactForm.innerHTML=`
         <span id="form-msg">Your message has been submitted successfully!</span>
            <div class="field-set">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Name" name="name">
            </div>
            <div class="field-set">
                <label for="tel">Telephone (optional)</label>
                <input type="tel" id="phone" placeholder="Your Telephone" name="tel">
            </div>
            <div class="field-set">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" name="email">
            </div>
            <div class="field-set">
                <label for="subject">Subject</label>
                <input type="text" id="subject" placeholder="The Subject" name="subject">
            </div>
            <div class="field-set">
                <label for="subject">Message</label>
                <textarea name="subject" id="message" placeholder="Message"></textarea>
            </div>
            <button type="submit" id="subBtn">Send</button>
        `
    }

    contactForm.addEventListener("submit",async (event) =>{
        const subBtn = document.getElementById('subBtn')
        
        event.preventDefault()
        const nameField = document.getElementById("name").value
        const emailField= document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
        const tel = (document.getElementById("phone") ?document.getElementById("phone").value :null )
        let notify = document.getElementById("form-msg")
        let currentDate= new Date()

        let new_msg= {
            name: nameField,
            email: emailField,
            telephone: tel,
            subject: subject,
            message: message,
            replied: false,
            reply: null,
            dateAdded: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
        }
        subBtn.classList.toggle('disabled')
        subBtn.innerText='loading...'
        const newMessage = await FetchsendMessage(new_msg)
        if(newMessage.status==201){
            notify.style.display="block"
            notify.innerText=newMessage.message
        }else{
            notify.style.display="block"
            notify.style.backgroundColor='red'
            notify.innerText=newMessage.message
        }
       
        setTimeout(function(){
            notify.style.display="none"
            subBtn.innerText='Send'
            subBtn.classList.toggle('disabled')
        }, 10000)
        contactForm.reset()
    })
})



async function FetchsendMessage(message){
    try{
        const response = await fetch("https://mysite-backend-wdua.onrender.com/message", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
            });
        const data = await response.json()
        return data
    }catch(err){
        console.log(err)
    }
}