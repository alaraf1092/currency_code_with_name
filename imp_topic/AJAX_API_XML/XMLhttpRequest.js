//we won't see the output using Quokka.js....so we have to take an html file then we have view output on browser console.
 
//sending API request using fetch.....

fetch('https://api.chucknorris.io/jokes/random')
.then(response=>{
    console.log(response);
    return response.json();
})
.then(data =>{
    console.log(data);
})
.catch(err =>{
    console.log(err);
})