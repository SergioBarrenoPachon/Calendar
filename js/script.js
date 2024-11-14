window.onload = () => {
    // Cargar progreso desde localStorage
    const progreso = JSON.parse(localStorage.getItem('progreso')) || {};
    actualizarProgreso(progreso);

    // Desbloquear los días al escanear un QR
    document.querySelectorAll('.día').forEach(dia => {
        dia.addEventListener('click', function() {
            const diaNum = this.getAttribute('data-dia');
            if (!progreso[diaNum]) {
                progreso[diaNum] = 'desbloqueado';
                localStorage.setItem('progreso', JSON.stringify(progreso));
                actualizarProgreso(progreso);
                this.classList.add('desbloqueado');
                mostrarPista(diaNum);
            }
        });
    });

    // Mostrar las pistas cuando se desbloquea un día
    function mostrarPista(dia) {
        const mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = `<h3>Pista para el día ${dia}</h3>
                             <p>¡Aquí va la pista del día ${dia}!</p>
                             <img src="img/imagen${dia}.jpg" alt="Imagen para el día ${dia}">`;
    }

    // Actualizar el progreso mostrado
    function actualizarProgreso(progreso) {
        const listaProgreso = document.getElementById('lista-progreso');
        listaProgreso.innerHTML = '';
        for (let i = 1; i <= 24; i++) {
            const li = document.createElement('li');
            li.textContent = `Día ${i}: ${progreso[i] ? 'Desbloqueado' : 'Bloqueado'}`;
            listaProgreso.appendChild(li);

            // Desbloquear visualmente el día
            const diaElemento = document.querySelector(`[data-dia="${i}"]`);
            if (progreso[i]) {
                diaElemento.classList.add('desbloqueado');
            }
        }
    }
};
