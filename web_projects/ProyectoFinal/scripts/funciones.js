let primerPokemonSeleccionado;
let pokemonUsuario;

async function obtenerListaPokemon() {
  try {
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=5000",
    );
    const lista = await respuesta.json();
    console.log(lista);
    return lista.results;
  } catch (error) {
    console.log("Error al obtener lista de pokemon.");
  }
}

function ponerPrimerLetraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

function generarOpcionesListaPokemon(lista) {
    const listaPokemon = lista.map(function (pokemon) {
        const nombrePokemon = ponerPrimerLetraMayuscula(pokemon.name);
        return `
            <option value="${pokemon.url}">${nombrePokemon}</option>
        `;
    })
    .join("");

  primerPokemonSeleccionado.innerHTML = listaPokemon;
}

async function cargarPokemon(url) {
  try {
    const respuesta = await fetch(url);
    const pokemon = await respuesta.json();

    return pokemon;
  } catch (error) {
    console.log("Error al cargar un pokemon con el url: ", url);
  }
}

function xpParaSubirNivel(nivel) {
  return Math.round(15 + nivel * 2 + (nivel * nivel) / 120);
}

function entrenarPokemon(usuario, pokemon, xpGanada) {
  pokemon.xp = pokemon.xp || 0;
  pokemon.xp += xpGanada;

  while (pokemon.nivel < 100 && pokemon.xp >= xpParaSubirNivel(pokemon.nivel)) {
    pokemon.xp -= xpParaSubirNivel(pokemon.nivel);
    pokemon.nivel++;
    alert(`¡Tu pokemon ${pokemon.nombre} ha subido al nivel ${pokemon.nivel}!`);
    agregarActividad(usuario, "Tu Pokémon " + pokemon.nombre + " subió al nivel " + pokemon.nivel);
  }
}

function desentrenarPokemon(usuario, pokemon, xpPerdida) {
  pokemon.xp = pokemon.xp || 0;
  pokemon.xp -= xpPerdida;
  // Asegurarse que si la xp es negativa, se reste un nivel y se ajuste la xp a la cantidad anterior de subir de nivel
  while (pokemon.nivel > 1 && pokemon.xp < 0) {
    pokemon.nivel--;
    pokemon.xp += xpParaSubirNivel(pokemon.nivel);
    alert(`¡Tu pokemon ${pokemon.nombre} ha bajado de nivel!`);
    agregarActividad(usuario, "Tu Pokémon " + pokemon.nombre + " bajó al nivel " + pokemon.nivel);
  }
}

function entrenarUsuario(usuario, xpGanada) {
  usuario.xp = usuario.xp || 0;
  usuario.xp += xpGanada;

  while (usuario.xp >= xpParaSubirNivel(usuario.nivel)) {
    usuario.xp -= xpParaSubirNivel(usuario.nivel);
    usuario.nivel++;
    alert(`¡Has subido al nivel ${usuario.nivel}!`);
    agregarActividad(usuario, "Subiste al nivel " + usuario.nivel);
  }
}

function desentrenarUsuario(usuario, xpPerdida) {
  usuario.xp = usuario.xp || 0;
  usuario.xp -= xpPerdida;
  // Asegurarse que si la xp es negativa, se reste un nivel y se ajuste la xp a la cantidad anterior de subir de nivel
  while (usuario.nivel > 1 && usuario.xp < 0) {
    usuario.nivel--;
    usuario.xp += xpParaSubirNivel(usuario.nivel);
    alert(`¡Has bajado de nivel!`);
    agregarActividad(usuario, "Bajaste al nivel " + usuario.nivel);
  }
}


function relacionarIdElementos(coleccion1, elemento){
    try {
        const elementoRelacionado = coleccion1.find(function(elementoActual) {
            return elementoActual.id === elemento;
        });
        if (elementoRelacionado === undefined) {
            return "Unknown Value";
        } else {
            //console.log(elementoRelacionado);
            return elementoRelacionado;
        }
    } catch (error) {
        console.error("Error al relacionar los id del elemento:", error);
        return "";
    }
}

