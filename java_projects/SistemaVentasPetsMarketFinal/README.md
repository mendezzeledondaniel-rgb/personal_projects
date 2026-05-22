# PetsMarket - Pet Shop E-Commerce System

⚠️ **PROJECT COLLABORATION NOTE**

This README provides comprehensive technical documentation for **PetsMarket**, a group development project. This documentation was created as part of a thorough analysis and complete understanding of the entire codebase. For the original project specification and development notes, please refer to: **ProyectoFinalGrupo2_PetsMarket_C1_2025.pdf**

---

## Overview

**PetsMarket** is a comprehensive **Java-based e-commerce management system** developed in NetBeans as a final group project for Programming Fundamentals 2 (Principios de Programación 2). It's a complete point-of-sale (POS) and inventory management system designed for a pet shop business.

## Project Purpose

This project demonstrates:
- **Object-Oriented Programming (OOP)** principles in Java
- **Data persistence** using file I/O
- **User authentication and role-based access control**
- **Inventory management** with stock control
- **Customer relationship management (CRM)**
- **Sales processing** with invoice generation
- **GUI development** using Swing components
- **Software architecture** with separation of concerns

## Key Features

### 1. User Authentication System
- **Login Screen**: Secure username/password authentication
- **Role-Based Access Control**:
  - **VENDEDOR** (Seller): Can manage inventory, clients, and process sales
  - **GERENTE** (Manager): Full access including user management
- **User Management** (Manager Only):
  - Add new users with credentials
  - Modify user information
  - Delete users
  - List all users in table format

### 2. Inventory Management
- **Product Management**:
  - Add products with code, name, price, quantity, and category
  - Modify existing products
  - Delete products
  - Real-time stock tracking
  - Display inventory in table format
- **Product Categories**:
  - Alimento (Food)
  - Juguete (Toys)
  - Medicamento (Medicine)
- **Stock Control**:
  - Automatic stock reduction on sales
  - Inventory validation before sales
  - Low stock alerts

### 3. Customer Management
- **Customer Registration**:
  - Store customer information (name, surname, ID, email)
  - Add new customers
  - Modify customer details
  - Delete customers
  - Search customers by ID
  - Display all customers in table format

### 4. Sales Processing
- **Invoice Generation**:
  - Process sales transactions
  - Add multiple products per invoice
  - Calculate totals with automatic 13% IVA (tax)
  - Generate itemized invoices
  - Track quantities per product
- **Sales Validation**:
  - Verify customer exists
  - Check product availability
  - Validate stock quantities
  - Display sales summary

### 5. Data Persistence
- **File-Based Storage**:
  - `usuarios.txt` - User credentials and roles
  - `productos.txt` - Inventory data
  - `clientes.txt` - Customer information
- **Automatic Load/Save**:
  - Data loads on system startup
  - Automatic saving after modifications
  - CSV format for easy management

## Technical Stack

### Language & Framework
- **Language**: Java 8+
- **IDE**: NetBeans
- **GUI Library**: Swing (JOptionPane, JTable, JTextField)
- **Data Storage**: Text files (CSV format)

### Core Technologies
- **Collections**: HashMap for efficient lookups
- **File I/O**: BufferedReader/BufferedWriter for file operations
- **Swing Components**: Dialog boxes, tables, text fields for GUI
- **Object-Oriented Design**: Classes, encapsulation, inheritance

## Project Structure

