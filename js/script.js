// Lista de productos (después se puede ampliar)
const productos = [
  { nombre: "Laptop Lenovo IdeaPad", precio: 2399, icono: "💻" },
  { nombre: "Laptop HP 14 pulgadas", precio: 2199, icono: "💻" },
  { nombre: "Samsung Galaxy A15",    precio: 699,  icono: "📱" },
  { nombre: "Xiaomi Redmi Note 13",  precio: 899,  icono: "📱" },
  { nombre: "Teclado mecánico",      precio: 120,  icono: "⌨️" },
  { nombre: "Mouse inalámbrico",     precio: 45,   icono: "🖱️" },
  { nombre: "Audífonos gamer",       precio: 90,   icono: "🎧" },
  { nombre: "Memoria USB 64GB",      precio: 35,   icono: "💾" }
];

const lista = document.getElementById("lista");

productos.forEach(function (p) {
  lista.innerHTML += `
    <div class="tarjeta">
      <div class="icono">${p.icono}</div>
      <h3>${p.nombre}</h3>
      <p>S/ ${p.precio}</p>
      <button>Agregar al carrito</button>
    </div>`;
});
