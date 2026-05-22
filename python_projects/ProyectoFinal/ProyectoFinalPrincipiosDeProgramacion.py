import pandas as pd
import os
import time

##################################
# VARIABLES GLOBALES DEL SISTEMA #
##################################

# Dataframe para tener control de los datos
col_encuesta = ['Estudiante', 'Nivel', 'Equipo', 'TipoBeca', 'Beca']
result_encuesta = pd.DataFrame(columns=col_encuesta)

# Para Pruebas Solamente
#result_encuesta = pd.read_excel('EjemploTabla.xlsx')

# Archivo de salida de Texto
archivo_txt_salida = 'ReporteCompletoBecas.txt'

# Archivo de salida con la distribucion de estudiantes en formato excel
archivo_excel_salida = 'TablaEstudiantesBecas.xlsx'

# Imprime puntos para parecer que el sistema esta pensando
def puntos_espera():
    time.sleep(1)
    print('.')
    time.sleep(1)
    print('.')
    time.sleep(1)

# Print de error de opciones
def msj_despedida():
    print('\n\n*********************************************************************')
    print('Muchas gracias por usar el Sistema Automatizado de Encuestas de Beca.')
    print('Esperamos haya cumplido con todos sus objetivos!!!')
    print('*********************************************************************')
    time.sleep(2)
    print('*************************************')
    print('**   Copyright: DMZ Technologies   **')
    print('**           Version 2.7           **')
    print('**  Todos los derechos reservados  **')
    print('*************************************')
    print()
    print('El sistema se cerrará a continuacion...')
    puntos_espera()

# Conversion de Dataframe a Excel
def exportar_excel():
    intro_reportes()
    print('\n*** Tabla de Reporte con la informacion de cada estudiante evaluado ***')
    time.sleep(1)
    print(f'\nGenerando archivo {archivo_excel_salida} en el directorio actual...')
    puntos_espera()
    if result_encuesta.empty:
        print(f'Lo sentimos. Hasta el momento, ningun estudiante ha contestado la encuesta. El archivo {archivo_excel_salida} no se puede generar.')   
    else:
        result_encuesta.to_excel(archivo_excel_salida,index=False)
        print(f'\nArchivo {archivo_excel_salida} generado correctamente...')
    time.sleep(1)
    input('\n\nPor favor, presione Enter para volver al Menu de reportes')

# Print de introduccion de reportes
def intro_reportes():
    os.system('cls')
    print('*******************************************************************')
    print("*** Sistema de Reportes de Becas de los Estudiantes del Colegio ***")
    print('*******************************************************************')

