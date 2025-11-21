# ARXIU HISTÒRIC JOVIAT - PROJECT LOG & DEVELOPMENT GUIDE

**Project:** Arxiu Històric Joviat (Historical Archive Web Application)
**Status:** ACTIVE - In Development
**Last Updated:** November 19, 2025
**Frontend:** http://localhost:5173/
**Backend:** http://localhost:3000/

---

## 🔴 CRITICAL RULE FOR THIS PROJECT

### ⚠️ USE INLINE STYLES ONLY - DO NOT USE TAILWIND CLASSES FOR VISUAL CHANGES

**WHY:** Tailwind CSS classes don't reliably update in the live development server. Changes made via Tailwind won't appear visually until a hard reset of the entire build system.

**CORRECT PATTERN:**
```jsx
<element style={{ property: 'value', property2: 'value2' }}>
```

**INCORRECT PATTERN (DON'T USE):**
```jsx
<element className="bg-black p-8 m-6">
```

Always use inline `style={{}}` attributes for ANY visual changes you want users to see immediately.

---

## ✅ COMPLETED IN EXTENDED SESSION (November 19, 2025 - FULL DAY)

### 1. Header/Navigation Bar Component
**File:** `src/components/shared/Header.jsx`

**What was done:**
- Removed logo section
- Simplified to centered navigation only
- Changed from fixed positioning to static (scrolls with page)
- Added full black background
- Made text larger and white
- Added white borders around buttons
- Increased spacing between navigation items

**Current Code:**
```jsx
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header style={{ backgroundColor: 'black', padding: '24px 48px' }}>
      <div className="max-w-7xl mx-auto px-12">
        <nav className="flex items-center justify-center" style={{ gap: '80px' }}>
          <Link
            to="/"
            style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', textDecoration: 'none', border: '2px solid white', padding: '12px 24px', borderRadius: '8px' }}
          >
            Inici
          </Link>
          <Link
            to="/gestor"
            style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', textDecoration: 'none', border: '2px solid white', padding: '12px 24px', borderRadius: '8px' }}
          >
            Gestor
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

**Styling Breakdown:**
- `backgroundColor: 'black'` - Full black background
- `padding: '24px 48px'` - Header padding (top/bottom, left/right)
- `gap: '80px'` - Space between "Inici" and "Gestor"
- `fontSize: '36px'` - Button text size
- `fontWeight: 'bold'` - Bold letters
- `color: 'white'` - White text
- `textDecoration: 'none'` - No underlines
- `border: '2px solid white'` - White border around buttons
- `padding: '12px 24px'` - Padding inside button borders
- `borderRadius: '8px'` - Rounded corners

---

### 2. Page Padding/Margins (All Pages)

**Files Updated:**
- `src/pages/Portada.jsx` (line 74)
- `src/pages/TimelinePublica.jsx` (line 94)
- `src/pages/GestorInventari.jsx` (line 56)

**What was done:**
- Added moderate padding on all sides
- Used inline styles for reliability
- Applied to main page containers

**Current Implementation:**
```jsx
<div style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '40px', paddingBottom: '40px' }}>
```

**Padding Values:**
- Left: 60px
- Right: 60px
- Top: 40px
- Bottom: 40px

---

### 3. Gestor Page - Remove Borders

**Files Updated:**
- `src/components/gestor/FormulariDocument.jsx` (line 87)
- `src/components/gestor/LlistaDocuments.jsx` (line 45)

**What was done:**
- Removed gray borders from form container
- Removed gray borders from document list container
- Kept white background
- Kept rounded corners

**Current Code:**
```jsx
// FormulariDocument
<form onSubmit={handleSubmit} className="bg-white rounded-lg p-12 max-w-2xl mx-auto" style={{ border: 'none' }}>

