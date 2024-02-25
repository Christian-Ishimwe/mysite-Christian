
document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.getElementById("loginButton");
    const logoutLink = document.getElementById("logoutButton");
    const Blogs = JSON.parse(localStorage.getItem('Blogs'))
    const publishedBlogs= Blogs.filter(blog => blog.published)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const projects= JSON.parse(localStorage.getItem("Projects")) || []
    console.log(Blogs)
    if (currentUser) {
        logoutLink.style.display = "inline-block";
        loginLink.style.display = "none";
    } else {
        logoutLink.style.display = "none";
        loginLink.style.display = "inline-block";
    }
    try{
         renderBlog(publishedBlogs);
    }
    catch(e){
        console.log(e)
    }
   
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}



function renderBlog(blogs) {
    const container = document.getElementById("blogContainer");
    blogs.forEach((article) => {
        const blogArticle = document.createElement("div");
        blogArticle.classList.add("blog_article");
        const blogImg = document.createElement("div");
        blogImg.classList.add("blog_img");
        const img = document.createElement("img");
        img.src = `./dashboard/assets/${article.image}`;
        img.alt = article.title;
        blogImg.appendChild(img);
        const blogTitle = document.createElement("div");
        blogTitle.classList.add("blog_title");
        blogTitle.textContent = article.title;
        const blogSummary = document.createElement("div");
        blogSummary.classList.add("blog_summary");
        const summaryText = document.createElement("p");
        summaryText.textContent = article.summary;
        const readMoreLink = document.createElement("a");
        readMoreLink.href = `./blogsingle.html?id=${article.id}`;
        readMoreLink.textContent = "read more..";
         readMoreLink.classList.add("blog-link")
        blogSummary.appendChild(summaryText);
        blogSummary.appendChild(readMoreLink);
        blogArticle.appendChild(blogImg);
        blogArticle.appendChild(blogTitle);
        blogArticle.appendChild(blogSummary);
        container.appendChild(blogArticle);
    });
}