# Exportar reportes a txt:
def exportar_reportes_txt():
    
    intro_reportes()
    print('\n*** Reporte completo en formato txt ***')
    time.sleep(1)
    print(f'\nGenerando archivo {archivo_txt_salida} en el directorio actual...')
    time.sleep(2)

    if result_encuesta.empty:
        print(f'Lo sentimos. Hasta el momento, ningun estudiante ha contestado la encuesta. El archivo {archivo_txt_salida} no se puede generar.')   
    else:
        txt_salida = open(archivo_txt_salida,'w',newline='')
        export_total_estudiantes_encuestados_nivel = gen_reporte_total_estudiantes_encuestados()
        export_porcentaje_becados = gen_reporte_porcentaje_becados()
        export_total_becas_mensual, export_totale_becas_anual, export_total_becas_tipo = gen_reporte_desgloce_anual_mensual_becas()
        export_estudiantes_equipos = gen_reporte_estudiantes_equipos()
        
        txt_salida.write('*******************************************************************\n')
        txt_salida.write("*** Sistema de Reportes de Becas de los Estudiantes del Colegio ***\n")
        txt_salida.write('*******************************************************************\n\n')
        
        # Seccion Reporte Total Estudiantes Encuestados por nivel
        print(f'\nGenerando Reporte Total Estudiantes Encuestados por Nivel en el archivo {archivo_txt_salida}.')
        time.sleep(1)
        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write(f'------ Reporte del total de estudiantes encuestados por nivel ------\n')
        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write(f'\n\nTotal por Nivel:\n\n')

        total_est_encuestados = 0

        for items in range(1,6,1):    
            txt_salida.write(f'Nivel {items}: {export_total_estudiantes_encuestados_nivel[items-1]} estudiantes.\n')
            total_est_encuestados += export_total_estudiantes_encuestados_nivel[items-1]
        txt_salida.write(f'-------------------------------------\n')
        txt_salida.write(f'Total de estudiantes encuestados: {total_est_encuestados} estudiantes.\n\n\n')

        # Seccion Reporte del Porcentaje de Estudiantes Becado
        print(f'Generando Reporte del Porcentaje de Estudiantes Becados en el archivo {archivo_txt_salida}.')
        time.sleep(1)

        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write(f'---------- Reporte del Porcentaje de Estudiantes Becados -----------\n')
        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write('\n\nDel total de estudiantes:\n\n')

        con_tipo_beca = ['con Beca Academica','con Beca Deportiva','Sin Beca']

        for items in range(3):    
            txt_salida.write(f'Porcentaje de ellos {con_tipo_beca[items]}: {export_porcentaje_becados[items]}%.\n')
        txt_salida.write(f'\n\n')

        # Seccion Reporte del Total de Becas otorgadas Mensualmente y Anualmente
        print(f'Generando Reporte del Total de Becas otorgadas Mensualmente y Anualmentes en el archivo {archivo_txt_salida}.')
        time.sleep(1)

        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write(f'- Reporte del Total de Becas otorgadas Mensualmente y Anualmentes --\n')
        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write('\n\nDesgloce de Becas Mensuales:\n\n')

        tipo_beca = ['Becas Academicas','Becas Deportivas']
        
        for i in range(len(export_total_becas_tipo)):
            txt_salida.write(f'Total de {tipo_beca[i]} otorgadas al mes: {export_total_becas_tipo[i]}.\n')
            txt_salida.write(f'Total en colones: {export_total_becas_mensual[i]}.\n')
        txt_salida.write(f'----------------------------------------------------\n')
        txt_salida.write(f'Total de inversion al mes: {export_total_becas_mensual[0]+export_total_becas_mensual[1]} colones.\n\n')
        
        txt_salida.write('\nDesgloce de Becas Anuales:\n\n')
        for i in range(len(export_total_becas_tipo)):
            txt_salida.write(f'Total de {tipo_beca[i]} otorgadas al año: {export_total_becas_tipo[i]*11}.\n')
            txt_salida.write(f'Total en colones: {export_totale_becas_anual[i]}.\n')
        txt_salida.write(f'----------------------------------------------------\n')
        txt_salida.write(f'Total de inversion al año en becas: {export_totale_becas_anual[0]+export_totale_becas_anual[1]} colones.\n\n\n')

        # Seccion Reporte del Total de Becas otorgadas Mensualmente y Anualmente
        print(f'Generando Reporte del Total de Estudiantes por Equipo en el archivo {archivo_txt_salida}.')
        time.sleep(1)

        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write(f'----------- Reporte del Total de Estudiantes por Equipo ------------\n')
        txt_salida.write(f"--------------------------------------------------------------------\n")
        txt_salida.write('\n\nTotal de estudiantes segun al equipo que pertenecen:\n\n')

        equipo_seleccionado = ['en equipo de Baloncesto:  ','en el equipo de Natacion: ','en el equipo de Ajedrez:  ','Sin Equipo Seleccionado:  ']
        for items in range(len(export_estudiantes_equipos)):    
            txt_salida.write(f'Estudiantes que estan {equipo_seleccionado[items]}{export_estudiantes_equipos[items]}\n')

        txt_salida.write(f'\n\n--------------------------FIN DEL REPORTE--------------------------\n')
        txt_salida.close()
        print(f'\nArchivo {archivo_txt_salida} generado correctamente...')
    time.sleep(1)
    input('\n\nPor favor, presione Enter para volver al Menu de reportes')

