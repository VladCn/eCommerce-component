import { menuItems } from "./app.js"
import { cartJs as list } from "./js"



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




export function increaseJS(e, list) {
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
    list = countInc
    createCartList(list)
    console.log(list, 'list')

    // quantity.innerHTML = countInc[idTarget].count;
}
export function decreaseJS(e, list, quantity, cartList) {
    console.log("ddddddddd")

    console.log("iiiiiiiiiii")
    console.log(e.target.dataset.id)
    const idTarget = e.target.dataset.id;
    console.log(list)
    const countInc = list.filter((item) => {
        if(+item.id === +idTarget ){
            if(item.count > 1){
                return {...item, id: item.id, count: item.count -= 1, sumPrice: item.sumPrice -= item.price}
            }
            return false
        }
    })
    list = countInc
    createCartList(list)
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