// ============================================================
// PÁGINA contacto.html — mensaje "Gracias" al enviar el form
// ============================================================

const formulario = document.getElementById("form-contacto");

formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no recargue la página

    // Leemos el nombre que escribió la persona
    const nombre = document.getElementById("nombre").value;

    // Mostramos el mensaje de agradecimiento
    document.getElementById("respuesta").textContent =
        "Gracias, " + nombre + ". Recibimos tu mensaje y te responderemos pronto.";

    formulario.reset(); // limpia todos los campos
});
