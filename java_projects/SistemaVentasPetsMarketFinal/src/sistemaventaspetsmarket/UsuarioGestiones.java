/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sistemaventaspetsmarket;

import java.util.HashMap;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

/**
 *
 * @author Daniel
 */
public class UsuarioGestiones {
    
    private FastOptionPane fop = new FastOptionPane();
    private Validaciones val = new Validaciones();
    private CargaInformacion carga = new CargaInformacion();
    
    
    public static HashMap<String, Usuario> registroUsuarios = new HashMap<>();
    private JTextField campoNombreU = new JTextField();
    private JTextField campoApellidosU = new JTextField();
    private JTextField campoCedulaU = new JTextField();
    private JTextField campoContrasenaU = new JTextField();
    private JComboBox<Rol> campoRolU = new JComboBox<>(Rol.values());
    
    private String nuevoNombre, nuevoApellido, nuevoCedula, nuevoContrasena;
    private Rol nuevoRol;
    
    
    public void inicializarUsuarios(){
        carga.cargarUsuarios();
        //usuarios = carga.getUsuariosCargados();
    }
    
    //public HashMap getUsuarios(){
    //    return usuarios;
    
    //}
    
    public Usuario validarUsuario(String nombreUsuario, String contrasenaUsuario){
        
        Usuario usuario = registroUsuarios.get(nombreUsuario);//get() busca dentro del hashmap alguna llave que corresponda a nombreUsuario, retornando todo el 
            if (usuario != null && usuario.getContrasena().equals(contrasenaUsuario)) {
                return usuario;
            } else {
                return null;
            }
    }
    
    public Usuario buscarUsuario (String user) {
        Usuario usuario = registroUsuarios.get(user);
        if (usuario != null && usuario.getNombreUsuario().equals(user)) {
            return usuario;
        } else {
            return null;
        }
    }
    
    public boolean validarNuevoUsuario (String cedula){
        for (Usuario u : registroUsuarios.values()){
            if (u.getCedula().equals(cedula)){
                return true;
            }
        }
        return false;  
    }
    
        
    public void menuGestionarUsuarios() { 
            boolean activo = true;
            boolean valid = true;
            String cedula = "";
            String[] opcionesMenu = new String[]{"Agregar Usuario", "Modificar Usuario", "Eliminar Usuario", "Listar Usuario", "Salir"};

            while (activo) {
                carga.cargarUsuarios();
                int seleccion = fop.dialogoOpciones(opcionesMenu,"Gestion de Usuarios", "-- Menu de Gestion de Usuarios--\nSeleccione una opcion");

                if (seleccion == JOptionPane.CLOSED_OPTION) break;

                switch (seleccion) {
                    case 0:
                        while (valid){
                            cedula = fop.dialogoEntrada("Agregar Usuario","Ingrese la Cedula del Nuevo Usuario:");
                            valid = val.validarIntegerTamano("Cedula",9,cedula);
                        }
                        valid = true;
                        if (validarNuevoUsuario(cedula)){
                            fop.dialogoAlerta("Agregar Usuario", "El Usuario ya existe dentro del registro.\n"
                                    + "Si desea modificar los detalles del Usuario, utilice la opcion de \"Modificar Usuario\" para hacerlo.");
                            break;
                        } else {
                            agregarUsuarios(cedula);
                            break;
                        }
                    case 1:
                        String user = fop.dialogoEntrada("Modificar Usuario","Ingrese el Usuario que desea modificar:");
                        Usuario usuarioEncontrado = buscarUsuario(user);                            
                        if (usuarioEncontrado == null){
                            fop.dialogoAlerta("Modificar Usuario", "El Usuario no existe dentro del registro.\n"
                                    + "Si desea Agregar un usuario, utilice la opcion de \"Agregar Usuario\" para hacerlo.");
                            break;
                        } else {
                            modificarUsuario(usuarioEncontrado);  
                            break;
                        }
                    case 2:
                        user = fop.dialogoEntrada("Modificar Usuario","Ingrese el Usuario que desea eliminar:");
                        usuarioEncontrado = buscarUsuario(user);                            
                        if (usuarioEncontrado==null){
                            fop.dialogoAlerta("Eliminar Usuario", "El Usuario NO existe dentro del registro.");
                            break;
                        } else {
                            eliminarUsuario(usuarioEncontrado);  
                            break;
                        }
                    case 3:
                        listarTablaUsuarios();
                        break;    
                    case 4:
                         fop.dialogoAlerta("Eliminar Usuario", "Regresando al menú principal...");
                        activo = false;
                        break;
                }
            }
    }
    
