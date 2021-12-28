import { menuItems } from "./app.js"



export const createMenuList = function (){
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
<!--            <button class="in-cart">-->
<!--    <img src="images/check.svg" alt="Check">-->
<!--        In Cart-->
<!--</button>-->
        </div>
    </li>`)
        .join("");
    menuJS.insertAdjacentHTML("afterbegin", markup);
}


export const createCartList =  function (list){

    const cartList = document.querySelector(".cart-summary");

    if(cartList){
        console.log("TRUE")
    }
    if(list){
        console.log("list")
    }
const markup = list.map(({name, image, price, alt, count, id, sumPrice}) =>

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

    console.log(list)
    cartList.innerHTML = markup;
    const decrease = document.querySelectorAll(".decrease")
    const increase = document.querySelectorAll(".increase")
    const quantity = document.querySelectorAll(".quantity")

    decrease.forEach(button => button.addEventListener("click", (e) => decreaseJS(e, list, quantity)))
    increase.forEach(button => button.addEventListener("click", (e) => increaseJS(e, list, quantity)))



}

function increaseJS(e, list, quantity) {
    // const quantity = document.querySelector(".quantity")
    console.log("iiiiiiiiiii")
    console.log(e.target.dataset.id)
    const idTarget = e.target.dataset.id;
    console.log(list)
    const countInc = list.map((item) => {
        if(+item.id === +idTarget) {
            console.log(item.price)
            return {...item, id: item.id, count: item.count += 1, price: item.price, sumPrice: item.sumPrice += item.price}
        }
    })
    createCartList(list)
    console.log(countInc)

    // quantity.innerHTML = countInc[idTarget].count;
}
function decreaseJS(e, list, quantity) {
    console.log("ddddddddd")
    // const quantity = document.querySelector(".quantity")
    console.log("iiiiiiiiiii")
    console.log(e.target.dataset.id)
    const idTarget = e.target.dataset.id;
    console.log(list)
    const countInc = list.map((item) => {
        if(+item.id === +idTarget) {
            return {...item, id: item.id, count: item.count -= 1, sumPrice: item.price -= item.price}
        }
    })
    createCartList(list)
    console.log(countInc)
}


export const createTotal = (cart) => {
    const result = cart.reduce((acc, {price, count}) => {
        console.log(price, count)
    const summ = price * count;
    const subTaxS = summ * 0.2;
    const subTotalS = summ + subTaxS;

    const subTax = Number(subTaxS.toFixed(2))
    const subTotal = Number(subTotalS.toFixed(2))
        console.log(subTax)

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

// export function increaseJS() {
//     const quantity = document.querySelector(".quantity")
//     console.log("iiiiiiiiiii")
//     console.log(quantity.textContent += 1)
// }
// export function decreaseJS() {
//     console.log("ddddddddd")
// }