window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const dia = params.get("dia");
    const reset = params.get("reset");

    // Función de desbloqueo de día
    if (dia) {
        desbloquearDia(dia);
    }

    // Reset de progreso si se escanea el QR de reset
    if (reset === "true") {
        localStorage.removeItem("progreso");
        alert("¡El progreso ha sido borrado!");
        window.location.href = "https://sergiobarrenopachon.github.io/Calendar/index.html";
    }

    const progreso = JSON.parse(localStorage.getItem("progreso")) || {};
    actualizarProgreso(progreso);

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

    function desbloquearDia(dia) {
        const progreso = JSON.parse(localStorage.getItem("progreso")) || {};
        progreso[dia] = "desbloqueado";
        localStorage.setItem("progreso", JSON.stringify(progreso));
        actualizarProgreso(progreso);
        mostrarPista(dia);
    }

    function mostrarPista(dia) {
        const mensaje = document.getElementById("mensaje");
        mensaje.innerHTML = `<h3>Pista para el día ${dia}</h3>
                             <p>¡Sigue este camino romántico para descubrir tu sorpresa final!</p>
                             <img src="img/imagen${dia}.jpg" alt="Imagen para el día ${dia}">`;
    }

    function actualizarProgreso(progreso) {
        const listaProgreso = document.getElementById("lista-progreso");
        listaProgreso.innerHTML = '';
        for (let i = 1; i <= 24; i++) {
            const li = document.createElement('li');
            li.textContent = `Día ${i}: ${progreso[i] ? 'Desbloqueado' : 'Bloqueado'}`;
            listaProgreso.appendChild(li);
            const diaElemento = document.querySelector(`[data-dia="${i}"]`);
            if (progreso[i]) {
                diaElemento.classList.add('desbloqueado');
            }
        }
    }
};

