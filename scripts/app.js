// Cambiar al darkMode
const radioDia = document.getElementById('modoDia');
const radioNoche = document.getElementById('modoNoche');
const iconoSol = document.getElementById('iconoSol');
const iconoLuna = document.getElementById('iconoLuna');

radioDia.addEventListener('change', () => {
    if (radioDia.checked) {
        document.body.classList.remove('darkMode');
        iconoSol.src = "assets/img/sol-dia.png";
        iconoLuna.src = "assets/img/luna-dia.png";
    }
});

radioNoche.addEventListener('change', () => {
    if (radioNoche.checked) {
        document.body.classList.add('darkMode');
        iconoSol.src = "assets/img/sol-noche.png";
        iconoLuna.src = "assets/img/luna-noche.png";
    }
});

// Extraer peleadores del XML
const peleadores = [];
fetch("data/peleadores.xml")
    .then(peleador => peleador.text())
    .then(xmlString => {

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, "text/xml");

        const peleadoresXML = xml.getElementsByTagName("peleador");
        const lista = document.querySelector(".listaPeleadores");

        for(let i = 0; i < peleadoresXML.length; i++){

            const id = "peleador" + (i+1)
            const nombre = peleadoresXML[i].getElementsByTagName("nombre")[0].textContent;
            const apellido = peleadoresXML[i].getElementsByTagName("apellido")[0].textContent;
            const alias = peleadoresXML[i].getElementsByTagName("alias")[0].textContent;
            const pais = peleadoresXML[i].getElementsByTagName("pais")[0].textContent;
            const cita = peleadoresXML[i].getElementsByTagName("cita")[0].textContent;
            const imagenUrl = peleadoresXML[i].getElementsByTagName("imagenUrl")[0].textContent;

            const elemento = document.createElement("li");

            elemento.innerHTML = `
                <img src="${imagenUrl}" alt="Imagen de ${nombre} ${apellido}">
                <h2>${nombre} ${apellido}</h2>
                <p class="alias">${alias}</p>
                <p class="pais">${pais}</p>
                <p class="cita">${cita}</p>
            `

            elemento.classList.add("tarjeta");

            lista.appendChild(elemento);

            // este array se crea para usarse en el filtrado
            peleadores.push(
                {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    alias: alias,
                    pais: pais,
                    cita: cita,
                    imagenUrl: imagenUrl
                }
            )
        }
    })