/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sistemaventaspetsmarket;

/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class Usuario {
    private String nombreUsuario;
    private String nombre;
    private String apellidos;
    private String cedula;
    private String contraseña;
    private Rol rol;

    public Usuario(String nombreUsuario, String nombre, String apellidos, String cedula, String contraseña, Rol rol) {
        this.nombreUsuario = nombreUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.contraseña = contraseña;
        this.rol = rol;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public void setContrasena(String contraseña) {
        this.contraseña = contraseña;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }   
            
    public String getNombre() { 
        return nombre; 
    }
    
    public String getNombreUsuario() { 
        return nombreUsuario; 
    }
    
    public String getApellidos() { 
        return apellidos; 
    }
    
    public String getCedula() { 
        return cedula; 
    }
    
    public String getContrasena() { 
        return contraseña; 
    }
    
    public Rol getRol() { 
        return rol; 
    }
}
