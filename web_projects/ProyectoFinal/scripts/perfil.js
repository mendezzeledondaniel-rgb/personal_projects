function renderizarMiPerfil(usuarioCargado) {
    const perfilHUD = document.getElementById('perfil_container');

    const nombreUsuario = usuarioCargado.nombre;
    const nivelUsuario = usuarioCargado.nivel || 1;
    const xpUsuario = usuarioCargado.xp || 0;
    const totalHabitos = usuarioCargado.habitos.length;
    const totalPokemon = usuarioCargado.pokemonObtenidos.length;
    const pokemonPrincipal = usuarioCargado.pokemonObtenidos.find(p => p.id === usuarioCargado.idPokemonPrincipalActual);
    const listaPokemonObtenidos = usuarioCargado.pokemonObtenidos.map(p => p.nombre).join(", ");

    const perfilHTML = `
        <div class="perfil_nombre_usuario">
            <h3>${nombreUsuario}</h3>
        </div>
        <div class="perfil_nivel_usuario">
            <p>Nivel</p>
            <p style="font-size: 24px;">${nivelUsuario}</p>
        </div>
        <div class="perfil_xp_usuario">
            <p>Experiencia</p>
            <p style="font-size: 20px;">${xpUsuario} XP</p>
        </div>
        <div class="perfil_total_habitos">
            <h4>Detalles de Hábitos</h4>
            <p>Total: ${totalHabitos}</p>
        </div>
        <div class="perfil_pokemon">
            <div class="perfil_total_pokemon">
                <h4>Detalles de Pokémon</h4>
                <p>Total obtenidos: ${totalPokemon}</p>
            </div>
            <div class="perfil_pokemon_principal_y_lista">
                <div class="perfil_pokemon_principal">
                    <p><strong>Principal:</strong> ${pokemonPrincipal ? pokemonPrincipal.nombre : "No seleccionado"}</p>
                </div>
                <div class="perfil_lista_pokemon">
                    <p><strong>Colección:</strong> ${listaPokemonObtenidos}</p>
                </div>
            </div>
        </div>
    `;
    perfilHUD.innerHTML = perfilHTML;
};

