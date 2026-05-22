async function renderizarUsuarioHUD(usuarioCargado) {
    let arrayPokemonElegidos = [];
    const nombreUsuarioHUD = document.getElementById('nombre_usuario_hud');
    const nivelUsuarioHUD = document.getElementById('nivel_usuario_hud');
    const experienciaUsuarioHUD = document.getElementById('experiencia_usuario_hud');
    const pokemonUsuarioHUD = document.getElementById('pokemon_usuario_hud');

    console.log("Usuario recibido para renderizar en el HUD: ", usuarioCargado);

    const nombreUsuario = usuarioCargado.nombre;
    const nivelUsuario = usuarioCargado.nivel;
    const experienciaUsuario = usuarioCargado.xp;
    const idPokemonPrincipalActual = usuarioCargado.idPokemonPrincipalActual;
    const listaIdsPokemonElegidos = usuarioCargado.idsPokemonSeleccionados;

    const returnNombreUsuarioHUD = `
        <p>Usuario: ${nombreUsuario}</p>
    `;
    const returnNivelUsuarioHUD = `
        <p>Nivel: ${nivelUsuario}</p>
    `;
    const returnExperienciaUsuarioHUD = `
        <p>Experiencia: ${experienciaUsuario} XP</p>
    `;
    
    //Elimina el pokemon principal de la lista de pokemon elegidos para renderizarlo aparte en el HUD
    for (let i = 0; i < listaIdsPokemonElegidos.length; i++) {
        if (listaIdsPokemonElegidos[i] === idPokemonPrincipalActual) {
            continue;
        } else {
            arrayPokemonElegidos.push(listaIdsPokemonElegidos[i]);
        }
    };
    //Primero renderizamos el pokemon principal
    const renderizadoPokemonPrincipal = relacionarIdElementos(usuarioCargado.pokemonObtenidos, idPokemonPrincipalActual);
    console.log("Pokemon principal a renderizar en el HUD: ", renderizadoPokemonPrincipal);
    const imgPokemonPrincipal = await cargarPokemon(renderizadoPokemonPrincipal.url);
    console.log("Imagen del pokemon principal a renderizar en el HUD: ", imgPokemonPrincipal);
    const stringPokemonPrincipal = `
        <div class="cajita_pokemon_principal">
            <div>
                <p>Pokemon Principal</p>
            </div>
            <div class="pokemon_principal_img">
                <img src="${imgPokemonPrincipal.sprites.front_default}" alt="${renderizadoPokemonPrincipal.nombre}">
            </div>
            <div class="pokemon_principal_info">
                <div class="pokemon_principal_nombre">
                    <p>${renderizadoPokemonPrincipal.nombre}</p>
                </div>
                <div class="pokemon_principal_nivel">
                    <p>Nivel ${renderizadoPokemonPrincipal.nivel}</p>
                </div>
                <div class="pokemon_principal_experiencia">
                    <p>${renderizadoPokemonPrincipal.xp} XP</p>
                </div>
            </div>
        </div>
    `;
    //Luego renderizamos los otros pokemon elegidos
    const promesasMiListaPokemonElegidos = arrayPokemonElegidos.map(async function(idPokemon) {
        const objetoPokemon = relacionarIdElementos(usuarioCargado.pokemonObtenidos, idPokemon);
        console.log("Pokemon elegido a renderizar en el HUD: ", objetoPokemon);
        const imgPokemon = await cargarPokemon(objetoPokemon.url);
        console.log("Imagen del pokemon elegido a renderizar en el HUD: ", imgPokemon);
        const returnCajitasPokemon = `
            <div class="cajita_de_cada_pokemon">
                <div class="pokemon_actual_img">
                    <img src="${imgPokemon.sprites.front_default}" alt="${objetoPokemon.nombre}">
                </div>
                <div class="pokemon_actual_info">
                    <div class="pokemon_actual_nombre">
                        <p>${objetoPokemon.nombre}</p>
                    </div>
                    <div class="pokemon_actual_nivel">
                        <p>Nivel ${objetoPokemon.nivel}</p>
                    </div>
                    <div class="pokemon_actual_experiencia">
                        <p>${objetoPokemon.xp} XP</p>
                    </div>
                </div>
            </div>
        `;
        return returnCajitasPokemon;
    });
    //Esto es para esperar a que se resuelvan todas las promesas de renderizado de los pokemon elegidos antes de hacer el join para renderizarlos en el HUD
    const miListaPokemonElegidos = await Promise.all(promesasMiListaPokemonElegidos);
    const returnPokemonUsuarioHUD = `
        ${stringPokemonPrincipal}
        ${miListaPokemonElegidos.join("")}
    `;
    nombreUsuarioHUD.innerHTML = returnNombreUsuarioHUD;
    nivelUsuarioHUD.innerHTML = returnNivelUsuarioHUD;
    experienciaUsuarioHUD.innerHTML = returnExperienciaUsuarioHUD;
    pokemonUsuarioHUD.innerHTML = returnPokemonUsuarioHUD;
};

