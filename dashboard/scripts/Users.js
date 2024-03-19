window.addEventListener("DOMContentLoaded", async () =>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // if(!currentUser || currentUser.email!='christianinja3@gmail.com'){
    //     alert("You are not allowed to access this Dashboard")
    //     window.location.href="http://localhost:5500/index.html"
    // }
    const token = currentUser.token
    const allusers = await fetchAllUsers(token)
    const users = allusers.users
    renderUsers(users)
    console.log(users)
    const deleteBtns = document.querySelectorAll(".delete")
    deleteBtns.forEach((btn) =>{
        btn.addEventListener('click', () =>{
           let userId= btn.getAttribute('data-id')
           fetchDeleteUser(userId, token)
            renderUsers(users)
        })
    })

    
})

const renderUsers = (subscribers) =>{
    const tbody= document.querySelector("tbody")
    tbody.innerHTML=""
    subscribers.forEach((user,index) =>{
        tbody.innerHTML+=` 
            <tr>
                
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class='actions'>
                    <i class="ri-delete-bin-7-fill delete" data-id =${user._id}></i><td> 
                    </tr>
                   `
        
    })
} 


function deleteUser(id){
        currentUser= users.find((user) => user.id == id)
        let permission= confirm(`Are you sure delete ${currentUser.email} ?`)
        if(permission){
            new_users= users.filter((user) => user!=currentUser)
            localStorage.setItem("Users",  JSON.stringify(new_users))
            alert("User Deleted Successful!")
            
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


async function fetchDeleteUser(id, token){
    let permission = confirm("Are you sure you need to delete this user?")
    if(permission){
     try{
    const response = await fetch(`https://mysite-backend-wdua.onrender.com/admin/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'DELETE'
        })
    window.location.reload()
    console.log("Fetching data")
    }catch(err){
        console.log(err)
}
                    
}  
}
