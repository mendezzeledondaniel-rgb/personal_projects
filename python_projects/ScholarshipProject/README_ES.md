# Sistema de Distribución de Becas - Proyecto Final

## Descripción General

Este es un **Sistema Integral de Gestión y Generación de Reportes de Becas** desarrollado como proyecto final de Principios de Programación 1. La aplicación es una herramienta interactiva de línea de comandos que realiza encuestas a estudiantes y genera reportes detallados sobre la distribución de becas en un entorno escolar.

## Propósito del Proyecto

El sistema automatiza el proceso de:
- **Recolectar datos de estudiantes** mediante una encuesta interactiva
- **Analizar la distribución de becas** por tipo y nivel académico
- **Generar reportes exhaustivos** incluyendo desglose financiero
- **Exportar datos** en múltiples formatos (TXT y Excel)

## Características

### 1. Módulo de Encuesta Estudiantil
- Encuesta interactiva de 4 preguntas para cada estudiante
- Las preguntas cubren:
  - Nivel académico actual (1-5)
  - Participación en equipos deportivos (Baloncesto, Natación, Ajedrez, o Ninguno)
  - Elegibilidad y tipo de beca
- Asignación automática de beca según participación en equipo
- Validación de datos y manejo de errores

### 2. Sistema de Reportes
El sistema genera cinco tipos de reportes:

#### Reporte 1: Estudiantes Encuestados por Nivel
- Total de estudiantes por nivel académico (1-5)
- Total general de estudiantes encuestados

#### Reporte 2: Porcentaje de Distribución de Becas
- Porcentaje de estudiantes con beca académica
- Porcentaje de estudiantes con beca deportiva
- Porcentaje de estudiantes sin beca

#### Reporte 3: Desglose Mensual y Anual de Becas
- Total de becas por tipo
- Inversión mensual en becas (en Colones costarricenses)
- Proyección anual (11 meses × monto mensual)
  - Becas académicas: ₡50,000 por mes
  - Becas deportivas: ₡80,000 por mes

#### Reporte 4: Estudiantes por Equipo
- Total de estudiantes por equipo:
  - Baloncesto
  - Natación
  - Ajedrez
  - Sin asignación de equipo

#### Reporte 5: Exportación Integral
- Todos los reportes combinados en un único archivo de texto
- Formato detallado y análisis completo

### 3. Funciones de Exportación de Datos
- **Exportar a Excel**: Exporta todos los datos de estudiantes a `TablaEstudiantesBecas.xlsx`
- **Exportar Reportes a Texto**: Genera reportes integrales como `ReporteCompletoBecas.txt`

## Stack Tecnológico

- **Lenguaje**: Python 3.x
- **Librerías**:
  - `pandas`: Manipulación de datos y exportación a Excel
  - `os`: Operaciones del sistema (limpiar pantalla)
  - `time`: Experiencia del usuario con pausas y ritmo

## Estructura de Archivos

```
ProyectoFinal/
├── ProyectoFinalPrincipiosDeProgramacion.py   # Archivo principal de la aplicación
├── README.md                                   # Documentación en inglés
├── README_ES.md                                # Documentación en español
├── proyecto-final-c3.pdf                       # Requisitos del proyecto
├── TablaEstudiantesBecas.xlsx                  # Salida: Datos de estudiantes
├── ReporteCompletoBecas.txt                    # Salida: Reporte integral
└── EjemploTabla.xlsx                           # Referencia de datos de ejemplo
```

## Cómo Usar

### 1. Ejecutar la Aplicación

```bash
python ProyectoFinalPrincipiosDeProgramacion.py
```

### 2. Opciones del Menú Principal

**Opción 1: Realizar Encuesta a Estudiantes**
- Lo guía a través de una encuesta de 4 preguntas
- Guarda automáticamente las respuestas en la base de datos
- Puede encuestar múltiples estudiantes en secuencia

**Opción 2: Ver Reportes**
Acceda al menú de reportes con seis opciones:
1. Estudiantes encuestados por nivel
2. Desglose de porcentaje de becas
3. Inversión mensual/anual en becas
4. Estudiantes por equipo
5. Exportar todos los reportes a archivo de texto
6. Exportar todos los datos a archivo Excel
7. Volver al menú principal

