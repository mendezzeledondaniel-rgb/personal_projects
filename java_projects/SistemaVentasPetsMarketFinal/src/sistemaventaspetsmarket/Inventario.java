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
import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;
/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class Inventario {        
    //Inicializacion de Clases
    private FastOptionPane fop = new FastOptionPane();
    private Validaciones val = new Validaciones();
    private CargaInformacion carga = new CargaInformacion();
    
    //Inicializacion de Variables
    public static HashMap<String, Producto> productosPorCodigo = new HashMap<>();
    private String nuevoNombre, precioString, cantidadString;
    private CategoriaProducto nuevaCategoria;
    private float nuevoPrecio;
    private int nuevaCantidad;
    
    private JTextField campoNombreP = new JTextField();
    private JTextField campoPrecioP = new JTextField();
    private JTextField campoCantidadP = new JTextField();
    //private JTextField campoCategoriaP = new JTextField();
    private JComboBox<CategoriaProducto> campoCategoriaP = new JComboBox<>(CategoriaProducto.values());
    
    
    public void inicializarInventario(){
        carga.cargarProductos();
        //productosPorCodigo = carga.getInventarioCargado();
    }
    
    public void menuGestionarInventario(){                
        boolean activo = true;
        String[] opcionesMenu = new String[]{"Agregar Producto", "Modificar Producto", "Mostrar el Inventario", "Salir"};
        
                
        while (activo) {
            int seleccion = fop.dialogoOpciones(opcionesMenu,"Gestion de Inventario", "-- Menu de Gestion de Inventarios--\nSeleccione una opcion");
            
            if (seleccion == JOptionPane.CLOSED_OPTION) break;            
            switch (seleccion) {
                case 0://Agregar Producto
                    String codigo = fop.dialogoEntrada("Agregar Producto","Ingrese código del producto:");
                        if (val.validarExistencia(buscarProducto(codigo)) == true){
                            fop.dialogoAlerta("Agregar Producto", "El producto ya existe dentro del inventario.\nSi desea agregar mas del mismo producto, utilice la opcion de \"Modificar Producto\" para hacerlo.");
                            break;
                        } else {
                            agregarProducto(codigo);
                            break;
                        }
                case 1:
                    String codigoMod = fop.dialogoEntrada("Modificar Producto","Ingrese código del producto a modificar:");
                    if (val.validarExistencia(buscarProducto(codigoMod)) == false){
                        fop.dialogoAlerta("Modificar Producto", "El producto no existe en el inventario.\nSi desea agregar uno nuevo, utilice la opcion \"Agregar Producto\" para hacerlo.");
                        break;
                    } else {
                        modificarProducto(codigoMod);
                        //cargar.guardarProductos(); // Guardamos después de modificar
                        break;
                    }
                case 2:
                    listarTablaInventario();
                    break;
                    
                case 3:
                    JOptionPane.showMessageDialog(null, "Regresando al menú principal...");
                    activo = false;
                    break;
            }
        }
    }
    
    public void agregarProducto(String codigo) {
        
        boolean valid = true;
        
        Object[] opcionesProducto = new Object[]{"Por favor, ingrese los datos del producto"," ",
                                                 "Nombre del Producto", campoNombreP, 
                                                 "Precio del Producto", campoPrecioP,
                                                 "Cantidad del Producto", campoCantidadP, 
                                                 "Categoria de Producto", campoCategoriaP};
        int confirm = fop.dialogoOkCancel("Agregar Producto", opcionesProducto);
            if (confirm == 0){
                String nombre = campoNombreP.getText();
                String precio = campoPrecioP.getText();
                String cantidad = campoCantidadP.getText();
                CategoriaProducto categoria = (CategoriaProducto)campoCategoriaP.getSelectedItem();
                while(valid) {
                    valid = val.validarString("NombreProducto", nombre);//retorna false si es valido el valor
                    if (valid == true){
                        nombre = fop.dialogoEntrada("Agregar Producto","Por favor, reingrese el Nombre del Producto");                            
                    }
                }
                valid = true;
                while(valid) {
                    valid = val.validarInteger("Precio", precio);//retorna false si es valido el valor
                    if (valid == true){
                        precio = fop.dialogoEntrada("Agregar Producto","Por favor, reingrese el Precio del Producto");
                    }
                }
                valid = true;
                while(valid) {
                    valid = val.validarInteger("Cantidad", cantidad);//retorna false si es valido el valor
                    if (valid == true){
                        cantidad = fop.dialogoEntrada("Agregar Producto","Por favor, reingrese la Cantidad del Producto");
                    }
                }
                
                Producto producto = new Producto(codigo, nombre, Float.parseFloat(precio), Integer.parseInt(cantidad), categoria);
                productosPorCodigo.putIfAbsent(producto.getCodigo(), producto);
                fop.dialogoInformacion("Agregar Producto", "Producto agregado satisfactoriamente."); 
                carga.guardarProductos();
            } else {
                fop.dialogoInformacion("Agregar Producto", "El producto no fue agregado.");                            
            }
        
    }
    
    public static Producto buscarProducto(String codigo) {
        Producto producto = productosPorCodigo.get(codigo);
        if (producto != null && producto.getCodigo().equals(codigo)) {
                return producto;
            } else {
                return null;
            }
        }
    
    public boolean actualizarStock(String codigo, int cantidad) {
        Producto producto = buscarProducto(codigo);
        return producto != null && producto.reducirStock(cantidad);
    }
    
    public void modificarProducto(String codigo) {
        Producto producto = buscarProducto(codigo);
        String[] opcionesModificar = new String[]{"Nombre","Precio","Cantidad","Categoria","Salir"};
        
        int otroVal = 1;
        boolean activo = true;
        
        while (activo){
            String mensaje = "Usuario a Modificar\n\n" +
                        "Codigo: " + producto.getCodigo()+"\n"+
                        "Nombre: " + producto.getNombre()+"\n"+
                        "Precio: " + producto.getPrecio()+"\n"+
                        "Cantidad Actual: " + producto.getCantidad()+"\n"+
                        "Categoria: " + producto.getCategoria()+"\n\n"+
                        "Seleccione una opcion para modificar";             
            int seleccion = fop.dialogoOpciones(opcionesModificar, "Modificar Producto", mensaje);
            if (seleccion == JOptionPane.CLOSED_OPTION) break;
            
            switch (seleccion) {
                case 0://Nombre
                    boolean valido = true;
                    while(valido){
                        nuevoNombre = fop.dialogoEntrada("Modificar Producto","Ingrese nuevo nombre:");
                        valido = val.validarString("NuevoNombre",nuevoNombre);
                    }
                    int reintentar = fop.dialogoConfirmacion("Modificar Nombre", "Valor ingresado: " + nuevoNombre + "\nEl valor ingresado es correcto?");
                    if (reintentar == 0){
                        producto.setNombre(nuevoNombre);
                        fop.dialogoInformacion("Modificar Producto", "Nombre modificado satisfactoriamente");
                        carga.guardarProductos();
                    } else {
                        fop.dialogoInformacion("Modificar Producto", "Nombre no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Producto", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 1://Precio
                    valido = true;
                    while(valido){
                        precioString = fop.dialogoEntrada("Modificar Producto","Ingrese nuevo precio:");
                        valido = val.validarInteger("NuevoPrecio",precioString);
                    }   
                    nuevoPrecio = Float.parseFloat(precioString);
                    producto.setPrecio(nuevoPrecio);
                    fop.dialogoInformacion("Modificar Producto", "Precio modificado satisfactoriamente");
                    carga.guardarProductos();
                    
                    otroVal = fop.dialogoConfirmacion("Modificar Producto", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    
                    break;
                case 2://Cantidad
                    valido = true;
                    while(valido){                
                        cantidadString = fop.dialogoEntrada("Modificar Producto","Ingrese nueva cantidad:");
                        valido = val.validarInteger("NuevaCantidad",cantidadString);
                    }
                    nuevaCantidad = Integer.parseInt(cantidadString);
                    producto.setCantidad(nuevaCantidad);
                    fop.dialogoInformacion("Modificar Producto", "Cantidad modificada satisfactoriamente");
                    carga.guardarProductos();
                    
                    otroVal = fop.dialogoConfirmacion("Modificar Producto", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 3://Categoria
                    valido = true;
                    //Object[] opciones = new Object[]{"Seleccione la nueva categoria del producto"," ", "Categoria", campoCategoriaP};
                    String[] categorias = {CategoriaProducto.Alimento.toString(), CategoriaProducto.Juguete.toString(), CategoriaProducto.Medicamento.toString()};
                    String rolSeleccionado = (String) JOptionPane.showInputDialog(null,"Seleccione un Nueva Categoria:",
                                                                                    "Asignar Rol",
                                                                                    JOptionPane.QUESTION_MESSAGE,
                                                                                    null,
                                                                                    categorias,
                                                                                    producto.getCategoria().toString());
                    
                    nuevaCategoria = CategoriaProducto.valueOf(rolSeleccionado);
                    
                    //int confirm = fop.dialogoOkCancel("Modificar Producto",opciones);
                    //if (confirm == 0) {
                    //    nuevaCategoria = (CategoriaProducto)campoCategoriaP.getSelectedItem();
                    //}
                    int reintentar2 = fop.dialogoConfirmacion("Modificar Producto", "Valor seleccionado: " + nuevaCategoria + "\nEl valor ingresado es correcto?");
                    if (reintentar2 == 0){
                        producto.setCategoria(nuevaCategoria);
                        fop.dialogoInformacion("Modificar Producto", "Nombre modificado satisfactoriamente");
                    } else {
                        fop.dialogoInformacion("Modificar Producto", "Nombre no modificado");
                    }
                    otroVal = fop.dialogoConfirmacion("Modificar Producto", "Desea modificar otro valor?");
                    if (otroVal == 1){
                        activo = false;
                    }
                    break;
                case 4:
                    fop.dialogoInformacion("Modificar Producto","Saliendo del menu de Modificacion de Productos");
                    activo = false;
                    break;
            }       
              
        }
    } 
    
    public void listarTablaInventario() {
        if (productosPorCodigo.isEmpty()) {
            fop.dialogoInformacion("Inventario", "El Inventario se ecuentra vacío.");
        } else {
            // Columnas y datos de ejemplo
            String[] columnas = {"Código", "Nombre", "Precio", "Cantidad", "Categoría"};

            // Crear el arreglo con las dimensiones adecuadas
            Object[][] datos = new Object[productosPorCodigo.size()][columnas.length]; // 3 columnas: cédula, nombre, correo

            // Llenar el arreglo
            int i = 0;
            for (Producto inv : productosPorCodigo.values()) {
                for (int j = 0; j < columnas.length; j++) {                                      
                    switch (j) {
                        case 0:
                            datos[i][j] = inv.getCodigo();
                            break;
                        case 1:
                            datos[i][j] = inv.getNombre();
                            break;
                        case 2:
                            datos[i][j] = inv.getPrecio();
                            break;
                        case 3:
                            datos[i][j] = inv.getCantidad();
                            break;  
                        case 4:
                            datos[i][j] = inv.getCategoria();
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
            fop.dialogoInformacionTabla("Inventario", scrollPane);    
        }    
    }


}