// LlistaDocuments
<div className="bg-white rounded-lg p-8" style={{ border: 'none' }}>
```

---

## 📊 COMPONENT STATUS TABLE

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Header | `src/components/shared/Header.jsx` | ✅ COMPLETE | Black bg, white text, bordered buttons |
| Portada | `src/pages/Portada.jsx` | ✅ STYLED | Padding applied with inline styles |
| Timeline | `src/pages/TimelinePublica.jsx` | ✅ STYLED | Padding applied with inline styles |
| Gestor | `src/pages/GestorInventari.jsx` | ✅ STYLED | Padding applied, borders removed |
| Form | `src/components/gestor/FormulariDocument.jsx` | ✅ STYLED | Border removed |
| List | `src/components/gestor/LlistaDocuments.jsx` | ✅ STYLED | Border removed |

---

## 🎨 DESIGN SYSTEM (Current)

### Colors
- **Primary Background:** Black (header)
- **Primary Text:** White (on black)
- **Body Background:** White
- **Border Color:** White (header buttons)
- **Text Color (body):** Black
- **Secondary Text:** #666666 (gray)

### Typography
- **Header Font Size:** 36px, bold
- **Button Font Weight:** Bold
- **Body Text:** Default (varies by component)

### Spacing
- **Header Padding:** 24px (vertical), 48px (horizontal)
- **Page Padding:** 60px (left/right), 40px (top/bottom)
- **Navigation Gap:** 80px
- **Button Padding:** 12px (vertical), 24px (horizontal)

### Borders & Corners
- **Button Border:** 2px solid white
- **Border Radius:** 8px (rounded)

---

## 📁 PROJECT STRUCTURE

```
src/
├── pages/
│   ├── Portada.jsx (Landing page)
│   ├── TimelinePublica.jsx (Timeline view)
│   └── GestorInventari.jsx (Document management)
├── components/
│   ├── shared/
│   │   ├── Header.jsx (Navigation - STYLED)
│   │   └── Footer.jsx
│   └── gestor/
│       ├── FormulariDocument.jsx (Add docs form - STYLED)
│       └── LlistaDocuments.jsx (Docs list - STYLED)
└── App.jsx (Main router)
```

---

## 🔗 ROUTES

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Portada | Landing page with all decades |
| `/decada/:decade` | TimelinePublica | Timeline for specific decade |
| `/gestor` | GestorInventari | Document management system |

---

## 📝 HOW TO MAKE CHANGES IN FUTURE SESSIONS

### Step 1: Use Inline Styles
```jsx
// Always do this:
style={{ backgroundColor: 'black', color: 'white', padding: '16px' }}

// Never do this:
className="bg-black text-white p-4"
```

### Step 2: Locate the File
Look in the Component Status Table above to find which file needs editing.

### Step 3: Add/Modify the Style
Find the element and add or update the `style={{}}` attribute.

### Step 4: Refresh Browser
Go to `http://localhost:5173/` and press F5 to refresh. Changes appear immediately.

---

## 🚀 SESSION LOG

### Session 2 - November 19, 2025 (EXTENDED FULL DAY)
**Start Time:** Afternoon
**End Time:** Evening
**Duration:** Extended session (6+ hours)

**MAJOR ACCOMPLISHMENTS:**

#### A. Audio Document Type Addition ✅
- Added 4th option to document type selector: **Audio** (🎵)
- Changed grid from 3 columns to 4 columns with responsive sizing

#### B. Form Metadata Styling - COMPLETE OVERHAUL ✅
**Files:** `src/components/gestor/FormulariDocument.jsx`

