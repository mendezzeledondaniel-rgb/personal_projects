# Darling - Sitio Web de Joyería de Lujo

## Descripción General

Este es un **proyecto de práctica de CSS** de la Semana 5 del curso de Desarrollo Web. Es una página de inicio moderna y elegante de un sitio de e-commerce de joyería de lujo llamada "Darling" que demuestra técnicas avanzadas de estilos CSS y layouts usando Flexbox.

## Propósito del Proyecto

Este proyecto fue creado para practicar y demostrar:
- **Layouts avanzados de Flexbox** con estructuras de componentes complejas
- **Implementación de sistema de diseño** usando variables de color CSS y utilidades
- **Estilos de interfaz profesional** con fuentes personalizadas y espaciado
- **Patrones de sitios de e-commerce** (navegación, exhibiciones de productos, testimonios)
- **Estructura HTML semántica** combinada con enfoque CSS de utilidades

## Características

### 1. Barra de Navegación
- Logo ("Darling.") con estilos personalizados
- Menú de navegación horizontal con estilos de estado activo
- Iconos de perfil de usuario y carrito de compras
- Efectos hover en elementos de navegación
- Navegación fija con fondo de color primario

### 2. Sección Hero (Pantalla Principal)
- Imagen hero de viewport completo con overlay
- Texto de presentación elegante: "Sparkle & Shine: Exquisite Elegance Unveiled"
- Botón "Shop Now" con borde y efectos hover
- Imagen profesional de mujer mostrando joyas
- Layout centrado con imagen de fondo

### 3. Características de Servicio (Pantalla 2)
- Layout de tres columnas mostrando beneficios clave:
  - **Delivery** - Servicio de envío rápido
  - **Atención al Cliente** - Soporte dedicado
  - **Seguridad de Pago** - Transacciones seguras
- Iconos con texto descriptivo
- Fondo blanco limpio con iconos centrados

### 4. Productos Destacados (Pantalla 3)
- Título de sección y descripción
- Tarjetas de producto mostrando:
  - Imágenes de joyería de alta calidad
  - Nombres de productos (Radiance Necklace, Exquisite Earrings, etc.)
  - Precios
- Estilos profesionales de tarjeta con sombras
- Botón "Shop Now" vinculado a la tienda

### 5. Galería de Colecciones (Pantalla 4)
- Galería de imágenes de múltiples columnas
- 6 imágenes de exhibición de joyas en una cuadrícula organizada
- Botón "Shop Now" para acceso a la colección
- Espaciado y alineación elegantes

### 6. Pantalla de Selección (Pantalla 5)
- Cuatro productos destacados
- Tarjetas de producto con imágenes, nombres y precios
- Artículos como:
  - Shimmering Ring ($168.76)
  - Exquisite Earrings ($125.28)
  - Elegance Earrings ($620.73)
  - Luxury Charms Brooch ($327.71)
- Color de fondo claro

### 7. Sección Nuestra Historia (Pantalla 6)
- Título de sección
- Imagen destacada
- Diferenciación de color de fondo

### 8. Sección de Testimonios (Pantalla 7 - "Desde la Gente")
- Tarjeta de testimonio de cliente
- Reseña de Anna Fernandez (USA)
- Reseña de producto con retroalimentación detallada
- Botones de navegación (< >) para carrusel
- Fondo oscuro con texto blanco
- Layout profesional de testimonio

### 9. Pie de Página
- Nombre de marca e información de copyright
- Fondo oscuro que coincide con el encabezado
- Información de la empresa

## Stack Tecnológico

### Frontend
- **HTML5**: Marcado semántico con estructura adecuada
- **CSS3**: Estilos modernos con layouts Flexbox
- **Fuentes**: 
  - *Cormorant Garamond* (fuente principal/display) - Serif elegante
  - *Manrope* (fuente secundaria/cuerpo) - Sans-serif limpia