# Generador de porcentaje de bevados
def gen_reporte_estudiantes_equipos():
    # Las siguientes dos listas tienen el orden de [Academica, Deportiva, SinBeca]
    equipo = ['Baloncesto','Natacion','Ajedrez','SinEquipo']
    total_por_equipo = []
    for i in range(len(equipo)):
        total_por_equipo.append((result_encuesta.Equipo.values == equipo[i]).sum())
    # Devuelve el total de estudiantes por equipo
    return(total_por_equipo)

# Reporte de Porecntaje de Estudiantes Becados
def reporte_estudiantes_equipos():
    equipo_seleccionado = ['en equipo de Baloncesto:  ','en el equipo de Natacion: ','en el equipo de Ajedrez:  ','Sin Equipo Seleccionado:  ']
    intro_reportes()
    print('\n*** Reporte del Total de Estudiantes por Equipo ***')
    time.sleep(1)
    print('\n\nTotal de estudiantes segun al equipo que pertenecen: \n')
    time.sleep(1)
    totales_por_equipo = gen_reporte_estudiantes_equipos()
    for items in range(len(totales_por_equipo)):    
        print(f'Estudiantes que estan {equipo_seleccionado[items]} {totales_por_equipo[items]}')
        time.sleep(0.5)
    time.sleep(1)
    input('\n\nPor favor, presione Enter para volver al Menu de reportes')


def gen_reporte_desgloce_anual_mensual_becas():
    # Las siguientes dos listas tienen el orden de [Academica, Deportiva]
    total_becas = [0,0]
    total_mensual= [0,0]
    total_anual = [0,0]
    total_becas[0] = ((result_encuesta.TipoBeca.values == 'Academica').sum())
    total_becas[1] = ((result_encuesta.TipoBeca.values == 'Deportiva').sum())
    total_mensual[0] = (total_becas[0] * 50000) #ACADEMICA
    total_mensual[1] = (total_becas[1] * 80000) #DEPORTIVA
    total_anual[0] = total_mensual[0] * 11 #ACADEMICA ANUAL
    total_anual[1] =total_mensual[1] * 11 #DEPORTIVA ANUAL
    # Devuelve 3 listas, una con el total mensual por beca, otra con el total anual por beca, y otra con el total de becas por tipo
    return(total_mensual,total_anual,total_becas)

# Reporte de Porecntaje de Estudiantes Becados
def reporte_desgloce_anual_mensual_becas():
    tipo_beca = ['Becas Academicas','Becas Deportivas']
    intro_reportes()
    print('\n*** Reporte del Total de Becas otorgadas Mensualmente y Anualmente ***')
    time.sleep(1)
    print('\n\nDesgloce de Becas Mensuales: \n')
    time.sleep(1)
    total_men, total_an, tot_bec = gen_reporte_desgloce_anual_mensual_becas()
    for i in range(len(tot_bec)):
        print(f'Total de {tipo_beca[i]} otorgadas al mes: {tot_bec[i]}')
        time.sleep(0.5)
        print(f'Total en colones: {total_men[i]}')
        time.sleep(0.5)
    print(f'----------------------------------------------------')
    time.sleep(0.5) 
    print(f'Total de inversion al mes: {total_men[0]+total_men[1]} colones.\n')
    time.sleep(1)
    
    print('\n\nDesgloce de Becas Anuales: \n')
    for i in range(len(tot_bec)):
        print(f'Total de {tipo_beca[i]} otorgadas al año: {tot_bec[i]*11}')
        time.sleep(0.5)
        print(f'Total en colones: {total_an[i]}')
        time.sleep(0.5) 
    print(f'----------------------------------------------------')
    time.sleep(0.5) 
    print(f'Total de inversion al año en becas: {total_an[0]+total_an[1]} colones.')
    time.sleep(1)

    input('\n\nPor favor, presione Enter para volver al Menu de reportes')

