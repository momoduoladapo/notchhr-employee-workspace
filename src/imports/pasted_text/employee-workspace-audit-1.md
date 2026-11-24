AUDIT THE EMPLOYEE WORKSPACE — CURRENT IMPLEMENTATION / UNDER-THE-HOOD AUDIT

I do NOT want a visual design audit.

I do NOT want recommendations.

I do NOT want an idealised design system.

I want a technical audit of what is ACTUALLY IMPLEMENTED AND WORKING UNDER THE HOOD in the current Employee Workspace.

The goal is for me to understand the actual architecture, components, state, layout logic, data logic, interactions and functionality that currently power the Employee Workspace.

DO NOT tell me what the system SHOULD do.

Tell me what the CURRENT IMPLEMENTATION ACTUALLY DOES.

If something was requested but is not actually implemented, explicitly identify it as:

NOT IMPLEMENTED

If something exists visually but is only static/mock data, identify it as:

STATIC / MOCKED

If something is functional, identify it as:

FUNCTIONAL

If something is partially functional, identify it as:

PARTIALLY IMPLEMENTED

==================================================
01. APPLICATION ARCHITECTURE
==================================================

Document the current application architecture.

Tell me:

- Framework
- Build system
- Main application structure
- Routing
- Page structure
- Component architecture
- Layout architecture
- Styling architecture
- State management
- Data management
- Utility/helper structure
- Any third-party libraries
- Any UI/component libraries
- Any drag/drop libraries
- Any grid/layout libraries
- Any animation libraries
- Any chart libraries
- Any icon libraries

Identify the actual libraries/packages being used.

Do not recommend alternatives.

==================================================
02. FILE / COMPONENT STRUCTURE
==================================================

Give me the actual relevant file/component structure for the Employee Workspace.

For each major component identify:

- File/component name
- Purpose
- Parent component
- Child components
- Props
- State
- Dependencies
- Reusable or page-specific
- Whether it is actually used

If possible, provide the relevant component hierarchy.

Example:

EmployeeWorkspace
├── WorkspaceHeader
│   ├── AppLauncher
│   ├── Search
│   ├── Notifications
│   └── ProfileMenu
├── WorkspaceGrid
│   ├── PayrollCard
│   ├── EmployeeDirectoryCard
│   └── ...
└── ...

Use the ACTUAL structure.

==================================================
03. DATA ARCHITECTURE
==================================================

Document how Employee Workspace data currently works.

For each major data set:

- Where does it come from?
- API?
- Local state?
- JSON?
- Mock data?
- Hardcoded?
- Props?
- Context?
- Local storage?
- Database?

Identify:

- Employee data
- Attendance
- Payroll
- Leave
- Performance
- Directory
- Announcements
- Birthdays
- Team members
- Approvals
- Notifications
- Any other workspace data

Document actual data structures where possible.

==================================================
04. STATE MANAGEMENT
==================================================

Document all state that currently controls the Employee Workspace.

Especially:

- Current workspace
- Current user
- Plan
- Cards
- Card positions
- Card dimensions
- Edit mode
- Drag state
- Resize state
- App launcher state
- Dropdown state
- Modal state
- Filters
- Tabs
- Search
- Notifications
- Authentication/session state

Explain:

WHERE the state lives
HOW it changes
WHAT components consume it
WHETHER it persists

==================================================
05. SMART GRID / CARD LAYOUT ENGINE
==================================================

THIS IS THE MOST IMPORTANT PART.

I want the ACTUAL implementation logic behind the Employee Workspace layout.

Explain exactly:

- Is it CSS Grid?
- Flexbox?
- Absolute positioning?
- Masonry?
- A third-party grid library?
- Custom layout engine?
- Combination?

Tell me the actual mechanism.

Then document:

### Wrapper

- Width
- Max width
- Padding
- Columns
- Rows
- Gap

### Cards

- Width calculation
- Height calculation
- Minimum width
- Maximum width
- Minimum height
- Maximum height
- Column span
- Row span
- Auto placement
- Content-driven sizing

### Dragging

Explain exactly what happens when a user:

1. Picks up a card.
2. Moves it.
3. Moves it over another card.
4. Drops it.
5. Leaves empty space.
6. Creates a collision.

### Resizing

Explain exactly:

- How width changes
- How height changes
- Minimum width
- Maximum width
- What determines those limits
- Whether resizing is freeform or grid-based
- Whether other cards move
- Whether content affects resizing

### Reflow

Explain exactly how the system decides:

- Which card goes beside another
- Which card moves to another row
- When a card expands
- When a card contracts
- How unused space is handled
- How cards pack into available space

### Content hugging

Tell me exactly how the implementation prevents content from shrinking.

For example:

- min-width
- flex-shrink
- min-content
- max-content
- fit-content
- CSS Grid minmax()
- intrinsic sizing
- explicit width calculations
- JavaScript measurement

If none of these are implemented, say so.

DO NOT give me a recommended solution.

I want the current implementation.

==================================================
06. CARD WIDTH CALCULATION
==================================================

For the actual Employee Workspace cards, document how width is determined.

For example:

- Fixed pixel width?
- Percentage?
- Grid fraction?
- CSS minmax?
- Content width?
- Parent width?
- Explicit configuration?
- JavaScript calculation?