function renderizarRegistroTareas(usuarioCargado) {
    const totalRegistrosUsuario = document.getElementById("total_registros_del_usuario");
    const registroTareasContainer = document.getElementById("registro_tareas_lista");
    let returnHTMLporFecha = ``;
    const registros = usuarioCargado.registros || [];

    // Renderizo el total de los registros de usuario
    const returnHTMLRegistros = `
        <span id="total_registros_usuario">${Object.keys(registros).length}</span>
    `;
    totalRegistrosUsuario.innerHTML = returnHTMLRegistros;

    // Renderizo las tareas por cada fecha del usuario
    const fechasRegistros = Object.keys(registros);
    if (fechasRegistros.length === 0) {
        registroTareasContainer.innerHTML = "<p>No hay registros de tareas aún.</p>";
        return;
    } else {
        //Este for controla las fechas
        for (let i = 0; i < fechasRegistros.length; i++) {
            const fecha = fechasRegistros[i];
            const idTareas = Object.keys(registros[fecha]);
            let returnHTML = ``;
            //Este for controla los id y datos de los registros
            for (let j = 0; j < idTareas.length; j++) {
                const idTarea = idTareas[j];
                const valorTarea = registros[fecha][idTarea];
                const tareaCompleta = usuarioCargado.habitos.find(h => h.id === parseInt(idTarea));
                let laTareaEstaComlpetada = "Sin Completar";
                let valorTareaTipoCantidad = "N/A"
                let tieneMeta = "N/A";
                if (tareaCompleta.tipo === "Binario") {
                    valorTareaTipoCantidad = valorTarea ? "Checked" : "Unchecked";
                    if (valorTarea === true) {
                        laTareaEstaComlpetada = "Completada";
                    }
                } else {
                    valorTareaTipoCantidad = valorTarea;
                    tieneMeta = tareaCompleta.meta;
                    if (valorTarea >= tareaCompleta.meta) {
                        laTareaEstaComlpetada = "Completada";
                    }
                }
                returnHTML = `
                    ${returnHTML}
                    <div class="registro_tareas_linea">
                        <div class="registro_tarea"><p>${fecha}</p></div>
                        <div class="registro_tarea"><p>${tareaCompleta.nombre}</p></div>
                        <div class="registro_tarea"><p>${tareaCompleta.categoria}</p></div>
                        <div class="registro_tarea"><p>${tareaCompleta.frecuencia}</p></div>
                        <div class="registro_tarea"><p>${tareaCompleta.tipo}</p></div>
                        <div class="registro_tarea"><p>${tieneMeta}</p></div>
                        <div class="registro_tarea"><p>${valorTareaTipoCantidad}</p></div>
                        <div class="registro_tarea"><p>${laTareaEstaComlpetada}</p></div>
                    </div>

                `
            }
            returnHTMLporFecha = `
                ${returnHTMLporFecha}
                <div class="registro_tareas_fecha_separador">
                    ${returnHTML}
                </div>
            `;
        }
    }
    //Para esta parte, puedo usar el nombre que tengo de los habitos, ya que estan ordenados de igual manera que los registros
    const modificarRegistroAnterior = `
        <h3>Modificar Registro Anterior</h3>
        <select id="modificar_registro_fecha_select">
            <option value="">Selecciona una fecha</option>
            ${fechasRegistros.map(f => `<option value="${f}">${f}</option>`).join("")}
        </select>
        <select id="modificar_registro_tarea_select" class="desaparece_lista_tareas">
            <option value="">Selecciona una tarea</option>
        </select>
        <select id="modificar_registro_valor_binario_select" class="desaparece_lista_tareas">
            <option value="">Selecciona un valor</option>
            <option value="true">Checked</option>
            <option value="false">Unchecked</option>
        </select>
        <label for="modificar_registro_valor_cantidad_input" class="desaparece_lista_tareas">Digite Nueva Cantidad</label>
        <input type="text" id="modificar_registro_valor_cantidad_input" name="modificar_registro_valor_cantidad_input" defaultValue="" required class="desaparece_lista_tareas">
        <p class="error" id="error_modificar_registro_valor_cantidad_input"></p>
        <button id="modificar_registro_btn" class="desaparece_lista_tareas">Modificar Registro</button>
    `;

    returnHTMLporFecha = `
        ${returnHTMLporFecha}
        ${modificarRegistroAnterior}
    `;
    registroTareasContainer.innerHTML = returnHTMLporFecha;
}

