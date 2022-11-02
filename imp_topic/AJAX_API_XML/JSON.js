//JSON - JavaScript Object Notation!
//and JSON object is little bit different from regular object.
//JSON object is not actually an object. It's actually a string,

//An example of JSON object.....In JSON object every key will be in double quotation,
const profile = {
    "Name" : "Al Araf",  //string type data will be in double quotation.
    "Age" : 20,
    "Profession" : "Student",
    fullName(){
        return this.Name;   //in JSON object we cannot declare a function.
    }
}

//A valid JSON object

const myProfile = {
    "Name": "Al Araf", 
    "Age": 20,
    "willDoctor": null,
    "Profession": "Student",
    "Country": "Bangladesh"
}
console.log(typeof myProfile)

//convert regular object to JSON oject.
const profile2 = {
    Name: 'Al Araf',
    Age: 20,
    willDoctor: null,
    Profession: 'Student'
}

console.log(JSON.stringify(profile2));

//And the type is.....string not Object although it looks like an Object.
console.log(typeof JSON.stringify(profile2));

const JSON_Oject = JSON.stringify(profile2);
console.log(JSON_Oject);

const regular_object = JSON.parse(JSON_Oject);
console.log(regular_object);


//convert a JSON object to a regular object....with JSON.parse()
const myProfileJSON = { // A JSON object 
    "Name": "Al Araf", 
    "Age": 20,
    "willDoctor": null,
    "Profession": "Student",
    "Country": "Bangladesh"
}

console.log(typeof myProfileJSON)
