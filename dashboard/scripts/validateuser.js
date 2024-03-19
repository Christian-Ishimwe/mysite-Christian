window.addEventListener('DOMContentLoaded', () =>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(!currentUser || currentUser.email!='christianinja3@gmail.com'){
        window.location.href="https://christian-ishimwe.github.io/mysite-Christian/dashboard/not_allowed.html"
    }
    const token = currentUser.token
})