**Opción 3: Salir**
- Cierra la aplicación con un mensaje de despedida

### 3. Archivos de Salida

Después de ejecutar reportes:
- **TablaEstudiantesBecas.xlsx** - Hoja de cálculo Excel con todos los registros de estudiantes
- **ReporteCompletoBecas.txt** - Archivo de texto con todos los reportes generados

## Conceptos Clave Demostrados

### Fundamentos de Programación
- **Estructuras de Control**: Bucles while, declaraciones if-elif-else
- **Estructuras de Datos**: Listas, diccionarios, DataFrames de pandas
- **Funciones**: Diseño modular con más de 20 funciones auxiliares
- **E/S de Archivos**: Lectura/escritura de archivos Excel y texto
- **Formato de Cadenas**: f-strings y salida formateada

### Prácticas de Ingeniería de Software
- **Arquitectura Orientada a Menús**: Navegación amigable
- **Validación de Datos**: Verificación de entrada y manejo de errores
- **Separación de Responsabilidades**: Funciones distintas para encuesta, reportes y exportación
- **Organización del Código**: Variables globales, funciones auxiliares, orquestador principal
- **Experiencia del Usuario**: Pausas de tiempo, indicaciones claras, retroalimentación de progreso

## Modelo de Datos

### Campos del Registro de Estudiante
- **Estudiante**: Identificador único (Estudiante_0, Estudiante_1, etc.)
- **Nivel**: Nivel académico 1-5
- **Equipo**: Baloncesto, Natación, Ajedrez o SinEquipo
- **TipoBeca**: Académica, Deportiva o SinBeca
- **Beca**: Monto mensual en Colones costarricenses
  - 0 para sin beca
  - 50,000 para beca académica
  - 80,000 para beca deportiva

## Reglas de Asignación de Becas

1. **Estudiantes con equipo** pueden recibir becas deportivas (₡80,000/mes)
2. **Estudiantes sin equipo** reciben automáticamente becas académicas si son elegibles (₡50,000/mes)
3. Los estudiantes pueden optar por no recibir beca (SinBeca)

## Flujo de Uso Ejemplo

1. Inicie la aplicación
2. Seleccione "Realizar Encuesta a Estudiantes" (Opción 1)
3. Responda 4 preguntas de la encuesta
4. Confirme que las respuestas se guardaron
5. Repita para estudiantes adicionales
6. Seleccione "Ver Reportes" (Opción 2)
7. Seleccione Reporte #5 para exportar reporte de texto integral
8. Seleccione Reporte #6 para exportar datos a Excel
9. Revise los archivos generados en el directorio del proyecto

## Ejemplo de Salida

El sistema genera reportes formateados como:

```
Total por Nivel:

Nivel 1: 25 estudiantes.
Nivel 2: 18 estudiantes.
...
Total de estudiantes encuestados: 150 estudiantes.

Del total de estudiantes:

Porcentaje de ellos con Beca Academica: 35.33%.
Porcentaje de ellos con Beca Deportiva: 48.67%.
Porcentaje de ellos Sin Beca: 16.0%.
```

## Requisitos Cumplidos

✅ Interfaz de usuario interactiva con sistema de menú  
✅ Recolección de datos de encuesta estudiantil  
✅ Almacenamiento de datos en DataFrame de pandas  
✅ Generación de múltiples tipos de reportes  
✅ Cálculos financieros y proyecciones  
✅ Exportación a formato Excel  
✅ Exportación a formato Texto  
✅ Validación de entrada y manejo de errores  
✅ Interfaz profesional con salida formateada  

## Autor y Créditos

**Estudiante**: Daniel Mendez Zeledon  
**Curso**: Principios de Programación 1  
**Institución**: Cenfotec - Programa de Educación Técnica  
**Versión**: 2.7  
**Empresa**: DMZ Technologies  

---

**Nota**: Este proyecto fue desarrollado como ejercicio educativo para demostrar conceptos fundamentales de programación incluyendo estructuras de datos, flujo de control, E/S de archivos y diseño de interfaz de usuario en Python.
