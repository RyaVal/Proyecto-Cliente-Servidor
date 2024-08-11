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



document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const flexFormImg = document.getElementById('flexFormImg');
    const switchFormBtns = document.querySelectorAll('#switchFormBtn');
    const urlParams = new URLSearchParams(window.location.search);
const showRegister = urlParams.get('register') === 'true';

    function toggleForms() {
        loginForm.style.display = loginForm.style.display === 'none' ? 'flex' : 'none';
        registerForm.style.display = registerForm.style.display === 'none' ? 'flex' : 'none';
        
        // Añadir/quitar la clase 'flipped' para girar el contenedor
        flexFormImg.classList.toggle('flipped');
        
        // Cambiar la opacidad para una transición suave
        setTimeout(() => {
            loginForm.style.opacity = loginForm.style.opacity === '0' ? '1' : '0';
            registerForm.style.opacity = registerForm.style.opacity === '0' ? '1' : '0';
        }, 300);
    }

    switchFormBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms();
        });
    });

    // Inicializar el estado
    loginForm.style.display = 'flex';
    loginForm.style.opacity = '1';
    loginForm.style.justifyContent = 'center';
    registerForm.style.display = 'none';
    registerForm.style.opacity = '0';

    if (showRegister && loginForm && registerForm) {
        loginForm.style.display = 'none';
        loginForm.style.opacity = '0';
        registerForm.style.display = 'flex';
        registerForm.style.opacity = '1';
        flexFormImg.classList.add('flipped');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.querySelector('.form-register');
    const adminLink = document.querySelector('nav ul li:last-child a');

    function updateUIForUser(user) {
        const loginItems = document.querySelectorAll('.login-list-item');
        if (user) {
            loginItems[0].innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> <a href="#" class="login-link-item">Salir</a>`;
            loginItems[1].innerHTML = `<i class="fa-solid fa-user"></i> <span class="login-link-item"> ${user.nombre} ${user.apellido}</span>`;
            if (user.rol === 'admin') {
                adminLink.style.display = 'block';
            } else {
                adminLink.style.display = 'none';
            }
        } else {
            loginItems[0].innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> <a href="login.html" class="login-link-item">Iniciar Sesión</a>`;
            loginItems[1].innerHTML = `<i class="fa-solid fa-user-plus"></i> <a href="login.html?register=true" class="login-link-item">Registrarse</a>`;
            adminLink.style.display = 'none';
        }
    }

    function logout() {
        localStorage.removeItem('user');
        updateUIForUser(null);
    }
    
    document.addEventListener('click', function(e) {
        if (e.target && e.target.textContent === 'Salir') {
            e.preventDefault();
            logout();
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('[name="login-username"]').value;
            const password = loginForm.querySelector('[name="login-password"]').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('user', JSON.stringify(data.user));
                    updateUIForUser(data.user);
                    alert('Inicio de sesión exitoso');
                    window.location.href = 'main.html'; // Redirect to main page
                } else {
                    const errorData = await response.json();
                    alert(`Error al iniciar sesión: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    // Keep the existing register form code here
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(registerForm);
            const userData = {
                name: formData.get('register-name'),
                lastname: formData.get('register-lastname'),
                email: formData.get('register-email'),
                username: formData.get('register-usuario'),
                password: formData.get('register-password')
            };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    alert('Usuario registrado exitosamente');
                    registerForm.reset();
                } else {
                    const errorData = await response.json();
                    alert(`Error al registrar: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    // Check for logged-in user and update UI accordingly
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateUIForUser(user);
    }
});