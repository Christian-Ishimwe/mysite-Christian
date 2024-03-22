let container =document.getElementById("blogContainer");
window.addEventListener('DOMContentLoaded', async () =>{
 container.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height:20vh;">
                <div style="border: 4px solid rgba(0, 0, 0, 0.1); border-left-color: #333; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
            </div>
    `
   let projects = await fetchBlogs()
   console.log(projects)
   console.log(projects)
   let blogs= projects['blogs']
   renderBlog(blogs)
});


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

function renderBlog(blogs) {
    container.innerHTML=""
    blogs.forEach((article) => {
        const blogArticle = document.createElement("div");
        blogArticle.classList.add("blog_article");
        const blogImg = document.createElement("div");
        blogImg.classList.add("blog_img");
        const img = document.createElement("img");
        img.src =article.image;
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
        readMoreLink.href = `./blogsingle.html?id=${article._id}`;
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

