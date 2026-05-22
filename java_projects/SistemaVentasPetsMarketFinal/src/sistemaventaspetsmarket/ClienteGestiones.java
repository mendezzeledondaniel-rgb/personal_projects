package sistemaventaspetsmarket;

import java.io.IOException;
import java.util.HashMap;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

public class ClienteGestiones {
    
    public static HashMap<String, Cliente> registroClientes = new HashMap<>();
    private CargaInformacion carga = new CargaInformacion();
    private FastOptionPane fop = new FastOptionPane();
    private Validaciones val = new Validaciones();
    
    private String nuevoNombre, nuevoApellidos, nuevoCedula, nuevoCorreo;
    
    private JTextField campoNombreC = new JTextField();
    private JTextField campoApellidosC = new JTextField();
    private JTextField campoCedulaC = new JTextField();
    private JTextField campoEmailC = new JTextField();
    
    
    public void inicializarClientes(){
        carga.cargarClientes();
        //clientes = carga.getClientesCargados();
    }
    
    
    public void menuGestionarClientes() {
            boolean activo = true;
            boolean valid = true;
            String cedula = "";
            String[] opcionesMenu = new String[]{"Agregar Cliente", "Modificar Cliente", "Eliminar Cliente", "Listar Clientes", "Salir"};

            while (activo) {
                int seleccion = fop.dialogoOpciones(opcionesMenu, "Menu de Administracion de Clientes","Por favor, seleccione una opcion del menu");

                if (seleccion == JOptionPane.CLOSED_OPTION) break;

                switch (seleccion) {
                    case 0://Agregar Cliente
                        while (valid){
                            cedula = fop.dialogoEntrada("Agregar Cliente","Ingrese la Cedula del Nuevo Cliente:");
                            valid = val.validarIntegerTamano("Cedula",9,cedula);
                        }
                        valid = true;
                        if (val.validarCliente(buscarCliente(cedula)) == true){
                            fop.dialogoAlerta("Agregar Cliente", "El Cliente ya existe dentro del registro.\n"
                                    + "Si desea modificar los detalles del Cliente, utilice la opcion de \"Modificar Cliente\" para hacerlo.");
                            break;
                        } else {
                            agregarCliente(cedula);
                            break;
                        }
                    case 1://Modificar Cliente
                        while (valid) {
                            cedula = fop.dialogoEntrada("Modificar Cliente","Ingrese la Cedula del Cliente a modificar:");
                            valid = val.validarIntegerTamano("Cedula",9,cedula);                            
                        }
                        valid = true;
                        if (val.validarCliente(buscarCliente(cedula)) == false){
                            fop.dialogoAlerta("Modificar Cliente", "El Cliente no existe en el registro.\n"
                                    + "Si desea agregar un Cliente Nuevo, utilice la opcion \"Agregar Cliente\" para hacerlo.");
                            break;
                        } else {
                            modificarCliente(cedula);
                        //cargar.guardarClientes(); // Guardamos después de modificar
                            break;
                        }
                    case 2:
                        while (valid){
                            cedula = fop.dialogoEntrada("Eliminar Cliente","🔍 Ingrese la cédula del cliente que desea eliminar:");
                            valid = val.validarIntegerTamano("Cedula",9,cedula);
                        }
                        valid = true;                        
                        if (val.validarCliente(buscarCliente(cedula)) == false){
                            fop.dialogoAlerta("Eliminar Cliente", "🚫 Cliente no encontrado en el registro.\n");
                            break;
                        } else {
                            eliminarCliente(cedula);
                        //cargar.guardarClientes(); // Guardamos después de modificar
                            break;
                        }
                    case 3:
                        listarTablaClientes();
                        break;    
                    case 4:
                        fop.dialogoInformacion("Menu de Administracion de Clientes", "Volviendo al menu principal");
                        activo = false;
                        break;
                }
            }
    }
    
    
    public static Cliente buscarCliente(String cedula) {
        Cliente cliente = registroClientes.get(cedula);
        if (cliente != null && cliente.getCedula().equals(cedula)) {
                return cliente;
            } else {
                return null;
            }
        }
        
