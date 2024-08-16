
function addCategory() {
    const categoryName = document.getElementById('new-category-name').value;
    console.log('Category name:', categoryName);
    if (!categoryName.trim()) {
      console.log('Empty category name detected');
      alert('Por favor, ingrese un nombre de categoría válido.');
      return;
    }
    fetch('/categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre_categoria: categoryName }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Category added:', data);
      loadCategories();
      closeModal();
      document.getElementById('new-category-name').value = '';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  function loadCategories() {
    fetch('/categorias')
      .then(response => response.json())
      .then(categories => {
        const categoriesContent = document.getElementById('categories-content');
        categoriesContent.innerHTML = `
        <div class="admin-header">
          <h2 class="admin-title">Categorías</h2>
            <button onclick="showModal('category')" class="btn-add">Agregar Categoría</button>
        </div>
        <div id="add-category-form" style="display:none;">
          <input type="text" id="new-category-name" placeholder="Nombre de la categoría">
          <button onclick="addCategory()">Guardar</button>
        </div>
        ${categories.map(category => `
        <div class="category-item">
          <h3>Id: ${category.id_categoria}</h3>
          <p>Nombre categoria: ${category.nombre_categoria}</p>
          <p>Descripcion: ${category.descripcion}</p>
          <button class="btn-edit-admin" onclick="editCategory(${category.id_categoria})">Editar</button>
          <button class="btn-delete-admin" onclick="deleteCategory(${category.id_categoria})">Eliminar</button>
        </div>
    `).join('')}`;
    });
  }
  
  function showModal(type) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    
    if (type === 'category') {
      modalContent.innerHTML = `
        <h2>Agregar Categoría</h2>
        <input type="text" id="new-category-name" placeholder="Nombre de la categoría">
        <button id="save-category">Guardar</button>
        <button onclick="closeModal()">Cancelar</button>
      `;
      document.getElementById('save-category').addEventListener('click', addCategory);
    } else if (type === 'product') {
      modalContent.innerHTML = `
        <h2>Agregar Producto</h2>
        <input type="text" id="new-product-name" placeholder="Nombre del producto">
        <input type="text" id="new-product-description" placeholder="Descripción">
        <input type="number" id="new-product-price" placeholder="Precio">
        <input type="number" id="new-product-stock" placeholder="Stock">
        <input type="text" id="new-product-image" placeholder="URL de la imagen">
        <select id="new-product-category"></select>
        <button onclick="addProduct()">Guardar</button>
      `;
      loadCategoriesForSelect();
    }
    
    modal.style.display = 'block';
  }
  
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  
  // Cerrar el modal si se hace clic fuera de él
  window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  function showAddCategoryForm() {
    document.getElementById('add-category-form').style.display = 'block';
  }


  function loadProducts() {
    fetch('/productos')
      .then(response => response.json())
      .then(products => {
        const productsContent = document.getElementById('products-content');
        productsContent.innerHTML = `   
        <div class="admin-header">
       <h2 class="admin-title">Productos</h2>
    <button onclick="showModal('product')" class="btn-add">Agregar Producto</button>
  </div>
        <div id="add-product-form" style="display:none;">
          <input type="text" id="new-product-name" placeholder="Nombre del producto">
          <button onclick="addProduct()">Guardar</button>
        </div>
        <div class="product-items">
        ${products.map(product => `
            <div class="product-item">
              <h3>Id: ${product.id_producto}</h3>
              <p>Categoria: ${product.id_categoria}</p>
              <p>Nombre: ${product.nombre_producto}</p>
              <p>Descripcion: ${product.descripcion}</p>
              <p>₡${product.precio}</p>
              <button class="btn-edit-admin" onclick="editProduct(${product.id_producto})">Editar</button>
              <button class="btn-delete-admin" onclick="deleteProduct(${product.id_producto})">Eliminar</button>
            </div>  
        `).join('')}</div>`;
        loadCategories();
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-admin');
    const contents = document.querySelectorAll('.collapsible-content');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.id.replace('btn-', '');
        const targetContent = document.getElementById(`${targetId}-content`);
        
        // Cerrar todos los contenidos
        contents.forEach(content => {
          if (content !== targetContent) {
            content.style.display = 'none';
          }
        });
        
        // Alternar la visibilidad del contenido actual
        if (targetContent.style.display === 'block') {
          targetContent.style.display = 'none';
        } else {
          targetContent.style.display = 'block';
          loadContent(targetId);
        }
      });
    });
  
    function loadContent(contentType) {
      switch(contentType) {
        case 'categories':
          loadCategories();
          break;
        case 'products':
          loadProducts();
          break;
        case 'users':
          loadUsers();
          break;
      }
    }

      
      

      

      function showAddProductForm() {
        document.getElementById('add-product-form').style.display = 'block';
        loadCategoriesForSelect();
      }
      
      function loadCategoriesForSelect() {
        fetch('/categorias')
          .then(response => response.json())
          .then(categories => {
            const select = document.getElementById('new-product-category');
            select.innerHTML = categories.map(category => 
              `<option value="${category.id_categoria}">${category.nombre_categoria}</option>`
            ).join('');
          });
      }
      
      function addProduct() {
        const product = {
          nombre_producto: document.getElementById('new-product-name').value,
          descripcion: document.getElementById('new-product-description').value,
          precio: parseFloat(document.getElementById('new-product-price').value),
          stock: parseInt(document.getElementById('new-product-stock').value),
          imagen_url: document.getElementById('new-product-image').value,
          id_categoria: parseInt(document.getElementById('new-product-category').value)
        };

        fetch('/productos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          })
          .then(response => response.json())
          .then(data => {
            loadProducts();
            document.getElementById('add-product-form').style.display = 'none';
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }

  function loadUsers() {
    fetch('/usuarios')
      .then(response => response.json())
      .then(users => {
        const usersContent = document.getElementById('users-content');
        usersContent.innerHTML =`<h2 class="admin-title">Usuarios</h2> ${users.map(user => `
          <div class="user-item">
            <h3>${user.username}</h3>
            <p>${user.rol}</p>
            <button onclick="editUser(${user.id_usuario})">Editar</button>
            <button onclick="deleteUser(${user.id_usuario})">Eliminar</button>
          </div>
        `).join('')}`;
      });
  
  }

  function editCategory(id) {
    // Implement edit category functionality
  }
  
  function deleteCategory(id) {
    // Implement delete category functionality
  }
  
  function editProduct(id) {
    // Implement edit product functionality
  }
  
  function deleteProduct(id) {
    // Implement delete product functionality
  }
  
  function editUser(id) {
    // Implement edit user functionality
  }
  
  function deleteUser(id) {
    // Implement delete user functionality
  }
});

