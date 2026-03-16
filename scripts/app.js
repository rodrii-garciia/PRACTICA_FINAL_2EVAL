// Cambiar al darkMode
const radioDia = document.getElementById("modoDia");
const radioNoche = document.getElementById("modoNoche");
const iconoSol = document.getElementById("iconoSol");
const iconoLuna = document.getElementById("iconoLuna");
const iconoSubir = document.getElementById("iconoSubir");
const iconoLupa = document.getElementById("iconoLupa");
const imagenCerrarFormulario = document.getElementById(
  "imagenCerrarFormulario",
);

radioDia.addEventListener("change", () => {
  if (radioDia.checked) {
    document.body.classList.remove("darkMode");
    iconoSol.src = "assets/img/iconos/sol-dia.png";
    iconoLuna.src = "assets/img/iconos/luna-dia.png";
    iconoSubir.src = "assets/img/iconos/subir-dia.png";
    iconoLupa.src = "assets/img/iconos/lupa-dia.png";
    imagenCerrarFormulario.src = "assets/img/iconos/cerrar-dia.png";
  }
});

radioNoche.addEventListener("change", () => {
  if (radioNoche.checked) {
    document.body.classList.add("darkMode");
    iconoSol.src = "assets/img/iconos/sol-noche.png";
    iconoLuna.src = "assets/img/iconos/luna-noche.png";
    iconoSubir.src = "assets/img/iconos/subir-noche.png";
    iconoLupa.src = "assets/img/iconos/lupa-noche.png";
    imagenCerrarFormulario.src = "assets/img/iconos/cerrar-noche.png";
  }
});

// Extraer peleadores del XML

//Recogemos el ul de la lista de peleadores
const lista = document.getElementById("listaPeleadores");

// Array donde guardamos los peleadores cargados del XML
const peleadores = [];

// Cargar XML
fetch("data/peleadores.xml")
  .then((res) => res.text())
  .then((xmlString) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");
    const peleadoresXML = xml.getElementsByTagName("peleador");

    for (let i = 0; i < peleadoresXML.length; i++) {
      const peleador = {
        id: peleadoresXML[i].getAttribute("id"),
        nombre: peleadoresXML[i].getElementsByTagName("nombre")[0].textContent,
        apellido:
          peleadoresXML[i].getElementsByTagName("apellido")[0].textContent,
        alias: peleadoresXML[i].getElementsByTagName("alias")[0].textContent,
        pais: peleadoresXML[i].getElementsByTagName("pais")[0].textContent,
        cita: peleadoresXML[i].getElementsByTagName("cita")[0].textContent,
        imagenUrl:
          peleadoresXML[i].getElementsByTagName("imagenUrl")[0].textContent,
      };

      peleadores.push(peleador);
      renderPeleador(peleador);
    }
  });

// Función para pintar un peleador en la lista
function renderPeleador(p) {
  const li = document.createElement("li");
  li.innerHTML = `
        <img src="${p.imagenUrl}" alt="Imagen de ${p.nombre} ${p.apellido}">
        <h2>${p.nombre} ${p.apellido}</h2>
        <p><strong>Alias:</strong> ${p.alias}</p>
        <p><strong>País:</strong> ${p.pais}</p>
        <p><strong>Cita:</strong> ${p.cita}</p>
    `;
  lista.appendChild(li);
}

//Cogemos el elemento del propio formulario
const form = document.getElementById("anyadirTarjeta");

//Creamos una bandera
let formularioCrearTarjetaAbierto;

//Funciones abrir y cerrar formulario
function abrirFormulario() {
  form.style.display = "flex";
  lista.classList.add("formularioAbierto");

  //Cerramos las cosas de busqueda
  cerrarBusqueda();
  //Reseteamos el formulario
  formularioFiltrar.reset();
  //Imprimimos todos los peleadores guardados TODO
  for (const p of peleadores) {
    renderPeleador(p)
  }
  //Ponemos el estilo del cursor encima de la lupa como bloqueado
  iconoLupa.style.cursor = "not-allowed";
  //Ponemos el valor de la bandera a false para que no se pueda abrir la lupa
  formularioCrearTarjetaAbierto = true;
}

