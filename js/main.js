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

/**
 *
 * @param {int} numHoja El numero que especifica la hoja
 */
function guardarHoja(numHoja) {
  return {
    fecha: document.getElementById(`fecha-${numHoja}`).innerHTML,
    cuerpo: document.getElementById(`editor-${numHoja}`).innerHTML
  };
}
/**
 * Cada hoja es un elemento del array que contiene su propia información
 */
function guardarEstado() {
  var hojas = document.getElementsByClassName("hoja");
  var data = {
    timestamp: "",
    hojas: []
  };
  // conseguimos la fecha de guardado
  data.timestamp = Date.now();
  for (let i = 0; i < hojas.length; i++) {
    data.hojas.push(guardarHoja(i));
  }

  // convertimos a string y guardamos
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
      var hojas = localData.hojas;
      for (let i = 0; i < hojas.length; i++) {
        document.getElementById(`fecha-${i}`).innerHTML =
          localData.hojas[i].fecha;
        document.getElementById(`editor-${i}`).innerHTML =
          localData.hojas[i].cuerpo;
      }
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

initEditors();
window.addEventListener("load", function() {
  setInterval(() => {
    guardarEstado();
  }, 1000 * 60 * 5);
});
