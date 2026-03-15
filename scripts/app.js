// Cambiar al darkMode
const radioDia = document.getElementById("modoDia");
const radioNoche = document.getElementById("modoNoche");
const iconoSol = document.getElementById("iconoSol");
const iconoLuna = document.getElementById("iconoLuna");
const iconoSubir = document.getElementById("iconoSubir");
const iconoLupa = document.getElementById("iconoLupa");

radioDia.addEventListener("change", () => {
  if (radioDia.checked) {
    document.body.classList.remove("darkMode");
    iconoSol.src = "assets/img/iconos/sol-dia.png";
    iconoLuna.src = "assets/img/iconos/luna-dia.png";
    iconoSubir.src = "assets/img/iconos/subir-dia.png";
    iconoLupa.src = "assets/img/iconos/lupa-dia.png";
  }
});

radioNoche.addEventListener("change", () => {
  if (radioNoche.checked) {
    document.body.classList.add("darkMode");
    iconoSol.src = "assets/img/iconos/sol-noche.png";
    iconoLuna.src = "assets/img/iconos/luna-noche.png";
    iconoSubir.src = "assets/img/iconos/subir-noche.png";
    iconoLupa.src = "assets/img/iconos/lupa-noche.png";
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


iconoSubir.addEventListener("click", () => {
  form.style.display = "flex";
})

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
    imagenUrl: document.getElementById("imagenUrl").value,
  };

  peleadores.push(nuevoPeleador); // Guardamos en el array
  renderPeleador(nuevoPeleador); // Pintamos en la página
  form.reset(); // Limpiar formulario
});

// Hacemos que el boton de la cruz cambie cuando queramos cerrar el formulario
const imagenCerrarFormulario = document.getElementById("imagenCerrarFormulario");

imagenCerrarFormulario.addEventListener("mouseover", () => {
  imagenCerrarFormulario.src = "assets/img/iconos/cerrar-hover.png";
})

imagenCerrarFormulario.addEventListener("mouseout", () => {
  imagenCerrarFormulario.src = "assets/img/iconos/cerrar.png";
})

//Ahora hacemos que el boton cierre y limpie el formulario
imagenCerrarFormulario.addEventListener("click", (e) => {
  form.style.display = "none";
  form.reset();
})