// Datos de ejemplo con detalles (el id coincide con el orden de la lista del Integrante 1)
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
    descripcion: "Para guardar y llevar tus archivos.", specs: ["Capacidad 64GB", "USB 3.0", "Tamaño compacto"] }
];

// Leer el id de la URL: producto.html?id=3
const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
const p = productos.find(function (x) { return x.id === id; });
const detalle = document.getElementById("detalle");

if (!p) {
  detalle.innerHTML = "<p>No encontramos ese producto. Vuelve al catálogo y elige otro.</p>";
} else {
  document.title = p.nombre + " | TecnoMarket";
  const disponibilidad = p.stock > 0
    ? `<span class="disponible">Disponible (${p.stock} en stock)</span>`
    : `<span class="agotado">Agotado</span>`;
  detalle.innerHTML = `
    <div class="imagen">${p.icono}</div>
    <div>
      <p class="categoria">${p.categoria} ${p.oferta ? '<span class="oferta">Oferta</span>' : ""}</p>
      <h2>${p.nombre}</h2>
      <p class="precio">S/ ${p.precio}</p>
      <p>${p.descripcion}</p>
      <h3>Especificaciones</h3>
      <ul>${p.specs.map(function (s) { return "<li>" + s + "</li>"; }).join("")}</ul>
      <p>${disponibilidad}</p><br>
      <button class="boton" ${p.stock === 0 ? "disabled" : ""} onclick="alert('Producto agregado al carrito')">Agregar al carrito</button>
    </div>`;
}

// Enlaces a los demás productos
document.getElementById("otros").innerHTML = productos
  .filter(function (x) { return x.id !== id; })
  .map(function (x) { return `<a href="producto.html?id=${x.id}">${x.icono} ${x.nombre}</a>`; })
  .join("");
