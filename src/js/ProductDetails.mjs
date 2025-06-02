import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("product from dataSource:", this.product);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  
addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];

  // if already  in cart add 1
  const index = cartItems.findIndex(i => i.Id === this.product.Id);
  if (index > -1) {
    cartItems[index].qty = (cartItems[index].qty || 1) + 1;
  } else {
    cartItems.push({ ...this.product, qty: 1 });
  }

  setLocalStorage("so-cart", cartItems);
}
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  if (!product) return;

  const brandName     = product.Brand?.Name ?? "Unknown Brand";
  const titleNoBrand  = product.NameWithoutBrand ?? "Untitled Product";
  const imageUrl      = product.Image ?? "/images/placeholder.png";
  const finalPrice    = product.FinalPrice != null ? `$${product.FinalPrice}` : "Price Unavailable";
  const colorName     = product.Colors?.[0]?.ColorName ?? "N/A";
  const description   = product.DescriptionHtmlSimple ?? "";


  const h2 = document.querySelector("h2");
  if (h2) h2.textContent = brandName;

  const h3 = document.querySelector("h3");
  if (h3) h3.textContent = titleNoBrand;

  const productImage = document.getElementById("productImage");
  if (productImage) {
    productImage.src = imageUrl;
    productImage.alt = `${titleNoBrand} by ${brandName}`;
  }

  const productPrice = document.getElementById("productPrice");
  if (productPrice) productPrice.textContent = finalPrice;

  const productColor = document.getElementById("productColor");
  if (productColor) productColor.textContent = colorName;

  const productDesc = document.getElementById("productDesc");
  if (productDesc) productDesc.innerHTML = description;

  const addToCart = document.getElementById("addToCart");
  if (addToCart) addToCart.dataset.id = product.Id;
}