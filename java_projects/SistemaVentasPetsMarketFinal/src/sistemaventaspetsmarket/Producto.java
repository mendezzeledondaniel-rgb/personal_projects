/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sistemaventaspetsmarket;

/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class Producto {
    private String codigo;
    private String nombre;
    private float precio;
    private int cantidad;
    private CategoriaProducto categoria;

    public Producto(String codigo, String nombre, float precio, int cantidad, CategoriaProducto categoria) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria;
    }
    
    public boolean reducirStock(int cantidad) {
        if (this.cantidad >= cantidad) {
            this.cantidad -= cantidad;
            return true;
        }
        return false;
    }        
    
    public String toString() {
        return codigo + "," + nombre + "," + precio + "," + cantidad + "," + categoria;
    }

    public CategoriaProducto getCategoria() {
        return categoria;
    }

    public String getCodigo() {
        return codigo;
    }
    
    public float getPrecio() {
        return precio;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public int getCantidad() {
        return cantidad;
    }

    void setNombre(String nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    void setPrecio(float nuevoPrecio) {
        this.precio = nuevoPrecio;
    }

    void setCantidad(int nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setCategoria(CategoriaProducto categoria) {
        this.categoria = categoria;
    }
    
}
