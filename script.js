const productItems = {1: "SAMSUNG TV", 2: "PIXEL 4a", 3: "PS 5", 4: "MACBOOK AIR", 5: "APPLE WATCH", 6: "AIR PODS"};
var btnCart = document.querySelectorAll('.btn-cart');
const table = document.getElementById('table');
var cartItemNo = document.getElementById('cart-item-no');
let count = 0;
var productPriceHolder= document.querySelectorAll('.productprice-holder');
var innerBtnRemove = document.querySelectorAll('.btn-remove');
const naira = '₦';



//this is the code for when the mouse hovers or moves out of the productName and its price
productPriceHolder.forEach((productPriceHolder) => {
    
    productPriceHolder.addEventListener('mouseover', function onHover() {
       var productPrice = productPriceHolder.children[0];
       var productName = productPriceHolder.children[1];

       productPrice.style.color = "white";
       productName.style.color = "white";
    })

    productPriceHolder.addEventListener('mouseout', function onMouseOut() {
       var productPrice = productPriceHolder.children[0];
       var productName = productPriceHolder.children[1];

       productPrice.style.color = "transparent";
       productName.style.color = "transparent";
    })


});

//this code loops through each button and performs the function inside it onclick of the button.
btnCart.forEach((btnCart) => {
    btnCart.addEventListener('click', function addProduct() { 

        if(btnCart.classList == "btn-cart"){

        btnCart.classList = "btn-cart clicked";
        
            
        var itemName = btnCart.previousElementSibling.innerText;
        var price = btnCart.parentElement.firstElementChild.children[1].innerText;
        
        for(let i in productItems){
            if(itemName == productItems[i]){ //compares item with the array to check which object conforms with the item.
                
                //modifies the selected button.
                btnCart.style.backgroundColor = "#FFCD9E";
                btnCart.style.border = "2px solid #FFCD9E";
                btnCart.innerText = "REMOVE FROM CART";
                
                //increments count and places the value in cartItemNo
                count++;
                cartItemNo.innerText = count;
                
                
                //creates a table row in which all the table data will be appended to and appends it to the table element
                const tableRow = document.createElement('tr');
                const name = itemName.split(" ").join("-");
                tableRow.classList.add(name);
                table.appendChild(tableRow);

                //creates a tableData elements for serial number
                const number = table.querySelectorAll("tr").length - 1
                const index = document.createElement('td');
                index.id = "serial";
                index.classList.add('serialNo');
                index.innerText = number;
                tableRow.appendChild(index);

                //creates a tableData elements for names of items/products
                const tableItem = document.createElement('td');
                tableItem.innerText = itemName;
                tableItem.id = 'itemName';
                tableRow.appendChild(tableItem);

                //creates a tableData elements for the prices of products
                const tablePrice = document.createElement('td');
                tablePrice.dataset.price = price;
                tablePrice.classList.add("cart-items-price");
                tablePrice.innerText = price;
                tableRow.appendChild(tablePrice); 

                //creates a table-data for the increment and decrement buttons
                const tableQuantity = document.createElement('td');

                //create the buttons and element to be appended to the table-data

                 //creates decrement button
                const btnDecrease = document.createElement('button');
                btnDecrease.setAttribute("id","decrease");
                btnDecrease.classList.add("btn-decrease");
                btnDecrease.innerText = "-";
                tableQuantity.appendChild(btnDecrease);
                
                //creates span element
                const spanQuantity = document.createElement('span'); 
                spanQuantity.classList.add("quantityNum");
                spanQuantity.id = 'itemQuantity';
                spanQuantity.innerText = "1";
                tableQuantity.appendChild(spanQuantity);

                 //creates increment button
                const btnIncrease = document.createElement('button');
                btnIncrease.setAttribute("id", "increase");
                btnIncrease.classList.add("btn-increase");
                btnIncrease.innerText = "+";
                tableQuantity.appendChild(btnIncrease);
               
                //finally appends the table-data( called tableQuantity) to the tableRow
                tableRow.appendChild(tableQuantity);

                //creates a table data for the remove button
                const tableDelete = document.createElement('td');
               
                //creates the remove button and appends it to tableDelete
                const btnRemove = document.createElement('button');
                btnRemove.setAttribute("id", name);
                btnRemove.classList.add("btn-remove");
                btnRemove.innerText = "Remove";
                tableDelete.appendChild(btnRemove);
               
                //finally, it appends tableDelete to tableRow
                tableRow.appendChild(tableDelete);
                
                priceSummary();

                
                tableRow.addEventListener('click', function itemRemove(e) {
                    if (e.target && e.target.classList.contains("btn-remove")) {
                        e.target.parentElement.parentElement.remove();
                        
                        // modifying the class list
                        btnCart.classList = "btn-cart";

                        // updating the count
                        count--;
                        cartItemNo.innerText = count;

                        //modifies the selected button.
                        btnCart.style.backgroundColor = "#FF9A3D";
                        btnCart.style.border = "2px solid #FF9A3D";
                        btnCart.innerText = "ADD TO CART";
                        
                        order();
                        
                        priceSummary();
                        
                    }
               
                })

                //uses the increment and decrementbutton called increase & decrease respectively to increment/decrement quantity of item by one and multiplies it the quantity of item by the price of the item
                var increase = document.getElementsByClassName('btn-increase');
                var decrease = document.getElementsByClassName('btn-decrease');
                
                for(let decreaseBtn of decrease){
                    decreaseBtn.onclick = function decrement(){
                        
                        //looks for the quantity of the item from the decrement button's point of view
                        let quantityInput = decreaseBtn.nextElementSibling;
                        
                        //looks for the price of the item from the decrement button's point of view using a user defined class called dataset and removes the '#' from the price in order to be ble to perform integer operations on it
                        let quantityPrice = decreaseBtn.parentElement.previousElementSibling.dataset.price.split('₦').join('');
                        
                        //decrements the value for the quantity of the item by 1 
                        quantityInput.innerText =  quantityInput.innerText - 1;

                        //creates a new variable to store the multiplication of the quantity of the item and the quantity's price which is then concatenated with the hash string 
                        let finalQuantityPrice = naira + (quantityPrice * quantityInput.innerText);

                        //finally stores the value of finalQuantityPrice to the the quantity's Price shown on the webpage
                        decreaseBtn.parentElement.previousElementSibling.innerText = finalQuantityPrice;

                        priceSummary();
                        

                        if (quantityInput.innerText < 1) {

                            quantityInput.innerText = 1;
                            
                            decreaseBtn.parentElement.
                            previousElementSibling.innerText = naira +  quantityPrice;

                            priceSummary();
                            
                            alert('You cannot have less than 1 item. If you wish to remove the item, click remove.');
                             
                        
                        }
                    }
                }

                for(let increaseBtn of increase){
                    increaseBtn.onclick = function increment(){

                        //looks for the quantity of the item from the increment button's point of view
                        let quantityInput = increaseBtn.previousElementSibling;

                        //looks for the price of the item from the increment button's point of view using a user defined class called dataset and removes the '#' from the price in order to be ble to perform integer operations on it
                        let quantityPrice = increaseBtn.parentElement.previousElementSibling.dataset.price.split('₦').join('');
                        
                        //increments the value for the quantity of the item by 1
                        quantityInput.innerText =  parseInt(quantityInput.innerText, 10) + 1;

                        //creates a new variable to store the multiplication of the quantity of the item and the quantity's price which is then concatenated with the hash string
                        let finalQuantityPrice = naira + (quantityPrice * quantityInput.innerText);

                        //finally stores the value of finalQuantityPrice to the the quantity's Price shown on the webpage
                        increaseBtn.parentElement.previousElementSibling.innerText = finalQuantityPrice;

                        priceSummary();
                    }
                }
                
                

            }
        }

        } else{

            //the code below removes items from the cart.

            // modifying the class list
            btnCart.classList = "btn-cart";

            var itemName = btnCart.previousElementSibling.innerText;

            // computing the class name from the product name
            const finder = itemName.split(" ").join("-");
            let product = document.querySelector("."+finder);
            product.remove();

            // updating the count
            count--;
            cartItemNo.innerText = count;

            //modifies the selected button.
            btnCart.style.backgroundColor = "#FF9A3D";
            btnCart.style.border = "2px solid #FF9A3D";
            btnCart.innerText = "ADD TO CART";
            
            order();

            priceSummary();
            
            
        }

       
        
        
        

    })

    
});


