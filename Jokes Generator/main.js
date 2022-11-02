const btnElm = document.querySelector('button');
const jokeCtgryElm = document.querySelector('.joke-category');
const jokeElm = document.querySelector('.joke');

//taking a function for generating random numbers from 0 - array.length
function randomCategory(data){
    const index =  Math.floor(Math.random()*data.length);
    return data[index];
}


function loadJokes(){
    //at first we will pick a category randomly then according to category we will find joke
    //sending request for category
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        const jokeCategory = randomCategory(data);  //there are 16 categories of jokes...data will represent the number of those categories.
        console.log(jokeCategory); //according to category now will send joke request and return that
        //again fetch and return
        return fetch(`https://api.chucknorris.io/jokes/random?category=${jokeCategory}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            jokeCtgryElm.textContent = jokeCategory;
            jokeElm.textContent = data.value;
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

btnElm.addEventListener('click', loadJokes)  //here loadJokes is a function,after clicking the function will be called.