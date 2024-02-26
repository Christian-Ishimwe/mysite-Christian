const pForm= document.getElementById("portfolio-form")
let projects=JSON.parse(localStorage.getItem("Projects")) || []
window.addEventListener('DOMContentLoaded', ()=>{
    updateProject()
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

pForm.addEventListener("submit", (event) =>{
    event.preventDefault()
    var title= document.getElementById('title').value;
    var description= document.getElementById('description').value;
    var link= document.getElementById('link').value;
    var image= document.getElementById('image').files[0].name;
    var languages= document.getElementById('languages').value;
    let new_project ={
        id: Date.now(),
        title: title,
        description: description,
        link: link,
        languages: languages,
        image: image,
        dateCreated: new Date().toLocaleDateString() // Format the date as needed
    }
    projects.push(new_project)
    console.log(new_project)
    localStorage.setItem("Projects", JSON.stringify(projects)) 
    alert("Project Successfully added!")
    updateProject()
    pForm.reset()
});


function updateProject(){
    projects=JSON.parse(localStorage.getItem("Projects"))
    if(projects){
         const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('pcard');
    projectCard.innerHTML = `
      <h2>${project["title"]}</h2>
      <p>${project["description"]}</p>
    <a href="${project["link"]}" target="_blank">link</a>
      <p class="data">Created on: ${project["dateCreated"]}</p>
      <div class="actions">
        <a href="./editproject.html?id=${project.id}" target="_blank" class="edit-btn">Edit</a>
        <a class="delete-btn" onclick=deleteProject(${project["id"]}) class="delete-btn">Delete</a>
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
