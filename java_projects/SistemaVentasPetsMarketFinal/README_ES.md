# PetsMarket - Sistema de E-Commerce para Tienda de Mascotas

⚠️ **NOTA DE COLABORACIÓN DEL PROYECTO**

Este README proporciona documentación técnica exhaustiva para **PetsMarket**, un proyecto de desarrollo grupal. Esta documentación fue creada como parte de un análisis profundo y comprensión completa de toda la base de código. Para la especificación original del proyecto y notas de desarrollo, por favor consulte: **ProyectoFinalGrupo2_PetsMarket_C1_2025.pdf**

---

## Descripción General

**PetsMarket** es un **sistema completo de gestión de e-commerce basado en Java** desarrollado en NetBeans como proyecto final grupal para Principios de Programación 2. Es un sistema integral de punto de venta (POS) y gestión de inventario diseñado para un negocio de tienda de mascotas.

## Propósito del Proyecto

Este proyecto demuestra:
- **Principios de Programación Orientada a Objetos (POO)** en Java
- **Persistencia de datos** usando entrada/salida de archivos
- **Autenticación de usuarios** y control de acceso basado en roles
- **Gestión de inventario** con control de stock
- **Gestión de relaciones con clientes (CRM)**
- **Procesamiento de ventas** con generación de facturas
- **Desarrollo de GUI** usando componentes Swing
- **Arquitectura de software** con separación de responsabilidades

## Características Principales

### 1. Sistema de Autenticación de Usuarios
- **Pantalla de Inicio de Sesión**: Autenticación segura con usuario/contraseña
- **Control de Acceso Basado en Roles**:
  - **VENDEDOR**: Puede gestionar inventario, clientes y procesar ventas
  - **GERENTE**: Acceso completo incluyendo gestión de usuarios
- **Gestión de Usuarios** (Solo Gerente):
  - Agregar nuevos usuarios con credenciales
  - Modificar información de usuarios
  - Eliminar usuarios
  - Listar todos los usuarios en formato tabla

### 2. Gestión de Inventario
- **Gestión de Productos**:
  - Agregar productos con código, nombre, precio, cantidad y categoría
  - Modificar productos existentes
  - Eliminar productos
  - Seguimiento de stock en tiempo real
  - Mostrar inventario en formato tabla
- **Categorías de Productos**:
  - Alimento (Comida)
  - Juguete (Juguetes)
  - Medicamento (Medicinas)
- **Control de Stock**:
  - Reducción automática de stock en ventas
  - Validación de inventario antes de ventas
  - Alertas de stock bajo

### 3. Gestión de Clientes
- **Registro de Clientes**:
  - Almacenar información del cliente (nombre, apellidos, cédula, email)
  - Agregar nuevos clientes
  - Modificar detalles del cliente
  - Eliminar clientes
  - Buscar clientes por cédula
  - Mostrar todos los clientes en formato tabla

### 4. Procesamiento de Ventas
- **Generación de Facturas**:
  - Procesar transacciones de ventas
  - Agregar múltiples productos por factura
  - Calcular totales con IVA automático del 13%
  - Generar facturas desglosadas
  - Rastrear cantidades por producto
- **Validación de Ventas**:
  - Verificar que el cliente existe
  - Comprobar disponibilidad de producto
  - Validar cantidades de stock
  - Mostrar resumen de venta

### 5. Persistencia de Datos
- **Almacenamiento Basado en Archivos**:
  - `usuarios.txt` - Credenciales de usuario y roles
  - `productos.txt` - Datos de inventario
  - `clientes.txt` - Información de clientes
- **Carga/Guardado Automático**:
  - Los datos se cargan al iniciar el sistema
  - Guardado automático después de modificaciones
  - Formato CSV para fácil gestión

## Stack Tecnológico

### Lenguaje y Framework
- **Lenguaje**: Java 8+
- **IDE**: NetBeans
- **Librería de GUI**: Swing (JOptionPane, JTable, JTextField)
- **Almacenamiento de Datos**: Archivos de texto (formato CSV)

### Tecnologías Principales
- **Colecciones**: HashMap para búsquedas eficientes
- **Entrada/Salida de Archivos**: BufferedReader/BufferedWriter para operaciones de archivo
- **Componentes Swing**: Cuadros de diálogo, tablas, campos de texto para GUI
- **Diseño Orientado a Objetos**: Clases, encapsulación, herencia

## Estructura del Proyecto

