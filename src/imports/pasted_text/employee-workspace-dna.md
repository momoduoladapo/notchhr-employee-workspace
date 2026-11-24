# TASK — GENERATE EMPLOYEE WORKSPACE VISUAL DNA REFERENCE

You are working inside the existing NotchHR project.

IMPORTANT:
DO NOT modify, redesign, refactor, rename, delete, or otherwise alter the Employee Workspace.

Your task is ONLY to study the existing Employee Workspace and generate a documentation file that captures its complete visual language, spacing system, component patterns, interaction patterns, layout behaviour, and responsive behaviour.

The purpose of this document is to allow us to reproduce the SAME LOOK, FEEL, QUALITY, SPACING, COMPONENT STRUCTURE, AND INTERACTION BEHAVIOUR in the existing Admin Workspace later.

The Employee Workspace is the SOURCE OF TRUTH for visual design.

The existing Admin Workspace will remain the SOURCE OF TRUTH for Admin data and Admin-specific functionality.

We will use the resulting document later when adapting the Admin Workspace.

---

# SOURCE OF TRUTH HIERARCHY

Use these sources in this order:

1. EXISTING EMPLOYEE WORKSPACE
   → visual design, spacing, hierarchy, component appearance, interaction behaviour, responsive behaviour.

2. EXISTING EMPLOYEE WORKSPACE CODE
   → implementation details, component structure, states, transitions, dimensions and behaviour.

3. EXISTING ADMIN WORKSPACE
   → NOT to be copied visually unless already consistent with Employee Workspace.
   → Admin data and Admin functionality must remain untouched during the later adaptation.

Do not invent design rules that are not observable in the Employee Workspace.

Do not replace the Employee Workspace design with generic SaaS design conventions.

---

# WHAT TO STUDY

Study the Employee Workspace comprehensively.

Inspect both the editable Figma design and the existing implementation where available.

Document the actual design rather than describing what you think a modern SaaS application should look like.

Capture the following.

---

## 1. OVERALL VISUAL LANGUAGE

Document:

- Overall visual character
- Visual density
- Whitespace philosophy
- Alignment philosophy
- Content hierarchy
- Relationship between cards
- Relationship between sections
- Page rhythm
- Visual weight
- Use of borders
- Use of shadows
- Use of colour
- Use of rounded corners
- Use of background surfaces
- How primary actions are emphasized
- How secondary information is visually reduced
- How the interface maintains a clean and premium appearance

Describe what makes the Employee Workspace look and feel the way it does.

---

# 2. DESIGN TOKENS

Extract and document the actual values wherever they can be determined.

## Colours

Document:

- Primary purple
- Purple tints
- Purple borders
- Purple active states
- Magenta
- Magenta tints
- Tertiary text colours
- Background colours
- Border colours
- Success colours
- Warning colours
- Error colours
- Info colours
- Any other recurring colours

For every colour include:

- HEX/RGB if available
- Where it is used
- Whether it is primary, secondary, background, border, text, status, etc.

Do NOT introduce new colours.

---

## Typography

Document:

- Font family
- Font weights
- Heading sizes
- Section heading sizes
- Card title sizes
- Body sizes
- Label sizes
- Metadata sizes
- Button text sizes
- Notification text sizes
- Helper text sizes
- Letter spacing
- Line heights
- Text hierarchy

Capture actual values where available.

---

## Spacing

Document the recurring spacing scale.

Include:

- Page padding
- Header padding
- Card padding
- Grid gaps
- Section gaps
- Component gaps
- Icon/text gaps
- Button padding
- Panel padding
- Modal padding
- Vertical rhythm
- Mobile spacing
- Tablet spacing

Identify recurring spacing values rather than simply saying "generous spacing".

---

## Radius

Document:

- Card radius
- Button radius
- Input radius
- Avatar radius
- Panel radius
- Modal radius
- Badge radius
- Icon-container radius

---

## Shadows

Document every recurring shadow style.

Include:

