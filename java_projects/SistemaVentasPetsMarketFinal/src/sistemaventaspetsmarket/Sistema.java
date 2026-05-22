/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sistemaventaspetsmarket;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class Sistema {
    
    private FastOptionPane fop = new FastOptionPane();
    private Validaciones val = new Validaciones();;
    private Inventario inventario = new Inventario();
    private ClienteGestiones gestionDeClientes = new ClienteGestiones();
    private UsuarioGestiones gestionDeUsuarios = new UsuarioGestiones();
    private Venta miVenta = new Venta();
    
    private ArrayList<Cliente> clientes = new ArrayList<>();

    
    
    private JTextField CampoUsuario = new JTextField();
    private JPasswordField CampoPassword = new JPasswordField();
    
    public void iniciarSesion() {
        boolean activo = true;
        while (activo) {
            String[] opcionesInicio = new String[]{"Iniciar Session","Salir"};
            int selec = fop.dialogoOpciones(opcionesInicio, "PetsMarket", "-- Bienvenido a PetsMarket --\n" + "Por seguridad debe iniciar sesión");            
            if (selec == 0){
                boolean activo2 = true;
                while(activo2){
                    Object[] mensaje = new Object[]{"Ingrese el Usuario y la Contraseña"," ", "Usuario", CampoUsuario, "Contraseña", CampoPassword};
                    int confirm = fop.dialogoLogin("PetsMarket", mensaje);
                    if (confirm == 0){
                        Usuario usuario = gestionDeUsuarios.validarUsuario(CampoUsuario.getText(), new String(CampoPassword.getPassword()));
                        if (usuario != null) {
                            fop.dialogoInformacion("PetsMarket", "Inicio de sesión exitoso.\nBienvenido, " + usuario.getNombre() + "!");
                            try{
                                menuPrincipal(usuario);
                                activo2 = false;
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        } else{
                            fop.dialogoAlerta("PetsMarket", "Error. Usuario o contraseña incorrectos");
                            int opc = fop.dialogoConfirmacion("PetsMarket", "¿Desea intentarlo de nuevo?");
                            if (opc != 0) {
                                fop.dialogoInformacion("PetsMarket", "Saliendo al inicio...");
                                activo2 = false;
                            }                        
                        }
                    
                    } else {
                        fop.dialogoInformacion("PetsMarket", "Saliendo al inicio...");
                        activo2 = false;
                    
                    }//fin del if confirm
                }//fin del segundo while
            
            } else{
                fop.dialogoInformacion("PetsMarket", "Se va cerrar el sistema...");
                activo = false;            
            }//fin del if selec
        }//fin del primer while
    }//fin de iniciar sesion
    
    public void menuPrincipal(Usuario usuario) throws IOException {
        iniciar();
        //boolean cerrarSistema = true;
        boolean activo = true;
        String[] opcionesMenu;

        while (activo) {
            if (usuario.getRol() == Rol.GERENTE) {
                opcionesMenu = new String[]{"Gestionar Inventario", "Gestionar Clientes", "Procesar Ventas", "Gestionar Usuarios", "Cerrar Sesión"};
            } else {
                opcionesMenu = new String[]{"Gestionar Inventario", "Gestionar Clientes", "Procesar Ventas", "Cerrar Sesión"};
            }
            String mensaje = "Menú Principal - PetsMarket\n\nNombre: " + usuario.getNombre() + "\nUsuario: " + usuario.getNombreUsuario() +" (" + usuario.getRol() + ")\n\nSeleccione una opción:";
            int seleccion = fop.dialogoOpciones(opcionesMenu, "Menu Principal", mensaje);

            if (seleccion == JOptionPane.CLOSED_OPTION) break;
            switch (seleccion) {
                case 0:
                    inventario.menuGestionarInventario();
                    break;
                case 1:
                    gestionDeClientes.menuGestionarClientes();
                    break;
                case 2:
                    miVenta.realizarVenta();
                    break;
                case 3:
                    if (usuario.getRol() == Rol.GERENTE) {
                        gestionDeUsuarios.menuGestionarUsuarios();
                        break;
                    } else {
                        fop.dialogoInformacion("Sistema de Pets Market", "Cerrando sesión...");
                        activo = false;
                        break;
                    }
                case 4:                    
                    fop.dialogoInformacion("Sistema de Pets Market", "Cerrando sesión...");
                    //AQUI DEBO GUARDAR TODO LO HECHO
                    activo = false;
                    break;    
            }
        }
        //return false;
    }
    
    public void iniciar() {
        inventario.inicializarInventario();
        gestionDeClientes.inicializarClientes();
    }

}