**Typography Standardization:**
- All metadata labels: 16px, fontWeight 500, Hanken Grotesk font family
- Applied to: Tipus, Any, Mes, Dia, Títol, Descripció, Autor, Categories, Fitxer, Visible a la timeline pública?
- Consistent black color across all required fields
- Gray (#666666) for optional labels

**Spacing Refinements:**
- Label-to-input gap: 16px → **8px** (tight coupling, feels like one unit)
- Between metadata sections: 12px → **12px** (consistent medium gap)
- After Type Selector: mb-12 → **mb-20** (large gap to clearly separate "choosing type" from "entering data")

**Visual Improvements:**
- **Visible a la timeline pública?** moved BEFORE Categories section
- Toggle selector reduced size (48x28px → 42x24px)
- Toggle now feels compact and paired with label
- Section organization is now intuitive

#### C. Type Selector Button Enhancements ✅
**Features Applied:**
- ✅ 4-column responsive grid layout
- ✅ Slightly increased button size (136px)
- ✅ Hover effect: light gray background (#F5F5F5)
- ✅ Selected state: black background, white text, 3px border
- ✅ Interactive feedback: shadow effect + lift animation (translateY -4px)
- ✅ Smooth transitions (0.3s ease)

#### D. Input Field Color Scheme Refinement ✅
**Applied to:** Any, Mes, Dia, Títol, Descripció, Autor, Categories inputs

**Color System:**
- **Border:** #E5E5E5 → **#D0D0D0** (higher contrast)
- **Background (rest):** white → **#FAFAFA** (soft off-white, less harsh)
- **Background (focus):** → **white** (clear distinction)
- **Focus state:**
  - Border: black
  - Box shadow: 0 0 0 3px rgba(0,0,0,0.05) (subtle ring for accessibility)
  - Background: white
- **Transitions:** all 0.2s ease (smooth state changes)

#### E. Portada (Landing Page) - Decade Card Fix ✅
**File:** `src/pages/Portada.jsx`
- Removed font size growth on hover (48px stays constant)
- Kept color inversion, lift, and shadow effects
- Result: cleaner, more subtle hover interaction

#### F. All Metadata Labels Consistency ✅
- **Títol**: Updated to match metadata standards
- **Descripció**: Updated to match metadata standards
- **Autor / Font**: Changed from gray (#666666) → black (matches other required fields)
- All have Hanken Grotesk font family

**Files Modified in This Session:**
1. `src/components/gestor/FormulariDocument.jsx` (major overhaul)
2. `src/pages/Portada.jsx` (decade card hover fix)

**Key Learning:**
- Proper spacing hierarchy (tight label-input, medium between fields, large between sections) creates visual clarity
- Input field color refinement improves accessibility without changing design aesthetic
- Moving UI elements creates better user flow (visible toggle before categories makes more sense)

**Next Step:**
- Project ready for Render deployment
- Code is clean and well-documented
- All visual changes tested and working

---

## 📋 NEXT SESSION PRIORITIES

### DEPLOYMENT (Session 3)
- [ ] Deploy to Render.com (free tier)
- [ ] Set up GitHub repository with project code
- [ ] Configure environment variables for production
- [ ] Test deployed version on mobile/desktop
- [ ] Document production deployment steps

### FUTURE ENHANCEMENTS (Sessions 4+)
- [ ] Style timeline components (TimelinePublica.jsx)
- [ ] Add animations/transitions for better UX
- [ ] Implement search/filter improvements
- [ ] Add document preview/lightbox feature
- [ ] Mobile responsiveness improvements
- [ ] Add animations to form submission
- [ ] Implement loading states
- [ ] Add success/error notifications with better styling

---

## ⚙️ TECHNICAL NOTES

### Server Commands
```bash
# Start development server
npm start

# Build for production
npm run build

# Clear cache if needed
rm -rf node_modules .vite dist
npm install
npm start
```

### Browser Ports
- Primary: 5173
- Fallbacks: 5174, 5175, 5176, 5177, 5178+
- Backend: 3000

### How to Force Changes to Appear
1. Edit file with inline styles
2. Browser live reload should refresh automatically
3. If not, press F5 (refresh)
4. If still not showing, clear browser cache (Ctrl+Shift+Delete)

---

## 🎯 QUICK REFERENCE - INLINE STYLE TEMPLATES

### Header Button Style
```jsx
style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', textDecoration: 'none', border: '2px solid white', padding: '12px 24px', borderRadius: '8px' }}
```

### Page Container Padding
```jsx
style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '40px', paddingBottom: '40px' }}
```

### Black Background Header
```jsx
style={{ backgroundColor: 'black', padding: '24px 48px' }}
```

### Remove Border
```jsx
style={{ border: 'none' }}
```

---

---

## 🎯 IDEAL WRAP-UP PROMPT FOR NEXT SESSION START

When you're ready to continue working on this project in the next session, use this prompt:

```
INICIAR PROJECTE A CLAUDE:

Please read the PROJECT_LOG.md file from the Arxiu Històric Joviat project and summarize what's been
completed so far, then continue where we left off.

Location: C:\Projecte_Repositori_Joviat\arxiu-historic-escola

Current Status:
- Frontend running: http://localhost:5173/ (Vite dev server)
- Backend running: http://localhost:3000/ (Node.js server)
- Ready for Render.com deployment
- All styling using Hanken Grotesk + inline styles

Next Task: Deploy to Render.com
```

---

## 🛑 SHUTDOWN PROCEDURE (When ending session)

When you need to wrap up and save everything:

1. **Save all changes** - All files have been edited inline
2. **Update PROJECT_LOG.md** - Add session summary
3. **Stop servers** - Kill all running npm processes:
   ```bash
   # In terminal:
   npm stop
   # Or use Ctrl+C on running terminals
   ```
4. **Commit changes (if in git)**:
   ```bash
   git add .
   git commit -m "Session [number] - [brief description]"
   ```
5. **Summary** - Everything is documented in PROJECT_LOG.md for next session

---

**For Next Session:** Use the prompt above to automatically resume work with full context.
