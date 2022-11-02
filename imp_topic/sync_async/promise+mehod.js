//promise.all()

const prmse1 = Promise.resolve(1);
const prmse2 = Promise.reject(2);
const prmse3 = Promise.resolve(3);

Promise.all([prmse1, prmse2, prmse3]).catch(data =>{
    console.log(data);
}).then((data)=>{
    console.log(data);
})
