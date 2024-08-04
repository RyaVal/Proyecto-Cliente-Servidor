let cart = [];

// Función para agregar un producto al carrito
function addToCart(productId) {
  // Buscar el producto en la base de datos
  fetch(`/productos/${productId}`)
   .then(response => response.json())
   .then(product => {
      // Agregar el producto al carrito
      cart.push(product);
      updateCartTotal();
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  // Buscar el producto en el carrito
  const index = cart.findIndex(product => product.id_producto === productId);
  if (index!== -1) {
    cart.splice(index, 1);
    updateCartTotal();
  }
}

// Función para actualizar el total del carrito
function updateCartTotal() {
  const total = cart.reduce((acc, product) => acc + product.precio, 0);
  document.getElementById('cart-total').innerText = `₡${total.toLocaleString()}`;
}

// Función para mostrar el carrito
function showCart() {
  const cartHTML = cart.map(product => `
    <div class="cart-item">
      <h3>${product.nombre_producto}</h3>
      <p>₡${product.precio.toLocaleString()}</p>
      <button class="remove-button" onclick="removeFromCart(${product.id_producto})">Eliminar</button>
    </div>
  `).join('');
  document.getElementById('cart-container').innerHTML = cartHTML;
}

// Inicializar el carrito
document.addEventListener('DOMContentLoaded', () => {
  showCart();
});