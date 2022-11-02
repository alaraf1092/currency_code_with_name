const inputPriceElm = document.querySelector('.priceInput');
const inputPrdctElm = document.querySelector('.nameInput');
const inputFilterElm = document.querySelector('#filter');
const formElm = document.querySelector('form');
const msgElm = document.querySelector('.msg')
const prdctCollection = document.querySelector('.collection');
const submitBtnElm = document.querySelector('.submit-btn button');

//managing to prevent data disappearing after reload...it will take data from local storage if there is any data otherwise it will show an empty array
let products = localStorage.getItem('lclStoreProduct')
? JSON.parse(localStorage.getItem('lclStoreProduct')) : [ /*otherwise it will show empty array */]
    



function receiveInput(){
    const price = inputPriceElm.value
    const name = inputPrdctElm.value
    return {name, price}
}

function clearMessage(){
    msgElm.textContent = '';
}

function showMessage(msgInput, action='success'){
    //msgElm.textContent = msgInput;
    const msgText = `<div class="alert alert-${action}" role="alert">
    ${msgInput}
  </div>`
    msgElm.insertAdjacentHTML('afterbegin', msgText);
    setTimeout(() => {
        clearMessage();
    }, 1500);

}

function validateInput(name, price){
    let isValid = true;   //to track down the value if its true

    if(name==="" || price===""){
        //we will show a message and for that we will declare a function which will show us message always
        showMessage("Please Enter Correct Value", 'warning');
        isValid = false;
    }
    if(Number(price)!==Number(price)){//that means true(NaN !== NaN), so user input was not a number(NaN)
        showMessage("Please Enter Product Price", 'warning')
        isValid = false;
    }

    return isValid; //returning the value if its true or false
}


function inputReset(){ //after valid input, the given input will disappear
    inputPrdctElm.value = '';
    inputPriceElm.value = '';
}


//adding product through function

function addProduct(name, price){
    //initializing a product then we will push it to another array called products
const product = {
    id: products.length + 1 ,
    name,
    price,
}

//pushing or adding the product in products array

products.push(product);

return product;
}

function showProductInfo(productInfo){
    //removing not found message
    const notFoundMsgElm = document.querySelector('.not-found-product')
    if(notFoundMsgElm){
        notFoundMsgElm.remove();
    }
    const {id, name, price} = productInfo
    const elm = `
    <li
            class="list-group-item collection-item d-flex flex-row justify-content-between"
            data-productid = "${id}"
          >
            <div class="product-info">
              <strong>${name}</strong>- <span class="price">${price} TK</span>
            </div>
            <div class="action-btn">
              <i class="fa fa-pencil-alt float-right edit-product me-2"></i>
              <i class="fa fa-trash-alt float-right del-product"></i>
            </div>
          </li>
    `
    prdctCollection.insertAdjacentHTML('afterbegin', elm);
    showMessage("Product Added Successfully!")
}

//adding product to local storage
function addProductToLocalStorage(product){//parameter for receiving the input

let products;
if(localStorage.getItem('lclStoreProduct')){
    products = JSON.parse(localStorage.getItem('lclStoreProduct'))

    products.push(product);
}else{
products = []
products.push(product); //the incoming input received by product parameter 

}
localStorage.setItem('lclStoreProduct', JSON.stringify(products)); //as products is an array so we can not store it
//for storing, we have to convert array into a string.
}

function updateProduct(receivedProduct){     //receiving product parameter from updateProduct function.
    const updatedProducts = products.map(product =>{
        if(product.id === receivedProduct.id){
            return {
                ...product,
                name: receivedProduct.name,
                price: receivedProduct.price
            }
        }else{
            return product;
        }
    })
    return updatedProducts;
    
}
// clearing edit scene
function clearEditForm(){
    submitBtnElm.classList.remove('update-btn');
    submitBtnElm.classList.remove('btn-secondary');
    submitBtnElm.removeAttribute(['data-id']);
    submitBtnElm.textContent= 'Submit';
}

function updateProductToLocalStorage(productOBJ){ //getting product object from the function
    localStorage.setItem('lclStoreProduct', JSON.stringify(products))
}


