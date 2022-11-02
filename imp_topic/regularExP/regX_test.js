function validName(nameVal2){
    return /[a-z]{0,1}/i.test(nameVal2);
}
if(!validName()){
    console.log('hello');
}else{
    console.log('false')
}

console.log(validName('al araf'));