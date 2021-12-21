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
            <button class="add" data-id=${id}>Add to Cart</button>
        </div>
    </li>`)
        .join("");
    menuJS.insertAdjacentHTML("afterbegin", markup);
}
