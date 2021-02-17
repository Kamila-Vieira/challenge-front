async function fetchProducts() {
  let response = await fetch("../../products.json");
  let cartProducts = await response
    .json()
    .then(async (data) => {
      const { cart } = await data;
      return cart.item;
    })
    .catch((err) => console.log(err));
  console.log(cartProducts);
  createCartProducts(cartProducts);
}
fetchProducts();

function createCartProducts(products) {
  let productsPrice = [];
  let productsContainer = document.querySelector(".products-container");
  products.forEach((product) => {
    const { productId, bestPriceFormated, name, image, quantity } = product;
    productsPrice.push(bestPriceFormated);
    let productContent = `<div class="cart-product" id="${productId}">
      <img src="${image}" alt="${name}" />
      <div class="product-info">
        <h3 class="product-name">${name}</h3>
        <div class="product-buy-info">
          <p class="product-quantity">Qtd.:${quantity}</p>
          <p class="product-price">${bestPriceFormated}</p>
        </div>
      </div>
    </div>`;
    productsContainer.insertAdjacentHTML("afterbegin", productContent);
  });
  //countTotalProductsPrice(productsPrice);
}

/* function countTotalProductsPrice(prices) {
  prices.map();
} */
