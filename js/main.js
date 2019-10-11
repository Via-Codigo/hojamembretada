var fechaContenedor = document.getElementById("fecha-container");

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

fechaContenedor.addEventListener("mouseenter", crearBotonEliminar);

fechaContenedor.addEventListener("mouseleave", function() {
  borrarElementoHTML("botonBorrado");
});

function borrarElementoHTML(idHTML) {
  var elemento = document.getElementById(idHTML);
  if (elemento) {
    elemento.remove();
  }
}
