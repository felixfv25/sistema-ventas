// ============================================================
// EFECTOS — estela roja que sigue al mouse
// Hace dos cosas:
//   1. Un brillo grande que "persigue" al cursor con retraso
//   2. Anillos pequeños que van quedando mientras te mueves
// Los estilos de estos elementos están en css/efectos.css
// ============================================================

// Si el usuario pidió menos animación en su sistema, no hacemos nada
const pideMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (pideMenosMovimiento === false) {

    // --- 1. El brillo grande ---

    // Lo creamos vacío y lo pegamos a la página
    const brillo = document.createElement('div');
    brillo.className = 'cursor-glow';
    document.body.appendChild(brillo);

    // mouseEnX / mouseEnY = dónde está el cursor de verdad
    // brilloEnX / brilloEnY = dónde está el brillo ahora mismo
    let mouseEnX = -9999;
    let mouseEnY = -9999;
    let brilloEnX = -9999;
    let brilloEnY = -9999;
    let tiempoDeLaUltimaOnda = 0;

    // Cada vez que mueves el mouse guardamos su posición
    document.addEventListener('mousemove', function (evento) {
        mouseEnX = evento.clientX;
        mouseEnY = evento.clientY;

        // Máximo se crea 1 anillo cada 80 milisegundos,
        // para que la página no se llene de anillos
        const tiempoAhora = Date.now();
        if (tiempoAhora - tiempoDeLaUltimaOnda > 80) {
            crearAnillo(mouseEnX, mouseEnY);
            tiempoDeLaUltimaOnda = tiempoAhora;
        }
    });

    // Crea un anillo en la posición (x, y). Se borra solo
    // cuando termina su animación (lo ve animationend)
    function crearAnillo(x, y) {
        const anillo = document.createElement('div');
        anillo.className = 'cursor-onda';
        anillo.style.left = x + 'px';
        anillo.style.top = y + 'px';
        document.body.appendChild(anillo);

        anillo.addEventListener('animationend', function () {
            anillo.remove();
        });
    }

    // Mueve el brillo un poquito hacia el mouse, muchas veces por segundo.
    // Eso hace el efecto de que el brillo sigue al cursor con retraso.
    function perseguirAlMouse() {
        brilloEnX = brilloEnX + (mouseEnX - brilloEnX) * 0.12;
        brilloEnY = brilloEnY + (mouseEnY - brilloEnY) * 0.12;

        brillo.style.transform = 'translate(' + (brilloEnX - 160) + 'px, ' + (brilloEnY - 160) + 'px)';

        // Volvemos a llamar a esta misma función al siguiente frame
        requestAnimationFrame(perseguirAlMouse);
    }

    perseguirAlMouse();
}
