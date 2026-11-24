# Improve Workspace Management Width and Reduce Visual Crowding

Keep the current unified Workspace and Module Management feature exactly as it is.

Do not redesign:

- Employee Workspace
- Header
- Greeting section
- Existing workspace cards
- Card styling
- Card content
- Workspace functionality
- Module visibility behaviour
- Identity Card protection
- Save Workspace
- Cancel
- Reset to Default
- Workspace selector
- Existing responsive behaviour

Only improve the size, placement and usability of the Workspace Management interface.

---

## Core UX Requirement

The Employee Workspace already contains many cards and information.

The Workspace Management interface should not feel cramped, crowded or compressed inside the workspace.

Make the Workspace Management interface significantly wider and more spacious.

Prioritise:

- Easy scanning
- Clear grouping
- Comfortable interaction
- Reduced visual density
- Better separation from the busy workspace behind it

Do not make the module list taller than necessary.

---

## Desktop Layout — 1440px

On desktop, display Workspace Management as a wide floating panel or centered modal.

Do not constrain it to the narrow width of the workspace selector.

The panel should be wide enough to comfortably display:

- Workspace selection
- Workspace actions
- Workspace Modules
- Multiple module columns
- Save and reset actions

Use a generous desktop width while maintaining comfortable margins from the viewport edges.

The interface should feel like a focused workspace-customization panel rather than a small dropdown.

Do not make it full-screen.

Do not make it so narrow that module names feel compressed.

---

## Workspace Modules Layout

Display the Workspace Modules section in a spacious multi-column layout.

Use:

- Three equal-width columns on desktop where the available module count supports it.
- A maximum of eight module items per column.
- Consistent column gaps.
- Comfortable internal padding.
- Clear alignment.

Do not stretch the module rows unnecessarily.

Do not use large cards for individual modules.

Each module should remain a compact, easy-to-scan row:

**Checkbox → Module icon → Module name**

Keep all module names fully readable.

Avoid truncating module names where possible.

---

## Clear Visual Hierarchy

Organise the panel into clear sections:

1. **Workspace**
   - Active workspace selector
   - Create workspace
   - Rename or delete controls where permitted

2. **Workspace Modules**
   - Clean multi-column module visibility list
   - Identity Card shown as selected and locked
   - Optional modules shown with active checkboxes

3. **Workspace Actions**
   - Save Workspace
   - Cancel
   - Reset to Default

Use clear section spacing.

Do not place all controls in one crowded area.

Do not add unnecessary borders around every element.

Use whitespace to separate sections.

---

## Reduce Background Distraction

When Workspace Management is open:

- Add a subtle backdrop behind the panel.
- Reduce visual competition from the busy workspace.
- Keep the workspace recognisable in the background.
- Do not blur the background excessively.
- Do not make the background completely disappear.

The Workspace Management panel should become the clear focus.

The user should not need to visually compete with the dashboard cards while managing modules.

---

## Module Interaction

Keep the existing immediate behaviour.

When a module is checked:

- Display it immediately in the workspace.
- Reflow the workspace immediately.

When a module is unchecked:

- Hide it immediately from the workspace.
- Reflow the workspace immediately.

Do not add a separate Add Module button.

Do not require a confirmation for each module selection.

---

## Identity Card

Keep the existing Identity Card rule.

The Identity Card must:

- Always remain selected.
- Use a disabled checkbox.
- Display a subtle lock indicator.
- Remain visible in every workspace.
- Never be hidden or removed.

Do not change this behaviour.

All other modules remain optional.

---

## Responsive Behaviour

### Desktop — 1440px

- Use the wide focused panel.
- Use three module columns where appropriate.
- Keep generous spacing.
- Keep the panel centered and visually balanced.

### Tablet — 768px

- Use a wide responsive panel.
- Use two module columns.
- Maintain readable module names.
- Prevent clipping and overflow.

### Mobile

- Use a full-width bottom sheet or full-screen management view.
- Use one module column.
- Keep controls easy to tap.
- Keep Save Workspace accessible.
- Do not allow horizontal scrolling.

---

## Final UX Goal

The Workspace Management experience should feel:

- Spacious
- Focused
- Calm
- Organised
- Easy to scan
- Easy to manage

It should not feel:

- Like a narrow dropdown
- Crowded
- Compressed
- Overloaded
- Visually mixed into the dashboard

---

## Final Validation

Verify that:

✓ Workspace Management is significantly wider on desktop.

✓ It is no longer constrained by the workspace selector width.

✓ The busy workspace does not compete visually with the management interface.

✓ Workspace Modules are displayed in a spacious multi-column layout.

✓ Module names remain readable.

✓ Module visibility updates immediately.

✓ The Identity Card remains selected and locked.

✓ Save, Cancel and Reset remain easy to access.

✓ Desktop, tablet and mobile layouts work correctly.

✓ No existing Employee Workspace card or functionality has been redesigned.

This is a Workspace Management size and user-experience improvement only.