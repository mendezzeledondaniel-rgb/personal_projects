let puntosFrec = {
  Diaria: 3,
  Semanal: 8,
  Quincenal: 15,
  Mensual: 500
};

// Logros disponibles en la aplicación
let logrosDisponibles = [
  {
    id: 'primer_habito_completado',
    nombre: 'Primer Paso',
    descripcion: 'Completa tu primer hábito',
    condicion: 'Completar 1 hábito en total'
  },
  {
    id: 'diez_habitos_completados',
    nombre: 'Perseverancia',
    descripcion: 'Completa 10 hábitos',
    condicion: 'Completar 10 hábitos en total'
  },
  {
    id: 'cien_habitos_completados',
    nombre: 'Maestro de Hábitos',
    descripcion: 'Completa 100 hábitos',
    condicion: 'Completar 100 hábitos en total'
  },
  {
    id: 'racha_semana',
    nombre: 'Semana de Fuego',
    descripcion: 'Completa hábitos 7 días consecutivos',
    condicion: 'Completar al menos 1 hábito diariamente durante 7 días seguidos'
  },
  {
    id: 'racha_mes',
    nombre: 'Mesi Invencible',
    descripcion: 'Completa hábitos 30 días consecutivos',
    condicion: 'Completar al menos 1 hábito diariamente durante 30 días seguidos'
  },
  {
    id: 'todos_habitos_dia',
    nombre: 'Día Perfecto',
    descripcion: 'Completa todos tus hábitos en un día',
    condicion: 'Completar todos los hábitos disponibles en un mismo día'
  },
  {
    id: 'habito_cada_frecuencia',
    nombre: 'Equilibrio Total',
    descripcion: 'Completa hábitos de todas las frecuencias',
    condicion: 'Completar al menos 1 hábito Diario, Semanal, Quincenal y Mensual'
  },
  {
    id: 'nivel_cinco',
    nombre: 'Novato',
    descripcion: 'Alcanza nivel 5',
    condicion: 'Acumular suficiente XP para alcanzar nivel 5'
  },
  {
    id: 'nivel_diez',
    nombre: 'Aprendiz',
    descripcion: 'Alcanza nivel 10',
    condicion: 'Acumular suficiente XP para alcanzar nivel 10'
  },
  {
    id: 'nivel_veinte',
    nombre: 'Experto',
    descripcion: 'Alcanza nivel 20',
    condicion: 'Acumular suficiente XP para alcanzar nivel 20'
  },
  {
    id: 'nivel_cincuenta',
    nombre: 'Leyenda',
    descripcion: 'Alcanza nivel 50',
    condicion: 'Acumular suficiente XP para alcanzar nivel 50'
  },
  {
    id: 'mil_xp_ganado',
    nombre: 'Recolector de XP',
    descripcion: 'Acumula 1000 XP en total',
    condicion: 'Ganar 1000 puntos de XP'
  },
  {
    id: 'cinco_pokemon',
    nombre: 'Coleccionista',
    descripcion: 'Obtén 5 Pokémon diferentes',
    condicion: 'Tener 5 Pokémon en tu equipo'
  },
  {
    id: 'diez_pokemon',
    nombre: 'Cazador de Pokémon',
    descripcion: 'Obtén 10 Pokémon diferentes',
    condicion: 'Tener 10 Pokémon en tu equipo'
  },
  {
    id: 'pokemon_principal_nivel_diez',
    nombre: 'Compañero Leal',
    descripcion: 'Lleva tu Pokémon principal a nivel 10',
    condicion: 'Que el Pokémon principal alcance nivel 10'
  },
  {
    id: 'pokemon_principal_nivel_veinticinco',
    nombre: 'Evolución Perfecta',
    descripcion: 'Lleva tu Pokémon principal a nivel 25',
    condicion: 'Que el Pokémon principal alcance nivel 25'
  },
  {
    id: 'cambio_pokemon_principal',
    nombre: 'Aventurero',
    descripcion: 'Cambia tu Pokémon principal 3 veces',
    condicion: 'Cambiar el Pokémon principal en 3 ocasiones diferentes'
  },
  {
    id: 'completar_tarea_cantidad',
    nombre: 'Contador',
    descripcion: 'Completa una tarea de Cantidad por primera vez',
    condicion: 'Llevar una tarea de tipo Cantidad a su meta'
  },
  {
    id: 'completar_tarea_binaria',
    nombre: 'Logro Binario',
    descripcion: 'Completa una tarea Binaria por primera vez',
    condicion: 'Marcar como completada una tarea de tipo Binario'
  },
  {
    id: 'cien_habitos_cantidad',
    nombre: 'Matemático',
    descripcion: 'Completa 100 hábitos de tipo Cantidad',
    condicion: 'Alcanzar la meta en 100 tareas de tipo Cantidad'
  },
  {
    id: 'crear_diez_habitos',
    nombre: 'Creador de Rutina',
    descripcion: 'Crea 10 hábitos diferentes',
    condicion: 'Crear y agregar 10 hábitos distintos'
  },
  {
    id: 'ganar_300_xp_semana',
    nombre: 'Semana Productiva',
    descripcion: 'Gana 300 XP en una semana',
    condicion: 'Acumular 300 puntos de XP en 7 días'
  },
  {
    id: 'regresar_despues_racha',
    nombre: 'Resiliencia',
    descripcion: 'Recupera una racha después de romperla',
    condicion: 'Completar hábitos nuevamente después de perder una racha'
  },
  {
    id: 'modificar_habito',
    nombre: 'Adaptabilidad',
    descripcion: 'Modifica 5 hábitos',
    condicion: 'Cambiar las propiedades de 5 hábitos distintos'
  }
];

