package sistemaventaspetsmarket;

import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;

public class FastOptionPane {
    
    ImageIcon icon = new ImageIcon("./src/img/dog_icon1");
    
    private final ImageIcon loginIcon = new ImageIcon(getClass().getResource("/images/login_icon.png"));
    private final ImageIcon infoIcon = new ImageIcon(getClass().getResource("/images/info_icon.png"));
    private final ImageIcon warningIcon = new ImageIcon(getClass().getResource("/images/warning_icon.png"));
    private final ImageIcon errorIcon = new ImageIcon(getClass().getResource("/images/error_icon.png"));
    private final ImageIcon confirmationIcon = new ImageIcon(getClass().getResource("/images/confirmation_icon.png"));
    private final ImageIcon questionIcon = new ImageIcon(getClass().getResource("/images/question_icon.png"));

    
    public String dialogoEntrada (String titulo, String mensaje) {
        //String value = JOptionPane.showInputDialog(null, mensaje, titulo, JOptionPane.INFORMATION_MESSAGE);
        //return value;
        return (String) JOptionPane.showInputDialog(null, mensaje, titulo, JOptionPane.QUESTION_MESSAGE, questionIcon, null, null);
    }
    
    public void dialogoInformacion (String titulo, String mensaje){
        //JOptionPane.showMessageDialog(null, mensaje, titulo, JOptionPane.INFORMATION_MESSAGE);
        JOptionPane.showMessageDialog(null, mensaje, titulo, JOptionPane.INFORMATION_MESSAGE, infoIcon);
    }
    
    public void dialogoInformacionTabla (String titulo, JScrollPane mensaje){
        //JOptionPane.showMessageDialog(null, mensaje, titulo, JOptionPane.INFORMATION_MESSAGE);
        JOptionPane.showMessageDialog(null, mensaje, titulo, JOptionPane.INFORMATION_MESSAGE, infoIcon);    
    }
    
    public void dialogoAlerta (String titulo, String mensaje){
        //JOptionPane.showMessageDialog(null, mensaje, titulo, JOptionPane.WARNING_MESSAGE);    
        JOptionPane.showMessageDialog(null, mensaje, titulo, JOptionPane.WARNING_MESSAGE, warningIcon);
    }
    
    public int dialogoConfirmacion(String titulo, String mensaje){
        //int confirm = JOptionPane.showConfirmDialog(null, mensaje, titulo, JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
        //return confirm;  
        return JOptionPane.showConfirmDialog(null, mensaje, titulo, JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, confirmationIcon);
    }
    
    public int dialogoOkCancel (String titulo, Object[] mensaje){
        int confirm = JOptionPane.showConfirmDialog(null, mensaje, titulo, JOptionPane.OK_CANCEL_OPTION);
        return confirm;        
    }
    
    public int dialogoLogin (String titulo, Object[] mensaje){
        //int confirm = JOptionPane.showConfirmDialog(null, mensaje, titulo, JOptionPane.OK_CANCEL_OPTION);
        //return confirm; 
        return JOptionPane.showConfirmDialog(
            null,
            mensaje,
            titulo,
            JOptionPane.YES_NO_OPTION,
            JOptionPane.QUESTION_MESSAGE,
            loginIcon
            );
    }
    
    public int dialogoOpciones (String[] opciones_joptionpane, String titulo, String mensaje){
        //int opc = JOptionPane.showOptionDialog  (null, mensaje, titulo, JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE, null,opciones_joptionpane,opciones_joptionpane[0]);
        //return opc;
        return JOptionPane.showOptionDialog(null, mensaje, titulo, JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE, questionIcon, opciones_joptionpane, opciones_joptionpane[0]);
    }
    
    public void mostrarTabla (String titulo, Object[][] filas, Object[] columnas){
        JTable table = new JTable(filas, columnas);
        JOptionPane.showMessageDialog(null, new JScrollPane(table));
    
    }
    
}