function mngeFormSubmit(evt){
    evt.preventDefault();
    const {name, price} = receiveInput();

    const isValid = validateInput(name, price);
    if(!isValid) return;
    //resetting the input
    inputReset();

    if(submitBtnElm.classList.contains('update-product')){
        console.log("update product");
        const id = Number(submitBtnElm.dataset.id);  //as we will get it as string, so we have to convert it as number
        console.log(id);
        
        const product = { //we will send it to updateProduct function.
            id,
            name,
            price
        }

        //update data to memory store.....
        const updatedProducts = updateProduct(product);  //sending this object(product) to updateProduct function.
        //memory update
        products = updatedProducts

        //local storage update......
        updateProductToLocalStorage(product)  //we want to update the product object. so we pass through this function.

        //DOM update
        showProductToUI(products);

        //clear edit state/Form.....
        clearEditForm()
    }else{
         //initializing a product then we will push it to another array called products
    const product = addProduct(name, price);

    addProductToLocalStorage(product);

    showProductInfo(product);


    console.log(name, price)
    }
}

//function of getting product
function getProductId(evt){
    const liElm = evt.target.parentElement.parentElement;//getting the parent element of unique ID
    const id = Number(liElm.getAttribute('data-productId')) //data product id will be found from the console when will new input given. and it is dynamic
               //as it returns a string, so we need to convert it into a number
    return id;

    

}

//delete product
function removeItem(id){ //getting the frim
    products = products.filter((product) => product.id !== id)
}

function removeItemUI(id){
    document.querySelector(`[data-productid="${id}"]`).remove();
    showMessage("Removed Product Successfully!", 'danger')
}

//function for removing data from local storage................
function removeProductFromStroge(id){
    let products = JSON.parse(localStorage.getItem('lclStoreProduct'));
    products = products.filter((product) => product.id !== id)

    localStorage.setItem('lclStoreProduct', JSON.stringify(products))
}

function findProduct(id){
    const foundProduct = products.find(product =>
        product.id === id
    )
    return foundProduct;
}

function populateEditForm(product){
    inputPriceElm.value = product.price;
    inputPrdctElm.value = product.name;

    //changing the submit button....
    submitBtnElm.textContent = 'Update Product';
    submitBtnElm.classList.add('btn-secondary');
    submitBtnElm.classList.add('update-product');
    //track down the product.....with ID
    submitBtnElm.setAttribute('data-id', product.id)
}


function hndlManpulteData(evt){
    //declared the ID outside of the block scope.....
    const id = getProductId(evt);  //getting id from previous function

    if(evt.target.classList.contains('del-product')){

        //remove  data package
        removeItem(id); // sending the id 

        //removing data from local storage......with the help of ID
        removeProductFromStroge(id)   //passing ID, as we will remove product with the help of ID

        //remove from dom UI
        removeItemUI(id);
        console.log(id)

    }else if(evt.target.classList.contains('edit-product')){
        
        const foundProduct = findProduct(id);
        console.log(foundProduct);

        //populating existing form in edit state....
        populateEditForm(foundProduct);
    }

    console.log(evt.target);
}

//showing product to UI taking from local storage

function showProductToUI(products){
    prdctCollection.textContent = '';   //to clear existing elements from the UI
    let liElms;
    liElms = products.length === 0? `<li class="list-group-item collection-item not-found-product">No Products to Show` : '';
    
    //sorting products of the array with id
    const sortedProducts = products.sort((a, b) =>{
        return b.id - a.id
    })
    console.log(sortedProducts);

    products.forEach((prdt) =>{
        const {id, name, price} = prdt;
        liElms +=  `
        <li
                class="list-group-item collection-item d-flex flex-row justify-content-between"
                data-productid = "${id}"
              >
                <div class="product-info">
                  <strong>${name}</strong>- <span class="price">${price} TK</span>
                </div>
                <div class="action-btn">
                  <i class="fa fa-pencil-alt float-right edit-product me-2"></i>
                  <i class="fa fa-trash-alt float-right del-product"></i>
                </div>
              </li>
        `
    })
    prdctCollection.insertAdjacentHTML('afterbegin', liElms);

}

function handleFilter(evt){
    console.log('th',evt.target.value )
}

formElm.addEventListener('submit', mngeFormSubmit)

prdctCollection.addEventListener('click', hndlManpulteData);

inputFilterElm.addEventListener('keyup', handleFilter)

document.addEventListener('DOMContentLoaded', () =>{
    showProductToUI(products);
})