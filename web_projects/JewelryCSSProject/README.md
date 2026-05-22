# Darling - Luxury Jewelry Website

## Overview

This is a **CSS practice project** from Week 5 of the Web Development course. It's a modern, elegant luxury jewelry e-commerce landing page called "Darling" that showcases advanced CSS styling and layout techniques using Flexbox.

## Project Purpose

This project was created to practice and demonstrate:
- **Advanced Flexbox layouts** with complex component structures
- **Design system implementation** using CSS color variables and utilities
- **Professional UI styling** with custom fonts and spacing
- **E-commerce website patterns** (navigation, product displays, testimonials)
- **Semantic HTML structure** paired with utility-first CSS approach

## Features

### 1. Navigation Bar
- Logo ("Darling.") with custom styling
- Horizontal navigation menu with active state styling
- User profile and shopping cart icons
- Hover effects on navigation items
- Sticky navigation with primary color background

### 2. Hero Section (Main Display)
- Full-viewport hero image with overlay
- Elegant presentation text: "Sparkle & Shine: Exquisite Elegance Unveiled"
- "Shop Now" button with border and hover effects
- Professional woman image showcasing jewelry
- Centered layout with background image

### 3. Service Features (Display 2)
- Three-column layout showcasing key benefits:
  - **Delivery** - Fast shipping service
  - **Customer Care** - Dedicated support
  - **Payment Security** - Safe transactions
- Icons with descriptive text
- Clean white background with centered icons

### 4. Featured Products (Display 3)
- Section title and description
- Product cards displaying:
  - High-quality jewelry images
  - Product names (Radiance Necklace, Exquisite Earrings, etc.)
  - Prices
- Professional card styling with shadows
- "Shop Now" button linking to shop

### 5. Collections Gallery (Display 4)
- Multi-column image gallery
- 6 jewelry showcase images in an organized grid
- "Shop Now" button for collection access
- Elegant spacing and alignment

### 6. Selection Display (Display 5)
- Four featured products
- Product cards with images, names, and prices
- Items like:
  - Shimmering Ring ($168.76)
  - Exquisite Earrings ($125.28)
  - Elegance Earrings ($620.73)
  - Luxury Charms Brooch ($327.71)
- Light background color

### 7. Our Story Section (Display 6)
- Section title
- Feature image
- Background color differentiation

### 8. Testimonials Section (Display 7 - "From the People")
- Customer testimonial card
- Review from Anna Fernandez (USA)
- Product review with detailed feedback
- Navigation buttons (< >) for carousel
- Dark background with white text
- Professional testimonial layout

### 9. Footer
- Brand name and copyright
- Dark background matching header
- Company information

## Technical Stack

### Frontend
- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern styling with Flexbox layouts
- **Fonts**: 
  - *Cormorant Garamond* (main/display font) - Elegant serif
  - *Manrope* (secondary/body font) - Clean sans-serif

### Key CSS Features
- **Utility Classes**: Reusable flex utilities (`.flex_horizontal`, `.flex_vertical`, `.flex_space_between`, etc.)
- **Color System**: Custom color palette for primary, neutral, and semantic colors
- **Responsive Images**: Multiple image formats (JPG, WebP, AVIF) for optimization
- **Box Styling**: Cards with shadows, borders, and border-radius

## File Structure

```
Jewelry/
├── index.html                    # Main landing page
├── index.css                     # Stylesheet with Flexbox layouts
├── img/
│   └── index/
│       ├── main_woman.png        # Hero image
│       ├── imagenJoya1.jpg       # Jewelry image 1
│       ├── ImagenJoya2.webp      # Jewelry image 2
│       ├── ImagenJoya3.webp      # Jewelry image 3
│       ├── ImagenJoya4.jpg       # Jewelry image 4
│       ├── ImagenJoya5.jpg       # Jewelry image 5
│       ├── ImagenJoya6.avif      # Jewelry image 6
│       ├── profile_icon.webp     # User profile icon
│       ├── shopping_cart_icon.png # Shopping cart icon
│       ├── ImagenCarro.png       # Delivery icon
│       ├── CustomerCare.png      # Customer care icon
│       ├── PaymentSecurity.png   # Security icon
│       └── Selection.png         # Hero background image
├── pages/                        # Additional pages (reference only)
│   ├── shop_page.html
│   ├── collections_page.html
│   ├── about_page.html
│   └── contact_page.html
├── README.md                     # English documentation
├── README_ES.md                  # Spanish documentation
└── Tarea_Visly_DanielMendezZeledon.zip # Project archive
```

## CSS Architecture

### Utility-First Approach
The CSS uses a utility-first methodology with reusable classes:

