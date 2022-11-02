//UI design 
//data layer update
//local storage

//single responsibility Principle--> we have to declare different function for each necessary works
//we have to take 3 different object

//working with API.......
const weatherData = {
    city: '',
    country: '',
    API_KEY: '7519779c2c3476c0e9250cd89db45aa8',
    async getWeather(){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.API_KEY}`)
        const {name, main,weather } = await response.json(); //destructuring the data
        //console.log(data)                  //here data = name(city),main: {temp, pressure, humidity}, weather[0].icon, weather[0].description 
        console.log(await response.json());
        return {
            name,
            main,
            weather,
        }
    }catch(err){
        console.log(err);
        UI.showMsg('City is Not Found!');
    }
 },

}

const UI = {
    loadSelector(){ //just a random function for selecting all elements
    const cityElm = document.querySelector('#city')
    const cityInfoElm = document.querySelector('#w-city')
    const iconElm = document.querySelector('#w-icon')
    const temperatureElm = document.querySelector('#w-temp')
    const pressureElm = document.querySelector('#w-pressure')
    const humidityElm = document.querySelector('#w-humidity')
    const feelElm = document.querySelector('#w-feel')
    const formElm = document.querySelector('#form')
    const countryElm = document.querySelector('#country')
    const messageElm = document.querySelector('#messageWrapper')
    
    //now we have to return all these info if we want to get these info outside of the function
    //we will return these info as an object
    return {
        cityElm,cityInfoElm,iconElm, temperatureElm, pressureElm, humidityElm, feelElm, formElm, countryElm, messageElm
    }
},

//to hide the we will take another function.....
hideMessage(){
    const messageElm = document.querySelector('.style1');
    setTimeout(() => {
        messageElm.remove();
    }, 2000);
},

showMsg(msg){   //receiving the message through msg parameter.
    const {messageElm} = this.loadSelector(); //destructuring the object to get specific data
    //messageElm.textContent = msg;
    const elm = `<div class="style1" id='message'>${msg}</div>`
    messageElm.insertAdjacentHTML('afterbegin', elm)
    this.hideMessage();
},
//validation check........
validateInput(country, city){ //getting value from countryElm, cityElm   as parameter of "country, city"
    if(country ==='' && city===''){
        this.showMsg('Provide valid info!');
        return true;
    }
    else if(country ===''){
        return true;
    }
    else if(city===''){
        this.showMsg('Provide City Name!');
        return true;
    }else{
        return false;
    }
},

//getting input values.....
getInputValues(){
    const {cityElm, countryElm} = this.loadSelector(); //object destructuring 

    //if we get incorrect input, we have to stop the function
    //here inValid is true, means the input is incorrect.
    const inValid = this.validateInput(countryElm.value, cityElm.value);  //we will send these to validate data.
    if(inValid === true) return //stopping the function

    return {       //if inValid is false, means input is correct then we will enter next function
        country: countryElm.value,
        city: cityElm.value,
    }
},

//reset function
resetInput(){
    const {countryElm, cityElm} = this.loadSelector();
    countryElm.value = '';
    cityElm.value = "";

},
//handling API related stuffs......
handleRemoteData(){
    //const weatherData = 
    weatherData.getWeather();
},

//initialization........
initiate(){
        const {formElm} = this.loadSelector()  //loadSelector under UI object....tracking the object with "this"
                             //now we will destructure the object to get specific output
        formElm.addEventListener('submit', (evt)=>{
            evt.preventDefault();

            //getting values
            const {country , city} = this.getInputValues(); //destructuring the object

            //setting data to local storage......
            weatherData.city = city;
            weatherData.country = country; //here country and city are from previous destructure 

            //resetting the input.....after .5sec the input will be disappeared.
            setTimeout(()=>{
                this.resetInput();
            },500)
            
            //sending data to API server.....
            this.handleRemoteData();
            console.log(country, city)
            
            
        })
    }, 
                         
}
UI.initiate(); //just called the function! 

const localStorage = {}