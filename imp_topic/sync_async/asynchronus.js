//asynchronous function
function one(receivedFunc){
    setTimeout(()=>{
        console.log('after 5 seconds');
        receivedFunc(5);
    }, 5000);
}

/*function callBack(num){
    console.log(num)
}

console.log(one(callBack)); */

console.log(one((num)=>{  //here we don't need to console again
    console.log(num)
}))

//without console.log....undefined will be removed. 
one((num)=>{
    console.log(num)
})