- Card shadow
- Dropdown shadow
- Notification panel shadow
- Help panel shadow
- Profile panel shadow
- Modal shadow
- Drag handle shadow
- Any other recurring shadow

---

# 3. HEADER SYSTEM

Document the Employee Workspace header in complete detail.

Include:

- Header height
- Horizontal padding
- Logo dimensions
- Logo positioning
- Workspace label
- Secondary branding
- App Launcher
- Global Search
- Notifications
- Language selector
- Help
- Profile
- Spacing between controls
- Alignment
- Hover states
- Active states
- Focus states
- Open states
- Close behaviour
- Panel positioning
- Responsive behaviour

The Admin Workspace should later be able to use this exact header architecture with Admin-specific data.

---

# 4. APP LAUNCHER

Study the Employee App Launcher carefully.

Document:

- Trigger size
- Icon size
- Trigger shape
- Trigger background
- Hover state
- Active state
- Panel dimensions
- Panel radius
- Panel shadow
- Panel header
- Header typography
- Module grid
- Number of columns
- Module icon containers
- Icon sizes
- Labels
- Badges
- Spacing
- Hover behaviour
- Selected/active behaviour
- Scroll behaviour
- Responsive behaviour
- Animation/opening behaviour

IMPORTANT:

Document the actual visual arrangement of the module icons.

The future Admin App Launcher should use the SAME visual arrangement and interaction model but use ADMIN MODULE DATA.

---

# 5. NOTIFICATION SYSTEM

Document both:

- Notification trigger
- Notification panel

Capture:

- Trigger dimensions
- Icon dimensions
- Badge
- Badge positioning
- Badge colour
- Panel width
- Panel maximum height
- Header
- Unread count
- Mark-all-as-read
- Notification grouping
- Row spacing
- Icon containers
- Typography
- Unread treatment
- Hover state
- Timestamp
- Footer
- Links
- Scrolling
- Open/close behaviour
- Responsive behaviour

Clearly distinguish:

VISUAL/BEHAVIOUR PATTERN

from

EMPLOYEE NOTIFICATION DATA.

The future Admin Workspace must reuse the pattern but retain Admin notification data.

---

# 6. HELP & SUPPORT

Document the Employee Help & Support interface.

Capture:

- Trigger
- Panel size
- Header
- Header background
- Icon treatment
- Title
- Subtitle
- Close button
- Tabs
- Active tab
- Inactive tab
- Guides
- FAQ
- Contact Us
- Cards
- Accordions
- Buttons
- Hover states
- Open states
- Scroll behaviour
- Toast behaviour
- Responsive behaviour

Again:

The future Admin Workspace should replicate the same structure and behaviour while using existing Admin help/support data.

---

# 7. LANGUAGE SELECTOR

Document:

- Trigger dimensions
- Flag treatment
- Language code
- Border
- Background
- Active state
- Panel width
- Header
- Language rows
- Native language text
- Check indicator
- Hover state
- Selection behaviour
- Closing behaviour
- Responsive behaviour

---

# 8. PROFILE MENU

Document the Employee Profile menu in detail.

Capture:

- Trigger
- Avatar dimensions
- Avatar border
- Chevron
- Focus ring
- Open state
- Panel width
- Panel radius
- Panel shadow
- Header
- Avatar in panel
- Name
- Role
- Department/ID
- Online status
- Menu groups
- Menu item spacing
- Icons
- Icon containers
- Dividers
- Danger item
- Scroll behaviour
- Close behaviour
- Responsive behaviour

IMPORTANT:

Document the STRUCTURE and VISUAL SYSTEM.

Do not treat Employee-specific profile information as part of the reusable design.

---

# 9. CARD SYSTEM

Document the Employee Card component.

Include:

- Background
- Radius
- Padding
- Border
- Shadow
- Height behaviour
- Internal spacing
- Header structure
- Section header
- Optional links
- Card actions
- Empty states
- Tables
- Lists
- Charts
- Badges
- Footer patterns

Document exactly how cards align with one another.

Explain how cards behave inside the grid.

---

