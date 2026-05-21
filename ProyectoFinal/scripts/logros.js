function determinarYRenderizarRachas(usuario){
    const rachasContainer = document.getElementById("rachas_container");
    rachasContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar las rachas
    const habitos = usuario.habitos || [];
    const registros = usuario.registros || {};
    const fechasRegistros = Object.keys(registros);
    
    // Ordenar fechas
    fechasRegistros.sort();
    
    for (let i = 0; i < habitos.length; i++) {
        const habito = habitos[i];
        const idHabito = habito.id;
        
        // Calcular racha actual
        let rachaActual = 0;
        let fechaActual = obtenerFechaActualFormateada();
        while (true) {
            if (registros[fechaActual] && registros[fechaActual][idHabito] !== undefined) {
                const valor = registros[fechaActual][idHabito];
                let completada = false;
                if (habito.tipo === "Binario") {
                    completada = valor === true;
                } else {
                    completada = valor >= habito.meta;
                }
                if (completada) {
                    rachaActual++;
                } else {
                    break;
                }
            } else {
                break;
            }
            // Restar un día
            const fecha = new Date(fechaActual);
            fecha.setDate(fecha.getDate() - 1);
            fechaActual = obtenerFechaActualFormateada(fecha);
        }
        
        // Calcular mejor racha histórica
        let mejorRacha = 0;
        let rachaTemp = 0;
        for (let j = 0; j < fechasRegistros.length; j++) {
            const fecha = fechasRegistros[j];
            if (registros[fecha][idHabito] !== undefined) {
                const valor = registros[fecha][idHabito];
                let completada = false;
                if (habito.tipo === "Binario") {
                    completada = valor === true;
                } else {
                    completada = valor >= habito.meta;
                }
                if (completada) {
                    rachaTemp++;
                    if (rachaTemp > mejorRacha) {
                        mejorRacha = rachaTemp;
                    }
                } else {
                    rachaTemp = 0;
                }
            }
        }
        
        // Porcentaje de cumplimiento en últimos 7 días
        let diasCumplidos = 0;
        let totalDias = 7;
        for (let k = 0; k < 7; k++) {
            const fecha = new Date();
            fecha.setDate(fecha.getDate() - k);
            const fechaStr = obtenerFechaActualFormateada(fecha);
            if (registros[fechaStr] && registros[fechaStr][idHabito] !== undefined) {
                const valor = registros[fechaStr][idHabito];
                let completada = false;
                if (habito.tipo === "Binario") {
                    completada = valor === true;
                } else {
                    completada = valor >= habito.meta;
                }
                if (completada) {
                    diasCumplidos++;
                }
            }
        }
        const porcentajeCumplimiento = (diasCumplidos / totalDias) * 100;
        
        // Promedio si es cantidad
        let promedio = 0;
        if (habito.tipo === "Cantidad") {
            let suma = 0;
            let count = 0;
            for (let k = 0; k < 7; k++) {
                const fecha = new Date();
                fecha.setDate(fecha.getDate() - k);
                const fechaStr = obtenerFechaActualFormateada(fecha);
                if (registros[fechaStr] && registros[fechaStr][idHabito] !== undefined) {
                    suma += registros[fechaStr][idHabito];
                    count++;
                }
            }
            promedio = count > 0 ? suma / count : 0;
        }
        
        // Renderizar
        const rachaHTML = `
            <div class="racha_habito">
                <h4>${habito.nombre}</h4>
                <div class="detalles_cajitas_rachas">
                    <div class="cajita_rachas">
                        <p>Racha Actual: ${rachaActual} días</p>
                    </div>
                    <div class="cajita_rachas">
                        <p>Mejor Racha: ${mejorRacha} días</p>
                    </div>
                    <div class="cajita_rachas">
                        <p>Cumplimiento últimos 7 días: ${porcentajeCumplimiento.toFixed(1)}%</p>
                    </div>
                    ${habito.tipo === "Cantidad" ? `<div id="cajita_promedio_ultimos_dias" class="cajita_rachas"><p>Promedio últimos 7 días: ${promedio.toFixed(1)}</p></div>` : `<div id="cajita_promedio_ultimos_dias" class="cajita_rachas"><p>Tarea Binaria, no tiene promedio</p></div>`}
                </div>
            </div>
        `;
        rachasContainer.innerHTML += rachaHTML;
    }
};


function renderizarLogros(usuario) {
    const logrosContainer = document.getElementById("logros_container");
    logrosContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar los logros
    const logrosUsuario = usuario.logros || [];
    
    const logrosHTML = logrosUsuario.map(function(logroUsuario) {
        // Encontrar el logro en logrosDisponibles
        let logroDisponible = null;
        for (let i = 0; i < logrosDisponibles.length; i++) {
            if (logrosDisponibles[i].id === logroUsuario.id) {
                logroDisponible = logrosDisponibles[i];
                break;
            }
        }
        if (logroDisponible) {
            return `
                <div class="logro_obtenido">
                    <h4>${logroDisponible.nombre}</h4>
                    <p>${logroDisponible.descripcion}</p>
                    <p>Fecha obtenida: ${logroUsuario.fecha}</p>
                </div>
            `;
        } else {
            return `
                <div class="logro_obtenido">
                    <h4>Logro desconocido</h4>
                    <p>Fecha obtenida: ${logroUsuario.fecha}</p>
                </div>
            `;
        }
    }).join("");
    
    logrosContainer.innerHTML = logrosHTML;
};


window.onload = function() {
    const usuarioCargado = JSON.parse(localStorage.getItem('usuarioActual'));
    determinarYRenderizarRachas(usuarioCargado);
    renderizarLogros(usuarioCargado);


};