// this function automatically reassigns serial numbers once an item and its serial number is deleted from the list of cart items
function order(){

// uses the table to get the length of the table rows present in the table and minus it by 1
 const number = table.querySelectorAll("tr").length - 1;
 
 // this gets the whole table including the one that stores table head 
 const products =  table.querySelectorAll("tr");
 
 // this if statement checks if the length of the table is greater than 0. This is done to eliminate the the inclusion of the table row containing the table head as we do not want to modify it.
 if (number > 0){

     for(let i=1; i < number+1; i++ ){
        products[i].querySelector("#serial").innerText = i;
     }
 }

 }


//validates name input

var validationName = false;
function nameValidation() {
    var nameInput = document.getElementById('nameInput');
    var nameError = document.getElementById('nameError');

    if (nameInput.value == "") {
        nameInput.style.borderColor = "red";
        nameError.style.color = "red";
        nameError.innerText = "Please enter a name"; 
    }else{
        nameInput.style.borderColor = 'green';
        nameError.innerText = "";
        validationName = true;
    }
}

//validates email input

var validationMail = false;
function emailValidation() {
    var emailInput = document.getElementById('emailInput');
    var emailError = document.getElementById('emailError');

    if(emailInput.value == "") {
        emailInput.style.borderColor = 'red';
        emailError.style.color = 'red';
        emailError.innerText = "Please enter an email";
    } else if (!emailInput.value.includes("@")){
        emailInput.style.borderColor = 'red';
        emailError.style.color = 'red';
        emailError.innerText = "Invalid email";

    } else {
        emailInput.style.borderColor = 'green';
        emailError.innerText = "";
        validationMail = true;
    }

}

