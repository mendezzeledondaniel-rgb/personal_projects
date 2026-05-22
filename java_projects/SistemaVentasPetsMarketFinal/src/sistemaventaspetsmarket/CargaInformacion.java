
package sistemaventaspetsmarket;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.swing.JOptionPane;


public class CargaInformacion {
    //private static HashMap<String, Usuario> todosLosUsuarios = new HashMap<>();
    //private static HashMap<String, Producto> inventario = new HashMap<>();
    //private static HashMap<String, Cliente> clientes = new HashMap<>();
    private FastOptionPane fop = new FastOptionPane();
    //private Inventario inventarioValidaciones = new Inventario();    
    
    public void cargarUsuarios() {
        try (BufferedReader reader = new BufferedReader(new FileReader("usuarios.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] datos = line.split(",");
                UsuarioGestiones.registroUsuarios.put(datos[0], new Usuario(datos[0], datos[1], datos[2], datos[3], datos[4], Rol.valueOf(datos[5])));
            }
        } catch (IOException e) {
            //fop.dialogoAlerta("Carga Usuarios", "Error al cargar los datos de los usuarios: " + e.getMessage());
            e.getMessage();
        }
    }
    
    public void guardarUsuarios() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("usuarios.txt"))) {
            for (Usuario usuario : UsuarioGestiones.registroUsuarios.values()) {
                // Guardar cada producto en el archivo con sus datos
                writer.write(usuario.getNombreUsuario() + "," + usuario.getNombre() + "," + 
                             usuario.getApellidos() + "," + usuario.getCedula() + "," + 
                             usuario.getContrasena() + "," + usuario.getRol());
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    } 
    
    //public HashMap<String, Usuario> getUsuariosCargados (){
    //    return todosLosUsuarios;
    //}
    
    //------------------------------------------------------------
    //SECCION PRODUCTOS
    //-------------------------------------------------------------
    
// Función para cargar los productos desde el archivo
    public void cargarProductos() {
        //HACER AQUI U N HASHMAP PARA CARGAR INVENTARIO 
        try (BufferedReader reader = new BufferedReader(new FileReader("productos.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Divide la línea en partes
                String[] datos = line.split(",");
                String codigo = datos[0];
                String nombre = datos[1];
                float precio = Float.parseFloat(datos[2]);
                int cantidad = Integer.parseInt(datos[3]);
                CategoriaProducto categoria = CategoriaProducto.valueOf(datos[4]);
                Inventario.productosPorCodigo.put(datos[0], new Producto (codigo, nombre, precio, cantidad, categoria));
                
            
                // Crea un producto y lo agrega al inventario
                //Producto producto = new Producto(codigo, nombre, precio, cantidad, categoria);
                //agregarProducto(producto); // Asumiendo que esta función agrega el producto al inventario
            }
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error al cargar los datos de los productos: " + e.getMessage());
        }
    }
    
    public void guardarProductos() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("productos.txt"))) {
            for (Producto producto : Inventario.productosPorCodigo.values()) {
                // Guardar cada producto en el archivo con sus datos
                writer.write(producto.getCodigo() + "," + producto.getNombre() + "," + producto.getPrecio() + "," + producto.getCantidad() + "," + producto.getCategoria());
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    //public HashMap<String, Producto> getInventarioCargado (){
    //    return inventario;
    //}    
    
    public void cargarClientes() {
        try (BufferedReader reader = new BufferedReader(new FileReader("clientes.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] datos = line.split(",");
                String nombre = datos[0];
                String apellidos = datos[1];
                String cedula = datos[2];
                String email = datos[3];
                
                ClienteGestiones.registroClientes.put(cedula, new Cliente(nombre, apellidos, cedula, email));
            }
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error al cargar los datos de los clientes: " + e.getMessage());
        }
    }
    
        public void guardarClientes() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("clientes.txt"))) {
            for (Cliente cliente : ClienteGestiones.registroClientes.values()) {
                // Guardar cada producto en el archivo con sus datos
                writer.write(cliente.getNombre()+ "," + cliente.getApellidos() + "," + cliente.getCedula() + "," + cliente.getEmail());
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