function renderizarProgresos(usuario) {
    const contenedorProgresoDiario = document.getElementById("progreso_diario_container");
    const contenedorProgresoSemanal = document.getElementById("progreso_semanal_container");
    const registroActual = obtenerRegistroActualDeHabitos(usuario);
    
    // Progreso Diario
    const tareasDiarias = [];
    for (let i = 0; i < usuario.habitos.length; i++) {
        if (usuario.habitos[i].frecuencia === "Diaria") {
            tareasDiarias.push(usuario.habitos[i]);
        }
    }
    let completadasDiarias = 0;
    for (let i = 0; i < tareasDiarias.length; i++) {
        const tarea = tareasDiarias[i];
        const valor = registroActual[tarea.id];
        let completada = false;
        if (tarea.tipo === "Binario") {
            completada = valor === true;
        } else {
            completada = valor >= tarea.meta;
        }
        if (completada) {
            completadasDiarias++;
        }
    }
    const totalDiarias = tareasDiarias.length;
    const porcentajeDiario = totalDiarias > 0 ? (completadasDiarias / totalDiarias) * 100 : 0;
    const htmlDiario = `
        <div class="progreso-barra">
            <div class="progreso-llenado" style="width: ${porcentajeDiario}%"></div>
        </div>
        <p>${completadasDiarias} / ${totalDiarias} completadas</p>
    `;
    contenedorProgresoDiario.innerHTML = htmlDiario;
    
    // Progreso Semanal
    const tareasSemanales = [];
    for (let i = 0; i < usuario.habitos.length; i++) {
        if (usuario.habitos[i].frecuencia === "Semanal") {
            tareasSemanales.push(usuario.habitos[i]);
        }
    }
    let completadasSemanales = 0;
    for (let i = 0; i < tareasSemanales.length; i++) {
        const tarea = tareasSemanales[i];
        const valor = registroActual[tarea.id];
        let completada = false;
        if (tarea.tipo === "Binario") {
            completada = valor === true;
        } else {
            completada = valor >= tarea.meta;
        }
        if (completada) {
            completadasSemanales++;
        }
    }
    const totalSemanales = tareasSemanales.length;
    const porcentajeSemanal = totalSemanales > 0 ? (completadasSemanales / totalSemanales) * 100 : 0;
    const htmlSemanal = `
        <div class="progreso-barra">
            <div class="progreso-llenado" style="width: ${porcentajeSemanal}%"></div>
        </div>
        <p>${completadasSemanales} / ${totalSemanales} completadas</p>
    `;
    contenedorProgresoSemanal.innerHTML = htmlSemanal;
};

function obtenerListaNombresTareasActuales(usuario) {
    const tareas = usuario.habitos;
    const nombresTareas = [];
    for (let i = 0; i < tareas.length; i++) {
        nombresTareas.push(tareas[i].nombre);
    }
    return nombresTareas;
};

function renderizarOpcionesTareasAModificarOEliminar(tareas=[], elemento) {
    const renderizadoOpciones = document.getElementById(elemento);
    const listaOption = tareas.map(function (tarea) {
        return `
            <option value="${tarea.id}">${tarea.nombre}</option>
            `;
    }).join("");
    const retunrOpciones = `
        <option value="">Seleccionar Tarea</option>
        ${listaOption}
    `;
    renderizadoOpciones.innerHTML = retunrOpciones;
}

function renderizarTareaSeleccionadaModificar(tarea) {
    const contenedorOpcionesTareasModificadas = document.getElementById("contenedor_modal_opciones_tareas_modificadas");
    const renderizadoTareaSeleccionada = `
        <div class="modal_campo">
            <label for="modal_modificar_id_tarea" class="desaparece_lista_tareas">ID de Tarea:</label>
            <input type="text" id="modal_modificar_id_tarea" name="modal_modificar_id_tarea" value="${tarea.id}" readonly class="desaparece_lista_tareas">
        </div>
        <div class="modal_campo">
            <label for="modal_modificar_titulo_tarea">Titulo de Tarea:</label>
            <input type="text" id="modal_modificar_titulo_tarea" name="modal_modificar_titulo_tarea" value="${tarea.nombre}">
            <p class="error" id="error_modal_modificar_titulo_tarea"></p>
        </div>
        <div class="modal_campo">
            <label for="modal_modificar_categoria_tarea">Categoría</label>
            <select id="modal_modificar_categoria_tarea" name="modal_modificar_categoria_tarea" value="${tarea.categoria}" required>
                <option value="">Seleccionar Categoria</option>
                <option value="Salud" ${tarea.categoria === "Salud" ? "selected" : ""}>Salud</option>
                <option value="Ejercicio" ${tarea.categoria === "Ejercicio" ? "selected" : ""}>Ejercicio</option>
                <option value="Alimentacion" ${tarea.categoria === "Alimentacion" ? "selected" : ""}>Alimentación</option>
                <option value="Estudio" ${tarea.categoria === "Estudio" ? "selected" : ""}>Estudio</option>
                <option value="Trabajo" ${tarea.categoria === "Trabajo" ? "selected" : ""}>Trabajo</option>
                <option value="Hogar" ${tarea.categoria === "Hogar" ? "selected" : ""}>Hogar</option>
                <option value="Ocio" ${tarea.categoria === "Ocio" ? "selected" : ""}>Ocio</option>
                <option value="Otros" ${tarea.categoria === "Otros" ? "selected" : ""}>Otros</option>
            </select>
            <p class="error" id="error_modal_modificar_categoria_tarea"></p>
        </div>
        <div class="modal_campo">
            <label for="modal_modificar_frecuencia_tarea">Frecuencia</label>
            <select id="modal_modificar_frecuencia_tarea" name="modal_modificar_frecuencia_tarea" value="${tarea.frecuencia}" required>
                <option value="">Seleccionar Frecuencia</option>
                <option value="Diaria" ${tarea.frecuencia === "Diaria" ? "selected" : ""}>Diaria</option>
                <option value="Semanal" ${tarea.frecuencia === "Semanal" ? "selected" : ""}>Semanal</option>
                <option value="Quincenal" ${tarea.frecuencia === "Quincenal" ? "selected" : ""}>Quincenal</option>
                <option value="Mensual" ${tarea.frecuencia === "Mensual" ? "selected" : ""}>Mensual</option>
            </select>
            <p class="error" id="error_modal_modificar_frecuencia_tarea"></p>
        </div>
        <div class="modal_campo">
            <label for="modal_modificar_tipo_tarea">Tipo</label>
            <select id="modal_modificar_tipo_tarea" name="modal_modificar_tipo_tarea" value="${tarea.tipo}" required>
                <option value="">Seleccionar Tipo</option>
                <option value="Cantidad" ${tarea.tipo === "Cantidad" ? "selected" : ""}>Cantidad</option>
                <option value="Binario" ${tarea.tipo === "Binario" ? "selected" : ""}>Binario</option>
            </select>
            <p class="error" id="error_modal_modificar_tipo_tarea"></p>
        </div>
        <div id="modal_contenedor_meta_modificar" class="modal_campo desaparece_lista_tareas">
            <label for="modal_modificar_meta_tarea">Meta</label>
            <input type="number" id="modal_modificar_meta_tarea" name="modal_modificar_meta_tarea" min="1" value="${tarea.meta || 0}" required>
            <p class="error" id="error_modal_modificar_meta_tarea"></p>
        </div>
    `;
    contenedorOpcionesTareasModificadas.innerHTML = renderizadoTareaSeleccionada;
}


