package sistemaventaspetsmarket;
import java.util.HashMap;

public class Validaciones {
    
    //private HashMap<String, Usuario> todosLosUsuarios = new HashMap<>();
    private FastOptionPane fop = new FastOptionPane();
    //private UsuarioGestiones usuarios = new UsuarioGestiones();
    //private Inventario inventarioValidaciones = new Inventario();    
    
//    public void cargarUsuarios() {
//        try (BufferedReader reader = new BufferedReader(new FileReader("usuarios.txt"))) {
//            String line;
//            while ((line = reader.readLine()) != null) {
//                String[] datos = line.split(",");
//               todosLosUsuarios.put(datos[1], new Usuario(datos[0], datos[1], datos[2], datos[3], datos[4], Rol.valueOf(datos[5])));
//            }
//        } catch (IOException e) {
//            fop.dialogoAlerta("Carga Usuarios", "Error al cargar los datos de los usuarios: " + e.getMessage());
//        }
//    }
    
//    public Usuario validarUsuario(String nombreUsuario, String contrasenaUsuario){
//        todosLosUsuarios = usuarios.getUsuarios();
//        
//        Usuario usuario = todosLosUsuarios.get(nombreUsuario);//get() busca dentro del hashmap alguna llave que corresponda a nombreUsuario, retornando todo el 
//            if (usuario != null && usuario.getContrasena().equals(contrasenaUsuario)) {
//                return usuario;
//            } else {
//                return null;
//            }
//    }
    
    public boolean validarExistencia (Producto valor){
        if (valor == null){
            return false;
        } else {
            return true;
        }    
    }
    
        public boolean validarCliente (Cliente valor){
        if (valor == null){
            return false;
        } else {
            return true;
        }    
    }
    
    public boolean validarString (String nombre,String caracteres){
        if(caracteres.matches("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")){
            return false;
        } else{
            fop.dialogoAlerta("Error en " +nombre, "El valor de \"" + nombre +"\" solo puede tener letras y espacios.\nPor favor intente de nuevo.");
            return true;  
        }
    }
    
    public boolean validarStringTamano (String nombre,int tamano, String caracteres){
        if(caracteres.matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%&_]).{"+tamano+",}+$")){
            return false;
        } else{
            fop.dialogoAlerta("Error en " +nombre, "El valor de \"" + nombre +"\" debe tener minimo 8 caracteres."
                              + "Debe contener al menos 1 caracter especial !@#$%&_\nPor favor intente de nuevo.");
            return true;  
        }
    }
    
    public boolean validarInteger (String nombre, String numero){
        if (numero.matches("^[0-9]+$")){
            return false;
        } else{
            fop.dialogoAlerta("Error en " + nombre, "El valor de \"" + nombre +"\" debe ser un numero. Las letras o caracteres no son permintidas.\nPor favor intente de nuevo.");
            return true;  
        }
    
    }
    
public boolean validarIntegerTamano (String nombre, int tamano, String numero){
        String regex = "^[0-9]{" + tamano + "}";
        if (numero.matches(regex)){
            return false;
        } else{
            fop.dialogoAlerta("Error en "+ nombre, "El valor de " + nombre + " debe contener unicamente numeros.\n"
                    + nombre + " debe contener " + tamano + " caracteres.\n"
                    + "Por favor intente de nuevo.");
            return true;  
        }
    }
    
        public boolean validarCorreo (String correo){
        if (correo.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            return false;
        } else{
            fop.dialogoAlerta("Error en Correo", "El Correo \"" + correo +"\" debe ser un Correo Valido.\nPor favor intente de nuevo.");
            return true;  
        }
    
    }
    
    public boolean validarFecha (String nombre, String numero){
        if (numero.matches("^\\d{2}-\\d{2}-\\d{4}$")){
            return false;
        } else{
            fop.dialogoAlerta("Error en " + nombre, "El valor de \"" + nombre +"\" debe tener formato DD-MM-AAAA.\nPor favor intente de nuevo.");
            return true;  
        }
    
    }
    
    
}
