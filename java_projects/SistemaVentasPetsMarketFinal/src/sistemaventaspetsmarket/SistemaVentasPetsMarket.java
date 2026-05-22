/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package sistemaventaspetsmarket;

/**
 *
 * @author Grupo 02 RUBEN ANTONIO CRUZ GUTIERREZ, RICARDO ANDREI BORGE CARVAJAL, DANIEL MENDEZ ZELEDON, JOSE ANDRES FERNANDEZ GUTIERREZ
 */
public class SistemaVentasPetsMarket {
    
    
    public static void main(String[] args) {
        //Declaracion de objetos
        UsuarioGestiones usuarios = new UsuarioGestiones();
        Sistema sistema = new Sistema();
        
        //Carga de Usuarios
        usuarios.inicializarUsuarios();
        
        //Inicio
        sistema.iniciarSesion();
    }
    
}
