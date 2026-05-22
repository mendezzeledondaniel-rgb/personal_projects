# Scholarship Distribution System - Final Project

## Overview

This is a comprehensive **Scholarship Management and Reporting System** developed as the final project for Programming Fundamentals I (Principios de Programación 1). The application is an interactive command-line tool that surveys students and generates detailed reports about scholarship distribution in a school environment.

## Project Purpose

The system automates the process of:
- **Collecting student data** through an interactive survey
- **Analyzing scholarship distribution** by type and level
- **Generating comprehensive reports** including financial breakdowns
- **Exporting data** in multiple formats (TXT and Excel)

## Features

### 1. Student Survey Module
- Interactive 4-question survey for each student
- Questions cover:
  - Current academic level (1-5)
  - Team participation (Basketball, Swimming, Chess, or None)
  - Scholarship eligibility and type
- Automatic scholarship assignment based on team participation
- Data validation and error handling

### 2. Reporting System
The system generates five types of reports:

#### Report 1: Students Surveyed by Level
- Total number of students per academic level (1-5)
- Overall total of surveyed students

#### Report 2: Scholarship Distribution Percentage
- Percentage of students with academic scholarships
- Percentage of students with sports scholarships
- Percentage of students without scholarships

#### Report 3: Monthly and Annual Scholarship Breakdown
- Total number of scholarships by type
- Monthly investment in scholarships (in Costa Rican Colones)
- Annual projection (11 months × monthly amount)
  - Academic scholarships: ₡50,000 per month
  - Sports scholarships: ₡80,000 per month

#### Report 4: Students by Team
- Total students per team:
  - Basketball
  - Swimming
  - Chess
  - No team assignment

#### Report 5: Comprehensive Export
- All reports combined into a single text file
- Detailed formatting and analysis

### 3. Data Export Functions
- **Excel Export**: Exports all collected student data to `TablaEstudiantesBecas.xlsx`
- **Text Report Export**: Generates comprehensive report as `ReporteCompletoBecas.txt`

## Technical Stack

- **Language**: Python 3.x
- **Libraries**:
  - `pandas`: Data manipulation and Excel export
  - `os`: System operations (screen clearing)
  - `time`: User experience delays and pacing

## File Structure

```
ProyectoFinal/
├── ProyectoFinalPrincipiosDeProgramacion.py   # Main application file
├── README.md                                   # English documentation
├── README_ES.md                                # Spanish documentation
├── proyecto-final-c3.pdf                       # Project requirements
├── TablaEstudiantesBecas.xlsx                  # Output: Student data
├── ReporteCompletoBecas.txt                    # Output: Comprehensive report
└── EjemploTabla.xlsx                           # Example data reference
```

## How to Use

### 1. Running the Application

```bash
python ProyectoFinalPrincipiosDeProgramacion.py
```

### 2. Main Menu Options

**Option 1: Survey Students**
- Guides you through a 4-question survey
- Automatically saves responses to the database
- You can survey multiple students in sequence

**Option 2: View Reports**
Access the reporting menu with six report options:
1. Total students surveyed by level
2. Scholarship percentage breakdown
3. Monthly/Annual scholarship investment
4. Students by team
5. Export all reports to text file
6. Export all data to Excel file
7. Return to main menu

**Option 3: Exit**
- Closes the application with a farewell message

### 3. Output Files

After running reports:
- **TablaEstudiantesBecas.xlsx** - Excel spreadsheet with all student records
- **ReporteCompletoBecas.txt** - Text file with all generated reports

## Key Concepts Demonstrated

### Programming Fundamentals
- **Control Structures**: While loops, if-elif-else statements
- **Data Structures**: Lists, dictionaries, pandas DataFrames
- **Functions**: Modular design with 20+ helper functions
- **File I/O**: Reading/writing Excel and text files
- **String Formatting**: f-strings and formatted output

### Software Engineering Practices
- **Menu-Driven Architecture**: User-friendly navigation
- **Data Validation**: Input checking and error handling
- **Separation of Concerns**: Distinct functions for survey, reporting, and export
- **Code Organization**: Global variables, helper functions, main orchestrator
- **User Experience**: Time delays, clear prompts, progress feedback

## Data Model

### Student Record Fields
- **Estudiante** (Student): Unique identifier (Estudiante_0, Estudiante_1, etc.)
- **Nivel** (Level): Academic level 1-5
- **Equipo** (Team): Baloncesto, Natacion, Ajedrez, or SinEquipo
- **TipoBeca** (Scholarship Type): Academica, Deportiva, or SinBeca
- **Beca** (Scholarship Amount): Monthly amount in Costa Rican Colones
  - 0 for no scholarship
  - 50,000 for academic scholarship
  - 80,000 for sports scholarship

## Scholarship Rules

1. **Students with a team** can receive sports scholarships (₡80,000/month)
2. **Students without a team** automatically receive academic scholarships if eligible (₡50,000/month)
3. Students can opt out of scholarships entirely (SinBeca)

## Example Usage Flow

1. Start the application
2. Select "Take Student Survey" (Option 1)
3. Answer 5 survey questions
4. Confirm responses are saved
5. Repeat for additional students
6. Select "View Reports" (Option 2)
7. Choose Report #5 to export comprehensive text report
8. Choose Report #6 to export data to Excel
9. Review generated files in the project directory

## Output Example

The system generates formatted reports like:

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

## Requirements Met

✅ Interactive user interface with menu system  
✅ Student survey data collection  
✅ Data storage in pandas DataFrame  
✅ Multiple report generation functions  
✅ Financial calculations and projections  
✅ Export to Excel format  
✅ Export to Text format  
✅ Input validation and error handling  
✅ Professional UI with formatted output  

## Author & Credits

**Student**: Daniel Mendez Zeledon  
**Course**: Principios de Programación 1  
**Institution**: Cenfotec - Technical Education Program  
**Version**: 2.7  
**Company**: DMZ Technologies  

---

**Note**: This project was developed as an educational exercise to demonstrate fundamental programming concepts including data structures, control flow, file I/O, and user interface design in Python.
