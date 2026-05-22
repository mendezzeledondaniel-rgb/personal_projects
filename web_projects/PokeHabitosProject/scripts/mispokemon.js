
function actualizarExplicacion(usuario) {
    const explicacionGeneral = document.getElementById('explicacion_general');
    const nivelActual = document.getElementById('nivel_actual');
    const maximoActual = document.getElementById('maximo_actual');
    const nivel = usuario.nivel;
    const maxPokemon = calcularMaxPokemon(nivel);
    explicacionGeneral.textContent = 'Puedes agregar Pokémon cada 5 niveles: 1 (inicial), 2 (nivel 5+), 3 (10+), 4 (15+), 5 (20+), 6 (25+), ilimitado (30+).';
    nivelActual.textContent = `Tu nivel actual es ${nivel}.`;
    maximoActual.textContent = `Máximo actual: ${maxPokemon} Pokémon.`;
}

function calcularMaxPokemon(nivel) {
    if (nivel >= 30) return 'ilimitado';
    if (nivel >= 25) return 6;
    if (nivel >= 20) return 5;
    if (nivel >= 15) return 4;
    if (nivel >= 10) return 3;
    if (nivel >= 5) return 2;
    return 1;
}

window.onload = async function() {
    const usuarioCargado = JSON.parse(localStorage.getItem('usuarioActual'));
    await renderizarListaPokemon(usuarioCargado);
    configurarBotonAgregar(usuarioCargado);
    actualizarExplicacion(usuarioCargado);
};

async function renderizarListaPokemon(usuario) {
    const container = document.getElementById('lista_pokemon_container');
    container.innerHTML = '';
    const pokemons = usuario.pokemonObtenidos || [];
    const promesas = pokemons.map(async function(pokemon) {
        const imgData = await cargarPokemon(pokemon.url);
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon_item';
        pokemonDiv.innerHTML = `
            <img src="${imgData.sprites.front_default}" alt="${pokemon.nombre}">
            <h4>${pokemon.nombre}</h4>
            <p>Nivel: ${pokemon.nivel}</p>
            <p>XP: ${pokemon.xp}</p>
        `;
        return pokemonDiv;
    });
    const elementos = await Promise.all(promesas);
    for (let i = 0; i < elementos.length; i++) {
        container.appendChild(elementos[i]);
    }
}

function configurarBotonAgregar(usuario) {
    const btn = document.getElementById('agregar_pokemon_btn');
    if (puedeAgregarPokemon(usuario)) {
        btn.disabled = false;
        btn.addEventListener('click', function() {
            mostrarModalAgregarPokemon(usuario);
        });
    } else {
        btn.disabled = true;
        const numPokemon = usuario.pokemonObtenidos.length;
        let mensaje = '';
        if (numPokemon < 6) {
            const niveles = [5, 10, 15, 20, 25];
            mensaje = `Necesitas nivel ${niveles[numPokemon - 1]} para agregar el siguiente Pokémon.`;
        } else {
            mensaje = 'Necesitas nivel 30 para agregar más Pokémon.';
        }
        btn.title = mensaje;
        btn.addEventListener('click', function() {
            alert(mensaje);
        });
    }
}

function puedeAgregarPokemon(usuario) {
    const numPokemon = usuario.pokemonObtenidos.length;
    if (numPokemon >= 6) {
        return usuario.nivel >= 30;
    } else {
        const nivelesRequeridos = [5, 10, 15, 20, 25];
        return usuario.nivel >= nivelesRequeridos[numPokemon - 1];
    }
}

async function mostrarModalAgregarPokemon(usuario) {
    const modal = document.getElementById('agregar_pokemon_modal');
    const select = document.getElementById('pokemon_select');
    const confirmarBtn = document.getElementById('confirmar_agregar_pokemon');
    const closeBtn = document.querySelector('.close');

    // Cargar lista de Pokémon
    const listaPokemon = await obtenerListaPokemon();
    const opciones = listaPokemon.map(function(p) {
        const nombre = ponerPrimerLetraMayuscula(p.name);
        return `<option value="${p.url}">${nombre}</option>`;
    }).join('');
    select.innerHTML = `<option value="">Selecciona un Pokémon</option>${opciones}`;

    modal.style.display = 'block';

    confirmarBtn.onclick = async function() {
        const urlSeleccionada = select.value;
        if (!urlSeleccionada) {
            alert('Por favor, selecciona un Pokémon.');
            return;
        }
        const pokemonData = await cargarPokemon(urlSeleccionada);
        let maxId = 0;
        for (let i = 0; i < usuario.pokemonObtenidos.length; i++) {
            if (usuario.pokemonObtenidos[i].id > maxId) maxId = usuario.pokemonObtenidos[i].id;
        }
        const nuevoPokemon = {
            id: maxId + 1,
            nombre: ponerPrimerLetraMayuscula(pokemonData.name),
            url: urlSeleccionada,
            nivel: 1,
            xp: 0
        };
        usuario.pokemonObtenidos.push(nuevoPokemon);
        usuario.idsPokemonSeleccionados.push(nuevoPokemon.id);
        guardarUsuarioEnLocalStorage(usuario);
        exportarUsuarioAVariableOriginal();
        agregarActividad(usuario, "Agregaste un nuevo Pokémon: " + nuevoPokemon.nombre);
        await renderizarListaPokemon(usuario);
        configurarBotonAgregar(usuario);
        modal.style.display = 'none';
        alert('¡Pokémon agregado exitosamente!');
    };

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}