function cerrarFormulario() {
  form.style.display = "none";
  lista.classList.remove("formularioAbierto");
  form.reset();

  //Damos el estilo del cursor a apto en la lupa
  iconoLupa.style.cursor = "pointer"
  //Cambiamos la bandera de valor
  formularioCrearTarjetaAbierto = false;
}

//AddEventListener para abrir formulario
iconoSubir.addEventListener("click", abrirFormulario);

// Añadir nuevo peleador desde el formulario
form.addEventListener("submit", (e) => {
  //Evita que se recargue la página
  e.preventDefault();

  // Crear un nuevo peleador con ID dinámico
  const nuevoPeleador = {
    id: "peleador" + (peleadores.length + 1),
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    alias: document.getElementById("alias").value.trim(),
    pais: document.getElementById("pais").value.trim(),
    cita: document.getElementById("cita").value.trim(),
    imagenUrl: imagenTemporal,
  };

  // Guardamos en el array
  peleadores.push(nuevoPeleador);
  // Pintamos en la página
  renderPeleador(nuevoPeleador);
  cerrarFormulario();

  //Damos el estilo del cursor a apto en la lupa
  iconoLupa.style.cursor = "pointer";
  //Cambiamos el valor de la variable
  formularioCrearTarjetaAbierto = false;
});

//Ahora hacemos que el boton cierre y limpie el formulario
imagenCerrarFormulario.addEventListener("click", cerrarFormulario);

// Recogida de constantes del DOM
const formularioFiltrar = document.getElementById("formularioBusqueda");
const inputFiltrado = document.getElementById("inputFiltrado");
const iconosDerecha = document.getElementsByClassName("iconosDerecha")[0];

//Creamos una funcion para aparecer el input de busqueda y desplazar la lupa
function abrirBusqueda() {
  if (!formularioCrearTarjetaAbierto){
    //Asignamos las clases correspondientes para las animaciones
    iconosDerecha.classList.add("moverAIzq");
    iconosDerecha.classList.remove("posicionOriginal");
    formularioFiltrar.classList.remove("desaparecerInputBusqueda");
    formularioFiltrar.classList.add("aparecerInputBusqueda");

    //Le añadimos restraso de 0.1 seg para aparecer el input
    setTimeout(() => {
      formularioFiltrar.classList.add("aparecerInputBusqueda");
      formularioFiltrar.style.display = "flex";
    }, 100);
  } else{
    console.log("Busqueda bloqueada ya que el formulario para crear tarjeta está abierto")
  }
}

//Creamos una funcion para desaparecer el input de busqueda y desplazar de nuevo la lupa
function cerrarBusqueda() {
  //Asignamos y quitamos las clases correspondientes para las animaciones
  iconosDerecha.classList.remove("moverAIzq");
  iconosDerecha.classList.add("posicionOriginal");
  formularioFiltrar.classList.remove("aparecerInputBusqueda");
  formularioFiltrar.classList.add("desaparecerInputBusqueda");

  //Le añadimos restraso de 1.5 seg para ocultar el input
  setTimeout(() => {
    formularioFiltrar.style.display = "none";
  }, 1050);
}

//Creamos el addEventListener en el que, al pulsar la lupa se despliega el buscador
iconoLupa.addEventListener("click", () => {
  //Añadimos una condicion para que, en caso de que esté desplegado se cierre y viceversa
  if (iconosDerecha.classList.contains("posicionOriginal")) {
    abrirBusqueda();
  } else {
    cerrarBusqueda();
  }
});

//Lógica del filtrado
formularioFiltrar.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputFiltrado.value.trim().toLowerCase();

  const filtrados = peleadores.filter((peleador) => {
    return (
      peleador.nombre.toLowerCase().includes(inputValue) ||
      peleador.apellido.toLowerCase().includes(inputValue) ||
      peleador.pais.toLowerCase().includes(inputValue)
    );
  });

  //Borramos los peleadores que ya estan para poner solo los filtrados
  lista.innerHTML = "";

  //Renderizamos los peleadores filtrados
  filtrados.forEach((peleador) => renderPeleador(peleador));
});

// para obtener una imagen desde el dispositivo local
const inputImagen = document.getElementById("imagenLocal");

let imagenTemporal = "";

inputImagen.addEventListener("change", () => {
  const archivo = inputImagen.files[0];

  const reader = new FileReader();

  reader.onload = (e) => {
    imagenTemporal = e.target.result;
  };

  reader.readAsDataURL(archivo);
});
