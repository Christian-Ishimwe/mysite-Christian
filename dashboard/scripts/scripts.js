const form = document.getElementById("newBlogForm");
var blogs= JSON.parse(localStorage.getItem('Blogs')) || []
var projects=JSON.parse(localStorage.getItem("Projects")) || []
let blogContainer = document.querySelector(".blog__list")


window.addEventListener("DOMContentLoaded", () =>{
  let blogLen=blogs.length
  try{
    renderBlog()
  }
  finally{
      document.getElementById("numBlogs").textContent=blogLen
 document.getElementById("numPortofolio").textContent= projects.length
  
  }



})

function renderBlog() {
  blogContainer.innerHTML = '';
  blogs.forEach((element) => {
    blogContainer.innerHTML += `
         <li class="blog__item">
              <div class="blog__title">${element['title']}</div>
              <div class="blog__description">
                ${element['summary']}
              </div>
              <div class="blog__actions">
                  <a class='view' href="viewblog.html?id=${element["id"]}" target="_blank"><i class="ri-eye-line"></i></a>
                  <a class='edit' href="editBlog.html?id=${element["id"]}" target="_blank"><i class="ri-edit-2-line"></i></a>
                  <i class="ri-delete-bin-line delete"  onclick="deleteBlog('${element["id"]}')"></i>
              </div>
            </li>
    `;
  });

}


form.addEventListener("submit", (event) => {
            event.preventDefault();
            var title = form.querySelector('input[name="title"]').value;
            var summary = form.querySelector('textarea[name="summary"]').value;
            var description = form.querySelector('textarea[name="description"]').value;
            var image = form.querySelector('input[name="image"]').value;
            var published = form.querySelector('input[name="published"]').checked;
            var commentsAllowed = form.querySelector('input[name="comments"]').checked;
            var id = "blog_" + Date.now();
            var blogPost = {
                id: id,
                title: title,
                summary: summary,
                description: description,
                image: image.name,
                published: published,
                commentsAllowed: commentsAllowed
            };
            blogs.push(blogPost)
            localStorage.setItem('Blogs', JSON.stringify(blogs));
            form.reset();
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



const deleteBlog = (id) => {
  let per = confirm("Are you sure you want to delete this blog?");
  if (per) {
    blogs = blogs.filter(element => element.id !== id);
    localStorage.setItem("Blogs", JSON.stringify(blogs))
    renderBlog();
  }
};














