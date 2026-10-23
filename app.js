// --- 1. LÓGICA DE LA BARRA LATERAL (COLLAPSE) ---
const toggleBtn = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

// --- 2. LÓGICA DEL CARRITO DE COMPRAS ---
let carrito = [];

const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const subtotalPriceEl = document.getElementById('subtotal-price');
const totalPriceEl = document.getElementById('total-price');
const checkoutForm = document.getElementById('checkout-form');

// Escuchar clics en el catálogo de productos
if (productList) {
    productList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add')) {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));

            agregarAlCarrito(id, name, price);
        }
    });
}

// Función para agregar o incrementar producto
function agregarAlCarrito(id, name, price) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id, name, price, cantidad: 1 });
    }

    renderizarCarrito();
}

// Función para aumentar cantidad desde el carrito (+)
function aumentarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad++;
        renderizarCarrito();
    }
}

// Función para disminuir cantidad desde el carrito (-)
function disminuirCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad--;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
        renderizarCarrito();
    }
}

// Función para eliminar producto por completo
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    renderizarCarrito();
}

// Renderizar el carrito en pantalla (HTML dinámico)
function renderizarCarrito() {
    cartItemsContainer.innerHTML = '';

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<li class="empty-cart">El carrito está vacío</li>';
        subtotalPriceEl.textContent = '$0.00';
        totalPriceEl.textContent = '$0.00';
        return;
    }

    let subtotal = 0;

    carrito.forEach(item => {
        const totalItem = item.price * item.cantidad;
        subtotal += totalItem;

        const li = document.createElement('li');
        li.classList.add('cart-item-row');
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <button class="btn-qty" onclick="disminuirCantidad('${item.id}')">-</button>
                <span class="qty-num">${item.cantidad}</span>
                <button class="btn-qty" onclick="aumentarCantidad('${item.id}')">+</button>
                <button class="btn-delete" onclick="eliminarProducto('${item.id}')" title="Eliminar">🗑️</button>
            </div>
        `;
        cartItemsContainer.appendChild(li);
    });

    subtotalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
    totalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
}

// Manejar formulario de confirmación de pedido
if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert('Por favor, agrega al menos una laptop al carrito antes de confirmar el pedido.');
            return;
        }

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        alert(`¡Pedido confirmado con éxito! 🎉\n\nGracias por tu compra, ${name}.\nEnviaremos tu laptop a: ${address}.\nTe contactaremos al: ${phone}.`);

        // Limpiar carrito y formulario
        carrito = [];
        renderizarCarrito();
        checkoutForm.reset();
    });
}