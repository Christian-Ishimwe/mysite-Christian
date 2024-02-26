 document.getElementById('openNav').addEventListener('click', function () {
            document.querySelector('nav ul').classList.add('open');
             document.getElementById('closeNav').style.display="inherit"
            document.getElementById('openNav').style.display="none"
          });
        document.getElementById('closeNav').addEventListener('click', function () {
            document.querySelector('nav ul').classList.remove('open');
             document.getElementById('closeNav').style.display="none"
            document.getElementById('openNav').style.display="inherit"
            });
  
const emailContainer=document.getElementById("email-container")
let messages= JSON.parse(localStorage.getItem("Messages")) || []
emailContainer.innerHTML=""
messages.forEach(message => {
    emailContainer.innerHTML+=`
    <div class="email-message">
              <div class="email-icons">
                <a href="#" class="openView" ><i class="ri-eye-line" data-id="${message.id}"></i></a>
                <a href=mailto:${message.email}><i class="ri-reply-line"></i></a>
                <a href="#"><i class="ri-delete-bin-7-fill"  onclick=deleteMessage("${message.id}")></i></a>
              </div>
              <div class="email-content">
                <div class="email-name">${message.name}</div>
                <div class="email-subject">${message.subject}</div>
                <div class="email-date">${message.dateAdded}</div>
              </div>
              <div class="email-review" id="${message.id}">
                  <div class="email-header">
                    <i class="ri-close-line viewClose" data-id=${message.id}></i>
                    <p>From: <strong>${message.name}</strong></p>
                    <p>Email: <strong>${message.email}</strong></p>
                    <p>Tel: <Strong>${message.tel}</Strong></p>
                    <p>Date: <strong>${message.dateAdded}</strong></p>
                    
                  </div>
                  <div class="email-subject">
                    <p><strong>Subject: </strong>${message.subject}</p>
                  </div>
                  <div class="email-body">
                    <p>${message.message}</p>
                  </div>
                  <div class="email-actions">
                    <a  href="#" onclick=deleteMessage("${message.id}")><i class="ri-delete-bin-line"></i></a>
                    <a href=mailto:${message.email} ><i class="ri-reply-line"></i></a>
                  </div>
              </div>
            
            </div>`

});
const openView = document.querySelectorAll(".openView")
openView.forEach((element)=>{
    element.addEventListener("click", (event) =>{
       let view_id= event.target.dataset.id
        document.getElementById(view_id).style.right=0 
    })
})

const closeView= document.querySelectorAll(".viewClose")
closeView.forEach((element)=>{
    element.addEventListener("click", (event) =>{
        let view_id = event.target.dataset.id
        document.getElementById(view_id).style.right="-1000px"
    })
})

const deleteMessage = (id) => {
    let permission = confirm('Are you sure you need to delete this Message?')
    if (permission) {
        messages = messages.filter((element) => element.id != id)
        console.log(messages)
        localStorage.setItem("Messages", JSON.stringify(messages))
        alert("Message successfully deleted!")
        window.location.reload()
    }
}
