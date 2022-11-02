function one(fn1){
    setTimeout(()=>{
        console.log('1 seconds delay!');
        fn1(1)  //we should have to input in the function what we want to return
    }, 1000)
}

function two(fn2){
    setTimeout(()=>{
        console.log('2 seconds delay');
        fn2(2);
    },2000);
}

one((num1)=>{
    console.log(num1);
    two((num2)=>{
        console.log(num1+num2)
        num2
    })
})