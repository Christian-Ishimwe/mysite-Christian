const form = document.getElementById("newBlogForm");
var blogs= JSON.parse(localStorage.getItem('Blogs')) || []
var projects=JSON.parse(localStorage.getItem("Projects")) || []
let blogContainer = document.querySelector(".blog__list")


window.addEventListener("DOMContentLoaded", () =>{
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
            var image = form.querySelector('input[name="image"]');
            var published = form.querySelector('input[name="published"]').checked;
            var commentsAllowed = form.querySelector('input[name="comments"]').checked;
            var id = "blog_" + Date.now();
            var blogPost = {
                id: id,
                title: title,
                dateAdded: Date().toLocaleUpperCase(),
                summary: summary,
                description: description,
                image: image.files[0].name,
                published: published,
                commentsAllowed: commentsAllowed
            };
            blogs.push(blogPost)
            localStorage.setItem('Blogs', JSON.stringify(blogs));
            form.reset();
            window.location.reload()
    })

const deleteBlog = (id) => {
  let per = confirm("Are you sure you want to delete this blog?");
  if (per) {
    blogs = blogs.filter(element => element.id !== id);
    localStorage.setItem("Blogs", JSON.stringify(blogs))
    renderBlog();
  }
};
