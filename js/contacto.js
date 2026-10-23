document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  document.getElementById("respuesta").textContent = "Gracias, " + nombre + ". Recibimos tu mensaje y te responderemos pronto.";
  this.reset();
});
