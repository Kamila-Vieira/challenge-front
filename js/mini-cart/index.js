const miniCart = document.querySelector(".mini-cart");
const productsContainer = document.querySelector(".products-content");
const totalPriceContainer = document.querySelector(
  ".products-total-price span"
);
async function fetchProducts() {
  const URL_CART = "./products.json";
  const response = await fetch(URL_CART);
  let cartProducts = [];
  cartProducts = await response
    .json()
    .then(async (data) => {
      const { cart } = await data;
      return cart.item;
    })
    .catch((err) => []);
  createCartProducts(cartProducts);
}
fetchProducts();
function createCartProducts(products) {
  const productsPrice = [];
  if (products.length > 0) {
    products.forEach((product) => {
      const { productId, bestPriceFormated, name, image, quantity } = product;
      productsPrice.push({ quantity, bestPriceFormated });
      const productContent = `<div class="cart-product" id="${productId}">
        <img src="${image}" alt="${name}" />
        <div class="product-info">
          <h3 class="product-name">${name}</h3>
          <div class="product-buy-info">
            <p class="product-quantity">Qtd.: ${quantity}</p>
            <p class="product-price">${formatPrice(
              calculateProductPrice(bestPriceFormated, quantity)
            )}</p>
          </div>
        </div>
      </div>`;
      productsContainer.insertAdjacentHTML("afterbegin", productContent);
    });
  } else {
    const voidCart = `<div class="void-cart"">
    <h3>Carrinho vazio!</h3>
    </div>`;
    productsContainer.innerHTML = voidCart;
  }
  setTotalProductsPrice(productsPrice);
}
function setTotalProductsPrice(prices) {
  const totalPrice = prices
    .map((price) => {
      const { quantity, bestPriceFormated } = price;
      return calculateProductPrice(bestPriceFormated, quantity);
    })
    .reduce((acc, cur) => acc + cur, 0);
  totalPriceContainer.innerHTML = formatPrice(totalPrice);
}
function calculateProductPrice(price, quantity) {
  return (
    quantity * parseFloat(price.replace(/[(R$ ).]/g, "").replace(",", "."))
  );
}
function formatPrice(price) {
  return price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
function toggleMiniCart() {
  document
    .querySelector(".products-container")
    .classList.toggle("show-mini-cart");
}
miniCart.addEventListener("click", toggleMiniCart);
