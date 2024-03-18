const projectContainer= document.querySelector('.porto__container')
let projects =[]
window.addEventListener("DOMContentLoaded", async() =>{
    let currentprojects= await fetchProjects()
    projects=currentprojects['projects']
    renderProjects()
    console.log(projects)
})

function renderProjects(){
    projectContainer.innerHTML = "";
    projects.forEach((site) =>{
        const card = document.createElement("div");
        card.classList.add("porto_card");
        card.id = "porto_project1";
        const image = document.createElement("img");
        image.src =`${site.image}`
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


async function fetchProjects() {
    try {
        const response = await fetch('https://mysite-backend-wdua.onrender.com/projects');
        if (!response.ok) {
            throw Error("There was an error fetching the Blogs!");
        }
        const data = await response.json();

        return data
    } catch (err) {
        console.log(err);
    }
    
}
renderProjects()