function one(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('2 sec delay');
            resolve(1)
        }, 2000);
    })
}

one()
    .then((resolve)=>{
        console.log(resolve);
    })
    .catch((reject)=>{
        console.log(reject);  //if I declare reject in promise method then I will get that answer in catch method
    })

    //working with error.

    function two(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                console.log('1 second delay!')
                reject(new Error(45));
            },2000);
        })
    }

    two()
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })