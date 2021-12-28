import { menuItems } from "./app.js"

let cartJs = []

createMenuList()
const buttonsInCart = document.querySelectorAll(".in-cart")
const buttonsAdd = document.querySelectorAll(".add")
const menuJS = document.querySelector(".menu-listUL")
const cartList = document.querySelector(".cart-summary")
const content = document.querySelector(".content")
const subTotalMenu = document.querySelector(".subtotal")
const buttonInCart = "<button class=\"in-cart\" ><img src=\"images/check.svg\" alt=\"Check\">In Cart</button>"
// const increase = document.querySelector(".increase")

// buttonsInCart[0].addEventListener("click", btnCartAction)





menuJS.addEventListener("click", btnCartAction)

function btnCartAction(e){
    if(e.target.tagName !== "button".toUpperCase()){
        return
    }
    const selectedID = Number(e.target.dataset.id)
    console.log(e.target, e.currentTarget)
    console.log(e.target.dataset.id)
    const isIncludes = cartJs.some(item => item.id === selectedID)
    if(isIncludes){
        return;
    }
    menuItems.forEach((item) => {
        if(item.id === selectedID){
            cartJs.push({...item, count: item.count + 1})
            console.log(cartJs)
        }
    })
    const parent = e.target.parentNode
    e.target.remove()
    parent.insertAdjacentHTML("beforeend" ,buttonInCart)
    createCartList()
    createTotal(cartJs)


}

export const createCartList =  function (){

    const cartList = document.querySelector(".cart-summary");

    if(cartList){
        console.log("TRUE")
    }
    if(cartJs){
        console.log(cartJs, "cartJs")
    }
    const markup = cartJs.map(({name, image, price, alt, count, id, sumPrice}) =>

        `
    <li>
          <div class="plate">
            <img src="images/${image}" alt="${alt}" class="plate" />
            <div class="quantity">${count}</div>
          </div>
          <div class="content">
            <p class="menu-item">${name}</p>
            <p class="price">${price}</p>
          </div>
          <div class="quantity__wrapper">
            <button class="decrease" data-id=${id}>
              <img data-id=${id} src="images/chevron.svg" />
            </button>
            <div class="quantity">${count}</div>
            <button class="increase" data-id=${id}>
              <img data-id=${id} src="images/chevron.svg" />
            </button>
          </div>
          <div class="subtotal">
            ${sumPrice}
          </div>
        </li>`)
        .join("");

    cartList.innerHTML = markup;
    const decrease = document.querySelectorAll(".decrease")
    const increase = document.querySelectorAll(".increase")
    const quantity = document.querySelectorAll(".quantity")

    decrease.forEach(button => button.addEventListener("click", decreaseJS))
    increase.forEach(button => button.addEventListener("click", increaseJS))
}
 function createMenuList (){
    const menuJS = document.querySelector(".menu-listUL")
    const markup = menuItems
        .map(({name, image, price, alt, count, id}) => `
    <li>
        <div class="plate">
            <img src="images/${image}" alt=${alt} class="plate"/>
        </div>
        <div class="content">
            <p class="menu-item">${name}</p>
            <p class="price">${price}</p>
            <button class="add " data-id=${id}>Add to Cart</button>

        </div>
    </li>`)
        .join("");
    menuJS.insertAdjacentHTML("afterbegin", markup);
}




function increaseJS(e) {
    const idTarget = e.target.dataset.id;

    const countInc = cartJs.map((item) => {
        if(+item.id === +idTarget) {
            return {...item, id: item.id, count: item.count + 1, price: item.price, sumPrice: item.sumPrice + item.price}
        }
        return item
    })
    cartJs = countInc
    createCartList(cartJs)

}
function decreaseJS(e) {
    const idTarget = e.target.dataset.id;
    const result = [];
    cartJs.forEach(item => {
        if(+item.id === +idTarget ){
            if(item.count > 1){
                result.push({...item, count: item.count - 1, sumPrice: item.sumPrice - item.price})
            }
        }
        result.push(item)
    })

    const countInc = cartJs.map((item) => {
        if(+item.id === +idTarget ){
            if(item.count > 1){
                return {...item, id: item.id, count: item.count - 1, sumPrice: item.sumPrice - item.price}
            }
            return null
        }
        return item
    })
    cartJs = countInc.filter(item => item)
    createCartList(cartJs)

}


function createTotal(cart) {
    const result = cart.reduce((acc, {price, count}) => {
        const summ = price * count;
        const subTaxS = summ * 0.2;
        const subTotalS = summ + subTaxS;

        const subTax = Number(subTaxS.toFixed(2))
        const subTotal = Number(subTotalS.toFixed(2))

        return {
            ...acc,
            subtotal: acc.subtotal + summ,
            tax: acc.tax + subTax,
            total: acc.total + subTotal,
        }
    },{subtotal:0, tax:0, total:0,})



    const subtotalMenu = document.querySelector(".line-item .subtotal")
    const taxMenu = document.querySelector(".tax")
    const totalMenu = document.querySelector(".line-item .total")
    taxMenu.textContent = `$${result.tax}`
    subtotalMenu.textContent = `$${result.subtotal}`
    totalMenu.textContent = `$${result.total}`
    console.log(taxMenu.textContent)

    // `<div class="line-item">
    //       <div class="label">Subtotal:</div>
    //       <div class="amount price subtotal">$10.80</div>
    //     </div>
    //     <div class="line-item">
    //       <div class="label">Tax:</div>
    //       <div class="amount price tax">$1.05</div>
    //     </div>
    //     <div class="line-item total">
    //       <div class="label">Total:</div>
    //       <div class="amount price total">$11.85</div>
    //     </div>`

    console.log(result)
}