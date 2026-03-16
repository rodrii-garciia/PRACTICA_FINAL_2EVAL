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

//Funciones abrir y cerrar formulario
function abrirFormulario() {
  form.style.display = "flex";
  lista.classList.add("formularioAbierto");
}

function cerrarFormulario() {
  form.style.display = "none";
  lista.classList.remove("formularioAbierto");
  form.reset();
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
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    alias: document.getElementById("alias").value,
    pais: document.getElementById("pais").value,
    cita: document.getElementById("cita").value,
    imagenUrl: imagenTemporal
  };

  peleadores.push(nuevoPeleador); // Guardamos en el array
  renderPeleador(nuevoPeleador); // Pintamos en la página
  cerrarFormulario();
});

//Ahora hacemos que el boton cierre y limpie el formulario
imagenCerrarFormulario.addEventListener("click", cerrarFormulario);

// filtrar peleadores
const formularioFiltrar = document.getElementById("formularioBusqueda");
const inputFiltrado = document.getElementById("inputFiltrado");
const iconosDerecha = document.getElementsByClassName("imagenesDerecha")

iconoLupa.addEventListener("click", () => {
  formularioFiltrar.style.display = "flex";
  iconosDerecha.classList.add("moverIconosDerecha");
});

formularioFiltrar.addEventListener("submit", (e) =>{
  e.preventDefault();

  const inputValue = inputFiltrado.value.toLowerCase();

  const filtrados = peleadores.filter((peleador) => {
    return (
      peleador.nombre.toLowerCase().includes(inputValue) ||
      peleador.apellido.toLowerCase().includes(inputValue) ||
      peleador.pais.toLowerCase().includes(inputValue)
    );
  });

  lista.innerHTML = "";

  filtrados.forEach((peleador) => renderPeleador(peleador));
})

// para obtener una imagen desde el dispositivo local
const inputImagen = document.getElementById("imagenLocal");

let imagenTemporal = "";

inputImagen.addEventListener("change", () => {
  const archivo = inputImagen.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        imagenTemporal = e.target.result;
    };

    reader.readAsDataURL(archivo);
});