```
SistemaVentasPetsMarketFinal/
├── src/
│   └── sistemaventaspetsmarket/
│       ├── SistemaVentasPetsMarket.java      # Main entry point
│       ├── Sistema.java                      # Main system controller
│       ├── Usuario.java                      # User data model
│       ├── UsuarioGestiones.java             # User management
│       ├── Cliente.java                      # Customer data model
│       ├── ClienteGestiones.java             # Customer management
│       ├── Producto.java                     # Product data model
│       ├── CategoriaProducto.java            # Product category enum
│       ├── Rol.java                          # User role enum
│       ├── Inventario.java                   # Inventory management
│       ├── Venta.java                        # Sales processing
│       ├── Factura.java                      # Invoice generation
│       ├── Validaciones.java                 # Input validation
│       ├── FastOptionPane.java               # Custom Swing dialogs
│       └── images/                           # Application images
├── build.xml                                 # NetBeans build configuration
├── manifest.mf                               # JAR manifest
├── usuarios.txt                              # User data file
├── productos.txt                             # Product inventory file
├── clientes.txt                              # Customer data file
├── README.md                                 # English documentation
└── README_ES.md                              # Spanish documentation
```

## Class Overview

### Core Model Classes

**Usuario.java**
- Represents a system user with credentials and role
- Attributes: username, name, surname, ID, password, role
- Methods: Getters and setters for all attributes

**Rol.java** (Enum)
- VENDEDOR: Seller role with limited permissions
- GERENTE: Manager role with full permissions

**Cliente.java**
- Represents a customer
- Attributes: name, surname, ID, email
- Methods: Full CRUD operations support

**Producto.java**
- Represents a product in inventory
- Attributes: code, name, price, quantity, category
- Methods: Stock reduction, validation, data serialization

**CategoriaProducto.java** (Enum)
- Alimento (Food products)
- Juguete (Toy products)
- Medicamento (Medicine products)

**Factura.java**
- Represents an invoice/receipt
- Tracks customer, products, quantities, and total
- Includes automatic IVA (13%) calculation
- Generates invoice display

### Management Classes

**UsuarioGestiones.java**
- Manages user lifecycle (CRUD operations)
- User authentication validation
- User search and verification
- Menu-driven user interface

**ClienteGestiones.java**
- Manages customer database
- Customer CRUD operations
- Customer search by ID
- Table display of all customers

**Inventario.java**
- Manages product inventory
- Product addition and modification
- Stock management
- Product search and display
- Table visualization of inventory

**Venta.java**
- Processes sales transactions
- Manages invoice creation
- Multiple product per sale support
- Input validation for quantities
- Stock availability checking

### Utility Classes

**Sistema.java**
- Main system controller and orchestrator
- Login menu implementation
- Main menu with role-based options
- Module delegation (inventory, customers, sales, users)

**CargaInformacion.java**
- File I/O operations
- Load data from text files on startup
- Save data after modifications
- Support for users, products, and customers

**Validaciones.java**
- Input validation for strings, numbers, sizes
- Email format validation
- Customer and product existence checks
- Data integrity verification

**FastOptionPane.java**
- Custom Swing dialog wrapper
- Simplifies GUI interaction
- Standard dialogs (options, input, alerts, confirmations)
- Consistent user interface styling

## Usage Flow

### Starting the Application
```
1. Run SistemaVentasPetsMarket.java
2. System loads all data (users, products, customers)
3. Login screen appears
4. Enter username and password
```

### Main Menu
After successful login, users see a menu based on their role:

**For Vendedor (Seller):**
1. Manage Inventory
2. Manage Customers
3. Process Sales
4. Logout

**For Gerente (Manager):**
1. Manage Inventory
2. Manage Customers
3. Process Sales
4. Manage Users
5. Logout

### Typical Sales Process
```
1. Select "Process Sales"
2. Enter customer ID
3. Add products by code
4. Enter quantities for each product
5. Confirm products or add more
6. System generates invoice with total + 13% IVA
7. Stock automatically updated
8. Invoice displayed and data saved
```

## Data Format

### usuarios.txt
```
username,nombre,apellidos,cedula,contraseña,rol
vendedor1,Juan,Pérez,112233445,pass123,VENDEDOR
gerente1,Carlos,López,223344556,admin123,GERENTE
```