# Generador de porcentaje de bevados
def gen_reporte_porcentaje_becados():
    # Las siguientes dos listas tienen el orden de [Academica, Deportiva, SinBeca]
    total_por_beca = [0,0,0]
    porcentaje_por_beca = [0.0,0.0,0.0]
    total_filas=result_encuesta.shape[0]
    total_por_beca[0] = ((result_encuesta.TipoBeca.values == 'Academica').sum())
    total_por_beca[1] = ((result_encuesta.TipoBeca.values == 'Deportiva').sum())
    total_por_beca[2] = ((result_encuesta.TipoBeca.values == 'SinBeca').sum())
    for i in range(len(total_por_beca)):
        porcentaje_por_beca[i] = round((total_por_beca[i]*100)/total_filas,2)
    #retortno un array con el porcentaje de becas academicas,deportivas y sin beca
    return(porcentaje_por_beca)

# Reporte de Porecntaje de Estudiantes Becados
def reporte_porcentaje_becados():
    tipo_beca = ['con Beca Academica','con Beca Deportiva','Sin Beca']
    intro_reportes()
    print('\n*** Reporte del Porcentaje de Estudiantes Becados ***')
    time.sleep(1)
    print('\n\nDel total de estudiantes: \n')
    time.sleep(1)
    porcentaje_por_beca = gen_reporte_porcentaje_becados()
    for items in range(3):    
        print(f'Porcentaje de ellos {tipo_beca[items]}: {porcentaje_por_beca[items]}%.')
        time.sleep(0.5)
    time.sleep(1)
    input('\n\nPor favor, presione Enter para volver al Menu de reportes')

# Separo la generacion de los datos para poder usar el generador si me piden reporte en txt, asi no imprimir nada
def gen_reporte_total_estudiantes_encuestados():
    totales_por_nivel = []
    for i in range(1,6,1):
        #Genera una lista con 5 posiciones, cada una corresponde al total de estudiantes por nivel en orden del 1er nivel al 5to        
        totales_por_nivel.append((result_encuesta.Nivel.values == i).sum())
    return(totales_por_nivel)

# Reporte de Total de Estudiante Encuestados por nivel
def reporte_total_estudiantes_encuestados():

    intro_reportes()
    print('\n*** Reporte del total de estudiantes encuestados por nivel ***')
    time.sleep(1)
    print('\n\nTotal por Nivel: \n')
    time.sleep(1)
    tot_por_niv = gen_reporte_total_estudiantes_encuestados()
    total_est_encuestados = 0
    for items in range(1,6,1):    
        print(f'Nivel {items}: {tot_por_niv[items-1]} estudiantes.')
        total_est_encuestados += tot_por_niv[items-1]
        time.sleep(0.5)
    time.sleep(1)
    print(f'\nTotal de estudiantes encuestados: {total_est_encuestados} estudiantes.')
    time.sleep(1)
    input('\n\nPor Favor, presione Enter para volver al Menu de reportes')
    
