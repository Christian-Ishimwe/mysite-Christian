const form = document.getElementById("newBlogForm");
var projects=JSON.parse(localStorage.getItem("Projects")) || []
let blogContainer = document.querySelector(".blog__list")
let blogs=[]
const notify_msg= document.getElementById('notify_msg')
const createBtn = document.getElementById('createBtn')
window.addEventListener("DOMContentLoaded", async () =>{
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(!currentUser || currentUser.email!='christianinja3@gmail.com'){
        window.location.href="https://christian-ishimwe.github.io/mysite-Christian/dashboard/not_allowed.html"  
    }
    var token = currentUser.token
    blogContainer.innerHTML= `
            <div style="display: flex; justify-content: center; align-items: center; height:20vh;">
                <div style="border: 4px solid rgba(0, 0, 0, 0.1); border-left-color: #333; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
            </div>
                `
    let currentblogs = await fetchBlogs(token)
    blogs = currentblogs
    console.log(blogs)
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
  try{
    renderBlog()
  }
  catch(err) {
    console.log(err)
  }


})


function renderBlog() {
  blogContainer.innerHTML = '';
  blogs.forEach((element) => {
    blogContainer.innerHTML += `
         <li class="blog__item">
              <div class="blog__title">${element['title']}</div>
              <div class="blog__description">
                ${element['title']}
                ${element.summary}
              </div>
              <div class="blog__actions">
                  <a class='view' href="viewblog.html?id=${element["_id"]}"><i class="ri-eye-line"></i></a>
                  <a class='edit' href="editBlog.html?id=${element["_id"]}" ><i class="ri-edit-2-line"></i></a>
                  <i class="ri-delete-bin-line delete"  onclick="deleteBlog('${element["_id"]}')"></i>
              </div>
            </li>
    `;
  });

}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    var title = form.querySelector('input[name="title"]').value;
    var summary = form.querySelector('textarea[name="summary"]').value;
    var description = form.querySelector('textarea[name="description"]').value;
    var image = form.querySelector('input[name="image"]').files[0];
   var publishedInput = form.querySelector('input[name="published"]');
  var commentsInput = form.querySelector('input[name="comments"]');

  var published = publishedInput ? publishedInput.checked : false;
  var commentsAllowed = commentsInput ? commentsInput.checked : false;
    var formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', description);
    formData.append('image', image);
    formData.append('published', published);
    formData.append('commentsAllowed', commentsAllowed);
    createBtn.innerText='Loading...'
    createBtn.classList.toggle('disabled')
    try { 
      let token = getToken()
      const response = await fetch('https://mysite-backend-wdua.onrender.com/admin/blogs', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if(data.status==201){
          notify_msg.innerText= data.message
          notify_msg.style.display='block'
        }else{
          notify_msg.innerText= data.message
          notify_msg.style.display='block'
          notify_msg.style.backgroundColor="#f00"
        }
        console.log(data);
        form.reset();
        createBtn.innerText='Add Blog'
        createBtn.classList.toggle('disabled')
        // window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
});


async function fetchBlogs(token) {
  console.log(token)
    try {
        const response = await fetch('https://mysite-backend-wdua.onrender.com/admin/blogs', {
          headers: {
            'Authorization': `Bearer ${token}`
        }
        });
        if (!response.ok) {
            throw Error("There was an error fetching the Blogs!");
        }
        const data = await response.json();
        console.log(data)
        return data
    } catch (err) {
        console.log(err);
    }
    
}


async function deleteBlog(_id){
  let permission = confirm("Are you sure you need to delete this blog?")
  if(permission){
    let token = getToken()
    try {
        const response = await fetch(`https://mysite-backend-wdua.onrender.com/admin/blog/${_id}`, {
          method: 'DELETE',
          headers: {
          'Authorization': `Bearer ${token}`
    }
        });
        if (!response.ok) {
            throw Error("There was an error fetching the Blogs!");
        }
        alert("Blog Deleted!")
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