    public void agregarUsuarios(String cedula){
        boolean valid = true;
        String usuario = "";
        String contrasena = "";
        String nombre = campoNombreU.getText();
        String apellido = campoApellidosU.getText();
        Rol rol = (Rol)campoRolU.getSelectedItem();
        
        Object[] opcionesUsuario = new Object[]{"Por favor, ingrese los datos del Usuario"," ",
                                                 "Nombre del Usuario", campoNombreU, 
                                                 "Apellidos del Usuario", campoApellidosU, 
                                                 "Rol", campoRolU};
        int confirm = fop.dialogoOkCancel("Agregar Usuario", opcionesUsuario);
        if (confirm == 0){

            while(valid) {
                valid = val.validarString("NombreUsuario", nombre);//retorna false si es valido el valor
                if (valid == true){
                    nombre = fop.dialogoEntrada("Agregar Usuario","Por favor, reingrese el Nombre del Usuario");                            
                }
            }
            valid = true;
            while(valid) {
                valid = val.validarString("Apellidos", apellido);//retorna false si es valido el valor
                if (valid == true){
                    apellido = fop.dialogoEntrada("Agregar Usuario","Por favor, reingrese los Apellidos del Usuario");
                }
            }
            valid = true;
            while(valid) {
                valid = val.validarIntegerTamano("Cedula", 9, cedula);//retorna false si es valido el valor
                if (valid == true){
                    cedula = fop.dialogoEntrada("Agregar Usuario","Por favor, reingrese la Cedula del Usuario");
                }
            }
            valid = true;

            usuario += nombre.substring(0,2)+apellido.substring(0,2)+cedula.substring(0,0)+cedula.substring(3,4)+cedula.substring(7,8);

            while(valid) {
                contrasena = fop.dialogoEntrada("Agregar Usuario","Por favor, ingrese una Clave para el usuario Nuevo.\nUsuario: " + usuario);
                valid = val.validarStringTamano("Contraseña", 8, contrasena);
            }

            Usuario nuevoUsuario = new Usuario(usuario, nombre, apellido, cedula, contrasena, rol);
            registroUsuarios.putIfAbsent(nuevoUsuario.getNombreUsuario(),nuevoUsuario);
            fop.dialogoInformacion("Agregar Usuario", "Usuario agregado satisfactoriamente."); 
            carga.guardarUsuarios();
        } else {
            fop.dialogoInformacion("Agregar Usuario", "El Usuario no fue agregado.");                            
        }
    }
    