# Funcion de control de la encuesta a estudiantes
def menu_reportes():
    while True:
        intro_reportes()
        time.sleep(1)
        print("\nA continuacion se le presentaran varios de los cuales puede elegir")
        print("Elige dentro de las opciones utilizando los numeros de tu teclado.")
        time.sleep(2)
        print("\nQué reporte deseas generar?\n")
        print("1. Total de estudiantes encuestados por nivel")
        print("2. Porcentaje total de becados y no becados")
        print("3. Desgloce Mensual y Anual de Becas por Tipo")
        print("4. Total de estudiantes pertenecientes a equipos")
        print("5. Exportar todos los reportes en un archivo de texto")
        print("6. Exportar todos los datos de la base de datos a una hoja de Excel")
        print("7. Salir al Menu Principal")
        menu_reportest_opcion = input("\nPor favor, utiliza los números para hacer tu elección (1-7): ")
        
        if menu_reportest_opcion == '1':
            reporte_total_estudiantes_encuestados()
        elif menu_reportest_opcion == '2':
            reporte_porcentaje_becados()        
        elif menu_reportest_opcion == '3':
            reporte_desgloce_anual_mensual_becas()
        elif menu_reportest_opcion == '4':
            reporte_estudiantes_equipos()
        elif menu_reportest_opcion == '5':
            exportar_reportes_txt()
        elif menu_reportest_opcion == '6':
            exportar_excel()
        elif menu_reportest_opcion == '7':
            os.system('cls')
            print('*******************************************************************')
            print("*** Sistema de Reportes de Becas de los Estudiantes del Colegio ***")
            print('*******************************************************************')
            print("\nA continuacion se le presentaran varios de los cuales puede elegir")
            print("Elige dentro de las opciones utilizando los numeros de tu teclado.")
            print('\nCerrando el Sistema de Reporte de Becas...')
            puntos_espera()
            print('Volviendo al Menu Principal...')
            puntos_espera()
            break
        else:
            error_opcion(menu_reportest_opcion)

# Print de error de opciones
def error_opcion(opcion):
    print(f'Disculpa, la opcion {opcion} no es valida. Por favor selecciona una de las opciones disponibles...')
    time.sleep(3)

# Print de introduccion de encuesta
def intro_encuesta():
    os.system('cls')
    print('*****************************************')
    print("*** Encuesta a Estudiates del Colegio ***")
    print('*****************************************')
    print("\nLee con cuidado las preguntas que se te van a hacer a continuacion.")
    print("Elige dentro de las opciones utilizando los numeros de tu teclado.")

# Ejecucion de la pregunta 4
def pregunta_cuatro():
    while True:
        intro_encuesta()
        print('\nPregunta 4: Por favor indica cual beca tienes:')
        print()
        print('1. Academica')
        print('2. Deportiva')
        resp_pregunta = input('\nTu respuesta (1-2): ')
        if resp_pregunta in ('1','2'):
            if resp_pregunta == '1':
                return('Academica') 
            else:
                return('Deportiva')      
        else:
            error_opcion(resp_pregunta)    

# Ejecucion de la pregunta 3
def pregunta_tres(preg2res):
    while True:
        intro_encuesta()
        print('\nPregunta 3: Indica si tienes Beca:')
        print()
        print('1. Si')
        print('2. No')
        resp_pregunta = input('\nTu respuesta (1-2): ')
        if resp_pregunta in ('1','2'):
            if resp_pregunta == '1':
                if preg2res == 'SinEquipo':
                    print('\nINFO: Dado que no tienes equipo, tu beca es de tipo \'Academica\'')
                    time.sleep(3)
                    return('Academica')
                else:    
                    return(pregunta_cuatro())
            else:
                return('SinBeca')      
        else:
            error_opcion(resp_pregunta)

# Ejecucion de la pregunta 2
def pregunta_dos():
    while True:
        intro_encuesta()
        print('\nPregunta 2: Por favor selecciona al equipo que deseas pertenecer:')
        print()
        print('1. Baloncesto')
        print('2. Natacion')
        print('3. Ajedrez')
        print('4. No deseo pertenecer a ningun equipo')
        resp_pregunta = input('\nTu respuesta (1-4): ')
        if resp_pregunta in ('1','2','3','4'):
            if resp_pregunta == '1':
                return('Baloncesto')
            elif resp_pregunta == '2':
                return('Natacion')
            elif resp_pregunta == '3':
                return('Ajedrez')
            else:
                return('SinEquipo')            
        else:
            error_opcion(resp_pregunta)