window.onload = function() {
    const usuarioCargado = JSON.parse(localStorage.getItem('usuarioActual'));
    renderizarMiPerfil(usuarioCargado);

    const cambiarPokemonContainer = document.getElementById('cambiar_pokemon_container');
    const cambiarPokemonHTML = `
        <h3>Cambiar Pokémon Principal</h3>
        <select id="cambiar_pokemon_select">
            <option value="">Selecciona un Pokémon</option>
            ${usuarioCargado.pokemonObtenidos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("")}
        </select>
        <button id="cambiar_pokemon_btn">Cambiar Pokémon Principal</button>
    `;
    cambiarPokemonContainer.innerHTML = cambiarPokemonHTML;

    botonCambiarPokemon = document.getElementById("cambiar_pokemon_btn");
    botonCambiarPokemon.addEventListener("click", function() {
        const selectPokemon = document.getElementById("cambiar_pokemon_select");
        const pokemonSeleccionadoId = parseInt(selectPokemon.value);
        console.log("Pokemon seleccionado para cambiar:", pokemonSeleccionadoId);
        if (!pokemonSeleccionadoId) {
            alert("Por favor, selecciona un Pokémon para cambiar.");
            return;
        }
        const pokemonSeleccionado = usuarioCargado.pokemonObtenidos.find(p => p.id === pokemonSeleccionadoId);
        console.log("Pokémon seleccionado:", pokemonSeleccionado);
        usuarioCargado.idPokemonPrincipalActual = pokemonSeleccionadoId;
        console.log("Usuario después de cambiar Pokémon principal:", usuarioCargado);
        guardarUsuarioEnLocalStorage(usuarioCargado);
        exportarUsuarioAVariableOriginal();
        agregarActividad(usuarioCargado, "Cambiaste tu Pokémon principal a " + pokemonSeleccionado.nombre);
        alert("¡Pokémon principal cambiado exitosamente!");
        renderizarMiPerfil(usuarioCargado);
    });

    renderizarRegistroTareas(usuarioCargado);

    //Esta parte sirve para renderizar la seccion de modificar Registro Anterior.
    //Renderizo todos los elementos pero los hago aparecer segun lo elegido.

    const registros = usuarioCargado.registros || [];
    const selectFecha = document.getElementById("modificar_registro_fecha_select");
    const selectTarea = document.getElementById("modificar_registro_tarea_select");
    const selectValor = document.getElementById("modificar_registro_valor_binario_select");
    const inputValorCantidad = document.getElementById("modificar_registro_valor_cantidad_input");
    const botonModificarRegistro = document.getElementById("modificar_registro_btn");
    
    selectFecha.addEventListener("change", function(event) {
        selectTarea.classList.add("aparece_elemento");
        selectTarea.classList.remove("desaparece_lista_tareas");
        const fechaSeleccionada = event.target.value;
        const tareasDeFecha = Object.keys(usuarioCargado.registros[fechaSeleccionada] || {});
        const opcionesTareas = tareasDeFecha.map(id => {
            const habito = usuarioCargado.habitos.find(h => h.id === parseInt(id));
            return `<option value="${id}">${habito ? habito.nombre : 'Tarea desconocida'}</option>`;
        }).join("");
        selectTarea.innerHTML = `<option value="">Selecciona una tarea</option>${opcionesTareas}`;
    });
    selectTarea.addEventListener("change", function(event) {
        const elemento = event.target;
        const tareaSeleccionada = usuarioCargado.habitos.find(h => h.id === parseInt(event.target.value));
        if (tareaSeleccionada) {
            if (tareaSeleccionada.tipo === "Binario") {
                selectValor.classList.add("aparece_elemento");
                selectValor.classList.remove("desaparece_lista_tareas");
                inputValorCantidad.classList.add("desaparece_lista_tareas");
                inputValorCantidad.classList.remove("aparece_elemento");
            } else {
                inputValorCantidad.classList.add("aparece_elemento");
                inputValorCantidad.classList.remove("desaparece_lista_tareas");
                selectValor.classList.add("desaparece_lista_tareas");
                selectValor.classList.remove("aparece_elemento");
            }
            botonModificarRegistro.classList.add("aparece_elemento");
            botonModificarRegistro.classList.remove("desaparece_lista_tareas");
        }
    });

    botonModificarRegistro.addEventListener("click", function() {
        const fechaSeleccionada = selectFecha.value;
        const tareaSeleccionadaId = parseInt(selectTarea.value);
        const tareaSeleccionada = usuarioCargado.habitos.find(h => h.id === tareaSeleccionadaId);
        let nuevoValor;
        if (tareaSeleccionada.tipo === "Binario") {
            nuevoValor = selectValor.value === "true";
        } else {
            nuevoValor = Number(inputValorCantidad.value);
        }
        usuarioCargado.registros[fechaSeleccionada][tareaSeleccionadaId] = nuevoValor;
        guardarUsuarioEnLocalStorage(usuarioCargado);
        exportarUsuarioAVariableOriginal();
        verificarLogros(usuarioCargado);
        agregarActividad(usuarioCargado, "Modificaste un registro existente para " + tareaSeleccionada.nombre);
        renderizarRegistroTareas(usuarioCargado);
    });
};
