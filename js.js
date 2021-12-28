import {createCartList, createMenuList, createTotal,} from "./template.js"
import { menuItems } from "./app.js"

createMenuList()
const buttonsInCart = document.querySelectorAll(".in-cart")
const buttonsAdd = document.querySelectorAll(".add")
const menuJS = document.querySelector(".menu-listUL")
const cartList = document.querySelector(".cart-summary")
const content = document.querySelector(".content")
const subTotalMenu = document.querySelector(".subtotal")

// const increase = document.querySelector(".increase")
console.log(menuJS)
// buttonsInCart[0].addEventListener("click", btnCartAction)



const cartJs = []

menuJS.addEventListener("click", btnCartAction)

function btnCartAction(e){
    if(e.target.tagName !== "button".toUpperCase()){
        return
    }
    const selectedID = e.target.dataset.id
    console.log(e.target, e.currentTarget)
    console.log(e.target.dataset.id)
    menuItems.forEach((item) => {
        if(item.id === Number(selectedID)){
            cartJs.push({...item, count: item.count + 1})
            console.log("12234")
        }
    })

    createCartList(cartJs)
    createTotal(cartJs)


}




// increase.addEventListener("click", increaseJS)