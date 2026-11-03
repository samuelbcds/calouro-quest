---
name: Instituto de Computacao UFRJ Calouros
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#42474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727781'
  outline-variant: '#c2c7d1'
  surface-tint: '#286198'
  primary: '#00335b'
  on-primary: '#ffffff'
  primary-container: '#004a80'
  on-primary-container: '#88baf7'
  inverse-primary: '#9fcaff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#482b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#673f00'
  on-tertiary-container: '#fca416'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#9fcaff'
  on-primary-fixed: '#001d37'
  on-primary-fixed-variant: '#00497e'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 1rem
  margin: 1.875rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

### Brand Personality & Philosophy
This design system translates the academic rigor, public heritage, and intellectual caliber of the Universidade Federal do Rio de Janeiro (UFRJ) into an empathetic, welcoming digital onboarding experience for incoming Computer Science (BCC) undergraduates at the Instituto de Computação (IC/UFRJ).

The emotional baseline resolves the friction between institutional solemnity and the anxiety felt by freshmen navigating the Ilha do Fundão campus. The interface is dependable, sharp, grounded, and unmistakably Carioca: clear skies over Baía de Guanabara, functional precision, and human warmth. 

### Visual Design Style: Collegiate Precision meets Energetic Gamification
The visual system fuses **Modern Institutional Clarity** with lightweight **Playful Milestone Gamification**. 
- Deep maritime institutional blues ground navigation and academic governance.
- Slate neutral backdrops eliminate eye fatigue during extended study sessions.
- Vibrant sunlit accents (warm amber gold and carioca sky blue) celebrate micro-achievements, helping freshmen navigate unfamiliar academic terrains—from matriculation and Linux terminals to finding labs in CCMN Bloco E.

## Colors

### Palette System & Functional Roles
- **Primary (`#004a80`)**: Institutional IC Blue. Establishes primary visual anchor, core action buttons, section banners, and major academic categorizations.
- **Secondary (`#0284c7`)**: Carioca Sky Blue. Applied to interactive focus rings, inline links, active sub-navigation, and digital utility states.
- **Tertiary (`#f59e0b`)**: Fundão Achievement Gold. Reserved for gamification milestones, earned student badges, pending deadlines, and celebratory visual tokens.
- **Neutral (`#f8fafc`)**: Base Slate Canvas. A high-clarity, cool-tinted off-white background that prevents terminal glare and sharpens white elevation cards.

### Extended Semantic Tokens
- **Midnight Authority (`#002b49`)**: High-contrast navbar ground, master footers, and primary headline text.
- **Academic Crimson (`#960d07`)**: CCMN atrium accent, historical notices, and high-priority institutional advisories.
- **Emerald Verification (`#10b981`)**: Registration confirmations, passing grades, and prerequisite completions.
- **Card Surface (`#ffffff`)**: Pure white containers resting on the slate canvas.
- **Text Primary (`#0f172a`)**: Deep graphite text delivering WCAG AAA contrast ratio.
- **Text Secondary (`#475569`)**: Supporting metadata, course codes (e.g., `MAB241`), and room locations.
- **Structural Border (`#e2e8f0`)**: Subtle separation lines preserving lightness and structure.

## Typography

### Structural Pairings
The typographic structure pairs the geometric authority and architectural rhythm of **Montserrat** with the systematic clarity of **Inter** and the terminal precision of **JetBrains Mono**.

### Hierarchy & Editorial Rules
- **Display & Section Titles (Montserrat)**: Display styles feature slight negative tracking (`-0.02em`) to command presence without sprawling. H2 headlines always maintain proportional top margin separation (28px minimum) to bind contextually to subsequent modules.
- **Continuous Reading (Inter)**: Body text maintains an optimal 1.6 line-height ratio (`26px` on `16px` base) to ensure effortless scanning of course syllabi, curriculum manuals, and lab instructions.
- **Labels & Tags (Montserrat Upper)**: Status badges, discipline requirements (`OBRIGATÓRIA`, `ELETIVA`), and interactive tags enforce uppercase transformations with `0.06em` expanded letter spacing.
- **Code & Command Lines (JetBrains Mono)**: Shell directives, compilation flags (`gcc -Wall`), and campus network parameters rely on fixed-width glyphs with balanced line-heights.

## Layout & Spacing

### Layout Philosophy & Content Limits
The spatial framework balances comprehensive academic dashboards with focused reading comfort:
- **Narrative Content Constrained Width**: All procedural documentation, freshmen guidance articles, and study paths maintain a strict maximum width of `800px` (`margin: 0 auto`), keeping line length between 65 to 75 characters.
- **Operational Grid System**: Application cockpits, schedule matrices, and faculty lists use an adaptive 12-column system expanding up to `1200px`.
- **Vertical Spacing Rhythm**: Built on an incremental 4px/8px modular scale. Component internal paddings scale from `space-sm` (8px) to `space-xl` (32px).