# Ejecucion de la pregunta 1
def pregunta_uno():
    while True:
        intro_encuesta()
        print('\nPregunta 1: Que nivel te encuentras cursando actualmente:')
        print()
        print('1. Primer Nivel')
        print('2. Segundo Nivel')
        print('3. Tercer Nivel')
        print('4. Cuarto Nivel')
        print('5. Quinto Nivel')
        resp_pregunta = input('\nTu respuesta (1-5): ')
        if resp_pregunta in ('1','2','3','4','5'):
            return(int(resp_pregunta))
        else:
            error_opcion(resp_pregunta)
            
# Funcion de control de la encuesta a estudiantes
def encuesta_estudiantes():
    while True:
        # Vamos a usar una lista para guardar los resultados de las preguntas de la encuesta de cada estudiante
        # Luego vamos a usar esa lista para adjuntarla como una nueva fila dentro de el dataframe que vamos a usar para tener todo el control de respuestas
        respuestas_encuesta =  []

        os.system('cls')
        print('*****************************************')
        print("*** Encuesta a Estudiates del Colegio ***")
        print('*****************************************')
        time.sleep(1)
        print("\nLee con cuidado las preguntas que se te van a hacer a continuacion.")
        print("Elige dentro de las opciones utilizando los numeros de tu teclado.")
        time.sleep(2)

        estud = "Estudiante_" + str(result_encuesta.shape[0])
        preg_uno_result = pregunta_uno()
        preg_dos_result = pregunta_dos()
        preg_tres_result = pregunta_tres(preg_dos_result)

        respuestas_encuesta.append(estud)
        respuestas_encuesta.append(preg_uno_result)
        respuestas_encuesta.append(preg_dos_result)
        respuestas_encuesta.append(preg_tres_result)

        if preg_tres_result == 'SinBeca':
            respuestas_encuesta.append(0)
        elif preg_tres_result == 'Academica':
            respuestas_encuesta.append(50000)
        elif preg_tres_result == 'Deportiva':
            respuestas_encuesta.append(80000)

        # Esta linea va a agregar la lista como una nueva fila en el dataframe que creamos para guardar los resultados
        result_encuesta.loc[len(result_encuesta)] = respuestas_encuesta
        
        intro_encuesta()
        print('\nTus respuestas son las siguientes:\n')
        print(f'Nivel al que perteneces:            Nivel {preg_uno_result}')
        print(f'Equipo al que deseas pertenecer:    {preg_dos_result}')
        print(f'Tipo de beca que tienes:            {preg_tres_result}')    
        print("\nGracias por tus respuestas. Todas han sido guardadas con exito en la base de datos!!!")
        time.sleep(2)
        print("\nVolviendo al menu principal")
        puntos_espera()
        break

# Funcionalidad de Menu Principal
# Muesta las opciones para ir a la encuesta y para ir al menu de reportes
def menu_principal():
    while True:
        os.system('cls')
        print('**********************')
        print("*** Menú Principal ***")
        print('**********************')
        print("\nQué deseas hacer?\n")
        print("1. Tomar encuesta para estudiantes")
        print("2. Ir al menú de reportes")
        print("3. Salir del Sistema")
        
        menup_opcion = input("\nPor favor, utiliza los números para hacer tu elección (1-3): ")

        if menup_opcion == "1":
            encuesta_estudiantes()
        elif menup_opcion == "2":
            menu_reportes()
        elif menup_opcion == "3":
            print('Saliendo del sistema...')
            time.sleep(1)
            os.system('cls')
            break
        else:
            error_opcion(menup_opcion)
            os.system('cls')

def msj_bienvenida():
    os.system('cls')
    print('******************************************************')
    print('**                                                  **')
    print('**  Sistema Automatizado de Encuestas de Beca 2024  **')
    print('**                                                  **')
    print('******************************************************')
    print('**                                                  **')
    print('**   Bienvenidos al Sistema para encuestar a los    **')
    print('**          estudiantes de tu colegio!!!            **')
    print('**                                                  **')
    print('******************************************************')
    time.sleep(3)

# Orquestador
if __name__ == "__main__":
    msj_bienvenida()
    menu_principal()
    msj_despedida()