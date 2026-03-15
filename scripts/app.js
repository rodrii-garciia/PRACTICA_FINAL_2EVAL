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
    iconoSol.src = "assets/img/iconosHeader/sol-dia.png";
    iconoLuna.src = "assets/img/iconosHeader/luna-dia.png";
    iconoSubir.src = "assets/img/iconosHeader/subir-dia.png";
    iconoLupa.src = "assets/img/iconosHeader/lupa-dia.png";
  }
});

radioNoche.addEventListener("change", () => {
  if (radioNoche.checked) {
    document.body.classList.add("darkMode");
    iconoSol.src = "assets/img/iconosHeader/sol-noche.png";
    iconoLuna.src = "assets/img/iconosHeader/luna-noche.png";
    iconoSubir.src = "assets/img/iconosHeader/subir-noche.png";
    iconoLupa.src = "assets/img/iconosHeader/lupa-noche.png";
  }
});

// Extraer peleadores del XML

//Creamos un array de peleadores
const peleadores = [];

//Coghemos la informacion del xml
fetch("data/peleadores.xml")
  .then((peleador) => peleador.text())
  .then((xmlString) => {
    //Creamos un objeto para pasar la información del xml a String
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");

    //Recogemos la información del xml en un array para poder utilizarlo después
    const peleadoresXML = xml.getElementsByTagName("peleador");

    //Creamos un bucle para recorrer el array con la información de los peleadores para ir introduciendolos
    // dinamicamente en el html
    for (let i = 0; i < peleadoresXML.length; i++) {
      //Creamos un objeto peleador con cada uno de los que tenemos en el XML
      const peleador = {
        id: "peleador " + (i + 1),
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

//Recogemos el ul de la lista de peleadores
const lista = document.getElementById("listaPeleadores");

//Funcion para imprimir por pantalla un peleador
function renderPeleador(p) {
  const li = document.createElement("li");

  //Introducimos los datos del peleador
  li.innerHTML = `
                <img src="${p.imagenUrl}" alt="Imagen de ${p.nombre} ${p.apellido}">
                <h2>${p.nombre} ${p.apellido}</h2>
                <p>${p.alias}</p>
                <p>${p.pais}</p>
                <p>${p.cita}</p>
            `;

  //Ponemos el peleador en el ul del html dinamicamente
  lista.appendChild(li);
}