```
SistemaVentasPetsMarketFinal/
├── src/
│   └── sistemaventaspetsmarket/
│       ├── SistemaVentasPetsMarket.java      # Punto de entrada principal
│       ├── Sistema.java                      # Controlador principal del sistema
│       ├── Usuario.java                      # Modelo de datos de usuario
│       ├── UsuarioGestiones.java             # Gestión de usuarios
│       ├── Cliente.java                      # Modelo de datos de cliente
│       ├── ClienteGestiones.java             # Gestión de clientes
│       ├── Producto.java                     # Modelo de datos de producto
│       ├── CategoriaProducto.java            # Enumeración de categoría de producto
│       ├── Rol.java                          # Enumeración de rol de usuario
│       ├── Inventario.java                   # Gestión de inventario
│       ├── Venta.java                        # Procesamiento de ventas
│       ├── Factura.java                      # Generación de facturas
│       ├── Validaciones.java                 # Validación de entrada
│       ├── FastOptionPane.java               # Cuadros de diálogo Swing personalizados
│       └── images/                           # Imágenes de aplicación
├── build.xml                                 # Configuración de compilación de NetBeans
├── manifest.mf                               # Manifiesto JAR
├── usuarios.txt                              # Archivo de datos de usuarios
├── productos.txt                             # Archivo de inventario de productos
├── clientes.txt                              # Archivo de datos de clientes
├── README.md                                 # Documentación en inglés
└── README_ES.md                              # Documentación en español
```

## Descripción de Clases

### Clases Modelo Principal

**Usuario.java**
- Representa un usuario del sistema con credenciales y rol
- Atributos: nombre de usuario, nombre, apellidos, cédula, contraseña, rol
- Métodos: Getters y setters para todos los atributos

**Rol.java** (Enumeración)
- VENDEDOR: Rol de vendedor con permisos limitados
- GERENTE: Rol de gerente con permisos completos

**Cliente.java**
- Representa un cliente
- Atributos: nombre, apellidos, cédula, email
- Métodos: Soporte para operaciones CRUD completas

**Producto.java**
- Representa un producto en el inventario
- Atributos: código, nombre, precio, cantidad, categoría
- Métodos: Reducción de stock, validación, serialización de datos

**CategoriaProducto.java** (Enumeración)
- Alimento (productos alimenticios)
- Juguete (productos de juguete)
- Medicamento (productos farmacéuticos)

**Factura.java**
- Representa una factura/recibo
- Rastrea cliente, productos, cantidades y total
- Incluye cálculo automático de IVA (13%)
- Genera visualización de factura

### Clases de Gestión

**UsuarioGestiones.java**
- Gestiona el ciclo de vida del usuario (operaciones CRUD)
- Validación de autenticación de usuario
- Búsqueda y verificación de usuario
- Interfaz de usuario impulsada por menú

**ClienteGestiones.java**
- Gestiona la base de datos de clientes
- Operaciones CRUD de cliente
- Búsqueda de cliente por cédula
- Visualización en tabla de todos los clientes

**Inventario.java**
- Gestiona el inventario de productos
- Adición y modificación de productos
- Gestión de stock
- Búsqueda y visualización de productos
- Visualización de tabla de inventario

**Venta.java**
- Procesa transacciones de ventas
- Gestiona la creación de facturas
- Soporte para múltiples productos por venta
- Validación de entrada para cantidades
- Verificación de disponibilidad de stock

### Clases de Utilidad

**Sistema.java**
- Controlador y orquestador principal del sistema
- Implementación del menú de inicio de sesión
- Menú principal con opciones basadas en rol
- Delegación de módulos (inventario, clientes, ventas, usuarios)

**CargaInformacion.java**
- Operaciones de entrada/salida de archivos
- Cargar datos de archivos de texto al iniciar
- Guardar datos después de modificaciones
- Soporte para usuarios, productos y clientes

**Validaciones.java**
- Validación de entrada para cadenas, números, tamaños
- Validación de formato de email
- Verificación de existencia de cliente y producto
- Verificación de integridad de datos

**FastOptionPane.java**
- Contenedor personalizado de cuadros de diálogo Swing
- Simplifica la interacción con GUI
- Cuadros de diálogo estándar (opciones, entrada, alertas, confirmaciones)
- Estilos consistentes de interfaz de usuario

## Equipo del Proyecto

👥 **Equipo de Desarrollo:**
- Rubén Antonio Cruz Gutiérrez
- Ricardo Andrei Borge Carvajal
- **Daniel Méndez Zeledon**
- José Andrés Fernández Gutiérrez

**Nota de Contribución**: Esta documentación técnica exhaustiva fue creada mediante un análisis profundo y comprensión completa de toda la base de código. Daniel Méndez Zeledon hizo el esfuerzo adicional de comprender completamente todo el trabajo contribuido por los miembros del equipo y traduce esa comprensión en documentación técnica detallada para este README.

## Flujo de Uso

### Iniciando la Aplicación
```
1. Ejecutar SistemaVentasPetsMarket.java
2. El sistema carga todos los datos (usuarios, productos, clientes)
3. Aparece pantalla de inicio de sesión
4. Ingrese nombre de usuario y contraseña
```

### Menú Principal
Después del inicio de sesión exitoso, los usuarios ven un menú basado en su rol:

**Para Vendedor:**
1. Gestionar Inventario
2. Gestionar Clientes
3. Procesar Ventas
4. Cerrar Sesión

**Para Gerente:**
1. Gestionar Inventario
2. Gestionar Clientes
3. Procesar Ventas
4. Gestionar Usuarios
5. Cerrar Sesión