# 10. DASHBOARD GRID

Document the entire Employee Workspace layout engine.

Capture:

- Desktop column count
- Tablet column count
- Mobile column count
- Grid gap
- Card spans
- Minimum spans
- Maximum spans
- Row behaviour
- Card equal-height behaviour
- Responsive behaviour
- Packing behaviour
- Reordering behaviour
- Drag-and-drop behaviour
- Mobile reorder behaviour

If there is an algorithm such as `packLayout()`, document its actual behaviour accurately.

Do not invent a replacement algorithm.

---

# 11. WORKSPACE MANAGEMENT

Document the Employee Workspace management system.

Capture:

- Workspace switcher
- Active workspace
- Workspace panel
- Workspace list
- Default workspace
- Custom workspace
- Rename
- Delete
- Module selection
- Locked modules
- Customize Layout
- Edit mode
- Drag handles
- Remove controls
- Mobile controls
- Save
- Discard
- Reset
- Confirmation states
- Naming panel
- Dirty state
- Persistence behaviour
- localStorage behaviour
- Responsive behaviour

IMPORTANT:

This document must distinguish:

REUSABLE WORKSPACE MANAGEMENT MECHANICS

from

EMPLOYEE-SPECIFIC WORKSPACE DATA.

---

# 12. EDIT MODE

Document the exact Employee edit mode experience.

Include:

- Header changes
- Unsaved indicator
- Save button
- Cancel
- Reset
- Drag handles
- Remove buttons
- Mobile controls
- Drag-over state
- Live preview
- Drop behaviour
- Locked card behaviour
- Confirmation strips
- Save naming panel
- Disabled states
- Hover states

---

# 13. AUTHENTICATION SCREENS

Study and document the Employee authentication experience.

Include:

- Overall layout
- Desktop split pane
- Mobile layout
- Left pane
- Right pane
- Logo
- Clock
- Weather
- Walkthrough
- Typography
- Phone input
- PIN input
- OTP input
- Organisation selection
- Buttons
- Errors
- Loading state
- Forgot PIN flow
- Success state
- Animations
- Transitions
- Responsive behaviour

IMPORTANT:

Document the VISUAL SYSTEM and interaction structure.

Do not turn Employee-specific credentials, names, organisations, or data into reusable Admin data.

The future Admin Workspace must preserve the existing authentication functionality/data while adopting the same visual language.

---

# 14. ORGANISATION SELECTOR

Document the visual and interaction pattern of organisation selection.

Include:

- Grid
- Card dimensions
- Logo container
- Selected state
- Unselected state
- Border
- Background
- Typography
- Selection indicator
- Continue button
- Disabled state
- Hover state
- Responsive behaviour

---

# 15. RESPONSIVE DESIGN

Document exactly how the Employee Workspace changes between:

- Desktop
- Tablet
- Mobile

Include:

- Header
- Navigation
- Cards
- Grid
- Panels
- Dropdowns
- Tables
- Workspace editing
- Drag/reorder controls
- Authentication
- Typography
- Padding
- Visibility
- Stacking

Do not invent breakpoints if actual breakpoints can be determined from the implementation.

---

# 16. INTERACTION DESIGN

Document the interaction language.

Capture:

- Hover
- Focus
- Active
- Selected
- Disabled
- Open
- Closed
- Dragging
- Drag-over
- Loading
- Error
- Success
- Confirmation
- Toasts
- Transitions
- Animations
- Duration/easing where available

The goal is to reproduce the FEEL of the Employee Workspace, not merely its static appearance.

---

# 17. COMPONENT INVENTORY

Create a complete inventory of reusable Employee Workspace components.

For each component document:

- Component name
- Purpose
- Visual structure
- Dimensions
- Spacing
- States
- Behaviour
- Responsive behaviour
- Whether it is reusable by Admin
- Which parts are Employee-specific

Example:

```text
NotificationPanel
├── Visual structure
├── Dimensions
├── Typography
├── States
├── Interaction
├── Responsive behaviour
└── Employee-specific data