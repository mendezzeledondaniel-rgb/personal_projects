/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sistemaventaspetsmarket;
import java.util.ArrayList;
import javax.swing.JOptionPane;
/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class Factura {
    private Cliente cliente;
    private ArrayList<Producto> productos;
    private float total;
    private int miCantidad;
    private ArrayList<Integer> candidades;

    public Factura(Cliente cliente) {
        this.cliente = cliente;
        this.productos = new ArrayList<>();
        this.candidades = new ArrayList<>();
        this.total = 0;
        this.miCantidad=0;
    }

    public boolean agregarProducto(Producto producto, int cantidad) {
        if (producto.reducirStock(cantidad)) {
            this.productos.add(producto);            
            this.candidades.add(cantidad);
            this.total += producto.getPrecio() * cantidad * 1.13; // Con IVA
            return true;
        }
        return false;
    }        

    public void generarFactura() {
        StringBuilder detalles = new StringBuilder();
        detalles.append("Factura para: ").append(cliente.getNombre()).append(" ").append(cliente.getApellidos())
                .append("\nCédula: ").append(cliente.getCedula()).append("\n\n");

        detalles.append("Productos comprados:\n");
        int i = 0;
        for (Producto p : productos) {
            detalles.append("Producto: ").append(p.getNombre())
                    .append(", Cantidad: ").append(this.candidades.get(i))
                    .append(", Precio unitario: ").append(p.getPrecio())
                    .append("\n");
            i++;
        }

        detalles.append("\nTotal a pagar: ").append(this.total);
        JOptionPane.showMessageDialog(null, detalles.toString());
    }
}
