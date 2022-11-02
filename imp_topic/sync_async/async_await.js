//working with async await

//declaring an asynchronous function
function two(){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('2 seconds delay!');
            resolve(2) //passing the answer....
        }, 2000);
    })
}

function one(){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('1 seconds delay!');
            resolve(1) //passing the answer....
        }, 1000);
    })
}

function three(){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('3 seconds delay!');
            resolve(3) //passing the answer....
            //reject(new Error(1))   //in this way we will declare reject
        }, 3000);
    })
}

//now we have to take a new function....
async function run(){
    try{
    const result1 = await one();
    const result2 = await two();
    const result3 = await three();

    return [result1, result2,result3];
    }catch(err){
        return new err err
    }
}
;(async function(){
    console.log(await run());
})()
