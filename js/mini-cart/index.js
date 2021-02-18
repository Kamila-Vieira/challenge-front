async function fetchProducts() {
  let URL_CART = "../../products.json";
  let response = await fetch(URL_CART);
  let cartProducts = [];
  cartProducts = await response
    .json()
    .then(async (data) => {
      const { cart } = await data;
      return cart.item;
    })
    .catch((err) => []);
  console.log(cartProducts);
  createCartProducts(cartProducts);
}
fetchProducts();

function createCartProducts(products) {
  let productsPrice = [];
  let productsContainer = document.querySelector(".products-content");
  if (products.length > 0) {
    products.forEach((product) => {
      const { productId, bestPriceFormated, name, image, quantity } = product;
      productsPrice.push(bestPriceFormated);
      let productContent = `<div class="cart-product" id="${productId}">
        <img src="${image}" alt="${name}" />
        <div class="product-info">
          <h3 class="product-name">${name}</h3>
          <div class="product-buy-info">
            <p class="product-quantity">Qtd.: ${quantity}</p>
            <p class="product-price">${bestPriceFormated}</p>
          </div>
        </div>
      </div>`;
      productsContainer.insertAdjacentHTML("afterbegin", productContent);
    });
  } else {
    let voidCart = `<div class="void-cart"">
    <h3>Carrinho vazio!</h3>
    </div>`;
    productsContainer.innerHTML = voidCart;
  }
  setTotalProductsPrice(productsPrice);
}
function setTotalProductsPrice(prices) {
  const totalPriceContainer = document.querySelector(
    ".products-total-price span"
  );
  let totalPrice = prices
    .map((price) =>
      parseFloat(price.replace(/[(R$ ).]/g, "").replace(",", "."))
    )
    .reduce((acc, cur) => acc + cur, 0)
    .toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  totalPriceContainer.innerHTML = totalPrice;
}

const miniCart = document.querySelector(".mini-cart");

miniCart.addEventListener("click", function () {
  document
    .querySelector(".products-container")
    .classList.toggle("show-mini-cart");
});