function obtenerFechaActualFormateada(fecha = new Date()) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
}   

function guardarUsuarioEnLocalStorage(usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
};

function exportarUsuarioAVariableOriginal() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    const todosLosUsuariosString = localStorage.getItem("usuarios");
    const todosLosUsuarios = JSON.parse(todosLosUsuariosString);
    const indiceUsuario = todosLosUsuarios.findIndex(function (user) {
        return user.id === usuarioActual.id;
    });
    if (indiceUsuario !== -1) {
        todosLosUsuarios[indiceUsuario] = usuarioActual;
        localStorage.setItem("usuarios", JSON.stringify(todosLosUsuarios));
    }
}


function tieneLogro(usuario, logroId) {
    if (!usuario.logros) return false;
    for (let i = 0; i < usuario.logros.length; i++) {
        if (usuario.logros[i].id === logroId) return true;
    }
    return false;
}

function agregarLogro(usuario, logroId) {
    if (!tieneLogro(usuario, logroId)) {
        // Buscar el nombre del logro
        let nombreLogro = "Logro desconocido";
        for (let i = 0; i < logrosDisponibles.length; i++) {
            if (logrosDisponibles[i].id === logroId) {
                nombreLogro = logrosDisponibles[i].nombre;
                break;
            }
        }
        usuario.logros = usuario.logros || [];
        usuario.logros.push({
            id: logroId,
            fecha: obtenerFechaActualFormateada()
        });
        guardarUsuarioEnLocalStorage(usuario);
        exportarUsuarioAVariableOriginal();
        alert("¡Has obtenido el logro '" + nombreLogro + "'!");
    }
}

function calcularRachaMaxima(usuario) {
    if (!usuario.registros || usuario.registros.length === 0) return 0;
    let fechasConRegistros = [];
    for (let i = 0; i < usuario.registros.length; i++) {
        let fecha = usuario.registros[i].fecha;
        if (fechasConRegistros.indexOf(fecha) === -1) {
            fechasConRegistros.push(fecha);
        }
    }
    fechasConRegistros.sort();
    let rachaActual = 1;
    let maxRacha = 1;
    for (let i = 1; i < fechasConRegistros.length; i++) {
        let fechaPrev = new Date(fechasConRegistros[i-1]);
        let fechaCurr = new Date(fechasConRegistros[i]);
        let diff = (fechaCurr - fechaPrev) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            rachaActual++;
            if (rachaActual > maxRacha) maxRacha = rachaActual;
        } else {
            rachaActual = 1;
        }
    }
    return maxRacha;
}

function verificarLogroPrimerHabito(usuario) {
    if (usuario.habitos && usuario.habitos.length >= 1) {
        agregarLogro(usuario, 'primer_habito_completado');
    }
}

function verificarLogro7DiasConsecutivos(usuario) {
    if (calcularRachaMaxima(usuario) >= 7) {
        agregarLogro(usuario, 'racha_semana');
    }
}

function verificarLogro10Registros(usuario) {
    if (usuario.registros && usuario.registros.length >= 10) {
        agregarLogro(usuario, 'diez_habitos_completados');
    }
}

function verificarLogros(usuario) {
    verificarLogroPrimerHabito(usuario);
    verificarLogro7DiasConsecutivos(usuario);
    verificarLogro10Registros(usuario);
}

// Función para agregar actividad al historial
function agregarActividad(usuario, actividad) {
    if (!usuario.historialActividades) {
        usuario.historialActividades = [];
    }
    usuario.historialActividades.push({
        descripcion: actividad,
        fecha: obtenerFechaActualFormateada()
    });
    if (usuario.historialActividades.length > 10) {
        usuario.historialActividades.shift(); // Remover el más antiguo
    }
    guardarUsuarioEnLocalStorage(usuario);
    exportarUsuarioAVariableOriginal();
}