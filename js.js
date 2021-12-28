import { menuItems } from "./app.js"

let cartJs = []

createMenuList()
const menuJS = document.querySelector(".menu-listUL")
const setButtonInCart = (dataId) => (`<button class="in-cart" data-id=${dataId} ><img src="images/check.svg" alt="Check">In Cart</button>`)
const setButtonAdd = (dataId) => (`<button class="add " data-id=${dataId}>Add to Cart</button>`)
const setFixedPrice = (price) => Number((price).toFixed(2));




menuJS.addEventListener("click", btnCartAction)

function btnCartAction(e){
    if(e.target.tagName !== "button".toUpperCase()){
        return
    }
    const selectedID = Number(e.target.dataset.id)
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
    parent.insertAdjacentHTML("beforeend" ,setButtonInCart(selectedID) )
    createCartList()
    createTotal(cartJs)


}

export const createCartList = function (){
    const cartList = document.querySelector(".cart-summary");

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
            return {
                ...item,
                id: item.id,
                count: item.count + 1,
                price: item.price,
                sumPrice: setFixedPrice(item.sumPrice + item.price)}
        }
        return item
    })
    cartJs = countInc
    createCartList(cartJs)
    createTotal(cartJs)

}
function decreaseJS(e) {
    const inCartButtons = document.querySelectorAll(".in-cart")
    const idTarget = Number(e.target.dataset.id);
    const result = [];

    cartJs.forEach(item => {
        if(item.id === idTarget ){
            if(item.count > 1){
                result.push({...item, count: item.count - 1, sumPrice: setFixedPrice(item.sumPrice - item.price)})
            }
        }
        result.push(item)
    })

    const countInc = cartJs.map((item) => {
        if(item.id === idTarget ){
            if(item.count > 1){
                return {...item, id: item.id, count: item.count - 1, sumPrice: setFixedPrice(item.sumPrice - item.price)}
            }
            Array.from(inCartButtons).map(item => {
                if (Number(item.dataset.id) === idTarget) {
                    const parent = item.parentNode;
                    item.remove()
                    parent.insertAdjacentHTML("beforeend", setButtonAdd(idTarget));
                }
            })
            return null
        }
        return item
    })
    cartJs = countInc.filter(item => item)
    createCartList(cartJs)
    createTotal(cartJs)

}


function createTotal(cart) {
    const result = cart.reduce((acc, {price, count}) => {
        const summ = price * count;
        const subTaxS = summ * 0.2;
        const subTotalS = summ + subTaxS;

        const subTax = setFixedPrice(subTaxS)
        const subTotal = setFixedPrice(subTotalS)

        return {
            ...acc,
            subtotal: setFixedPrice(acc.subtotal + summ),
            tax: setFixedPrice(acc.tax + subTax),
            total: setFixedPrice(acc.total + subTotal),
        }
    },{subtotal:0, tax:0, total:0,})



    const subtotalMenu = document.querySelector(".line-item .subtotal")
    const taxMenu = document.querySelector(".tax")
    const totalMenu = document.querySelector(".line-item .total")
    taxMenu.textContent = `$${result.tax}`
    subtotalMenu.textContent = `$${result.subtotal}`
    totalMenu.textContent = `$${result.total}`
}