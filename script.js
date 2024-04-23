
function handleButtonClick(buttonId) {
  const buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(buttonId).classList.add('active');
}

document.getElementById('men-btn').addEventListener('click', function() {
  handleButtonClick('men-btn');
});
document.getElementById('women-btn').addEventListener('click', function() {
  handleButtonClick('women-btn');
});
document.getElementById('kids-btn').addEventListener('click', function() {
  handleButtonClick('kids-btn');
});




async function fetchAllProducts() {
  try {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function filterProducts(category) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  let allProducts = await fetchAllProducts();
  allProducts = allProducts?.categories;

  allProducts.forEach(categoryObj => {
    if (categoryObj?.category_name === category) {
      categoryObj?.category_products?.forEach(product => {
        const discountPercentage = ((product?.compare_at_price - product?.price) / product?.compare_at_price) * 100;


        const productCard = `
          <div class="product-card">
            <img src="${product?.image}" alt="${product?.title}">
            ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
            <div class = "product-details">
            <p  class="bold-text">${product.title.slice(0,20)} .  <span class="vendor">${product.vendor}<span/></p>
            <p class="price bold-text">Rs.${product.price} <span class="compare-price fbold-text">${product.compare_at_price}</span><span class="discount bold-text">${discountPercentage.toFixed(2)}% Off</span></p>
            <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;

        productList.innerHTML += productCard;
      });
    }
  });
}
