// ============================================================
// PÁGINA producto.html — muestra el detalle de 1 producto
// ============================================================

// Datos de ejemplo (el id coincide con la lista del Integrante 1)
const productos = [
  { id: 1, nombre: "Laptop Lenovo IdeaPad", categoria: "Laptops",   precio: 2399, stock: 8,  icono: "💻", oferta: true,
    descripcion: "Laptop ideal para estudiar y trabajar.", specs: ["Procesador Intel Core i5", "Memoria RAM 8GB", "SSD 512GB", "Pantalla 15.6 pulgadas"] },
  { id: 2, nombre: "Laptop HP 14 pulgadas", categoria: "Laptops",   precio: 2199, stock: 6,  icono: "💻", oferta: false,
    descripcion: "Liviana y con buena batería.", specs: ["Procesador AMD Ryzen 5", "Memoria RAM 8GB", "SSD 256GB", "Pantalla 14 pulgadas"] },
  { id: 3, nombre: "Samsung Galaxy A15", categoria: "Celulares", precio: 699,  stock: 20, icono: "📱", oferta: true,
    descripcion: "Celular con buena cámara y pantalla grande.", specs: ["Memoria 128GB", "RAM 4GB", "Cámara 50MP", "Batería 5000 mAh"] },
  { id: 4, nombre: "Xiaomi Redmi Note 13", categoria: "Celulares", precio: 899,  stock: 15, icono: "📱", oferta: false,
    descripcion: "Gran rendimiento a buen precio.", specs: ["Memoria 256GB", "RAM 8GB", "Cámara 108MP", "Carga rápida"] },
  { id: 5, nombre: "Teclado mecánico", categoria: "Accesorios", precio: 120, stock: 25, icono: "⌨️", oferta: false,
    descripcion: "Teclado con luces RGB para escribir y jugar.", specs: ["Switches azules", "Luces RGB", "Conexión USB"] },
  { id: 6, nombre: "Mouse inalámbrico", categoria: "Accesorios", precio: 45, stock: 0, icono: "🖱️", oferta: false,
    descripcion: "Mouse cómodo para uso diario.", specs: ["Conexión inalámbrica 2.4GHz", "1600 DPI", "Pila incluida"] },
  { id: 7, nombre: "Audífonos gamer", categoria: "Accesorios", precio: 90, stock: 30, icono: "🎧", oferta: true,
    descripcion: "Audífonos con micrófono para jugar y clases virtuales.", specs: ["Micrófono incluido", "Sonido envolvente", "Conexión USB"] },
  { id: 8, nombre: "Memoria USB 64GB", categoria: "Accesorios", precio: 35, stock: 50, icono: "💾", oferta: false,
    descripcion: "Para guardar y llevar tus archivos.", specs: ["Capacidad 64GB", "USB 3.0", "Tamaño compacto"] },
  { id: 9,  nombre: "Dell XPS 13",      categoria: "Laptops",   precio: 1299, stock: 10, icono: "✨", oferta: false,
    descripcion: "Pantalla casi sin bordes y cuerpo liviano.", specs: ["Procesador Intel Core i7", "Memoria RAM 16GB", "SSD 512GB", "Pantalla 13.4 pulgadas"] },
  { id: 10, nombre: "MacBook Air M2",   categoria: "Laptops",   precio: 1099, stock: 6,  icono: "💻", oferta: true,
    descripcion: "Ultra delgada, silenciosa y con gran batería.", specs: ["Chip Apple M2", "Memoria RAM 8GB", "SSD 256GB", "Pantalla 13.6 pulgadas"] },
  { id: 11, nombre: "Lenovo Legion 5",  categoria: "Laptops",   precio: 1150, stock: 4,  icono: "🎮", oferta: false,
    descripcion: "Laptop para juegos con buena refrigeración.", specs: ["Gráfica RTX 4050", "Memoria RAM 16GB", "SSD 512GB", "Pantalla 15.6 144Hz"] },
  { id: 12, nombre: "Acer Swift 3",     categoria: "Laptops",   precio: 550,  stock: 12, icono: "🦋", oferta: false,
    descripcion: "La opción más económica para clases online.", specs: ["Procesador AMD Ryzen 5", "Memoria RAM 8GB", "SSD 256GB", "Pantalla 14 pulgadas"] }
];

