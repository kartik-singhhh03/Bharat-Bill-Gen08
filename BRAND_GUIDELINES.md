# 🎨 BharatBillGen Brand Guidelines

## 🎨 Color Palette

### Primary Colors
```css
/* Orange Gradient (Primary Brand) */
--orange-50: #fff7ed
--orange-100: #ffedd5
--orange-200: #fed7aa
--orange-300: #fdba74
--orange-400: #fb923c
--orange-500: #f97316  /* Main Brand Color */
--orange-600: #ea580c  /* Primary Hover */
--orange-700: #c2410c
--orange-800: #9a3412
--orange-900: #7c2d12

/* Secondary Colors */
--blue-500: #3b82f6    /* International/Global */
--green-500: #10b981   /* Success/Free */
--yellow-500: #eab308  /* Premium/Pro */
--red-500: #ef4444     /* Error/Warning */
```

### Neutral Colors
```css
/* Light Mode */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827

/* Dark Mode */
--dark-bg: #1f2937
--dark-surface: #374151
--dark-text: #f9fafb
```

## 🖼️ Logo Specifications

### Logo Concept
```
🏢 BharatBillGen
```

### Logo Variations
1. **Primary Logo**: Orange gradient background with white icon
2. **Secondary Logo**: White background with orange icon
3. **Text Logo**: "BharatBillGen" in custom typography
4. **Icon Only**: Building/invoice icon for favicons

### Logo Usage
- Minimum size: 32x32px (favicon)
- Recommended size: 128x128px (header)
- Large size: 512x512px (PWA icons)
- Format: SVG (scalable), PNG (raster)

## 🎯 Brand Identity

### Brand Name
**BharatBillGen**
- "Bharat" = India (Hindi)
- "Bill" = Invoice
- "Gen" = Generator

### Tagline Options
1. "Empowering Indian Businesses"
2. "Free GST Invoice Generator"
3. "Made for Indian Entrepreneurs"
4. "Professional Invoicing Made Simple"

### Brand Voice
- **Professional** yet **approachable**
- **Helpful** and **supportive**
- **Trustworthy** and **reliable**
- **Innovative** but **practical**

## 📱 App Icons & Assets

### Favicon (16x16, 32x32)
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon.png" />
```

### Apple Touch Icon (180x180)
```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### PWA Icons
- 192x192px (Android)
- 512x512px (Android, iOS)
- Maskable icons for adaptive icons

### Social Media Assets
- **Open Graph**: 1200x630px
- **Twitter Card**: 1200x600px
- **LinkedIn**: 1200x627px

## 🎨 Typography

### Primary Font
**Inter** - Modern, clean, highly readable
```css
font-family: 'Inter', system-ui, sans-serif;
```

### Font Weights
- **Light**: 300 (minimal use)
- **Regular**: 400 (body text)
- **Medium**: 500 (labels, buttons)
- **Semibold**: 600 (headings)
- **Bold**: 700 (emphasis)

### Font Sizes
```css
/* Headings */
--text-4xl: 2.25rem  /* Main titles */
--text-3xl: 1.875rem /* Section titles */
--text-2xl: 1.5rem   /* Card titles */
--text-xl: 1.25rem   /* Subtitles */
--text-lg: 1.125rem  /* Large text */

/* Body */
--text-base: 1rem    /* Default */
--text-sm: 0.875rem  /* Small text */
--text-xs: 0.75rem   /* Captions */
```

## 🎯 UI Components Style

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(to right, #f97316, #ea580c);
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s;
}

/* Secondary Button */
.btn-secondary {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  padding: 1.5rem;
}
```

### Input Fields
```css
.input-field {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s;
  focus: {
    ring: 2px solid #f97316;
    border-color: transparent;
  }
}
```

## 🌟 Brand Applications

### Website Header
- Logo on left
- Navigation in center
- CTA button on right
- Orange accent color

### Invoice Templates
- Professional layouts
- Consistent typography
- Brand colors as accents
- Clean, minimal design

### Marketing Materials
- Orange as primary color
- Professional imagery
- Clear value propositions
- Indian business focus

## 📊 Brand Metrics

### Success Indicators
- Brand recognition
- User trust scores
- Professional appearance rating
- Ease of use metrics

### Brand Guidelines Compliance
- Consistent color usage
- Proper logo placement
- Typography consistency
- Voice and tone alignment

---

**Created by Kartik Singh**
- LinkedIn: [Kartik Singh](https://www.linkedin.com/in/kartik-singh-879b6b288)
- Email: contactsweatandcode@gmail.com