### Proceso de Venta Típico
```
1. Seleccionar "Procesar Ventas"
2. Ingresar ID del cliente
3. Agregar productos por código
4. Ingresar cantidades para cada producto
5. Confirmar productos o agregar más
6. El sistema genera factura con total + 13% IVA
7. Stock actualizado automáticamente
8. Factura mostrada y datos guardados
```

## Formato de Datos

### usuarios.txt
```
usuario,nombre,apellidos,cedula,contraseña,rol
vendedor1,Juan,Pérez,112233445,pass123,VENDEDOR
gerente1,Carlos,López,223344556,admin123,GERENTE
```

### productos.txt
```
codigo,nombre,precio,cantidad,categoria
P001,Comida para Perros Premium,15000,50,Alimento
T001,Pelota Juguete para Perro,5000,30,Juguete
M001,Antibióticos,25000,10,Medicamento
```

### clientes.txt
```
nombre,apellidos,cedula,email
Pedro,García,312312312,pedro@email.com
María,Rodríguez,423423423,maria@email.com
```

## Conceptos Clave de Programación Demostrados

### Programación Orientada a Objetos
- ✅ **Clases y Objetos**: Todas las entidades de negocio como clases
- ✅ **Encapsulación**: Atributos privados con getters/setters públicos
- ✅ **Herencia**: Potencial para extender clases de gestión
- ✅ **Polimorfismo**: Variaciones de menú basadas en rol
- ✅ **Composición**: Clase Sistema contiene múltiples gestores

### Estructuras de Datos
- ✅ **HashMap**: Búsqueda eficiente por ID/código
- ✅ **ArrayList**: Colecciones dinámicas para items de factura
- ✅ **Enumeraciones**: Definiciones type-safe de rol y categoría

### Persistencia e Entrada/Salida de Archivos
- ✅ **BufferedReader/BufferedWriter**: Operaciones de archivo eficientes
- ✅ **Formato de Archivo**: CSV para análisis y modificación fácil
- ✅ **Integridad de Datos**: Guardado automático después de modificaciones

### Validación y Manejo de Errores
- ✅ **Validación de Entrada**: Verificación exhaustiva de tipo de datos
- ✅ **Validación de Lógica de Negocio**: Disponibilidad de stock, existencia de cliente
- ✅ **Retroalimentación del Usuario**: Mensajes de error basados en cuadros de diálogo y confirmaciones

### Interfaz de Usuario
- ✅ **Componentes Swing**: JOptionPane, JTable, JTextField
- ✅ **Cuadros de Diálogo**: Entrada, confirmación, alertas, información
- ✅ **Visualización de Tabla**: Vista de cuadrícula de inventario, clientes, usuarios
- ✅ **Navegación por Menú**: Sistema de menú jerárquico

## Compilación y Ejecución

### En NetBeans
1. Abrir el proyecto en NetBeans
2. Click derecho en el proyecto → Limpiar y Compilar
3. Click derecho → Ejecutar Proyecto (o presionar F6)

### Desde Línea de Comandos
```bash
# Compilar
javac -d bin src/sistemaventaspetsmarket/*.java

# Ejecutar
java -cp bin sistemaventaspetsmarket.SistemaVentasPetsMarket
```

## Requisitos Cumplidos

✅ Autenticación de usuario basada en roles  
✅ Sistema de gestión de usuarios (solo gerente)  
✅ Control de inventario completo con seguimiento de stock  
✅ Base de datos de clientes con CRUD completo  
✅ Procesamiento de transacciones de venta  
✅ Generación automática de facturas con cálculo de impuestos  
✅ Persistencia de datos con entrada/salida de archivos  
✅ Validación de entrada y manejo de errores  
✅ Interfaz gráfica basada en Swing  
✅ Flujo de aplicación impulsado por menú  
✅ Separación de responsabilidades con múltiples clases  
✅ Búsquedas eficientes basadas en HashMap  
✅ Type safety basada en enumeraciones  

## Información del Documento

Este README sirve como **documentación técnica exhaustiva** creada mediante análisis detallado y comprensión completa de toda la base de código de PetsMarket. Proporciona:
- Descripción exhaustiva de clases y métodos
- Explicación de arquitectura
- Flujos de trabajo de uso
- Detalles del stack técnico

Para la **especificación original del proyecto y documentación de desarrollo**, por favor consulte:
📄 **ProyectoFinalGrupo2_PetsMarket_C1_2025.pdf**

---

**Nota**: Este proyecto demuestra prácticas profesionales de desarrollo Java adecuadas para aplicaciones de e-commerce y punto de venta del mundo real. La arquitectura es escalable y podría extenderse con integración de base de datos, capacidades de red y características de reportes avanzados.

**Curso**: Principios de Programación 2  
**Institución**: Cenfotec - Programa de Educación Técnica  
**Tipo de Proyecto**: Proyecto Final Grupal - Sistema POS de E-Commerce  
**Período de Desarrollo**: 2025  
**Nombre del Proyecto**: ProyectoFinalGrupo2_PetsMarket_C1_2025