// --- Buscar el producto que pide la URL ---

// La URL se ve así: producto.html?id=3  (si no hay id, usa el 1)
const idPedido = Number(new URLSearchParams(window.location.search).get("id")) || 1;

// Recorremos la lista hasta encontrar el producto con ese id
let productoElegido = null;
for (let i = 0; i < productos.length; i = i + 1) {
    if (productos[i].id === idPedido) {
        productoElegido = productos[i];
    }
}

// --- Dibujar el detalle del producto ---

const detalle = document.getElementById("detalle");

if (productoElegido === null) {
    // No se encontró ese id en la lista
    detalle.innerHTML = "<p>No encontramos ese producto. Vuelve al catálogo y elige otro.</p>";

} else {
    document.title = productoElegido.nombre + " | TecnoMarket";

    // Muestra "Disponible (8 en stock)" o "Agotado", según el stock
    let textoStock = "";
    if (productoElegido.stock > 0) {
        textoStock = '<span class="disponible">Disponible (' + productoElegido.stock + ' en stock)</span>';
    } else {
        textoStock = '<span class="agotado">Agotado</span>';
    }

    // Muestra el sello "Oferta" solo si el producto lo tiene
    let selloOferta = "";
    if (productoElegido.oferta === true) {
        selloOferta = ' <span class="oferta">Oferta</span>';
    }

    // Arma la lista de especificaciones: <li> por cada spec
    let listaSpecs = "";
    for (let i = 0; i < productoElegido.specs.length; i = i + 1) {
        listaSpecs = listaSpecs + "<li>" + productoElegido.specs[i] + "</li>";
    }

    detalle.innerHTML =
        '<div class="imagen">' + productoElegido.icono + '</div>' +
        '<div>' +
            '<p class="categoria">' + productoElegido.categoria + selloOferta + '</p>' +
            '<h2>' + productoElegido.nombre + '</h2>' +
            '<p class="precio">S/ ' + productoElegido.precio + '</p>' +
            '<p>' + productoElegido.descripcion + '</p>' +
            '<h3>Especificaciones</h3>' +
            '<ul>' + listaSpecs + '</ul>' +
            '<p>' + textoStock + '</p><br>' +
            '<button type="button" id="btn-agregar" class="boton" ' + (productoElegido.stock === 0 ? "disabled" : "") + '>Agregar al carrito</button>' +
        '</div>';
}

// --- Mostrar los demás productos ---

// Todos los productos, menos el que se está viendo
const otros = document.getElementById("otros");
let otrosHTML = "";
for (let i = 0; i < productos.length; i = i + 1) {
    const p = productos[i];
    if (p.id !== idPedido) {
        otrosHTML = otrosHTML + '<a href="producto.html?id=' + p.id + '">' + p.icono + ' ' + p.nombre + '</a>';
    }
}
otros.innerHTML = otrosHTML;

// --- Botón "Agregar al carrito" ---

// Uso el carrito compartido (js/carrito-datos.js): al hacer clic el
// producto queda guardado y aparece en carrito.html
// El prefijo "prod-" evita que el id choque con el catálogo del carrito
if (productoElegido !== null && productoElegido.stock > 0) {

    // El botón ya existe porque lo creamos algunos línea más arriba
    document.getElementById("btn-agregar").addEventListener("click", function () {
        agregarProductoAlCarrito({
            id: "prod-" + productoElegido.id,
            nombre: productoElegido.nombre,
            precio: productoElegido.precio
        });
        alert("✅ " + productoElegido.nombre + " se agregó al carrito. Véralo en carrito.html");
    });
}