Explain the actual calculation.

If different cards use different methods, document each method.

==================================================
07. CONTENT / AUTO-LAYOUT BEHAVIOUR
==================================================

Explain how content behaves inside cards.

Document the actual implementation of:

- flex
- grid
- inline-flex
- flex-wrap
- flex-shrink
- min-width
- max-width
- overflow
- text-overflow
- white-space
- word-break
- wrapping

Especially identify where content currently shrinks or wraps.

==================================================
08. PLAN-BASED LOGIC
==================================================

Document how Basic, Standard and Premium plans currently affect the Employee Workspace.

Identify:

- Which cards exist in each plan
- How cards are configured
- Whether plan configuration is data-driven
- Whether components are conditionally rendered
- Whether dimensions differ by plan
- Whether layout differs by plan
- Whether plan restrictions are hardcoded
- Whether permissions are involved

Show the actual configuration structure if possible.

==================================================
09. INTERACTIONS
==================================================

Audit what is actually functional.

For each interaction:

- Interaction
- Trigger
- State change
- Component responsible
- Data change
- Persistence
- Status

Include:

- Drag
- Drop
- Resize
- App launcher
- Search
- Tabs
- Filters
- Buttons
- Dropdowns
- Modals
- Notifications
- Chat
- Navigation
- Workspace editing
- Save/reset

==================================================
10. PERSISTENCE
==================================================

Tell me exactly what persists.

For example:

- Browser state
- LocalStorage
- SessionStorage
- URL
- Backend
- Database
- React state only

Especially determine whether:

- Card positions persist
- Card widths persist
- Card order persists
- User preferences persist
- Plan changes persist

==================================================
11. RESPONSIVE IMPLEMENTATION
==================================================

Document the actual responsive implementation.

Include:

- Breakpoints
- Media queries
- Container queries if any
- Grid changes
- Card changes
- Header changes
- Navigation changes
- Mobile behaviour
- Tablet behaviour

Again, current implementation only.

==================================================
12. API / BACKEND INTEGRATION
==================================================

Document actual integrations.

For every data source:

- Endpoint/service
- Request
- Response
- Authentication
- Loading state
- Error handling
- Mock fallback

If there is no backend integration, say:

NOT CURRENTLY CONNECTED TO BACKEND

==================================================
13. MOCK / STATIC / DYNAMIC CONTENT
==================================================

Create a table:

| Feature | Current Implementation | Status |
|---|---|---|
| Payroll | ... | Functional/Mocked/etc |
| Attendance | ... | ... |
| Directory | ... | ... |
| Leave | ... | ... |

This is important because I need to know what is genuinely functional.

==================================================
14. AUTHENTICATION / USER CONTEXT
==================================================

Document how the Employee Workspace currently knows:

- Who the user is
- Their organisation
- Their plan
- Their role
- Their permissions

Identify whether these are:

- Hardcoded
- Mocked
- Context/state
- API
- Auth provider

==================================================
15. PERFORMANCE / RENDERING
==================================================

Where possible, explain:

- How cards render
- Whether cards re-render when another card moves
- Memoization
- Virtualisation
- Lazy loading
- Image loading
- Data loading
- Any performance optimisations

Only document what actually exists.

==================================================
16. CURRENT LIMITATIONS / TECHNICAL DEBT
==================================================

List things that currently:

- Don't work
- Partially work
- Are hardcoded
- Are mocked
- Are duplicated
- Are fragile
- Depend on hacks
- Depend on fixed dimensions
- May cause layout problems

DO NOT FIX THEM.

I need to know they exist.

==================================================
17. ACTUAL IMPLEMENTATION RULES
==================================================

At the end, extract the rules that the CURRENT CODE actually follows.

Not the rules that were requested.

For example:

"Cards currently use a 12-column CSS Grid with 16px gap."

or:

"Card width is currently controlled by explicit span values."

or:

"Card content can shrink because flex-shrink is not disabled."

Only include rules confirmed by the implementation.

==================================================
18. EMPLOYEE WORKSPACE TECHNICAL SOURCE OF TRUTH
==================================================

End with a concise technical summary:

CURRENT FRAMEWORK
CURRENT LAYOUT ENGINE
CURRENT CARD ENGINE
CURRENT STATE MANAGEMENT
CURRENT DATA MODEL
CURRENT PLAN LOGIC
CURRENT RESPONSIVE SYSTEM
CURRENT PERSISTENCE
CURRENT FUNCTIONAL FEATURES
CURRENT MOCKED FEATURES
CURRENT LIMITATIONS

==================================================
CRITICAL INSTRUCTION
==================================================

DO NOT turn this into a design recommendation.

DO NOT tell me how to improve it.

DO NOT tell me what would be better.

DO NOT rewrite the architecture.

DO NOT fix inconsistencies.

DO NOT assume requested functionality exists.

Inspect the CURRENT implementation and tell me exactly what is working underneath it.

If you cannot verify something from the current implementation, say:

NOT VERIFIED

rather than guessing.

Produce the result as a complete Markdown technical audit.

If it is too long, divide it into:

CHUNK 01
CHUNK 02
CHUNK 03
...

Do not omit technical details simply to make the response shorter.