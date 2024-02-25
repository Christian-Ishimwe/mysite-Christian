var blogs= JSON.parse(localStorage.getItem('Blogs')) || []
var projects=JSON.parse(localStorage.getItem("Projects")) || []
let blogContainer = document.querySelector(".blog__list")
let messages= JSON.parse(localStorage.getItem("Messages")) || []
window.addEventListener("DOMContentLoaded", () =>{
    document.getElementById('openNav').addEventListener('click', function () {
            document.querySelector('nav ul').classList.add('open');
            
          });
        document.getElementById('closeNav').addEventListener('click', function () {
            document.querySelector('nav ul').classList.remove('open');
        
        });
       document.querySelector(".notifications p").innerHTML=`You have ${messages.length} Unreaded Messages`


  let blogLen=blogs.length
  try{
    renderBlog()
  }
  finally{
      document.getElementById("numBlogs").textContent=blogLen
 document.getElementById("numPortofolio").textContent= projects.length
  
  }


})

function projectForm(event){
    event.preventDefault()
    try {
        const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;
    const imageFile = document.getElementById('image').files[0]; // Get the first file from the input
    const languages = document.getElementById('languages').value;
    const id = new Date().getTime().toString();
    const portfolioItem =[ {
        id: id,
        title: title,
        description: description,
        link: link,
        image: imageFile.name, 
        languages: languages,
        dateUpdated: new Date().toLocaleString()
    }]

        console.log(JSON.stringify(portfolioItem))
    } catch (error) {
            console.log(error)
    }

}