```css
/* Layout Utilities */
.container { display: flex; }
.flex_horizontal { flex-direction: row; }
.flex_vertical { flex-direction: column; }
.flex_space_between { justify-content: space-between; }
.flex_space_evenly { justify-content: space-evenly; }
.flex_space_around { justify-content: space-around; }
.flex_space_center { justify-content: center; }

/* Color System */
.main_text_color { color: #F5D38EFF; }           /* Gold/accent */
.main_primary_500 { color: #0D554AFF; }         /* Teal/primary */
.main_neutral_900 { color: #171A1FFF; }         /* Dark text */
.main_bg_white { background-color: white; }

/* Font Utilities */
.main_font_family { font-family: "Cormorant Garamond"; }
.secondary_font_family { font-family: "Manrope"; }
```

### Component Classes
Display sections (main_display, main_display_2, etc.) manage full-width sections with specific heights and positioning.

### Color Palette
- **Primary Color**: #0D554AFF (Teal) - Used for buttons, headings, accents
- **Secondary Gold**: #F5D38EFF - Navigation highlights
- **Dark Background**: #093931FF - Header and footer
- **White**: #FFFFFF - Cards and content areas
- **Light Gray**: #FAFAFBFF - Alternative backgrounds
- **Neutral 900**: #171A1FFF - Primary text color
- **Neutral 500**: #9095A0FF - Secondary text color

## Key CSS Classes

### Layout
- `.container` - Flex container base
- `.flex_horizontal` / `.flex_vertical` - Direction control
- `.flex_space_*` - Justification utilities
- `.main_display_*` - Full-width display sections

### Styling
- `.shop_now_button` - Call-to-action button styling
- `.display_box_imgs_feat_prod` - Product card styling
- `.joya_img` - Jewelry image styling (200x200)
- `.delivery_customer` - Feature icon styling (150x150)

### Components
- Navigation bar with active state
- Product cards with shadows
- Hero section with background image
- Testimonial cards
- Navigation buttons for carousel

## Design Highlights

### Typography
- **Headlines**: Cormorant Garamond, large sizes (40-72px), elegant and upscale
- **Body Text**: Manrope, smaller sizes (14-16px), clean and readable
- **Hierarchy**: Multiple font sizes for visual hierarchy (font-size: 72px for hero, 40px for sections, 16px for body)

### Spacing
- Consistent padding and margins using flex utilities
- Space-between, space-around, and space-evenly for distribution
- Proper line-height for readability (26px for body, 56px for headings)

### Images
- Modern image formats: JPG, WebP, AVIF for optimization
- Fixed dimensions with object-fit: cover for consistency
- Border-radius: 8px for card styling
- Responsive image handling

### Interactions
- Hover effects on buttons and navigation
- Active state styling on navigation links
- Subtle transitions and opacity changes
- Interactive elements are clearly indicated

## How to View

1. Open `index.html` in a modern web browser
2. Navigate through different sections by scrolling
3. Click navigation menu items (links to other pages like Shop, Collections, About, Contact)
4. Interact with buttons and icons
5. View responsive layout behavior

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern browsers with Flexbox and CSS Grid support

## Responsive Features

- Flexbox-based layout adapts to different screen sizes
- Images use `object-fit: cover` for responsive scaling
- Viewport meta tag configured for mobile viewing
- Flexible sizing for components

## Practice Objectives Met

✅ Advanced Flexbox layout techniques  
✅ Multi-component page structure  
✅ Professional color system implementation  
✅ Custom font integration (Google Fonts)  
✅ Product showcase styling  
✅ Navigation bar design  
✅ Card component creation  
✅ Testimonial section styling  
✅ Hover and interactive states  
✅ Semantic HTML with CSS styling  
✅ Image optimization with multiple formats  
✅ Professional UI/UX patterns  

## Learning Outcomes

After completing this practice, you should understand:
- How to structure complex layouts with Flexbox
- Creating utility-first CSS frameworks
- Implementing color systems in web design
- Professional e-commerce website patterns
- Typography hierarchy and readability
- Icon and image integration
- Interactive element styling
- Professional color psychology (luxury/elegance)

## Author & Credits

**Student**: Daniel Mendez Zeledon  
**Course**: Desarrollo Web - Semana 5 (Week 5)  
**Institution**: Cenfotec - Technical Education Program  
**Project Type**: CSS Practice - E-commerce Landing Page  
**Task**: Tarea_Visly_DanielMendezZeledon  

---

**Note**: This project demonstrates professional CSS styling and layout techniques suitable for luxury brand e-commerce websites. The design emphasizes elegance, clarity, and user experience through careful attention to typography, spacing, color, and component design.