    public void agregarCliente(String cedula){
        boolean valid = true;
        Object[] opcionesCliente = new Object[]{"Por favor, ingrese los datos del Cliente"," ",
                                                "Nombre del Cliente", campoNombreC,
                                                "Apellidos del Cliente", campoApellidosC,
                                                "Correo electronico", campoEmailC};
        int confirm = fop.dialogoOkCancel("Agregar Nuevo Cliente", opcionesCliente);
        if (confirm == 0){
            String nombre = campoNombreC.getText();
            String apellidos = campoApellidosC.getText();
            //String cedula = campoCedulaC.getText();
            String email = campoEmailC.getText();
            while(valid) {
                valid = val.validarString("NombreCliente", nombre);//retorna false si es valido el valor
                if (valid == true){
                    nombre = fop.dialogoEntrada("Agregar Cliente","Por favor, reingrese el Nombre del Cliente");                            
                }
            }
            valid = true;
            while(valid) {
                valid = val.validarString("ApellidosCliente", apellidos);//retorna false si es valido el valor
                if (valid == true){
                    apellidos = fop.dialogoEntrada("Agregar Cliente","Por favor, reingrese los Apellidos del Cliente");
                }
            }
            valid = true;
            while(valid) {
                valid = val.validarCorreo(email);//retorna false si es valido el valor
                if (valid == true){
                    email = fop.dialogoEntrada("Agregar Cliente","Por favor, reingrese el Correo del Cliente");
                }
            }
            Cliente nuevoCliente = new Cliente(nombre, apellidos, cedula, email);
            registroClientes.putIfAbsent(nuevoCliente.getCedula(), nuevoCliente);
            fop.dialogoInformacion("Agregar Nuevo Cliente", "Cliente agregado satisfactoriamente."); 
            carga.guardarClientes();
        } else {
            fop.dialogoInformacion("Agregar Cliente", "El Cliente no fue agregado.");                            
        }
    }
    
