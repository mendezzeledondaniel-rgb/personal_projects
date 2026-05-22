# PokeHabitos

PokeHabitos es una aplicación web para el seguimiento de hábitos diarios, inspirada en el universo Pokémon. Los usuarios pueden crear, modificar y eliminar hábitos, rastrear su progreso, ganar experiencia (XP) y desbloquear Pokémon como recompensas. La aplicación incluye un sistema de logros, rachas y exportación/importación de datos.

## Cómo Usar la Aplicación

1. **Inicio de Sesión**: Accede con un usuario existente o regístrate para crear una nueva cuenta.
2. **Dashboard Principal**: Una vez logueado, verás tu HUD con nivel, XP y Pokémon principal. Gestiona tus hábitos diarios, semanales, etc.
3. **Gestión de Hábitos**: Agrega hábitos con nombre, categoría, tipo (binario o cantidad), frecuencia y meta (si aplica).
4. **Progreso**: Marca hábitos completados para ganar XP y subir de nivel.
5. **Pokémon**: Desbloquea y entrena Pokémon basados en tu progreso.
6. **Logros y Rachas**: Revisa tus logros obtenidos y rachas activas.
7. **Exportar/Importar**: Guarda o carga tus datos en formato JSON.

## Funcionalidades Principales

- **Registro y Login**: Autenticación simple con usuarios predefinidos o nuevos.
- **Gestión de Hábitos**: Crear, editar y eliminar hábitos con diferentes frecuencias (diaria, semanal, quincenal, mensual) y tipos (binario o cantidad con meta).
- **Seguimiento de Progreso**: Barras de progreso para hábitos diarios y semanales, historial de actividades.
- **Sistema de Recompensas**: Ganar XP, subir niveles, desbloquear y entrenar Pokémon.
- **Logros y Rachas**: Sistema de logros por hitos y rachas por días consecutivos.
- **Pokémon Management**: Ver colección, cambiar Pokémon principal, agregar nuevos basados en nivel.
- **Exportar/Importar Datos**: Descargar perfil en JSON o importar para transferir datos.

## Páginas de la Aplicación

### index.html (Inicio de Sesión)
- Formulario de login con usuario y contraseña.
- Botón para registrarse.
- Redirige a `pages/principal.html` si es exitoso.

### pages/registro.html (Registro)
- Formulario para crear nuevo usuario con nombre, contraseña y selección de Pokémon inicial.
- Valida datos y guarda en localStorage.

### pages/principal.html (Dashboard Principal)
- **HUD**: Muestra nombre, nivel, XP y Pokémon principal con lista de Pokémon.
- **Progreso Diario/Semanal**: Barras de progreso para hábitos completados.
- **Mis Tareas de Hoy**: Lista de hábitos por frecuencia (diaria, semanal, etc.), con checkboxes o inputs para cantidad.
- **Historial de Actividad**: Lista de acciones recientes (completar hábitos, etc.).
- **Botones de Gestión**: Agregar, modificar, eliminar hábitos (con modales).
- **Exportar/Importar Datos**: Botones para descargar/cargar JSON del perfil.

### pages/perfil.html (Mi Perfil)
- Información del usuario: nivel, XP, Pokémon principal y lista.
- Cambiar Pokémon principal.
- Historial de registros de hábitos por fecha.

### pages/logros.html (Rachas y Logros)
- **Rachas**: Muestra rachas activas (días consecutivos completando hábitos).
- **Logros**: Lista de logros obtenidos con descripciones.

### pages/mispokemon.html (Mis Pokémon)
- Lista de Pokémon obtenidos con imágenes y niveles.
- Botón para agregar nuevos Pokémon (basado en nivel del usuario).
- Explicación de requisitos para agregar Pokémon.

## Usuarios de Prueba

Para revisar la aplicación, usa estos usuarios predefinidos:

- **Ash**
  - Usuario: Ash
  - Contraseña: pikachu123
  - Hábitos: Hacer ejercicio (diario, cantidad, meta 8), Comer saludable (diario, cantidad, meta 5), Ejercicio (diario, binario).
  - Pokémon: Pikachu (nivel 5), Bulbasaur (nivel 3).
  - Nivel: 1, XP: 20.

- **Misty**
  - Usuario: Misty
  - Contraseña: starmie456
  - Hábitos: Leer un libro (semanal, cantidad, meta 1), Beber vasos de agua (diario, cantidad, meta 8).
  - Pokémon: Starmie (nivel 5).
  - Nivel: 1, XP: 15.

- **Brock**
  - Usuario: Brock
  - Contraseña: onix789
  - Hábitos: Dormir 8 horas (diario, cantidad, meta 8).
  - Pokémon: Onix (nivel 5).
  - Nivel: 2, XP: 25.

Puedes registrarte para crear nuevos usuarios.

## Tecnologías Utilizadas

- **HTML/CSS/JavaScript**: Frontend vanilla.
- **localStorage**: Almacenamiento de datos del usuario.
- **PokeAPI**: Para obtener imágenes y datos de Pokémon.
- **JSON**: Para exportar/importar datos.

## Instalación y Despliegue

1. Clona o descarga el proyecto.
2. Abre `index.html` en un navegador web (Chrome recomendado para compatibilidad).
3. No requiere servidor; funciona localmente.
4. Para desarrollo, edita archivos en `pages/`, `scripts/` y `styles.css`.

## Notas

- Los datos se almacenan en localStorage del navegador.
- Exporta tus datos antes de cerrar sesión para no perder progreso.
- La aplicación es responsive y funciona en dispositivos móviles.

¡Disfruta formando hábitos con PokeHabitos!