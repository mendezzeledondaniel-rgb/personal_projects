//Hago un if para no borrar los datos cada vez que se recarga la página.
if (!localStorage.getItem("usuarios")) {
    const usuariosComoString = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", usuariosComoString);
} else {
    const usuariosString = localStorage.getItem("usuarios");
    usuarios = JSON.parse(usuariosString);
}

const usuariosComoString = JSON.stringify(usuarios);
localStorage.setItem("usuarios", usuariosComoString);

const puntosFrecuenciasComoString = JSON.stringify(puntosFrec);
localStorage.setItem("puntosFrecuencias", puntosFrecuenciasComoString);

const formularioInicioSesion = document.getElementById("formulario_inicio_sesion");
console.log(formularioInicioSesion);

formularioInicioSesion.addEventListener("submit", function(event) {
  event.preventDefault();
  const nombreUsuarioInput = document.getElementById("nombre_usuario");
  const nombreUsuario = nombreUsuarioInput.value;
  const contrasenaUsuarioInput = document.getElementById("contrasena_usuario");
  const contrasenaUsuario = contrasenaUsuarioInput.value;
  const usuariosString = localStorage.getItem("usuarios");
  if (usuariosString) {
    const usuarios = JSON.parse(usuariosString);
    const usuarioEncontrado = usuarios.find(function(usuarioActual) {
      return usuarioActual.nombre === nombreUsuario;
    });
    console.log(usuarioEncontrado);
    if (usuarioEncontrado) {
      if (usuarioEncontrado.constrasena === contrasenaUsuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
        window.location.href = "./pages/principal.html";
      } else {
        alert("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
      }
    } else {
      alert("Usuario no encontrado. Por favor, inténtalo de nuevo.");
    }
  } else {
    alert("No hay usuarios registrados. Por favor, regístrate primero.");
  }
});

//funcionalidad para boton de registro
const botonRegistro = document.getElementById("boton_registrarse");
botonRegistro.addEventListener("click", function() {
  window.location.href = "./pages/registro.html";
  console.log("Botón de registro clickeado");
});