//Datos ejemplo base
let usuarios_base = [
    {
        id: 1,
        nombre: "Ash",
        constrasena: "pikachu123",
        habitos: [
          { id: 1, 
            nombre: "Hacer ejercicio", 
            categoria: "Salud",
            tipo: "Cantidad",
            frecuencia: "Diaria",
            meta: 8
          },
          { id: 2, 
            nombre: "Comer saludable", 
            categoria: "Alimentación", 
            tipo: "Cantidad", 
            frecuencia: "Diaria", 
            meta: 5 
        },
        {
            id: 3,
            nombre: "Ejercicio",
            categoria: "Salud",
            tipo: "Binario",
            frecuencia: "Diaria"
        }],
        registros: {
            '2026-01-01': {1: 6, 2: 4, 3: true},
            '2026-01-02': {1: 8, 2: 5, 3: true},
            '2026-01-03': {1: 7, 2: 3, 3: false}
        },
        xp: 20,
        nivel: 1,
        logros: [{id: 'primer_habito_completado', fecha: '2026-01-01'}],
        pokemonObtenidos: [
          { id: 1,
            nombre: "Pikachu",
            nivel: 5,
            url: "https://pokeapi.co/api/v2/pokemon/25/",
            xp: 0
          },
          { id: 2,
            nombre: "Bulbasaur",
            nivel: 3,
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            xp: 0
          }],
        idsPokemonSeleccionados: [1, 2],
        idPokemonPrincipalActual: 1
    },
    {
        id: 2,
        nombre: "Misty",
        constrasena: "starmie456",
        habitos: [
            { id: 1, 
              nombre: "Leer un libro", 
              categoria: "Educación",
              tipo: "Cantidad",
              frecuencia: "Semanal",
              meta: 1
            },
            { id: 2, 
              nombre: "Beber vasos de agua", 
              categoria: "Salud",
              tipo: "Cantidad",
              frecuencia: "Diaria",
              meta: 8
            }
        ],
        registros: {
            '2026-01-01': {1: 2, 2: 8},
            '2026-01-08': {1: 4, 2: 8}
        },
        xp: 15,
        nivel: 1,
        logros: [{id: 'primer_habito_completado', fecha: '2026-01-01'}],
        pokemonObtenidos: [
          { id: 1,
            nombre: "Starmie",
            nivel: 5,
            url: "https://pokeapi.co/api/v2/pokemon/121/",
            xp: 0
          }
        ],
        idsPokemonSeleccionados: [1],
        idPokemonPrincipalActual: 1
    },
    {
        id: 3,
        nombre: "Brock",
        constrasena: "onix789",
        habitos: [
            { id: 1, 
              nombre: "Dormir 8 horas",
                categoria: "Salud",
                tipo: "Cantidad",
                frecuencia: "Diaria",
                meta: 8
            }
        ],
        registros: {
            '2026-01-01': {1: 8},
            '2026-01-02': {1: 8}
        },
        xp: 25,
        nivel: 2,
        logros: [{id: 'primer_habito_completado', fecha: '2026-01-01'}],
        pokemonObtenidos: [
          { id: 1,
            nombre: "Onix",
            nivel: 5,
            url: "https://pokeapi.co/api/v2/pokemon/95/",
            xp: 0
          }
        ],
        idsPokemonSeleccionados: [1],
        idPokemonPrincipalActual: 1
    }
];


