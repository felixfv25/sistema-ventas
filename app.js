// ============================================================
// APP.JS — cosas básicas de la página del carrito
// ============================================================

// --- Barra lateral: el botón ☰ contrae y abre el menú ---

const botonMenu = document.getElementById('toggle-sidebar');
const barraLateral = document.getElementById('sidebar');

// El if es por si el elemento no existe en la página
if (botonMenu !== null && barraLateral !== null) {
    botonMenu.addEventListener('click', function () {
        barraLateral.classList.toggle('collapsed');
    });
}