function actualizarRegistro(usuario, idTarea, valor) {
    const fechaActual = obtenerFechaActualFormateada();
    usuario.registros[fechaActual][idTarea] = valor;
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function eliminarRegistro(usuario, idTarea) {
    const fechaActual = obtenerFechaActualFormateada();
    delete usuario.registros[fechaActual][idTarea];
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function inicializarNuevoRegistroDeHabitos(usuario) {
    const fechaActual = obtenerFechaActualFormateada();
    usuario.registros[fechaActual] = {};
    for (let i = 0; i < usuario.habitos.length; i++) {
        const habito = usuario.habitos[i];
        if (habito.tipo === "Binario") {
            usuario.registros[fechaActual][habito.id] = false;
        } else if (habito.tipo === "Cantidad") {
            usuario.registros[fechaActual][habito.id] = 0;
        }
    }
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
};

function obtenerRegistroActualDeHabitos(usuario) {
    const registros = usuario.registros;
    const fechaActual = obtenerFechaActualFormateada();
    if (registros[fechaActual]) {
        console.log("Registros de hábitos para la fecha actual: ", registros[fechaActual]);
        return registros[fechaActual];
    } else {
        inicializarNuevoRegistroDeHabitos(usuario);
        console.log("No había registros para la fecha actual. Se han inicializado los registros: ", usuario.registros[fechaActual]);
        return registros[fechaActual];
    }
};

function renderizarTareasPorTipo(usuario, tareas = []) {
    const registroActual = obtenerRegistroActualDeHabitos(usuario);
    console.log("Registro actual de hábitos obtenido para renderizar las tareas: ", registroActual);
    const listaLI = tareas.map(function (tarea) {
        const id = `${tarea.id}-${tarea.nombre}`;
        //console.log("Renderizando tarea: ", tarea);
        //console.log("Tipo de tarea: ", tarea.tipo);
        if (tarea.tipo === "Cantidad") {
            return `
                <li>
                    <input type = "number" id="${id}" value="${registroActual[tarea.id] || 0}"/>
                    <label for="${id}">${tarea.nombre} - Meta: ${tarea.meta}</label>
                </li>
            `;
      }  else {
            if (tarea.tipo === "Binario") {
                return `
                <li>
                    <input type="checkbox" id="${id}" ${registroActual[tarea.id] ? "checked" : ""}/>
                    <label for="${id}">${tarea.nombre}</label>
                </li>
                `;
            }
        }
    })
    .join("");
    return listaLI;
}
function renderizarTareas(usuario) {
    const tareas = usuario.habitos;
    const soloTareasDiarias = [];
    const soloTareasSemanales = [];
    const soloTareasQuincenales = [];
    const soloTareasMensuales = [];

    const listaTareasDiariasHTML = document.getElementById("lista_tareas_diarias");
    listaTareasDiariasHTML.innerHTML = "";
    const listaTareasSemanalesHTML = document.getElementById("lista_tareas_semanales");
    listaTareasSemanalesHTML.innerHTML = "";
    const listaTareasQuincenalesHTML = document.getElementById("lista_tareas_quincenales");
    listaTareasQuincenalesHTML.innerHTML = "";
    const listaTareasMensualesHTML = document.getElementById("lista_tareas_mensuales");
    listaTareasMensualesHTML.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        if (tarea.frecuencia === "Diaria") {
            soloTareasDiarias.push(tarea);
        } else if (tarea.frecuencia === "Semanal") {
            soloTareasSemanales.push(tarea);
        } else if (tarea.frecuencia === "Quincenal") {
            soloTareasQuincenales.push(tarea);
        } else if (tarea.frecuencia === "Mensual") {
            soloTareasMensuales.push(tarea);
        }
    }
   //Esta seccion sirve para verificar si hay tareas de cada tipo, si no hay, se oculta la lista de ese tipo, si hay, se renderiza normalmente
    if (soloTareasDiarias.length === 0) {
        const contenedorTareas = document.getElementById("contenedor_tareas_diarias");
        contenedorTareas.classList.add("desaparece_lista_tareas");
        contenedorTareas.classList.remove("contenedor_tareas");
    } else {
        const contenedorTareas = document.getElementById("contenedor_tareas_diarias");
        contenedorTareas.classList.remove("desaparece_lista_tareas");
        contenedorTareas.classList.add("contenedor_tareas");
        const tareasDiariasHTML = renderizarTareasPorTipo(usuario, soloTareasDiarias);
        listaTareasDiariasHTML.innerHTML = tareasDiariasHTML;
    }
    if (soloTareasSemanales.length === 0) {
        const contenedorTareas = document.getElementById("contenedor_tareas_semanales");
        contenedorTareas.classList.add("desaparece_lista_tareas");
        contenedorTareas.classList.remove("contenedor_tareas");
    } else {
        const contenedorTareas = document.getElementById("contenedor_tareas_semanales");
        contenedorTareas.classList.remove("desaparece_lista_tareas");
        contenedorTareas.classList.add("contenedor_tareas");
        const tareasSemanalesHTML = renderizarTareasPorTipo(usuario, soloTareasSemanales);
        listaTareasSemanalesHTML.innerHTML = tareasSemanalesHTML;
    }   
    if (soloTareasQuincenales.length === 0) {
        const contenedorTareas = document.getElementById("contenedor_tareas_quincenales");
        contenedorTareas.classList.add("desaparece_lista_tareas");
        contenedorTareas.classList.remove("contenedor_tareas");
    } else {
        const contenedorTareas = document.getElementById("contenedor_tareas_quincenales");
        contenedorTareas.classList.remove("desaparece_lista_tareas");
        contenedorTareas.classList.add("contenedor_tareas");
        const tareasQuincenalesHTML = renderizarTareasPorTipo(usuario, soloTareasQuincenales);
        listaTareasQuincenalesHTML.innerHTML = tareasQuincenalesHTML;
    }
    if (soloTareasMensuales.length === 0) {
        const contenedorTareas = document.getElementById("contenedor_tareas_mensuales");
        contenedorTareas.classList.add("desaparece_lista_tareas");
        contenedorTareas.classList.remove("contenedor_tareas");
    } else {
        const contenedorTareas = document.getElementById("contenedor_tareas_mensuales");
        contenedorTareas.classList.remove("desaparece_lista_tareas");
        contenedorTareas.classList.add("contenedor_tareas");
        const tareasMensualesHTML = renderizarTareasPorTipo(usuario, soloTareasMensuales);
        listaTareasMensualesHTML.innerHTML = tareasMensualesHTML;
    }

    const registroActual = obtenerRegistroActualDeHabitos(usuario);
    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const valor = registroActual[tarea.id];
        const labelTarea = document.querySelector(`label[for="${tarea.id}-${tarea.nombre}"]`);
        if (tarea.tipo === "Binario") {
            if (valor === true) {
                labelTarea.classList.add("tarea_completada");
            } else {
                labelTarea.classList.remove("tarea_completada");
            }
        } else if (tarea.tipo === "Cantidad") {
            if (valor >= tarea.meta) {
                labelTarea.classList.add("tarea_completada");
            } else {
                labelTarea.classList.remove("tarea_completada");
            }
        }
    }    
};

