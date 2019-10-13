/**
 * Elementos con los que trabajaremos
 */

var botonGuardar = document.getElementById("guardar");
var botonNuevaHoja = document.getElementById("nuevaPagina");

///////////////////////////////////////////
// Hay qie ver que hacemos con esto de la fecha y su borrado para las demás hojas

function crearBotonesEliminarFecha() {
  var hojas = document.getElementsByClassName("hoja");
  for (let i = 0; i < hojas.length; i++) {
    var fechaContenedor = document.getElementById(`fecha-container-${i}`);
    fechaContenedor.addEventListener("mouseenter", function() {
      crearBotonEliminar(i);
    });
    fechaContenedor.addEventListener("mouseleave", function() {
      borrarElementoHTML(`botonBorrado-${i}`);
    });
  }
}
/**
 * Crea el boton de eliminar para la fecha
 */
function crearBotonEliminar(numHoja) {
  // si no lo encuentras crealo
  if (!document.getElementById(`botonBorrado-${numHoja}`)) {
    var botonBorrado = document.createElement("button");
    botonBorrado.id = `botonBorrado-${numHoja}`;
    botonBorrado.innerText = "borrar fecha";
    var fechaContenedor = document.getElementById(`fecha-container-${numHoja}`);
    fechaContenedor.appendChild(botonBorrado);

    botonBorrado.addEventListener("click", function() {
      borrarElementoHTML(`fecha-container-${numHoja}`);
    });
  }
}
/////////////////////////////////////////
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

/////////////////////////////////////////////////////
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
/**
 * Carga el estado de las hojas guardadas en localStorage en el app
 */
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

      var currentHojas = document.getElementsByClassName("hoja").length;

      while (currentHojas < hojas.length - 1) {
        currentHojas = document.getElementsByClassName("hoja").length;
        crearNuevaHoja();
      }
      for (let i = 0; i < hojas.length; i++) {
        document.getElementById(`fecha-${i}`).innerHTML =
          localData.hojas[i].fecha;
        document.getElementById(`editor-${i}`).innerHTML =
          localData.hojas[i].cuerpo;
      }
    }
  }
}
//////////////////////////////////////////////////////

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function crearNuevaHoja() {
  var hojasContainer = document.getElementById("hojasContainer");
  var hojas = document.getElementsByClassName("hoja");
  var nuevaHoja = htmlToElement(plantillaHoja(hojas.length));
  hojasContainer.appendChild(nuevaHoja);

  initEditors();
  crearBotonesEliminarFecha();
}

/////////////////////////////////////////////////////////////
/**
 * Crear event listeners todo esto debería ser una init func
 */
function init() {
  botonGuardar.addEventListener("click", guardarEstado);
  botonNuevaHoja.addEventListener("click", crearNuevaHoja);
  window.addEventListener("load", cargarEstado);

  initEditors();
  crearBotonesEliminarFecha();
  window.addEventListener("load", function() {
    setInterval(() => {
      guardarEstado();
    }, 1000 * 60 * 5);
  });
}

/////////////////////////////

var plantillaHoja = numHoja => `
<div class="hoja" id="hoja-${numHoja}">
      <header class="container-fluid">
        <div class="viacodigo">
          <div class="row">
            <div class="col-4">
              <h1>
                <img
                  class="viacodigo_imagen"
                  src="imagenes/logo_azul_fondo_blanco (1).png"
                  alt=""
                />
              </h1>
            </div>

            <div class="col-8">
              <div class="viacodigo__raya-roja"></div>
              <div class="viacodigo_listado_iconos">
                <ul class="viacodigo_listado row no-gutters">
                  <li class="col-3 ">
                    <div class="viacodigo_iconos ">
                      <div class="viacodigo_iconos__circulo icono--libro">
                        <img src="imagenes/libro.png" alt="" />
                      </div>
                    </div>
                    <a class="viacodigo_link-azul" href=""
                      >Calle Junín 301, Miraflores</a
                    >
                  </li>

                  <li class="col-3 collapsed">
                    <div class="viacodigo_iconos">
                      <div class="viacodigo_iconos__circulo icono--telf">
                        <img src="imagenes/telf.png" alt="" />
                      </div>
                    </div>
                    <a class="viacodigo_link-azul" href="">(51) 961-738608</a>
                  </li>

                  <li class="col-3 collapsed">
                    <div class="viacodigo_iconos">
                      <div class="viacodigo_iconos__circulo icono--sobre">
                        <img src="imagenes/sobre.png" alt="" />
                      </div>
                    </div>
                    <a class="viacodigo_link-azul" href=""
                      >info@viacodigo.com</a
                    >
                  </li>

                  <li class="col-3 collapsed">
                    <div class="viacodigo_iconos">
                      <div class="viacodigo_iconos__circulo icono--hoja">
                        <img src="imagenes/hoja.png" alt="" />
                      </div>
                    </div>
                    <a class="viacodigo_link-rojo" href="">www.viacodigo.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="container">
        <div class="viacodigo_contenido">
          <div id="fecha-container-${numHoja}" class="viacodigo_fecha">
            <p id="fecha-${numHoja}" contenteditable="true">
              lima, <span>xx</span> de <span>xxx</span> del <span>2019</span>
            </p>
          </div>
          <div id="editor-${numHoja}" class="contenido-carta" contenteditable="true">
            Escribe aquí el texto que desees
          </div>
        </div>
      </div>

      <footer class="viacodigo_footer-raya "></footer>
    </div>
`;
