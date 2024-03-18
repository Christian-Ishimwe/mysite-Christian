const pForm= document.getElementById("portfolio-form")
let projects=JSON.parse(localStorage.getItem("Projects")) || []
let subBtn= document.getElementById("subBtn")
let   notify= document.getElementById('notify_msg')
window.addEventListener('DOMContentLoaded', async ()=>{
    updateProject()
    await fetchandUpdateProjects()
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
})

pForm.addEventListener("submit", async (event) =>{
    event.preventDefault()
    var title= document.getElementById('title').value;
    var description= document.getElementById('description').value;
    var link= document.getElementById('link').value;
    var image= document.getElementById('image').files[0];
    var languages= document.getElementById('languages').value;
    let formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('link', link)
    formData.append("languages", languages)
    formData.append('image', image)
    
    subBtn.innerHTML="loading..."
    subBtn.classList.toggle('disabled')

    try { 
      let token = getToken()
      const response = await fetch('https://mysite-backend-wdua.onrender.com/admin/projects', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // if (!response.ok) {
        //     throw Error("There was an error adding the blog!");
        // }
        const data = await response.json();
        if(data.status == 201){
          pForm.reset();
          setTimeout(()=>{
            notify.innerText=data.message
            notify.style.display="block"
          }, 10000)          
        }
        else{
            setTimeout(()=>{
            notify.innerText=data.message
            notify.style.backgroundColor="#f00"
            notify.style.display="block"
          }, 10000)  
          await fetchandUpdateProjects() 
        }
        subBtn.innerText='Add Project'
        subBtn.classList.toggle('disabled')
    } catch (error) {
        console.error('Error:', error);
    }
});


async function fetchandUpdateProjects(){
  let token = getToken()
  try{
    const response = await fetch('https://mysite-backend-wdua.onrender.com/admin/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    if(data.status==200){
      projects = data.projects
      await updateProject(projects)
    }
  }
  catch(err){
    console.log(err)
  }
}
//      
async function updateProject(projects){
    if(projects){
         const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('pcard');
    projectCard.innerHTML = `
      <h2>${project["title"]}</h2>
      <img src=${project.image}></img>
       <p>${project["description"]}</p>
    <a href="${project["link"]}" target="_blank">Click here to view the project</a>
      <p class="data">Created on: ${project["dateAdded"].split('T')[0]}</p>
      <div class="actions">
        <a href="./editproject.html?id=${project._id}" target="_blank" class="edit-btn">Edit</a>
        <a class="delete-btn" onclick=fetchAndDeleteProject("${project._id}") class="delete-btn">Delete</a>
      </div>
    `;
    projectsContainer.appendChild(projectCard);
  });
    }
    else{
        projects=[]
    }
   
}

function deleteProject(id){
    let confirm = window.confirm("Are you sure you need to delete this project?")
    if(confirm){
        let project = projects.filter(element => element.id !== id);
        localStorage.setItem("Projects", JSON.stringify(project))
        location.reload();
  }
};


async function fetchAndDeleteProject(_id){
  
  let permission = confirm("Are you sure you need to delete this Project?")
  if(permission){
    let token = getToken()
    try {
        const response = await fetch(`https://mysite-backend-wdua.onrender.com/admin/projects/${_id}`, {
          method: 'DELETE',
          headers: {
          'Authorization': `Bearer ${token}`
    }
        });
        if (!response.ok) {
            throw Error("There was an error fetching the Blogs!");
        }
        await fetchandUpdateProjects()
        alert("Project Deleted!")
        
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
