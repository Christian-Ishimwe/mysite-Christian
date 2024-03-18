
window.addEventListener('DOMContentLoaded', async () =>{
   let projects = await fetchBlogs()
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
    const container = document.getElementById("blogContainer");
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

