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
                        <img src="ruta_a_imagen/${producto.ID_Producto}.jpg" alt="${producto.Nombre_Producto}">
                    </div>
                    <h3>${producto.Nombre_Producto}</h3>
                    <p>${producto.Precio}</p>
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
