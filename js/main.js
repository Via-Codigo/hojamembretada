/**
 * Elementos con los que trabajaremos
 */
var fechaContenedor = document.getElementById("fecha-container");

var botonGuardar = document.getElementById("guardar");

/**
 *
 * @param {HTMLElement} idHTML
 * Remueve elementos HTMl del tree
 */
function borrarElementoHTML(idHTML) {
  var elemento = document.getElementById(idHTML);
  if (elemento) {
    elemento.remove();
  }
}

/**
 * Crea el boton de eliminar para la fecha
 */
function crearBotonEliminar() {
  // si no lo encuentras crealo
  if (!document.getElementById("botonBorrado")) {
    var botonBorrado = document.createElement("button");
    botonBorrado.id = "botonBorrado";
    botonBorrado.innerText = "borrar fecha";
    fechaContenedor.appendChild(botonBorrado);

    botonBorrado.addEventListener("click", function() {
      borrarElementoHTML("fecha-container");
    });
  }
}

function guardarEstado() {
  var data = {
    fecha: "",
    cuerpo: "",
    timestamp: ""
  };

  // esto debería estar en otro lado
  data.timestamp = Date.now();
  data.fecha = document.getElementById("fecha").innerHTML;
  data.cuerpo = document.getElementById("editor").innerHTML;

  // convertimos a string
  var dataAsString = JSON.stringify(data);
  localStorage.setItem("data", dataAsString);
}

function cargarEstado() {
  var localData = localStorage.getItem("data");
  if (localData) {
    localData = JSON.parse(localData);

    if (
      confirm(
        `desea cargar la versión guardada del ${new Date(
          localData.timestamp
        ).toISOString()}`
      )
    ) {
      document.getElementById("fecha").innerHTML = localData.fecha;
      localData.cuerpo = document.getElementById("editor").innerHTML =
        localData.cuerpo;
    }
  }
}

/**
 * Crear event listeners
 */
fechaContenedor.addEventListener("mouseenter", crearBotonEliminar);
fechaContenedor.addEventListener("mouseleave", function() {
  borrarElementoHTML("botonBorrado");
});
botonGuardar.addEventListener("click", guardarEstado);

window.addEventListener("load", cargarEstado);
window.addEventListener("load", function() {
  setInterval(() => {
    guardarEstado();
  }, 1000 * 60 * 5);
});