### Características Clave de CSS
- **Clases de Utilidad**: Utilidades flex reutilizables (`.flex_horizontal`, `.flex_vertical`, `.flex_space_between`, etc.)
- **Sistema de Color**: Paleta de colores personalizada para colores primarios, neutros y semánticos
- **Imágenes Responsivas**: Múltiples formatos de imagen (JPG, WebP, AVIF) para optimización
- **Estilos de Cajas**: Tarjetas con sombras, bordes y border-radius

## Estructura de Archivos

```
Jewelry/
├── index.html                    # Página de inicio principal
├── index.css                     # Hoja de estilos con layouts Flexbox
├── img/
│   └── index/
│       ├── main_woman.png        # Imagen hero
│       ├── imagenJoya1.jpg       # Imagen de joya 1
│       ├── ImagenJoya2.webp      # Imagen de joya 2
│       ├── ImagenJoya3.webp      # Imagen de joya 3
│       ├── ImagenJoya4.jpg       # Imagen de joya 4
│       ├── ImagenJoya5.jpg       # Imagen de joya 5
│       ├── ImagenJoya6.avif      # Imagen de joya 6
│       ├── profile_icon.webp     # Icono de perfil de usuario
│       ├── shopping_cart_icon.png # Icono de carrito de compras
│       ├── ImagenCarro.png       # Icono de entrega
│       ├── CustomerCare.png      # Icono de atención al cliente
│       ├── PaymentSecurity.png   # Icono de seguridad
│       └── Selection.png         # Imagen de fondo hero
├── pages/                        # Páginas adicionales (solo referencia)
│   ├── shop_page.html
│   ├── collections_page.html
│   ├── about_page.html
│   └── contact_page.html
├── README.md                     # Documentación en inglés
├── README_ES.md                  # Documentación en español
└── Tarea_Visly_DanielMendezZeledon.zip # Archivo del proyecto
```

## Arquitectura de CSS

### Enfoque Basado en Utilidades
El CSS utiliza una metodología basada en utilidades con clases reutilizables:

```css
/* Utilidades de Layout */
.container { display: flex; }
.flex_horizontal { flex-direction: row; }
.flex_vertical { flex-direction: column; }
.flex_space_between { justify-content: space-between; }
.flex_space_evenly { justify-content: space-evenly; }
.flex_space_around { justify-content: space-around; }
.flex_space_center { justify-content: center; }

/* Sistema de Colores */
.main_text_color { color: #F5D38EFF; }           /* Oro/acento */
.main_primary_500 { color: #0D554AFF; }         /* Teal/primario */
.main_neutral_900 { color: #171A1FFF; }         /* Texto oscuro */
.main_bg_white { background-color: white; }

/* Utilidades de Fuente */
.main_font_family { font-family: "Cormorant Garamond"; }
.secondary_font_family { font-family: "Manrope"; }
```

### Clases de Componentes
Las secciones de display (main_display, main_display_2, etc.) manejan secciones de ancho completo con alturas y posicionamiento específicos.

### Paleta de Colores
- **Color Primario**: #0D554AFF (Teal) - Usado para botones, encabezados, acentos
- **Oro Secundario**: #F5D38EFF - Destacados de navegación
- **Fondo Oscuro**: #093931FF - Encabezado y pie de página
- **Blanco**: #FFFFFF - Tarjetas y áreas de contenido
- **Gris Claro**: #FAFAFBFF - Fondos alternativos
- **Neutral 900**: #171A1FFF - Color de texto primario
- **Neutral 500**: #9095A0FF - Color de texto secundario

## Clases CSS Clave

### Layout
- `.container` - Base de contenedor flex
- `.flex_horizontal` / `.flex_vertical` - Control de dirección
- `.flex_space_*` - Utilidades de justificación
- `.main_display_*` - Secciones de display de ancho completo

