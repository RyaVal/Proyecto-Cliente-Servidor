document.addEventListener('DOMContentLoaded', () => {
    fetch('/productos')
        .then(response => response.json())
        .then(productos => {
            const productosDiv = document.querySelector('.products');
            productosDiv.innerHTML = '';
            productos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.className = 'product';
                productoDiv.innerHTML = `
                    <div class="product-img-container">
                        <img src="${producto.imagen_url}" alt="${producto.nombre_producto}">
                    </div>
                    <h3>${producto.nombre_producto}</h3>
                    <p>₡${producto.precio.toLocaleString()}</p>
                    <form action="" class="form-cart-button">
                        <button class="add-cart-product-button">
                            <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
                        </button>
                    </form>
                `;
                productosDiv.appendChild(productoDiv);
            });
        })
        .catch(error => console.error('Error al obtener productos:', error));
});
