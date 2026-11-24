I want you to perform a forensic visual and implementation audit of the CURRENT Employee Workspace.

IMPORTANT:

Do NOT redesign anything.

Do NOT improve anything.

Do NOT reinterpret anything.

Do NOT create a new design system.

I want you to document EXACTLY what is currently being used by the Employee Workspace because I intend to use this existing Employee Workspace as the visual and interaction source of truth for the Admin Workspace.

The goal is:

EMPLOYEE WORKSPACE = SOURCE OF TRUTH FOR THE SHARED PRODUCT UI

ADMIN WORKSPACE = SAME UI SYSTEM + ADMIN-SPECIFIC DATA

The Admin Workspace must NOT introduce a separate visual language.

--------------------------------------------------
1. VISUAL DESIGN SYSTEM
--------------------------------------------------

Document exactly what is currently visible/implemented:

- Overall visual style
- Page background
- Header
- Header height
- Header spacing
- Logo treatment
- Search
- App Launcher
- Notifications
- Help
- Language selector
- Profile menu
- Buttons
- Cards
- Card radius
- Card padding
- Card borders
- Shadows
- Typography
- Font family
- Font sizes
- Font weights
- Line heights
- Text hierarchy
- Primary text
- Secondary text
- Muted text
- Icon sizing
- Icon style
- Icon containers
- Avatar treatment
- Badges
- Pills
- Tabs
- Dropdowns
- Popovers
- Modals
- Empty states
- Toasts
- Tooltips
- Dividers
- Hover states
- Active states
- Selected states
- Disabled states
- Focus states
- Loading states
- Spacing system
- Grid gaps
- Section spacing
- Card-to-card spacing

Record the ACTUAL values used in the current implementation wherever they can be determined from the code.

--------------------------------------------------
2. HEADER SYSTEM
--------------------------------------------------

Document the Employee Workspace header exactly.

Include:

- Header structure
- Header height
- Left-side elements
- Logo position
- Search placement
- App Launcher placement
- Language selector
- Notifications
- Help
- Profile
- Separators
- Header background
- Header border
- Header shadow
- Header responsive behavior
- Dropdown positioning
- Dropdown width
- Dropdown radius
- Dropdown shadow
- Dropdown spacing

The Admin Workspace must eventually use this exact header system.

--------------------------------------------------
3. APP LAUNCHER
--------------------------------------------------

Audit the CURRENT Employee Workspace App Launcher.

Document:

- Trigger
- Icon
- Size
- Position
- Animation/nudge
- Panel width
- Panel positioning
- Grid structure
- Number of columns
- Module grouping
- Module card design
- Icon containers
- Typography
- Active state
- Hover state
- Footer
- Close behavior
- Outside-click behavior
- Escape behavior
- Responsive behavior
- Plan/module filtering

Most importantly:

Document the actual component structure and styling currently responsible for the launcher.

The Admin Workspace should reuse this SAME App Launcher component.

Do not design a new Admin launcher.

--------------------------------------------------
4. GLOBAL SEARCH
--------------------------------------------------

Audit the current Employee Workspace search.

Document:

- Trigger appearance
- Trigger dimensions
- Search overlay
- Input
- Search results
- Result cards
- Employee results
- Module results
- Recent searches
- Keyboard hints
- Empty state
- Loading state
- Hover state
- Selected state
- Close behavior
- Responsive behavior

Document exact classes/styles where possible.

--------------------------------------------------
5. PROFILE / NOTIFICATIONS / HELP / LANGUAGE
--------------------------------------------------

For each existing header interaction, document the actual implementation:

PROFILE
- trigger
- panel
- identity section
- menu items
- separators
- footer
- sign out

NOTIFICATIONS
- trigger
- unread badge
- panel
- notification item
- read/unread appearance
- actions
- empty state

HELP
- trigger
- panel
- tabs
- FAQs
- articles
- accordions
- toast behavior

LANGUAGE
- trigger
- dropdown
- selected language
- flags/icons
- active state

Do not suggest improvements.

Document what CURRENTLY EXISTS.

--------------------------------------------------
6. CARD SYSTEM
--------------------------------------------------

Audit the actual Employee Workspace Card system.

Document:

- Card shell
- Card background
- Border
- Radius
- Shadow
- Padding
- Header
- Section heading
- Card action/link
- Content area
- Footer
- Empty state
- Card height behavior
- Card stretching
- Content hugging
- Overflow
- Truncation

Identify reusable patterns that should become shared components.

--------------------------------------------------
7. DASHBOARD GRID / LAYOUT ENGINE
--------------------------------------------------

Document the actual implementation of:

- 12-column desktop grid
- packLayout()
- card spans
- min/max spans
- row packing
- drag/reorder
- preview order
- save/discard
- workspace layouts
- tablet layout
- mobile layout

Explain exactly how the system determines card width and placement.

This is especially important because the Admin Workspace will use the same layout engine.

--------------------------------------------------
8. WORKSPACE MANAGEMENT
--------------------------------------------------

Document:

- workspace switcher
- workspace naming
- workspace creation
- workspace rename
- workspace deletion
- workspace reset
- edit mode
- drag handles
- save bar
- discard
- localStorage persistence
- default workspace
- locked cards

Document exactly what is implemented.

--------------------------------------------------
9. AUTHENTICATION / EMPLOYEE ENTRY
--------------------------------------------------