### Estilos
- `.shop_now_button` - Estilos de botón de llamada a la acción
- `.display_box_imgs_feat_prod` - Estilos de tarjeta de producto
- `.joya_img` - Estilos de imagen de joya (200x200)
- `.delivery_customer` - Estilos de icono de característica (150x150)

### Componentes
- Barra de navegación con estado activo
- Tarjetas de producto con sombras
- Sección hero con imagen de fondo
- Tarjetas de testimonio
- Botones de navegación para carrusel

## Destacados del Diseño

### Tipografía
- **Encabezados**: Cormorant Garamond, tamaños grandes (40-72px), elegante y lujoso
- **Texto del Cuerpo**: Manrope, tamaños pequeños (14-16px), limpio y legible
- **Jerarquía**: Múltiples tamaños de fuente para jerarquía visual (font-size: 72px para hero, 40px para secciones, 16px para cuerpo)

### Espaciado
- Padding y márgenes consistentes usando utilidades flex
- Space-between, space-around y space-evenly para distribución
- Line-height apropiado para legibilidad (26px para cuerpo, 56px para encabezados)

### Imágenes
- Formatos de imagen modernos: JPG, WebP, AVIF para optimización
- Dimensiones fijas con object-fit: cover para consistencia
- Border-radius: 8px para estilos de tarjeta
- Manejo de imágenes responsivas

### Interacciones
- Efectos hover en botones y navegación
- Estilos de estado activo en enlaces de navegación
- Transiciones sutiles y cambios de opacidad
- Los elementos interactivos están claramente indicados

## Cómo Ver

1. Abra `index.html` en un navegador web moderno
2. Navegue por diferentes secciones desplazándose
3. Haga clic en elementos del menú de navegación (enlaces a otras páginas como Shop, Collections, About, Contact)
4. Interactúe con botones e iconos
5. Vea el comportamiento del layout responsivo

## Compatibilidad del Navegador

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Navegadores modernos con soporte para Flexbox y CSS Grid

## Características Responsivas

- Layout basado en Flexbox se adapta a diferentes tamaños de pantalla
- Las imágenes utilizan `object-fit: cover` para escala responsiva
- Etiqueta de viewport meta configurada para visualización móvil
- Tamaño flexible para componentes

## Objetivos de Práctica Cumplidos

✅ Técnicas avanzadas de layout Flexbox  
✅ Estructura de página multicomponente  
✅ Implementación de sistema de colores profesional  
✅ Integración de fuentes personalizadas (Google Fonts)  
✅ Estilos de exhibición de productos  
✅ Diseño de barra de navegación  
✅ Creación de componentes de tarjeta  
✅ Estilos de sección de testimonios  
✅ Estados hover e interactivos  
✅ HTML semántico con estilos CSS  
✅ Optimización de imágenes con múltiples formatos  
✅ Patrones profesionales de UI/UX  

## Resultados de Aprendizaje

Después de completar esta práctica, deberías comprender:
- Cómo estructurar layouts complejos con Flexbox
- Creación de frameworks CSS basados en utilidades
- Implementación de sistemas de colores en diseño web
- Patrones profesionales de sitios de e-commerce
- Jerarquía tipográfica y legibilidad
- Integración de iconos e imágenes
- Estilos de elementos interactivos
- Psicología profesional del color (lujo/elegancia)

## Autor y Créditos

**Estudiante**: Daniel Mendez Zeledon  
**Curso**: Desarrollo Web - Semana 5  
**Institución**: Cenfotec - Programa de Educación Técnica  
**Tipo de Proyecto**: Práctica de CSS - Página de Inicio de E-commerce  
**Tarea**: Tarea_Visly_DanielMendezZeledon  

---

**Nota**: Este proyecto demuestra técnicas profesionales de estilos CSS y diseño de layouts adecuados para sitios web de e-commerce de marcas de lujo. El diseño enfatiza elegancia, claridad y experiencia del usuario mediante atención cuidadosa a tipografía, espaciado, color y diseño de componentes.
