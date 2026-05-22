/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sistemaventaspetsmarket;

import javax.swing.JOptionPane;

/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class Venta {
    private FastOptionPane fop = new FastOptionPane();
    private Validaciones val = new Validaciones();
    private CargaInformacion carga = new CargaInformacion();
    /*    
    private Cliente cliente;
    private Producto producto;
    private int cantidad;
    private float total;

    public Venta(Cliente cliente, Producto producto, int cantidad) {
        this.cliente = cliente;
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = producto.getPrecio() * cantidad;
    }

    public String getDetalleVenta() {
        return "Cliente: " + cliente.getNombre() + " " + cliente.getCedula() + "\n"
                + "Producto: " + producto.getNombre() + " - Cantidad: " + cantidad + "\n"
                + "Total: $" + total;
    }
    
 */
    public void realizarVenta() {
        // Solicitar cédula del cliente
        
        int cantidad = 0;
        String cedulaCliente = fop.dialogoEntrada("Realizar Venta", "Ingrese cédula del cliente");

        // Verificar si el usuario canceló la entrada
        if (cedulaCliente == null || cedulaCliente.isEmpty()) {
            fop.dialogoInformacion("Realizar Venta", "Operación cancelada");
            return; // Si el usuario cancela, salimos de la función
        }

        // Buscar cliente
        Cliente cliente = ClienteGestiones.buscarCliente(cedulaCliente);
        if (cliente == null) {
            fop.dialogoInformacion("Realizar Venta", "Cliente no Encontrado");
            return;
        }

        // Crear factura para el cliente
        Factura factura = new Factura(cliente);
        boolean continuarVenta = true;

        while (continuarVenta) {
            String codigoProducto = fop.dialogoEntrada("Realizar Venta","Ingrese el código del producto a vender:");

            if (codigoProducto == null || codigoProducto.isEmpty()) {
                fop.dialogoInformacion("Realizar Venta", cedulaCliente);
                return;
            }

            Producto producto = Inventario.buscarProducto(codigoProducto);
            if (producto != null) {
               
                boolean cantidadValida = false;

                do {
                    try {
                        String inputCantidad = fop.dialogoEntrada("Realizar Venta","Ingrese la cantidad:");
                        if (inputCantidad == null) {
                            fop.dialogoInformacion("Realizar Venta", "Operación cancelada.");
                            return;
                        }
                        
                        boolean valid = true;
                        while (valid){
                            valid = val.validarInteger("Cantidad", inputCantidad);
                            if (!valid){
                                cantidad = Integer.parseInt(inputCantidad);
                            } else {
                                inputCantidad = fop.dialogoEntrada("Realizar Venta","Ingrese la cantidad:");
                            }
                        }
                        
                        if (cantidad > 0) {
                            cantidadValida = true;
                        } else {
                            fop.dialogoAlerta("Realizar Venta", "La cantidad debe ser mayor que cero.");
                        }
                    } catch (NumberFormatException e) {
                        fop.dialogoInformacion("Realizar Venta", "Ingrese un número válido.");
                    }
                } while (!cantidadValida);

                if (factura.agregarProducto(producto, cantidad)) {
                    fop.dialogoInformacion("Realizar Venta", "Producto agregado a la factura.");
                } else {
                    fop.dialogoAlerta("Realizar Venta", "No hay suficiente stock del producto: " + producto.getNombre());
                }
            } else {
                fop.dialogoAlerta("Realizar Venta", "Producto no encontrado.");
            }

            // Después de agregar un producto, preguntar si desea agregar otro o finalizar
            String[] objeto = new String[]{"Agregar otro producto", "Finalizar venta"};
            int respuesta = fop.dialogoOpciones(objeto, "Realizar Venta", "Agregar otro Producto");

            if (respuesta != JOptionPane.YES_OPTION) {
                continuarVenta = false;
            }
        }
        
        factura.generarFactura();
        carga.guardarProductos();

            
    }


    
}
