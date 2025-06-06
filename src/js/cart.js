import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachCartHandlers();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
  <button class="remove-item" data-id="${item.Id}" aria-label="remove item" >×</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}"/>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="divider>
  <p class="cart-card__quantity">
    <button class="qty-minus" aria-label="decrease quantity">-</button>
    <input type="number" class="qty-input" min="1" value="${item.qty}">
    <button class="qty-plus" aria-label="increase quantity">+</button>
  </p>
  </div>

  <p class="cart-card__price">$${(item.FinalPrice * item.qty).toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();

function attachCartHandlers() {
  document.querySelectorAll(".qty-plus").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn, +1))
  );

  document.querySelectorAll(".qty-minus").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn, -1))
  );

  document.querySelectorAll(".qty-input").forEach(inp =>
    inp.addEventListener("change", () => setQtyFromInput(inp))
  );

  document.querySelectorAll(".remove-item").forEach(btn =>
    btn.addEventListener("click", () => removeItem(btn.dataset.id))
  );
}

function changeQty(btn, delta) {
  const li   = btn.closest("li");
  const id   = li.dataset.id;
  updateQty(id, q => Math.max(1, q + delta));
}

function setQtyFromInput(inp) {
  const li  = inp.closest("li");
  const id  = li.dataset.id;
  const val = parseInt(inp.value) || 1;
  updateQty(id, () => Math.max(1, val));
}

function updateQty(id, newQtyFn) {
  const cart = getLocalStorage("so-cart") || [];
  const item = cart.find(p => p.Id === id);
  if (!item) return;
  item.qty = newQtyFn(item.qty || 1);
  setLocalStorage("so-cart", cart);
  renderCartContents();
}

function removeItem(id) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter(item => item.Id !== id);
  setLocalStorage("so-cart", cart);
  renderCartContents();
}