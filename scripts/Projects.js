const projectContainer= document.querySelector('.porto__container')
const projects = JSON.parse(localStorage.getItem('Projects')) || []
function renderProjects(){
    projectContainer.innerHTML = "";
    projects.forEach((site) =>{
        const card = document.createElement("div");
        card.classList.add("porto_card");
        card.id = "porto_project1";
        const image = document.createElement("img");
        image.src =`./dashboard/assets/${site.image}`
        image.alt = "Project 1";
        const summary = document.createElement("div");
        summary.classList.add("porto_summary");
        summary.innerHTML = `${site.description}`
        const name = document.createElement("div");
        name.classList.add("porto_name");
        name.textContent =  `${site.title}`;
        const language = document.createElement("div");
        language.classList.add("porto_language");
        language.textContent = `${site.languages}`;
        card.appendChild(image);
        card.appendChild(summary);
        card.appendChild(name);
        card.appendChild(language);
        projectContainer.appendChild(card);
    });
}


renderProjects()