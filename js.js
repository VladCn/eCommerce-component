import { createMenuList } from "./template.js"
createMenuList()
const buttonsInCart = document.querySelectorAll(".in-cart")
const buttonsAdd = document.querySelectorAll(".add")
const menuJS = document.querySelector(".menu-listUL")
console.log(menuJS)
// buttonsInCart[0].addEventListener("click", btnCartAction)



const cartJs = []

menuJS.addEventListener("click", btnCartAction)

function btnCartAction(e){
    if(e.target.tagName !== "button".toUpperCase()){
        return
    }
    console.log(e.target, e.currentTarget)

}