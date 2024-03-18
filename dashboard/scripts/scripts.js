var projects=JSON.parse(localStorage.getItem("Projects")) || []
let blogContainer = document.querySelector(".blog__list")
let messages= JSON.parse(localStorage.getItem("Messages")) || []
window.addEventListener("DOMContentLoaded", async () =>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(!currentUser || currentUser.email!='christianinja3@gmail.com'){
        alert("You are not allowed to access this Dashboard")
        window.location.href="http://localhost:5500/index.html"
        
    }
    const token = currentUser.token
    const allUsers =(await fetchAllUsers(token))['users']
    let userLength = allUsers.length
    document.querySelector('.numbers_subscribers').textContent=userLength
    let currentBlogs = await fetchBlogs()
    let blogs = currentBlogs['blogs']
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



async function fetchBlogs() {
    try {
        const response = await fetch('https://mysite-backend-wdua.onrender.com/blogs');
        if (!response.ok) {
            throw Error("There was an error fetching the Blogs!");
        }
        const data = await response.json();

        return data
    } catch (err) {
        console.log(err);
    }
    
}


async function fetchAllUsers(token){
    try{
    const response = await fetch('https://mysite-backend-wdua.onrender.com/admin/users', {
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












