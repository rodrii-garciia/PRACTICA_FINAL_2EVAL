//Cambiar al darkMode
const radioDia = document.getElementById('modoDia');
const radioNoche = document.getElementById('modoNoche');

radioDia.addEventListener('change', () => {
    if (radioDia.checked) {
        document.body.classList.remove('darkMode');
    }
});

radioNoche.addEventListener('change', () => {
    if (radioNoche.checked) {
        document.body.classList.add('darkMode');
    }
});