### productos.txt
```
codigo,nombre,precio,cantidad,categoria
P001,Dog Food Premium,15000,50,Alimento
T001,Dog Toy Ball,5000,30,Juguete
M001,Antibiotics,25000,10,Medicamento
```

### clientes.txt
```
nombre,apellidos,cedula,email
Pedro,García,312312312,pedro@email.com
María,Rodríguez,423423423,maria@email.com
```

## Key Programming Concepts Demonstrated

### Object-Oriented Programming
- ✅ **Classes & Objects**: All business entities as classes
- ✅ **Encapsulation**: Private attributes with public getters/setters
- ✅ **Inheritance**: Potential for extending management classes
- ✅ **Polymorphism**: Role-based menu variations
- ✅ **Composition**: Sistema class contains multiple managers

### Data Structures
- ✅ **HashMap**: Efficient lookup by ID/code
- ✅ **ArrayList**: Dynamic collections for invoice items
- ✅ **Enums**: Type-safe role and category definitions

### File I/O & Persistence
- ✅ **BufferedReader/BufferedWriter**: Efficient file operations
- ✅ **File Format**: CSV for easy parsing and modification
- ✅ **Data Integrity**: Automatic save after modifications

### Validation & Error Handling
- ✅ **Input Validation**: Comprehensive data type checking
- ✅ **Business Logic Validation**: Stock availability, customer existence
- ✅ **User Feedback**: Dialog-based error messages and confirmations

### User Interface
- ✅ **Swing Components**: JOptionPane, JTable, JTextField
- ✅ **Dialog Boxes**: Input, confirmation, alerts, information
- ✅ **Table Displays**: GridView of inventory, customers, users
- ✅ **Menu Navigation**: Hierarchical menu system

## Building & Running

### In NetBeans
1. Open the project in NetBeans
2. Right-click project → Clean and Build
3. Right-click → Run Project (or press F6)

### From Command Line
```bash
# Compile
javac -d bin src/sistemaventaspetsmarket/*.java

# Run
java -cp bin sistemaventaspetsmarket.SistemaVentasPetsMarket
```

## Requirements Met

✅ Role-based user authentication  
✅ User management system (Manager only)  
✅ Complete inventory control with stock tracking  
✅ Customer database with full CRUD  
✅ Sales transaction processing  
✅ Automatic invoice generation with tax calculation  
✅ Data persistence with file I/O  
✅ Input validation and error handling  
✅ Swing-based graphical user interface  
✅ Menu-driven application flow  
✅ Separated concerns with multiple classes  
✅ HashMap-based efficient data lookups  
✅ Enum-based type safety  

## Project Team

👥 **Development Team:**
- Rubén Antonio Cruz Gutiérrez
- Ricardo Andrei Borge Carvajal
- **Daniel Méndez Zeledon**
- José Andrés Fernández Gutiérrez

**Contribution Note**: This comprehensive technical documentation was created through an in-depth analysis and complete understanding of the entire codebase. Daniel Méndez Zeledon took the extra effort to thoroughly comprehend all the work contributed by team members and translate that understanding into detailed technical documentation for this README.

## Credits

**Course**: Principios de Programación 2 (Programming Fundamentals 2)  
**Institution**: Cenfotec - Technical Education Program  
**Project Type**: Final Group Project - E-Commerce POS System  
**Development Period**: 2025  
**Project Name**: ProyectoFinalGrupo2_PetsMarket_C1_2025  

## Document Information

This README serves as **comprehensive technical documentation** created through detailed analysis and complete understanding of the entire PetsMarket codebase. It provides:
- Comprehensive class and method overview
- Architecture explanation
- Usage workflows
- Technical stack details

For the **original project specification and development documentation**, please refer to:
📄 **ProyectoFinalGrupo2_PetsMarket_C1_2025.pdf**

---

**Note**: This project demonstrates professional Java development practices suitable for real-world e-commerce and point-of-sale applications. The architecture is scalable and could be extended with database integration, network capabilities, and advanced reporting features.
