// ============================================================
// LÓGICA DEL CARRITO (página carrito.html)
// Orden del archivo:
//   1. El estado y los elementos de la página
//   2. Las acciones (agregar, aumentar, disminuir, eliminar)
//   3. Dibujar el carrito en pantalla
//   4. Los eventos (clics y formulario)
// ============================================================

// --- 1. ESTADO Y ELEMENTOS ---

// El carrito empieza con los productos guardados antes
// (por ejemplo, los que agregaste en producto.html)
let carrito = leerCarrito();

const listaCarrito = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal-price');
const totalEl = document.getElementById('total-price');
const formulario = document.getElementById('checkout-form');
const listaProductos = document.getElementById('product-list');

// Sirve para mostrar los precios bonito: 2399 -> "S/ 2399.00"
function precioBonito(numero) {
    return 'S/ ' + numero.toFixed(2);
}

// Busca un producto del carrito por su id (devuelve null si no está)
function buscarItem(id) {
    for (let i = 0; i < carrito.length; i = i + 1) {
        if (carrito[i].id === id) {
            return carrito[i];
        }
    }
    return null;
}

// --- 2. ACCIONES ---

// Agrega: si el producto ya está le suma 1, si no lo crea con cantidad 1
function agregarAlCarrito(id, nombre, precio) {
    const item = buscarItem(id);

    if (item !== null) {
        item.cantidad = item.cantidad + 1;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    dibujarCarrito();
}

// Aumenta la cantidad en 1
function aumentarCantidad(id) {
    const item = buscarItem(id);

    if (item !== null) {
        item.cantidad = item.cantidad + 1;
        dibujarCarrito();
    }
}

// Disminuye en 1; si llega a 0, el producto se elimina del carrito
function disminuirCantidad(id) {
    const item = buscarItem(id);

    if (item === null) {
        return;
    }

    if (item.cantidad > 1) {
        item.cantidad = item.cantidad - 1;
    } else {
        eliminarProducto(id);
        return; // eliminarProducto ya dibuja el carrito
    }

    dibujarCarrito();
}

// Elimina el producto completo del carrito
function eliminarProducto(id) {
    const carritoNuevo = [];

    for (let i = 0; i < carrito.length; i = i + 1) {
        if (carrito[i].id !== id) {
            carritoNuevo.push(carrito[i]);
        }
    }

    carrito = carritoNuevo;
    dibujarCarrito();
}

// --- 3. DIBUJAR EL CARRITO ---

// Pinta la lista de productos con sus botones (+ - ✕) y los totales
// También guarda el carrito, para que siga ahí si cambias de página
function dibujarCarrito() {
    guardarCarrito(carrito);
    listaCarrito.innerHTML = '';

    // Si no hay productos, mostramos el mensaje y ya
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="empty-cart">El carrito está vacío</li>';
        subtotalEl.innerHTML = precioBonito(0);
        totalEl.innerHTML = precioBonito(0);
        return;
    }

    let subtotal = 0;

    for (let i = 0; i < carrito.length; i = i + 1) {
        const item = carrito[i];
        subtotal = subtotal + (item.precio * item.cantidad);

        // Creamos la fila <li> con el nombre, precio y botones
        const li = document.createElement('li');
        li.className = 'cart-item-row';
        li.innerHTML =
            '<div class="cart-item-info">' +
                '<span class="cart-item-name">' + item.nombre + '</span>' +
                '<span class="cart-item-price">' + precioBonito(item.precio) + '</span>' +
            '</div>' +
            '<div class="cart-item-controls">' +
                '<button type="button" class="btn-qty" data-accion="disminuir" data-id="' + item.id + '" aria-label="Quitar uno">−</button>' +
                '<span class="qty-num">' + item.cantidad + '</span>' +
                '<button type="button" class="btn-qty" data-accion="aumentar" data-id="' + item.id + '" aria-label="Agregar uno">+</button>' +
                '<button type="button" class="btn-delete" data-accion="eliminar" data-id="' + item.id + '" aria-label="Eliminar del carrito">✕</button>' +
            '</div>';

        listaCarrito.append(li);
    }

    // El total es el mismo número que el subtotal
    subtotalEl.innerHTML = precioBonito(subtotal);
    totalEl.innerHTML = precioBonito(subtotal);
}

// --- 4. EVENTOS ---

// Clic en "Agregar al carrito" de cualquier producto del catálogo
listaProductos.addEventListener('click', function (e) {
    const boton = e.target.closest('.btn-add');

    if (boton === null) {
        return;
    }

    const tarjeta = boton.closest('.product-card');
    const id = tarjeta.getAttribute('data-id');
    const nombre = tarjeta.getAttribute('data-name');
    const precio = Number(tarjeta.getAttribute('data-price'));

    agregarAlCarrito(id, nombre, precio);
});

// Clics en los botones + - ✕ de dentro del carrito
listaCarrito.addEventListener('click', function (e) {
    const boton = e.target.closest('button');

    if (boton === null) {
        return;
    }

    const id = boton.getAttribute('data-id');
    const accion = boton.getAttribute('data-accion');

    if (accion === 'aumentar') {
        aumentarCantidad(id);
    }
    if (accion === 'disminuir') {
        disminuirCantidad(id);
    }
    if (accion === 'eliminar') {
        eliminarProducto(id);
    }
});

// Botón "Confirmar Pedido" del formulario
formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // para que no recargue la página

    // No se puede pedir con el carrito vacío
    if (carrito.length === 0) {
        alert('Agrega al menos una laptop al carrito antes de confirmar el pedido.');
        return;
    }

    const nombre = document.getElementById('name').value;
    const direccion = document.getElementById('address').value;
    const telefono = document.getElementById('phone').value;

    alert(
        '¡Pedido confirmado! 🎉\n\n' +
        'Gracias por tu compra, ' + nombre + '.\n' +
        'Enviaremos tu laptop a: ' + direccion + '.\n' +
        'Te contactaremos al: ' + telefono + '.'
    );

    // Se confirma el pedido, así que el carrito queda vacío
    carrito = [];
    dibujarCarrito();
    formulario.reset();
});

// Primera vez que se abre la página: dibuja lo que venía guardado
dibujarCarrito();
