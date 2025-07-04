import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();


document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));


document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status)
    myCheckout.checkout();
  });
/*
document.forms['orderForm'].addEventListener('submit', (form) => {
    form.preventDefault()
    form.target
    myCheckout.checkout();
});*/