### Breakpoints & Responsive Adaptation
- **Desktop (>= 1200px)**: 12-column grid, 800px central prose wrapper, `margin: 1.875rem` (30px), `gutter: 1.25rem` (20px). Two-column faculty/monitor grids (`1fr 1fr`).
- **Tablet (768px - 1199px)**: Columns collapse fluidly. Section navigation converts to horizontal swipable trays. Sidebars stack below primary cards.
- **Mobile (< 768px)**: Canvas margins drop to `1rem` (16px). All multi-column cards collapse to single-column streams (`1fr`). Top-level navigation collapses into an accessible, thumb-friendly sheet suitable for daily transit on the campus bus lines.

## Elevation & Depth

Visual hierarchy leverages crisp surface-container contrast, subtle architectural borders, and warm atmospheric glows for gamified milestones:

### Layering Architecture
- **Layer 0 (Canvas Base)**: Cool Slate `#f8fafc`. Receded resting environment.
- **Layer 1 (Card & Module Surfaces)**: Pure `#ffffff` framed with a hairline outline `1px solid #e2e8f0`. Zero heavy drop shadow in default resting state.
- **Layer 2 (Elevated & Hover States)**: `box-shadow: 0 6px 18px -2px rgba(0, 43, 73, 0.08)`. Elements lift `-2px` along the Y-axis to signal affordance.
- **Layer 3 (Modals, Overlays & Sticky Navbars)**: Deep Midnight `#002b49` backdrop or `#ffffff` floating popovers with `box-shadow: 0 16px 32px -4px rgba(15, 23, 42, 0.14)`.
- **Achievement & Gamification Glow**: Golden milestone cards and newly awarded badges break standard elevation rules with a warm tinted glow: `box-shadow: 0 4px 16px rgba(245, 158, 11, 0.25)`.

## Shapes

### Geometry & Radius Rules
This system implements roundedness level `2` (medium-soft curvature), producing a approachable collegiate aesthetic that avoids corporate rigidity:
- **Default Elements (`8px` to `10px`)**: Interactive buttons, input fields, dropdown menus, and standard card containers employ a consistent `10px` curvature matching the historical web identity of the institute.
- **Structural Groups (`14px` to `16px`)**: Hero message cards, subject clusters, and modal containers.
- **Pill Elements (`9999px`)**: Reserved exclusively for status chips, course code markers (`MAB101`), semester counters, and Fundão milestone badges.

## Components

### Buttons
- **Primary Academic Button**: Solid Institutional Blue (`#004a80`), text in pure white (`#ffffff`), typography `Montserrat 15px Bold`. Padding `10px 22px`, radius `10px`. Hover deepens to `#002b49` with 150ms ease.
- **Gamified Milestone Action**: Solid Gold (`#f59e0b`), text in dark slate (`#0f172a`), typography `Montserrat 15px Bold`. Accompanied by a warm ambient shadow.
- **Secondary Outline Button**: Background transparent, border `1.5px solid #004a80`, text `#004a80`. Hover state triggers soft blue tint `#e0f2fe`.

### Chips & Gamification Badges
- **Status Chips**: Pill shape (`rounded-full`), height `24px`, padding `0 10px`, typography `Montserrat 11px Bold Uppercase`. Colors map semantically: Mandatory (`#e0f2fe` bg / `#004a80` text), Optional (`#f1f5f9` bg / `#475569` text).
- **Fundão Freshman Badges**: Circular or pill badge containers with `2px` colored borders and matching light pastels:
  - *Pé no CCMN*: `#e0f2fe` ground, `#0284c7` border, `#002b49` text.
  - *Sobrevivente do Bandejão*: `#fef3c7` ground, `#f59e0b` border, `#b45309` text.
  - *Compilou Sem Warning*: `#d1fae5` ground, `#10b981` border, `#065f46` text.
  - *Expresso Fundão*: `#f1f5f9` ground, `#64748b` border, `#0f172a` text.

### Cards
- **Discipline & Academic Card**: White surface `#ffffff`, `10px` radius, `1px solid #e2e8f0`. Padding `20px`. Header features course name in `Montserrat 18px Semi Bold`, sub-row with semester tag and room allocation (e.g., *CCMN Bloco E - Sala E-204*). Hover effect provides subtle `-2px` lift and blue shadow.
- **Faculty / Mentorship Card**: Two-column layout in desktop grids. Incorporates professor/TA name, department role, office hours, and an anti-spam copyable email button.

### Form Inputs & Controls
- **Input Fields**: Minimum 44px hit-target height, slate background `#ffffff`, border `1px solid #919294`, radius `10px`, padding `8px 14px`. Focus activates an intentional Carioca Sky ring (`2px solid #38bdf8`) with zero default browser outlines.
- **Checkboxes & Radios**: `18px x 18px`, `4px` radius for checkboxes, full circle for radios. Active checkmark features solid `#004a80` fill with white glyph check.

### Additional Specialized Components
- **Masshead Campus Banner**: 120px header panel displaying a panorama of the Fundão campus or Ponte do Saber, with high-contrast text overlay welcoming freshmen to the department.
- **Curriculum Step Tracker**: Horizontal timeline tracking progress through the 1st semester foundation subjects (Cálculo I, Álgebra Linear, Computação Concorrente, IC), featuring interconnected emerald and gold nodes.