//working with placeholder API using async await......

//getting posts
async function getAllPosts(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //initially we will get response
    
    const data = response.json(); //after response we will get data.

    return data; //then returning the data.
}
//for getting data we have to call another async function.
async function run(){
    const posts = await getAllPosts()
    console.log(posts);
}
run() //then we are calling the function;