Document the CURRENT Employee authentication flow.

Current intended flow:

PHONE NUMBER
→ PIN
→ OTP
→ ORGANIZATION SELECTION
→ EMPLOYEE WORKSPACE

The organization selection happens AFTER successful OTP verification.

Document the existing authentication UI and explain where the new Organization Selection step should sit in the existing flow WITHOUT redesigning the authentication experience.

The organization selection must support multiple organizations.

Each organization should have:

- organization name
- organization logo
- country
- optional role/context

The selected organization's logo/name should become part of the Employee Workspace identity.

--------------------------------------------------
10. ORGANIZATION BRANDING
--------------------------------------------------

IMPORTANT BRANDING RULE:

EMPLOYEE WORKSPACE:

The workspace is organization-branded.

Examples:

MTN Nigeria
Dangote Industries
Flutterwave
GTCO
Jumia
Safaricom
Ecobank
Ethiopian Airlines
Shoprite

When an employee selects an organization, the Employee Workspace should display that organization's logo wherever the current Employee Workspace displays organization identity.

ADMIN WORKSPACE:

The Admin Workspace MUST ALWAYS use the NotchHR brand.

Do NOT substitute the Admin logo with the employee organization's logo.

Admin branding:

NOTCHHR

Therefore:

Employee:
Organization Logo + Employee Workspace

Admin:
NotchHR Logo + Admin Workspace

This distinction must be treated as a core architectural rule.

--------------------------------------------------
11. SHARED COMPONENT SYSTEM
--------------------------------------------------

Create a clear inventory of every component that should be considered SHARED between Employee and Admin.

For example:

- App Header
- Logo
- Global Search
- App Launcher
- Notifications
- Help
- Language Selector
- Profile Menu
- Dropdown
- Popover
- Card
- Card Header
- Section Header
- Button
- Icon Button
- Avatar
- Badge
- Tabs
- Empty State
- Toast
- Workspace Switcher
- Workspace Grid
- Workspace Edit Mode
- Drag/Reorder behavior
- Responsive frame
- Typography
- Spacing
- Color tokens

For each component state:

CURRENT COMPONENT NAME
CURRENT IMPLEMENTATION
CURRENT STYLING
CURRENT BEHAVIOR
SHOULD BE SHARED WITH ADMIN? YES/NO
REASON

--------------------------------------------------
12. DATA VS PRESENTATION SEPARATION
--------------------------------------------------

This is extremely important.

Identify which parts of the Employee Workspace are:

A. PRESENTATION / UI
B. COMPONENT BEHAVIOR
C. LAYOUT ENGINE
D. DATA
E. ORGANIZATION BRANDING
F. EMPLOYEE-SPECIFIC LOGIC
G. PLAN/MODULE LOGIC

The eventual architecture should allow:

SAME COMPONENT
+
DIFFERENT DATA
+
DIFFERENT ROLE
+
DIFFERENT BRANDING CONTEXT

For example:

<EmployeeHeader
    branding={organization}
    role="employee"
/>

<AdminHeader
    branding={notchhr}
    role="admin"
/>

But both should use the SAME underlying visual/header system.

--------------------------------------------------
13. ADMIN WORKSPACE APPLICATION
--------------------------------------------------

Based ONLY on the current Employee Workspace implementation, document how the Admin Workspace should inherit:

- Header
- App Launcher
- Search
- Notifications
- Help
- Profile
- Dropdowns
- Cards
- Typography
- Spacing
- Colors
- Borders
- Shadows
- Buttons
- Grid
- Responsive behavior
- Workspace management
- Edit mode
- Drag/reorder behavior

The Admin Workspace should change:

DATA
FUNCTIONAL MODULES
ADMIN ACTIONS
ADMIN PERMISSIONS
ADMIN METRICS
ADMIN-SPECIFIC CARDS

It should NOT change:

VISUAL LANGUAGE
HEADER LANGUAGE
APP LAUNCHER LANGUAGE
SEARCH LANGUAGE
CARD LANGUAGE
SPACING LANGUAGE
TYPOGRAPHY
INTERACTION PATTERNS

--------------------------------------------------
14. FINAL OUTPUT
--------------------------------------------------

Produce a document titled:

"EMPLOYEE WORKSPACE — CURRENT DESIGN SYSTEM & COMPONENT SOURCE OF TRUTH"

This is NOT a redesign document.

This is NOT a proposal.

This is NOT a recommendation document.

It is a forensic record of what the Employee Workspace CURRENTLY IS.

Where possible, include:

- Exact component names
- Exact Tailwind classes
- Exact CSS values
- Exact dimensions
- Exact spacing
- Exact colors
- Exact typography
- Exact state behavior
- Exact layout rules
- Exact component relationships

If something does not exist, explicitly say:

NOT IMPLEMENTED

If something is hardcoded, explicitly say:

HARDCODED

If something is only visual/mock behavior, explicitly say:

MOCKED

If something is functional, explicitly say:

FUNCTIONAL

Do not silently infer missing implementation.

The purpose of this document is to allow another Make session to reproduce the Employee Workspace visual system accurately and apply it to the Admin Workspace.

DO NOT CHANGE THE EXISTING EMPLOYEE WORKSPACE WHILE PERFORMING THIS AUDIT.