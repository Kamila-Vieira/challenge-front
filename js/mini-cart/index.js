const miniCartContainer = document.querySelector(".mini-cart-container");
let cartProducts;

async function fetchProducts() {
  let response = await fetch("../../products.json");
  cartProducts = await response
    .json()
    .then(async (data) => {
      const { cart } = await data;
      return cart.item;
    })
    .catch((err) => console.log(err));
  createProductsCartContainer(cartProducts);
}
fetchProducts();

function createProductsCartContainer(products) {
  let productsContainer = `<div class="products-container">`;
  let productContent;
  products.forEach((product) => {
    const { productId, bestPriceFormated, name, image, quantity } = product;
    productContent = `<div class="cart-product" id="${productId}">
      <img src="${image}" alt="${name}" />
      <div class="product-info">
    </div>`;
    productsContainer += productContent;
  });
  productsContainer += "</div>";
}
