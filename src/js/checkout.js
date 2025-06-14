import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();


document.querySelector("#zip-code").addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

/*
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    myCheckout.checkout();
});*/

document.forms['orderForm'].addEventListener('submit', (form) => {
    form.preventDefault()
    form.target
    myCheckout.checkout();
});