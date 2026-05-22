
package sistemaventaspetsmarket;


public class Cliente {
    private String nombre;
    private String apellidos;
    private String cedula;
    private String email;

    public Cliente(String nombre, String apellidos, String cedula, String email) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.email = email;
    }

    public String getNombre() { return nombre; }
    public String getApellidos() { return apellidos; }
    public String getCedula() { return cedula; }
    public String getEmail() { return email; }
    
    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public void setEmail(String email) { this.email = email; }
    public void setCedula(String cedula){ this.cedula = cedula; }
}