function retornarPuntajeSegunFrecuencia(frecuencia) {
    const puntosDeFrecuencias= JSON.parse(localStorage.getItem("puntosFrecuencias"));

    if (frecuencia === "Diaria") {
        return puntosDeFrecuencias.Diaria;
    } else if (frecuencia === "Semanal") {
        return puntosDeFrecuencias.Semanal;
    } else if (frecuencia === "Quincenal") {
        return puntosDeFrecuencias.Quincenal;
    }   else if (frecuencia === "Mensual") {
        return puntosDeFrecuencias.Mensual;
    }
};

function actualizarPuntosYTareasChecked(usuario, idCompuestaTarea, aumentarPuntos) {
    const idTarea = idCompuestaTarea.split("-")[0];
    const tarea = relacionarIdElementos(usuario.habitos, parseInt(idTarea));
    console.log("Tarea encontrada para actualizar puntos: ", tarea);
    const frecuenciaDeTarea = tarea.frecuencia;
    console.log("Frecuencia de la tarea encontrada: ", frecuenciaDeTarea);
    const pokemonPrincipal = relacionarIdElementos(usuario.pokemonObtenidos, usuario.idPokemonPrincipalActual);
    const puntosGanados = retornarPuntajeSegunFrecuencia(frecuenciaDeTarea);
    console.log("Puntos a ganar o perder según la frecuencia de la tarea: ", puntosGanados);
    
    if(aumentarPuntos) {
        entrenarPokemon(usuario, pokemonPrincipal, puntosGanados);
        alert(`¡Has ganado ${puntosGanados} puntos de experiencia para tu pokemon ${pokemonPrincipal.nombre}!`);
        entrenarUsuario(usuario, puntosGanados);
        actualizarRegistro(usuario, idTarea, true);
        if (tarea.tipo === "Binario") {
            agregarActividad(usuario, "Completaste el hábito binario: " + tarea.nombre);
        }
        //localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    } else {
        desentrenarPokemon(usuario, pokemonPrincipal, puntosGanados);
        alert(`Se han restado ${puntosGanados} puntos de experiencia para tu pokemon ${pokemonPrincipal.nombre}.`);
        desentrenarUsuario(usuario, puntosGanados);
        actualizarRegistro(usuario, idTarea, false);
        //localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    }

    verificarLogros(usuario);
    renderizarHistorial(usuario);
};

function actualizarPuntosYTareasMetas(usuario, idCompuestaTarea, cantidadIngresada) {
    const registroActualUsuario = obtenerRegistroActualDeHabitos(usuario);
    const idTarea = idCompuestaTarea.split("-")[0];
    const tarea = relacionarIdElementos(usuario.habitos, parseInt(idTarea));
    console.log("Tarea encontrada para actualizar puntos: ", tarea);
    const frecuenciaDeTarea = tarea.frecuencia;
    console.log("Frecuencia de la tarea encontrada: ", frecuenciaDeTarea);
    const pokemonPrincipal = relacionarIdElementos(usuario.pokemonObtenidos, usuario.idPokemonPrincipalActual);
    const puntosGanados = retornarPuntajeSegunFrecuencia(tarea.frecuencia);
    if( cantidadIngresada >= tarea.meta && registroActualUsuario[idTarea] < tarea.meta) {
        entrenarPokemon(usuario, pokemonPrincipal, puntosGanados);
        alert(`¡Has ganado ${puntosGanados} puntos de experiencia para tu pokemon ${pokemonPrincipal.nombre}!`);
        entrenarUsuario(usuario, puntosGanados);
        console.log("Experiencia del Usuario después de actualizar: ", usuario.xp);
        actualizarRegistro(usuario, idTarea, cantidadIngresada);
        agregarActividad(usuario, "Completaste el hábito de cantidad: " + tarea.nombre);
        //localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    } else if (cantidadIngresada < tarea.meta && registroActualUsuario[idTarea] >= tarea.meta)  {
        desentrenarPokemon(usuario, pokemonPrincipal, puntosGanados);
        alert(`Se han restado ${puntosGanados} puntos de experiencia para tu pokemon ${pokemonPrincipal.nombre}.`);
        desentrenarUsuario(usuario, puntosGanados);
        console.log("Experiencia del Usuario después de actualizar: ", usuario.xp);
        actualizarRegistro(usuario, idTarea, cantidadIngresada);
        //localStorage.setItem("usuarioActual", JSON.stringify(usuario)); 
    } else {
        actualizarRegistro(usuario, idTarea, cantidadIngresada);
        //localStorage.setItem("usuarioActual", JSON.stringify(usuario)); 
    }

    verificarLogros(usuario);
    renderizarHistorial(usuario);
};

function obtenerSiguienteIdDisponible(tareas) {
    console.log("Tareas length= ", tareas.length);
    
    if (tareas.length === 0) {
        console.log("ID de la ultmia tarea= 0");
        return 1;
    }
    console.log("ID de la ultmia tarea= ", tareas.at(-1).id);
    if (tareas.length === tareas.at(-1).id) {
        return tareas.length + 1;
    } else {
        for (let i = 1; i <= tareas.length; i++) {
            const miId= tareas.find(function(tarea) {
                return tarea.id === i;
            });
            console.log("MiId= ", miId);
            if ( miId === undefined ) {
                return i;
            }
        }
    }
}


let contenedorListaTareas;
let seleccionEnHeaderBar;
let botonAgregarTarea;
let botonModificarTarea;
let botonEliminarTarea;

window.onload = function() {
    const usuarioCargado = JSON.parse(localStorage.getItem('usuarioActual'));
    renderizarUsuarioHUD(usuarioCargado);
    renderizarProgresos(usuarioCargado);
    renderizarTareas(usuarioCargado);

    contenedorListaTareas = document.getElementById("contenedor_lista_tareas");
    console.log("Contenedor lista tareas al cargar la página: ", contenedorListaTareas);

    contenedorListaTareas.addEventListener("change", function(event) {
        const elemento = event.target;
        if (elemento.type === "checkbox") {
            if (elemento.checked) {
                console.log("Tarea marcada como completada: ", elemento.id);
                actualizarPuntosYTareasChecked(usuarioCargado, elemento.id, true);
                console.log("Usuario después de marcar tarea como completada: ", JSON.parse(localStorage.getItem("usuarioActual")));
            } else {
                console.log("Tarea desmarcada como no completada: ", elemento.id);
                actualizarPuntosYTareasChecked(usuarioCargado, elemento.id, false);
                console.log("Usuario después de desmarcar tarea como no completada: ", JSON.parse(localStorage.getItem("usuarioActual")));
            }
        }
        if (elemento.type === "number") {
            if (elemento.value > 0) {
                console.log("Cantidad ingresada para la tarea: ", elemento.id, " es: ", elemento.value);
                actualizarPuntosYTareasMetas(usuarioCargado, elemento.id, parseInt(elemento.value));
                console.log("Usuario después de ingresar cantidad para tarea: ", JSON.parse(localStorage.getItem("usuarioActual")));
            }
        }
        renderizarUsuarioHUD(usuarioCargado);
        renderizarProgresos(usuarioCargado);
        renderizarTareas(usuarioCargado);
    });

    //Guardo el usuario completo en el local storage al cambiar de pagina para no perder los cambios realizados en las tareas y puntos
    seleccionEnHeaderBar = document.getElementById("header_bar");
    seleccionEnHeaderBar.addEventListener("click", function(event) {
        const elemento = event.target;
        console.log("Elemento clickeado en la selección de página: ", elemento);
        exportarUsuarioAVariableOriginal();
    });

    //SECCION PARA AGRAGAR TAREA
    botonAgregarTarea = document.getElementById("boton_agregar_tarea");
    const agregarTareaModal = document.getElementById("agregar_tarea_modal");

    botonAgregarTarea.addEventListener("click", function(event) {
        const elemento = event.target;
        console.log("Boton AgregarTarea tocado: ", elemento);
        formularioAgregarTareaModal.reset();
        metaContenedor.classList.add("desaparece_lista_tareas");
        metaContenedor.classList.remove("aparece_elemento");
        agregarTareaModal.classList.add("aparece_elemento");
        agregarTareaModal.classList.remove("desaparece_lista_tareas");
    });

    // Cerrar modal al hacer clic en la X
    const cerrarBotonAgregarTarea = document.getElementById("cerrar_agregar_tarea_modal");
    cerrarBotonAgregarTarea.addEventListener("click", function() {
        agregarTareaModal.classList.remove("aparece_elemento");
        agregarTareaModal.classList.add("desaparece_lista_tareas");
    }); 

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", function(event) {
        if (event.target === agregarTareaModal) {
            agregarTareaModal.classList.remove("aparece_elemento");
            agregarTareaModal.classList.add("desaparece_lista_tareas");
        }
    });

    // Cerrar modal al enviar el formulario y guardar la tarea
    const formularioAgregarTareaModal = document.getElementById("formulario_agregar_tarea_modal");
    formularioAgregarTareaModal.addEventListener("submit", function(event) {
        event.preventDefault();
        const nombreTareaAgregada = document.getElementById("modal_titulo_tarea").value;
        const categoriaTareaAgregada = document.getElementById("modal_categoria_tarea").value;
        const frecuenciaTareaAgregada = document.getElementById("modal_frecuencia_tarea").value;
        const tipoTareaAgregada = document.getElementById("modal_tipo_tarea").value;
        const metaTareaAgregada = tipoTareaAgregada === "Cantidad" ? parseInt(document.getElementById("modal_meta_tarea").value) : null;

        const siguienteIdDisponible = obtenerSiguienteIdDisponible(usuarioCargado.habitos);
        console.log("Id de la tarea por crear: ", siguienteIdDisponible);
        const nuevaTarea = {
        id: siguienteIdDisponible,
        nombre: nombreTareaAgregada,
        categoria: categoriaTareaAgregada,
        frecuencia: frecuenciaTareaAgregada,
        tipo: tipoTareaAgregada,
        meta: metaTareaAgregada
        }

        console.log("Nueva tarea creada: ", nuevaTarea);
        usuarioCargado.habitos.push(nuevaTarea);

        verificarLogros(usuarioCargado);
        agregarActividad(usuarioCargado, "Agregaste un nuevo hábito: " + nuevaTarea.nombre);
        renderizarHistorial(usuarioCargado);

        const registroActualUsuario = obtenerRegistroActualDeHabitos(usuarioCargado);
        if (nuevaTarea.tipo === "Binario") {
            registroActualUsuario[nuevaTarea.id] = false;
        } else if (nuevaTarea.tipo === "Cantidad") {
            registroActualUsuario[nuevaTarea.id] = 0;
        }
        actualizarRegistro(usuarioCargado, nuevaTarea.id, registroActualUsuario[nuevaTarea.id]);

        localStorage.setItem("usuarioActual", JSON.stringify(usuarioCargado)); 

        renderizarUsuarioHUD(usuarioCargado);
        renderizarProgresos(usuarioCargado);
        renderizarTareas(usuarioCargado);

        agregarTareaModal.classList.remove("aparece_elemento");
        agregarTareaModal.classList.add("desaparece_lista_tareas");
    });

    const tipoSelect = document.getElementById("modal_tipo_tarea");
    const metaContenedor = document.getElementById("modal_contenedor_meta");
    tipoSelect.addEventListener("change", function(event) {
        const elemento = event.target;
        console.log("Elemento seleccionado en el Modal Tipo: ", elemento);
        if (tipoSelect.value === "Cantidad") {
            metaContenedor.classList.add("aparece_elemento");
            metaContenedor.classList.remove("desaparece_lista_tareas");
        } else {
            metaContenedor.classList.add("desaparece_lista_tareas");
            metaContenedor.classList.remove("aparece_elemento");
        }
    });

    // SECCION PARA MODIFICAR TAREA
    botonModificarTarea = document.getElementById("boton_modificar_tarea");
    const modificarTareaModal = document.getElementById("modificar_tarea_modal");
    botonModificarTarea.addEventListener("click", function(event) {
        const elemento = event.target;
        console.log("Boton ModificarTarea tocado: ", elemento);
        formularioModificarTareaModal.reset();
        modificarSelect.value = "";
        tareaModalAModificar.classList.add("desaparece_lista_tareas");
        tareaModalAModificar.classList.remove("aparece_elemento");
        botonGuardarCambios.classList.add("desaparece_lista_tareas");
        botonGuardarCambios.classList.remove("aparece_elemento");
        idTareaSeleccionadaModificar = -1;
        modificarTareaModal.classList.add("aparece_elemento");
        modificarTareaModal.classList.remove("desaparece_lista_tareas");
        renderizarOpcionesTareasAModificarOEliminar(usuarioCargado.habitos, "modificar_modal_seleccionar_tarea");
    });

    // Cerrar modal al hacer clic en la X
    const cerrarBotonModificarTarea = document.getElementById("cerrar_modificar_tarea_modal");
    cerrarBotonModificarTarea.addEventListener("click", function() {
        modificarTareaModal.classList.remove("aparece_elemento");
        modificarTareaModal.classList.add("desaparece_lista_tareas");
        formularioModificarTareaModal.reset();
        modificarSelect.value = "";
        tareaModalAModificar.classList.add("desaparece_lista_tareas");
        tareaModalAModificar.classList.remove("aparece_elemento");
        botonGuardarCambios.classList.add("desaparece_lista_tareas");
        botonGuardarCambios.classList.remove("aparece_elemento");
        idTareaSeleccionadaModificar = -1;
    }); 

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", function(event) {
        if (event.target === modificarTareaModal) {
            modificarTareaModal.classList.remove("aparece_elemento");
            modificarTareaModal.classList.add("desaparece_lista_tareas");
            formularioModificarTareaModal.reset();
            modificarSelect.value = "";
            tareaModalAModificar.classList.add("desaparece_lista_tareas");
            tareaModalAModificar.classList.remove("aparece_elemento");
            botonGuardarCambios.classList.add("desaparece_lista_tareas");
            botonGuardarCambios.classList.remove("aparece_elemento");
            idTareaSeleccionadaModificar = -1;
        }
    });

    const modificarSelect = document.getElementById("modificar_modal_seleccionar_tarea");
    const tareaModalAModificar = document.getElementById("contenedor_modal_opciones_tareas_modificadas");
    const botonGuardarCambios = document.getElementById("guardar_modificaciones_tarea");
    let idTareaSeleccionadaModificar = -1;
    modificarSelect.addEventListener("change", function(event){
        const elemento = event.target;
        idTareaSeleccionadaModificar = parseInt(elemento.value);
        const tareaSeleccionada = relacionarIdElementos(usuarioCargado.habitos, idTareaSeleccionadaModificar);
        console.log("Objeto de la tarea seleccionada para modificar: ", tareaSeleccionada);
        renderizarTareaSeleccionadaModificar(tareaSeleccionada);
        tareaModalAModificar.classList.remove("desaparece_lista_tareas");
        tareaModalAModificar.classList.add("aparece_elemento");
        botonGuardarCambios.classList.remove("desaparece_lista_tareas");
        botonGuardarCambios.classList.add("aparece_elemento");

        const tipoModificarSelect = document.getElementById("modal_modificar_tipo_tarea");
        const metaModificarContenedor = document.getElementById("modal_contenedor_meta_modificar");
        tipoModificarSelect.addEventListener("change", function(event) {
        const elemento = event.target;
        console.log("Elemento seleccionado en el Modal Tipo: ", elemento);
        if (tipoModificarSelect.value === "Cantidad") {
            metaModificarContenedor.classList.add("aparece_elemento");
            metaModificarContenedor.classList.remove("desaparece_lista_tareas");
        } else {
            metaModificarContenedor.classList.add("desaparece_lista_tareas");
            metaModificarContenedor.classList.remove("aparece_elemento");
        }
        });

    });

    const formularioModificarTareaModal = document.getElementById("formulario_modificar_tarea_modal");
    formularioModificarTareaModal.addEventListener("submit", function(event) {
        event.preventDefault();
        const idTareaModificada = idTareaSeleccionadaModificar;
        console.log("ID de la tarea a modificar: ", idTareaModificada);
        const nombreTareaModificada = document.getElementById("modal_modificar_titulo_tarea").value;
        console.log("Nombre de la tarea modificado: ", nombreTareaModificada);
        const categoriaTareaModificada = document.getElementById("modal_modificar_categoria_tarea").value;
        console.log("Categoría de la tarea modificada: ", categoriaTareaModificada);
        const frecuenciaTareaModificada = document.getElementById("modal_modificar_frecuencia_tarea").value;
        console.log("Frecuencia de la tarea modificada: ", frecuenciaTareaModificada);
        const tipoTareaModificada = document.getElementById("modal_modificar_tipo_tarea").value;
        console.log("Tipo de la tarea modificada: ", tipoTareaModificada);
        const metaTareaModificada = tipoTareaModificada === "Cantidad" ? parseInt(document.getElementById("modal_modificar_meta_tarea").value) : null;
        console.log("Meta de la tarea modificada: ", metaTareaModificada);

        const totalHabitosUsuarioCargado = usuarioCargado.habitos.length;
        const tareaModificada = {
        id: idTareaModificada,
        nombre: nombreTareaModificada,
        categoria: categoriaTareaModificada,
        frecuencia: frecuenciaTareaModificada,
        tipo: tipoTareaModificada,
        meta: metaTareaModificada
        }

        //Busco el index de la tarea modificada para reemplazarla en el array de hábitos del usuario
        const indexTareaModificada = usuarioCargado.habitos.findIndex(function(habito) {
            return habito.id === idTareaModificada;
        });
        console.log("Index de la tarea modificada: ", indexTareaModificada);
        usuarioCargado.habitos[indexTareaModificada] = tareaModificada;
        agregarActividad(usuarioCargado, "Modificaste el hábito: " + nombreTareaModificada);
        renderizarHistorial(usuarioCargado);
        console.log("Usuario después de modificar la tarea: ", usuarioCargado);

        //modifico el registro
        const registroActualUsuario = obtenerRegistroActualDeHabitos(usuarioCargado);
        if (tareaModificada.tipo === "Binario") {
            registroActualUsuario[tareaModificada.id] = false;
        } else if (tareaModificada.tipo === "Cantidad") {
            registroActualUsuario[tareaModificada.id] = 0;
        }
        actualizarRegistro(usuarioCargado, tareaModificada.id, registroActualUsuario[tareaModificada.id]);

        localStorage.setItem("usuarioActual", JSON.stringify(usuarioCargado)); 

        renderizarUsuarioHUD(usuarioCargado);
        renderizarProgresos(usuarioCargado);
        renderizarTareas(usuarioCargado);

        //Oculto el modal nuevamente para que la siguiente vez que vaya a modificar una tarea, se vea solo la lista de tareas
        modificarTareaModal.classList.remove("aparece_elemento");
        modificarTareaModal.classList.add("desaparece_lista_tareas");
        tareaModalAModificar.classList.add("desaparece_lista_tareas");
        tareaModalAModificar.classList.remove("aparece_elemento");
        botonGuardarCambios.classList.add("desaparece_lista_tareas");
        botonGuardarCambios.classList.remove("aparece_elemento");
    });


    //SECCION PARA ELMINAR TAREA
    botonEliminarTarea = document.getElementById("boton_eliminar_tarea");
    const eliminarTareaModal = document.getElementById("eliminar_tarea_modal");
    botonEliminarTarea.addEventListener("click", function(event) {
        const elemento = event.target;
        console.log("Boton EliminarTarea tocado: ", elemento);
        eliminarTareaModal.classList.add("aparece_elemento");
        eliminarTareaModal.classList.remove("desaparece_lista_tareas");
        renderizarOpcionesTareasAModificarOEliminar(usuarioCargado.habitos, "eliminar_modal_seleccionar_tarea");
    });

    //Cerrar modal al hacer clic en la X
    const cerrarBotonEliminarTarea = document.getElementById("cerrar_eliminar_tarea_modal");
    cerrarBotonEliminarTarea.addEventListener("click", function() {
        eliminarTareaModal.classList.remove("aparece_elemento");
        eliminarTareaModal.classList.add("desaparece_lista_tareas");
    }); 

    //Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", function(event) {
        if (event.target === eliminarTareaModal) {
            eliminarTareaModal.classList.remove("aparece_elemento");
            eliminarTareaModal.classList.add("desaparece_lista_tareas");
        }
    });

    const eliminarSelect = document.getElementById("eliminar_modal_seleccionar_tarea");
    let idTareaSeleccionadaEliminar = -1;
    eliminarSelect.addEventListener("change", function(event){
        const elemento = event.target;
        idTareaSeleccionadaEliminar = parseInt(elemento.value);
        console.log("ID de la tarea seleccionada para eliminar: ", idTareaSeleccionadaEliminar);
    });

    const formularioEliminarTareaModal = document.getElementById("formulario_eliminar_tarea_modal");
    formularioEliminarTareaModal.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("ID de la tarea a eliminar al enviar el formulario: ", idTareaSeleccionadaEliminar);
        const indiceAEliminar = usuarioCargado.habitos.findIndex(function(miHabito) {
            return miHabito.id ===idTareaSeleccionadaEliminar;
        });
        if (indiceAEliminar !== -1) {
            const habitoEliminado = usuarioCargado.habitos[indiceAEliminar];
            usuarioCargado.habitos.splice(indiceAEliminar, 1);
            agregarActividad(usuarioCargado, "Eliminaste el hábito: " + habitoEliminado.nombre);
            renderizarHistorial(usuarioCargado);
            eliminarRegistro(usuarioCargado, idTareaSeleccionadaEliminar);
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioCargado));
            renderizarUsuarioHUD(usuarioCargado);
            renderizarProgresos(usuarioCargado);
            renderizarTareas(usuarioCargado);
            eliminarTareaModal.classList.remove("aparece_elemento");
            eliminarTareaModal.classList.add("desaparece_lista_tareas");

        }
    });    

    renderizarHistorial(usuarioCargado);
};

