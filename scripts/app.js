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

//Creamos un array de peleadores
const peleadores = [];

//Coghemos la informacion del xml
fetch("data/peleadores.xml")
    .then(peleador => peleador.text())
    .then(xmlString => {

        //Creamos un objeto para pasar la información del xml a String
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, "text/xml");

        //Recogemos la información del xml en un array para poder utilizarlo después
        const peleadoresXML = xml.getElementsByTagName("peleador");

        //Recogemos el elemento ul en el que luego appendearemos los li con la información de los peleadores
        const lista = document.getElementById("listaPeleadores");

        //Creamos un bucle para recorrer el array con la información de los peleadores para ir introduciendolos
        // dinamicamente en el html
        for(let i = 0; i < peleadoresXML.length; i++){

            //Recogemos toda la información del xml y la almacenamos en constantes
            //La guardamos en constantes ya qué en cada iteración del bucle la constante "desaparece" y se crea una nueva,
            //por eso no es que alteremos la constante, sino que creamos una nueva con el mismo nombre guardando
            //información distinta
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
                <p>${alias}</p>
                <p>${pais}</p>
                <p>${cita}</p>
            `

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