    public void modificarCliente(String cedula) {
        Cliente cliente = buscarCliente(cedula);
        String[] opcionesModificar = new String[]{"Nombre","Apellidos","Cedula","Correo Electronico","Salir"};
        int otroVal = 1;
        boolean activo = true;
        
        while (activo){            
            int seleccion = fop.dialogoOpciones(opcionesModificar, "Modificar Cliente", "Seleccione la opcion que desea modificar");
            if (seleccion == JOptionPane.CLOSED_OPTION) break;
            
            switch (seleccion) {
                case 0://Nombre
                    boolean valido = true;
                    while(valido){
                        nuevoNombre = fop.dialogoEntrada("Modificar Cliente","Ingrese nuevo Nombre de Cliente:");
                        valido = val.validarString("NuevoNombreCliente",nuevoNombre);
                    }
                    int reintentar = fop.dialogoConfirmacion("Modificar Cliente", "Valor ingresado: " + nuevoNombre + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        cliente.setNombre(nuevoNombre);
                        fop.dialogoInformacion("Modificar Cliente", "Nombre modificado satisfactoriamente");
                        carga.guardarClientes();
                    } else {
                        fop.dialogoInformacion("Modificar Cliente", "Nombre no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Cliente", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 1://Apellidos
                    valido = true;
                    while(valido){
                        nuevoApellidos = fop.dialogoEntrada("Modificar Cliente","Ingrese Nuevos Apellidos:");
                        valido = val.validarString("NuevosApellidos",nuevoApellidos);
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Cliente", "Valor ingresado: " + nuevoApellidos + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        cliente.setApellidos(nuevoApellidos);
                        fop.dialogoInformacion("Modificar Cliente", "Apellidos modificados satisfactoriamente");
                        carga.guardarClientes();
                    } else {
                        fop.dialogoInformacion("Modificar Cliente", "Apellidos no modificadso");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Cliente", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    
                    break;
                case 2://Cedula
                    valido = true;
                    while(valido){                
                        nuevoCedula = fop.dialogoEntrada("Modificar Cliente","Ingrese la nueva Cedula del Cliente:");
                        valido = val.validarIntegerTamano("Cedula", 9 , nuevoCedula);                        
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Cliente", "Valor ingresado: " + nuevoCedula + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        cliente.setCedula(nuevoCedula);
                        fop.dialogoInformacion("Modificar Cliente", "Cedula modificada satisfactoriamente");
                        carga.guardarClientes();
                    } else {
                        fop.dialogoInformacion("Modificar Cliente", "Cedula no modificada");
                    }
                        otroVal = fop.dialogoConfirmacion("Modificar Cliente", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 3://Correo
                    valido = true;
                    while(valido){
                        nuevoCorreo = fop.dialogoEntrada("Modificar Cliente","Ingrese nuevo Correo:");
                        valido = val.validarCorreo(nuevoCorreo);
                    }
                    reintentar = fop.dialogoConfirmacion("Modificar Cliente", "Valor ingresado: " + nuevoCorreo + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        cliente.setEmail(nuevoCorreo);
                        fop.dialogoInformacion("Modificar Cliente", "Correo modificado satisfactoriamente");
                        carga.guardarClientes();
                    } else {
                        fop.dialogoInformacion("Modificar Cliente", "Correo no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Cliente", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 4:
                    fop.dialogoInformacion("Modificar Cliente","Saliendo del menu de Modificacion de Clientes");
                    activo = false;
                    break;
            }       
              
        }
    }
 
/*
    public void modificarCliente() {
        String cedula = JOptionPane.showInputDialog("🔍 Ingrese la cédula del cliente a modificar:");
        Cliente cliente = buscarCliente(cedula);

        if (cliente != null) {
            String textAEditar = cliente.getNombre() + "," + cliente.getApellidos() + "," + cliente.getCedula() + "," + cliente.getEmail();
            
            String nuevoNombre = JOptionPane.showInputDialog("Nuevo nombre:", cliente.getNombre());
            String nuevosApellidos = JOptionPane.showInputDialog("Nuevos apellidos:", cliente.getApellidos());
            String nuevoEmail = JOptionPane.showInputDialog("Nuevo email:", cliente.getEmail());

            cliente.setNombre(nuevoNombre);
            cliente.setApellidos(nuevosApellidos);
            cliente.setEmail(nuevoEmail);

            //guardarClientes();            
            String nuevoTexto = cliente.getNombre() + "," + cliente.getApellidos() + "," + cliente.getCedula() + "," + cliente.getEmail();
            modificarLineaDeArchivo("clientes.txt", textAEditar, nuevoTexto);
            JOptionPane.showMessageDialog(null, "✅ Cliente modificado exitosamente.");
        } else {
            JOptionPane.showMessageDialog(null, "🚫 Cliente no encontrado.");
        }
    }
*/    
    public void eliminarCliente(String cedula){
        carga.cargarClientes();
        Cliente cliente = buscarCliente(cedula);
        String mensaje = "Cliente Encontrado!\n\n" + 
                        "Nombre: " + cliente.getNombre()+"\n"+
                        "Apellidos: " + cliente.getApellidos()+"\n"+
                        "Cedula: " + cliente.getCedula() + "\n"+
                        "Correo: " + cliente.getEmail()+"\n\n"+
                        "ESTA SEGURO de que quiere ELIMINAR este Cliente?";
                
        int eliminar = fop.dialogoConfirmacion("Eliminar Cliente", mensaje);
        if (eliminar == 0){
            Cliente clienteRemovido = registroClientes.remove(cedula);
            fop.dialogoAlerta("Eliminar Cliente", "Cliente Eliminado del Registro satisfactoriamente...");
            carga.guardarClientes();    
        } else {
           fop.dialogoInformacion("Eliminar Cliente", "Cliente NO FUE Eliminado...");
        }
    }
    
    public void listarTablaClientes() {
        if (registroClientes.isEmpty()) {
            fop.dialogoInformacion("Lista de Clientes", "La lista de registroClientes está vacía.");
        } else {
            // Columnas y datos de ejemplo
            String[] columnas = {"Nombre", "Apellido", "Cédula", "Correo"};

            // Crear el arreglo con las dimensiones adecuadas
            Object[][] datos = new Object[registroClientes.size()][columnas.length]; // 3 columnas: cédula, nombre, correo

            // Llenar el arreglo
            int i = 0;
            for (Cliente c : registroClientes.values()) {
                for (int j = 0; j < columnas.length; j++) {                                      
                    switch (j) {
                        case 0:
                            datos[i][j] = c.getNombre();
                            break;
                        case 1:
                            datos[i][j] = c.getApellidos();
                            break;
                        case 2:
                            datos[i][j] = c.getCedula();
                            break;
                        case 3:
                            datos[i][j] = c.getEmail();
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
            fop.dialogoInformacionTabla("Lista de Clientes", scrollPane);    
        }    
    }
    
}//END