function renderizarHistorial(usuario) {
    const historialContainer = document.getElementById("historial_actividad_container");
    historialContainer.innerHTML = ""; // Limpiar
    const actividades = usuario.historialActividades || [];
    if (actividades.length === 0) {
        historialContainer.innerHTML = "<p>No hay actividades recientes.</p>";
        return;
    }
    const actividadesHTML = actividades.map(function(act) {
        return `<div class="actividad_item"><p>${act.fecha}: ${act.descripcion}</p></div>`;
    }).join("");
    historialContainer.innerHTML = actividadesHTML;
}

// Validacion de Datos del archivo
function validarUsuario(data) {
    // Verificar propiedades básicas
    if (!data.id || !data.nombre || !data.habitos || !data.registros || !data.xp || !data.nivel || !data.logros || !data.pokemonObtenidos) {
        return false;
    }
    // Verificar tipos
    if (typeof data.id !== 'number' || typeof data.nombre !== 'string' || !Array.isArray(data.habitos) || typeof data.registros !== 'object' || typeof data.xp !== 'number' || typeof data.nivel !== 'number' || !Array.isArray(data.logros) || !Array.isArray(data.pokemonObtenidos)) {
        return false;
    }
    // Verificar estructura de hábitos
    for (let habito of data.habitos) {
        if (!habito.id || !habito.nombre || !habito.categoria || !habito.tipo || !habito.frecuencia) {
            return false;
        }
    }
    // Verificar estructura de Pokémon
    for (let pokemon of data.pokemonObtenidos) {
        if (!pokemon.id || !pokemon.nombre || !pokemon.nivel || !pokemon.url || typeof pokemon.xp !== 'number') {
            return false;
        }
    }
    return true;
}

// Exportacion de datos
const exportarBtn = document.getElementById('exportar_datos_btn');
const importarBtn = document.getElementById('importar_datos_btn');
const importarInput = document.getElementById('importar_datos_input');

exportarBtn.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuario) {
        alert('No hay usuario actual para exportar.');
        return;
    }
    const dataStr = JSON.stringify(usuario, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuario_pokehabitos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

importarBtn.addEventListener('click', () => {
    importarInput.click();
});

importarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (validarUsuario(data)) {
                    localStorage.setItem('usuarioActual', JSON.stringify(data));
                    alert('Datos importados correctamente. Recarga la página para ver los cambios.');
                } else {
                    alert('El formato del archivo no es compatible. Asegúrate de que sea un archivo de usuario válido de PokeHabitos con todas las propiedades requeridas.');
                }
            } catch (error) {
                alert('Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.');
            }
        };
        reader.readAsText(file);
    }
});