//Datos ejemplo a modificar
let usuarios = [
    {
        id: 1,
        nombre: "Ash",
        constrasena: "pikachu123",
        habitos: [
          { id: 1, 
            nombre: "Hacer ejercicio", 
            categoria: "Salud",
            tipo: "Cantidad",
            frecuencia: "Diaria",
            meta: 8
          },
          { id: 2, 
            nombre: "Comer saludable", 
            categoria: "Alimentación", 
            tipo: "Cantidad", 
            frecuencia: "Diaria", 
            meta: 5 
        },
        {
            id: 3,
            nombre: "Ejercicio",
            categoria: "Salud",
            tipo: "Binario",
            frecuencia: "Diaria"
        }],
        registros: {
            '2026-01-01': {1: 6, 2: 4, 3: true},
            '2026-01-02': {1: 8, 2: 5, 3: true},
            '2026-01-03': {1: 7, 2: 3, 3: false}
        },
        xp: 20,
        nivel: 1,
        logros: [{id: 'primer_habito_completado', fecha: '2026-01-01'}],
        pokemonObtenidos: [
          { id: 1,
            nombre: "Pikachu",
            nivel: 5,
            url: "https://pokeapi.co/api/v2/pokemon/25/",
            xp: 0
          },
          { id: 2,
            nombre: "Bulbasaur",
            nivel: 3,
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            xp: 0
          }],
        idsPokemonSeleccionados: [1, 2],
        idPokemonPrincipalActual: 1
    },
    {
        id: 2,
        nombre: "Misty",
        constrasena: "starmie456",
        habitos: [
            { id: 1, 
              nombre: "Leer un libro", 
              categoria: "Educación",
              tipo: "Cantidad",
              frecuencia: "Semanal",
              meta: 1
            },
            { id: 2, 
              nombre: "Beber vasos de agua", 
              categoria: "Salud",
              tipo: "Cantidad",
              frecuencia: "Diaria",
              meta: 8
            }
        ],
        registros: {
            '2026-01-01': {1: 2, 2: 8},
            '2026-01-08': {1: 4, 2: 8}
        },
        xp: 15,
        nivel: 1,
        logros: [{id: 'primer_habito_completado', fecha: '2026-01-01'}],
        pokemonObtenidos: [
          { id: 1,
            nombre: "Starmie",
            nivel: 5,
            url: "https://pokeapi.co/api/v2/pokemon/121/",
            xp: 0
          }
        ],
        idsPokemonSeleccionados: [1],
        idPokemonPrincipalActual: 1
    },
    {
        id: 3,
        nombre: "Brock",
        constrasena: "onix789",
        habitos: [
            { id: 1, 
              nombre: "Dormir 8 horas",
                categoria: "Salud",
                tipo: "Cantidad",
                frecuencia: "Diaria",
                meta: 8
            }
        ],
        registros: {
            '2026-01-01': {1: 8},
            '2026-01-02': {1: 8}
        },
        xp: 25,
        nivel: 2,
        logros: [{id: 'primer_habito_completado', fecha: '2026-01-01'}],
        pokemonObtenidos: [
          { id: 1,
            nombre: "Onix",
            nivel: 5,
            url: "https://pokeapi.co/api/v2/pokemon/95/",
            xp: 0
          }
        ],
        idsPokemonSeleccionados: [1],
        idPokemonPrincipalActual: 1
    }
];