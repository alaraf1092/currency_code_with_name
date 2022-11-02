const https = {
    async get(url){
        const response = await fetch(url); //url might be different, so we will take url parameter.
        const data = await response.json();
        return data;
    },
    //updating a post.....
    async post(url, data){ //parameter for postData from 32 no. line
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data), //just added the postData through data parameter
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data1 = await response.json();
        return data1;
    }
}

async function run(){
    const post = await https.get('https://jsonplaceholder.typicode.com/posts');
    console.log(post)

    //single post
    const post1 = await https.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(post1)

    //creating a post

    //object for the post
    const postData = {
        title: 'A blog post',
        body: 'hello there it\'s a blog post',
        userID: 3,
    }

    const addedPost = await https.post('https://jsonplaceholder.typicode.com/posts', postData); //we will send post data.
    console.log(addedPost);

    //update a post......
    //const updatePost = 
}
run();