//validates number input

var validationNumber = false;
function numberValidation() {
    var numberInput = document.getElementById('numberInput');
    var numberError = document.getElementById('numberError');

    if(numberInput.value == "") {
        numberInput.style.borderColor = 'red';
        numberError.style.color = 'red';
        numberError.innerText = "Please input phone number";
    }else if(isNaN(numberInput.value)) {
        numberInput.style.borderColor = 'red';
        numberError.style.color = 'red';
        numberError.innerText = "Phone number can only be numbers";
    }else if(numberInput.value.length < 11) {
        numberInput.style.borderColor = 'red';
        numberError.style.color = 'red';
        numberError.innerText = "Phone number cannot be less than 11 characters";
    }else if (numberInput.value.length > 11) {
        numberInput.style.borderColor = 'red';
        numberError.style.color = 'red';
        numberError.innerText = "Phone number cannot be more than 11 characters";
    }else{
        numberInput.style.borderColor = 'green';
        numberError.innerText = "";
        validationNumber = true;
    }

}

//shows the total price of all the items in the cart
function priceSummary() {
    
    var pricesContainer = [];
    var priceSummary = document.getElementById('priceSummary');
    var cartItemsPrices = document.getElementsByClassName('cart-items-price');

    for (let prices of cartItemsPrices){
        pricesContainer.push(parseInt(prices.innerHTML.split('₦').join(''), 10));
    }

    var sum = 0;
    for (let i = 0; i < pricesContainer.length; i++) {
        sum = sum + pricesContainer[i];

    }

    priceSummary.innerText = naira + sum;
    priceSummary.value = sum;  

}

