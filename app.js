/* app.js */
const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal');
const totalItemsInCart = document.querySelector('.total-items-in-cart')

// make a children
function makeAChildren(){
    products.forEach((product) => {
        productsEl.innerHTML += `
        <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="${product.name}">
            </div>
            <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                    ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
        `

    })
}
makeAChildren()
// cart item
let cart = JSON.parse(localStorage.getItem("CART")) || [] ;
update()
// addToCart
function addToCart(id){
    //check if prodcut already exist in cart
    if(cart.some((item) => item.id === id)){
        changeNumber("plus", id)
    }else{
    const items = products.find((product) => product.id === id)
    cart.push({
        ...items,
        numberOfUnits : 1,
    })
}
update()
}
// update
function update(){
    subTotal()
    cartItem()

    localStorage.setItem("CART" ,JSON.stringify( cart))
}
   // subTotal()
   function subTotal(){
    let total = 0 ; 
    let items = 0;
    cart.forEach((item) => {
        total = total + (item.price * item.numberOfUnits);
        items = items + item.numberOfUnits ;
    })
    
    subtotalEl.innerHTML = ` Subtotal ${items} items : $${total.toFixed(2)} `;
    totalItemsInCart.innerHTML = items ;
    
   
   }

function cartItem(){
cartItemsEl.innerHTML = "" ;
cart.forEach((item) =>{
    cartItemsEl.innerHTML += `
    <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick = 'changeNumber("minus" , ${item.id})'>-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick = 'changeNumber("plus" , ${item.id})'>+</div>           
            </div>
        </div>
    `
})
}
function changeNumber(action , id){
   cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits-- ;
            }else if(action === "plus" && numberOfUnits <= item.instock){
                numberOfUnits++ ;
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    });
    update()
} 
// removeItemFromCart
function removeItemFromCart(id){
   cart = cart.filter((item) => item.id !== id);
   update()
}
