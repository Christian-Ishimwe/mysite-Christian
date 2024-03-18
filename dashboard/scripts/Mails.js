const emailContainer=document.getElementById("email-container")

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

window.addEventListener("DOMContentLoaded", async () =>{
  let messages = await fetchAllMessages()
  renderMessages(messages)
  
const openView = document.querySelectorAll("a.openView")
openView.forEach((element)=>{
    // element.style.display='none'
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


})
function renderMessages(messages){

emailContainer.innerHTML=""
messages.forEach(message => {
    emailContainer.innerHTML+=`
    <div class="email-message">
              <div class="email-icons">
                <a href="#" class="openView" ><i class="ri-eye-line" data-id="${message._id}"></i></a>
                <a href=mailto:${message.email}><i class="ri-reply-line"></i></a>
                <a href="#"><i class="ri-delete-bin-7-fill"  onclick=deleteMessage("${message._id}")></i></a>
              </div>
              <div class="email-content">
                <div class="email-name">${message.name}</div>
                <div class="email-subject">${message.subject}</div>
                <div class="email-date">${message.dateSent.split("T")[0]}</div>
              </div>
              <div class="email-review" id="${message._id}">
                  <div class="email-header">
                    <i class="ri-close-line viewClose" data-id=${message._id}></i>
                    <p>From: <strong>${message.name}</strong></p>
                    <p>Email: <strong>${message.email}</strong></p>
                    <p>Tel: <Strong>${message.telephone}</Strong></p>
                    <p>Date: <strong>${message.dateSent.split("T")[0]}</strong></p>
                  </div>
                  <div class="email-subject">
                    <p><strong>Subject: </strong>${message.subject}</p>
                  </div>
                  <div class="email-body">
                    <p>${message.message}</p>
                  </div>
                  <div class="email-actions"> 
                    <a  href="#" onclick=deleteMessage("${message._id}")><i class="ri-delete-bin-line"></i></a>
                    <a href=mailto:${message.email} ><i class="ri-reply-line"></i></a>
                  </div>
              </div>
            </div>`
});
}




async function fetchAllMessages(){
  const token = getToken()
    try{
    const response = await fetch('https://mysite-backend-wdua.onrender.com/admin/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
    const data = response.json()
    console.log("Fetching data")
    return data
    }catch(err){
        console.log(err)
}
}




const deleteMessage = async (_id) => {
    let permission = confirm('Are you sure you need to delete this Message?')
    if(permission){
    let token = getToken()
    try {
        const response = await fetch(`https://mysite-backend-wdua.onrender.com/admin/messages/${_id}`, {
          method: 'DELETE',
          headers: {
          'Authorization': `Bearer ${token}`
    }
        });
        if (!response.ok) {
            throw Error("There was an error fetching the Blogs!");
        }
        alert("The Message deleted!")
        window.location.reload()
    } catch (err) {
        console.log(err);
    }
  }
}


function getToken(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(!currentUser || currentUser.email!='christianinja3@gmail.com'){
        alert("You are not allowed to access this Dashboard")
        window.location.href="http://localhost:5500/index.html"
        
    }
    var token = currentUser.token
    return token
}