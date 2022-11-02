//getting multiple posts
function getAllPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data.slice(0,5))  //here data is an array. So we can apply array helper method here.
    })
    .catch((err)=>{
        console.log(err);
    })
}
getAllPosts();


//getting a specific post
function getSinglePosts(){
    fetch('https://jsonplaceholder.typicode.com/posts/7')
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data)  //here data is an array. So we can apply array helper method here.
    })
    .catch((err)=>{
        console.log(err);
    })
}
getSinglePosts();

//adding posts..
function addPost(){
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        body: JSON.stringify({
            title: 'Adding post from user',
            body: 'A blog post',
            userID: 2,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
addPost();