    public void modificarUsuario(Usuario user) {
        String[] opcionesModificar = new String[]{"Nombre","Apellidos","Cedula","Contrasena","Rol","Salir"};
        int otroVal = 1;
        boolean activo = true;
        
        while (activo){
            String mensaje = "Usuario a Modificar\n\n" +
                        "Usuario: " + user.getNombreUsuario()+"\n"+
                        "Nombre: " + user.getNombre()+"\n"+
                        "Apellidos: " + user.getApellidos()+"\n"+
                        "Cedula: " + user.getCedula()+"\n"+
                        "Rol: " + user.getRol()+"\n\n"+
                        "Seleccione una opcion para modificar";
            int seleccion = fop.dialogoOpciones(opcionesModificar, "Modificar Usuario", mensaje);
            if (seleccion == JOptionPane.CLOSED_OPTION) break;
            
            switch (seleccion) {
                case 0://Nombre
                    boolean valido = true;
                    while(valido){
                        nuevoNombre = fop.dialogoEntrada("Modificar Usuario","Ingrese nuevo Nombre de Usuario:");
                        valido = val.validarString("NuevoNombreUsuario",nuevoNombre);
                    }
                    int reintentar = fop.dialogoConfirmacion("Modificar Usuario", "Valor ingresado: " + nuevoNombre + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        user.setNombre(nuevoNombre);
                        fop.dialogoInformacion("Modificar Usuario", "Nombre modificado satisfactoriamente");
                        carga.guardarUsuarios();
                    } else {
                        fop.dialogoInformacion("Modificar Usuario", "Nombre no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Usuario", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 1://Apellidos
                    valido = true;
                    while(valido){
                        nuevoApellido = fop.dialogoEntrada("Modificar Usuario","Ingrese Nuevos Apellidos:");
                        valido = val.validarString("NuevosApellidos",nuevoApellido);
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Usuario", "Valor ingresado: " + nuevoApellido + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        user.setApellidos(nuevoApellido);
                        fop.dialogoInformacion("Modificar Usuario", "Apellidos modificados satisfactoriamente");
                        carga.guardarUsuarios();
                    } else {
                        fop.dialogoInformacion("Modificar Usuario", "Apellidos no modificadso");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Usuario", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }                    
                    break;
                case 2://Cedula
                    valido = true;
                    while(valido){                
                        nuevoCedula = fop.dialogoEntrada("Modificar Usuario","Ingrese la nueva Cedula del Usuario:");
                        valido = val.validarIntegerTamano("Cedula", 9 , nuevoCedula);                        
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Usuario", "Valor ingresado: " + nuevoCedula + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        user.setCedula(nuevoCedula);
                        fop.dialogoInformacion("Modificar Usuario", "Cedula modificada satisfactoriamente");
                        carga.guardarUsuarios();
                    } else {
                        fop.dialogoInformacion("Modificar Usuario", "Cedula no modificada");
                    }
                        otroVal = fop.dialogoConfirmacion("Modificar Usuario", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 3://Contrasena
                    valido = true;
                    while(valido){
                        nuevoContrasena = fop.dialogoEntrada("Modificar Usuario","Ingrese nueva Contrasena:");
                        valido = val.validarStringTamano("NuevaContrasena",8,nuevoContrasena);
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Usuario", "Valor ingresado: " + nuevoContrasena + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        user.setContrasena(nuevoContrasena);
                        fop.dialogoInformacion("Modificar Usuario", "Contrasena modificado satisfactoriamente");
                        carga.guardarUsuarios();
                    } else {
                        fop.dialogoInformacion("Modificar Usuario", "Contrasena no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Usuario", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 4://Rol
                    Object[] opciones = new Object[]{"Seleccione el nuevo Rol del Usuario"," ", "Rol", campoRolU};
                    int confirm = fop.dialogoOkCancel("Modificar Usuario",opciones);
                    if (confirm == 0) {
                        nuevoRol = (Rol)campoRolU.getSelectedItem();
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Usuario", "Valor seleccionado: " + nuevoRol + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        user.setRol(nuevoRol);
                        fop.dialogoInformacion("Modificar Usuario", "Rol modificado satisfactoriamente");
                        carga.guardarUsuarios();
                    } else {
                        fop.dialogoInformacion("Modificar Usuario", "Rol no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Usuario", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 5:
                    fop.dialogoInformacion("Modificar Usuario","Saliendo del menu de Modificacion de Usuarios");
                    activo = false;
                    break;
            }       
              
        }
    }
    
    public void eliminarUsuario(Usuario user){
        carga.cargarUsuarios();
        String mensaje = "Usuario Encontrado!\n\n" +
                        "Usuario: " + user.getNombreUsuario()+"\n"+
                        "Nombre: " + user.getNombre()+"\n"+
                        "Apellidos: " + user.getApellidos()+"\n"+
                        "Cedula: " + user.getCedula()+"\n"+
                        "Rol: " + user.getRol()+"\n\n"+
                        "ESTA SEGURO de que quiere ELIMINAR este Cliente?";
                
        int eliminar = fop.dialogoConfirmacion("Eliminar Cliente", mensaje);
        if (eliminar == 0){
            Usuario usuarioRemovido = registroUsuarios.remove(user);
            fop.dialogoAlerta("Eliminar Cliente", "Cliente Eliminado del Registro satisfactoriamente...");
            carga.guardarUsuarios();
        } else {
           fop.dialogoInformacion("Eliminar Cliente", "Cliente NO FUE Eliminado...");
        }
    }
 
        public void listarTablaUsuarios() {
        if (registroUsuarios.isEmpty()) {
            fop.dialogoInformacion("Inventario", "El Registro de Usuarios se ecuentra vacío.");
        } else {
            // Columnas y datos de ejemplo
            String[] columnas = {"Nombre Usuario", "Nombre", "Apellido", "Cédula", "Contraseña", "Rol"};

            // Crear el arreglo con las dimensiones adecuadas
            Object[][] datos = new Object[registroUsuarios.size()][columnas.length]; // 3 columnas: cédula, nombre, correo

            // Llenar el arreglo
            int i = 0;
            for (Usuario u : registroUsuarios.values()){

                for (int j = 0; j < columnas.length; j++) {                                      
                    switch (j) {
                        case 0:
                            datos[i][j] = u.getNombreUsuario();
                            break;
                        case 1:
                            datos[i][j] = u.getNombre();
                            break;
                        case 2:
                            datos[i][j] = u.getApellidos();
                            break;
                        case 3:
                            datos[i][j] = u.getCedula();
                            break;
                        case 4:
                            datos[i][j] = u.getContrasena();
                            break;
                        case 5:
                            datos[i][j] = u.getRol().toString();
                            break;     
                    }
                }
                i++;
            }                

            // Crear el modelo y la tabla
            DefaultTableModel modelo = new DefaultTableModel(datos, columnas);
            JTable tabla = new JTable(modelo);
            tabla.setEnabled(false); // Opcional: hacerla solo de lectura

            // Meter la tabla en un JScrollPane para scroll
            JScrollPane scrollPane = new JScrollPane(tabla);
            scrollPane.setPreferredSize(new java.awt.Dimension(400, 100));

            // Mostrarlo en un JOptionPane
            fop.dialogoInformacionTabla("Registro de Usuarios", scrollPane);  
        }    
   
    }
}
