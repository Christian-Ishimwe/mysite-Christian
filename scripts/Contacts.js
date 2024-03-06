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

    contactForm.addEventListener("submit", (event) =>{
        
        event.preventDefault()
        const nameField = document.getElementById("name").value
        const emailField= document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
        const tel = (document.getElementById("phone") ?document.getElementById("phone").value :null )
        let notify = document.getElementById("form-msg")
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
        localStorage.setItem("Messages", JSON.stringify(messages))
        notify.style.display="block"
        setTimeout(function(){
            notify.style.display="none"
        }, 10000)
        contactForm.reset()
    })
})
