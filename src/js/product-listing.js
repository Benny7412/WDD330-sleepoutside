import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
const topProduct = document.querySelector('.highlight')

// It's surprisingly difficult to set the first character of a string to uppercase in javascript??
if (category && category.length > 0) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    topProduct.textContent = formattedCategory;
} else {
    topProduct.textContent = category;
}

myList.init();