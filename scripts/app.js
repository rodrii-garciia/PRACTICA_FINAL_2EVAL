//Cambiar al darkMode
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