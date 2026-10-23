// ============================================================
// CARRITO COMPARTIDO (lo usan producto.html y carrito.html)
// La idea: el carrito vive en localStorage, o sea guardado en el
// navegador. Por eso lo que agregas en producto.html aparece
// después en carrito.html.
// ============================================================

// La "caja" donde se guarda el carrito dentro del navegador
const CARRITO_CLAVE = 'carrito-tecnomarket';

// 1) Leer el carrito guardado (si no hay nada devuelve [])
function leerCarrito() {
    const texto = localStorage.getItem(CARRITO_CLAVE);

    if (texto === null) {
        return [];
    }

    return JSON.parse(texto);
}

// 2) Guardar la lista completa del carrito
function guardarCarrito(listaDeProductos) {
    localStorage.setItem(CARRITO_CLAVE, JSON.stringify(listaDeProductos));
}

// 3) Agregar un producto (objeto con id, nombre y precio)
//    Si ya estaba en el carrito, solo le suma 1 a la cantidad
function agregarProductoAlCarrito(producto) {
    const carrito = leerCarrito();

    let encontrado = false;
    for (let i = 0; i < carrito.length; i = i + 1) {
        if (carrito[i].id === producto.id) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            encontrado = true;
        }
    }

    if (encontrado === false) {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarrito(carrito);
}
