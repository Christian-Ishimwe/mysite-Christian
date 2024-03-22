
window.addEventListener("DOMContentLoaded", () => {
    fetchData()
    const loginLink = document.getElementById("loginButton");
    const logoutLink = document.getElementById("logoutButton");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        logoutLink.style.display = "initial";
        loginLink.style.display = "none";
    } else {
        logoutLink.style.display = "none";
        loginLink.style.display = "initial";
    }
    let navigation = document.querySelector('nav ul')
    if(currentUser.email == "christianinja3@gmail.com"){
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.setAttribute("href", "./dashboard/index.html");
        link.textContent = "Dashboard";
        listItem.appendChild(link);
        navigation.appendChild(listItem);
    }
});


function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}



// function renderBlog(blogs) {
//     const container = document.getElementById("blogContainer");
//     blogs.forEach((article) => {
//         const blogArticle = document.createElement("div");
//         blogArticle.classList.add("blog_article");
//         // const blogImg = document.createElement("div");
//         // blogImg.classList.add("blog_img");
//         // const img = document.createElement("img");
//         // img.src = `./dashboard/assets/${article.image}`;
//         // img.alt = article.title;
//         // blogImg.appendChild(img);
//         const blogTitle = document.createElement("div");
//         blogTitle.classList.add("blog_title");
//         blogTitle.textContent = article.title;
//         const blogSummary = document.createElement("div");
//         blogSummary.classList.add("blog_summary");
//         const summaryText = document.createElement("p");
//         summaryText.textContent = article.summary;
//         const readMoreLink = document.createElement("a");
//         readMoreLink.href = `./blogsingle.html?id=${article.id}`;
//         readMoreLink.textContent = "read more..";
//         readMoreLink.classList.add("blog-link")
//         blogSummary.appendChild(summaryText);
//         blogSummary.appendChild(readMoreLink);
//         blogArticle.appendChild(blogImg);
//         blogArticle.appendChild(blogTitle);
//         blogArticle.appendChild(blogSummary);
//         container.appendChild(blogArticle);
//     });
// }

async function fetchData() {
    try {
        const response = await fetch('https://mysite-backend-wdua.onrender.com/');
        if (!response.ok) {
            throw Error("There was an error fetching the data!");
        }
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