//shows the cart items when the function is called through the onclick event in the html section
function showCart() {
    var shoppingCart = document.getElementById('shopping-cart');
    shoppingCart.style.visibility = "visible";
    opacity();
}

//hides the cart items when the function is called and goes back to the main page
function continueShopping() {

    var shoppingCart = document.getElementById('shopping-cart');
    shoppingCart.style.visibility = "hidden";
    NoOpacity();
    

}


function payWithPaystack() {
  
    let handler = PaystackPop.setup({
  
      key: 'pk_test_0035e2dcc33986e3eff3e28107373aa21bf2f4e0', // Replace with your public key
  
      email: document.getElementById("emailInput").value,
  
      amount: document.getElementById("priceSummary").value * 100,
  
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
  
      // label: "Optional string that replaces customer email"
  
      onClose: function(){
  
        alert('Window closed.');
  
      },
  
      callback: function(response){        
          showSummary();
      }
  
    });
  
    handler.openIframe();
  
}


function showSummary() {
    
    //holds the section for the crt summry
    var summarySection = document.getElementById('summarySection');

    //holds the users input to be used later on
    var nameInput = document.getElementById('nameInput');
    
    //holds the nme of sutomer that is to appear in the summary
    var customerName = document.getElementById('customerName');
    
    //holds the table from the cart items selected section
    const table = document.getElementById('table');
    
    //holds the table for the cart summary section
    var showCartTable = document.getElementById('showCartTable');  
    
    //used to get the length of the table rows minus the table row contining the table headings
    var number = table.querySelectorAll("tr").length - 1;
    
    //to get the whole table rows in order to loop through each one 
    var findTableRows = table.querySelectorAll('tr');
    
    
    if (number > 0){
        for(let i=1; i < number+1; i++ ){
            
            const tableRow = document.createElement('tr');
            tableRow.classList.add(i);
            showCartTable.appendChild(tableRow);
            
            const index = document.createElement('td');
            index.innerText = findTableRows[i].querySelector("#serial").innerText;
            tableRow.appendChild(index);
            
            const item = document.createElement('td');
            item.innerText = findTableRows[i].querySelector('#itemName').innerText;
            tableRow.appendChild(item);
            
            const quantity = document.createElement('td');
            quantity.innerText = findTableRows[i].querySelector('#itemQuantity').innerText;
            tableRow.appendChild(quantity);
        }
    }
    
    
    customerName.innerText = nameInput.value;
    summarySection.style.visibility = 'visible';
    opacity();
    
    //hides the section cart items selected
    var shoppingCart = document.getElementById('shopping-cart');
    shoppingCart.style.visibility = "hidden";

    var btnShowCart = document.getElementById('btnShowCart');
    btnShowCart.addEventListener('click', function () {
       
        summarySection.style.visibility = "hidden";
        NoOpacity();
        
        for (let i = 1; i < showCartTable.children.length; i++) {
            showCartTable.removeChild(showCartTable.children[i]);   
        
        }

    })
   
}

function opacity() {
    const nav = document.getElementById('nav');
    const intro = document.getElementById('intro');
    const about = document.getElementById('about');
    const shop = document.getElementById('shop');
    const footer = document.getElementById('footer');

    nav.style.opacity = '0.5';
    intro.style.opacity = '0.5';
    about.style.opacity = '0.5';
    shop.style.opacity = '0.5';
    footer.style.opacity = '0.5';

}

function NoOpacity() {
    const nav = document.getElementById('nav');
    const intro = document.getElementById('intro');
    const about = document.getElementById('about');
    const shop = document.getElementById('shop');
    const footer = document.getElementById('footer');

    nav.style.opacity = '1';
    intro.style.opacity = '1';
    about.style.opacity = '1';
    shop.style.opacity = '1';
    footer.style.opacity = '1';

}

