window.onload = async function () {
    primerPokemonSeleccionado = document.getElementById("primer_pokemon");
    pokemonUsuario = JSON.parse(localStorage.getItem("pokemonUsuario"));

    const lista = await obtenerListaPokemon();
    generarOpcionesListaPokemon(lista);

    if (!pokemonUsuario && primerPokemonSeleccionado.value) {
        const pokemon = await cargarPokemon(primerPokemonSeleccionado.value);
        pokemonUsuario = pokemon;
        localStorage.setItem("pokemonUsuario", JSON.stringify(pokemonUsuario));
        const img = document.getElementById("img_primer_pokemon_elegido");
        if (img && pokemonUsuario && pokemonUsuario.sprites) {
            img.src = pokemonUsuario.sprites["front_default"];
        }
    }

    primerPokemonSeleccionado.addEventListener("change", async function (evento) {
        const pokemon = await cargarPokemon(evento.target.value);
        pokemonUsuario = pokemon;
        localStorage.setItem("pokemonUsuario", JSON.stringify(pokemonUsuario));
        const img = document.getElementById("img_primer_pokemon_elegido");
        if (img && pokemonUsuario && pokemonUsuario.sprites) {
            img.src = pokemonUsuario.sprites["front_default"];
        }
    });

    const formularioRegistro = document.getElementById("formulario_registro");
    formularioRegistro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombreUsuario = document.getElementById("nombre_usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const contrasenaRepetida = document.getElementById("contrasena_repetida").value;
        const email = document.getElementById("email").value.trim();

        if (!nombreUsuario || !contrasena || !contrasenaRepetida) {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        if (contrasena !== contrasenaRepetida) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const usuariosString = localStorage.getItem("usuarios") || "[]";
        const usuarios = JSON.parse(usuariosString);

        let maxId = 0;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id > maxId) {
                maxId = usuarios[i].id;
            }
        }

        const nuevoUsuario = {
            id: maxId + 1,
            nombre: nombreUsuario,
            constrasena: contrasena,
            email: email,
            habitos: [],
            registros: {},
            xp: 0,
            nivel: 1,
            logros: [],
            pokemonObtenidos: [],
            idsPokemonSeleccionados: [],
            idPokemonPrincipalActual: null
        };

        if (pokemonUsuario && pokemonUsuario.id) {
            nuevoUsuario.pokemonObtenidos = [{
                id: 1,
                nombre: pokemonUsuario.name ? pokemonUsuario.name : "",
                nivel: 1,
                url: `https://pokeapi.co/api/v2/pokemon/${pokemonUsuario.id}/`,
                xp: 0
            }];
            nuevoUsuario.idsPokemonSeleccionados = [1];
            nuevoUsuario.idPokemonPrincipalActual = 1;
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));
        window.location.href = "./principal.html";
    });
};