# Unify Workspace Management and Module Management Into One Clean Feature

Keep the current Employee Workspace design exactly as it is.

Do not redesign the Employee Workspace, dashboard cards, header, greeting area, App Launcher, navigation, colours, typography, card styling, responsive layouts, or existing workspace functionality.

Only redesign and unify the existing **Workspace Management** and **Module Management** interactions into one simple, clear and user-friendly feature.

---

## Core Concept

Workspace Management and Module Management must become one unified experience.

The employee should manage:

- Which modules are visible in the workspace
- Which modules are hidden
- The arrangement of visible modules
- Workspace creation
- Workspace selection
- Workspace renaming
- Workspace deletion
- Workspace saving
- Resetting to the default workspace

from one coherent Workspace Management feature.

Do not treat module management as a separate feature.

Do not create a separate Module Management page.

Do not create a separate Add Module system outside Workspace Management.

---

# Workspace Management Entry Point

Keep the existing Workspace Management control in the current location beside the greeting.

Do not move the greeting.

Do not create a new toolbar.

When the employee clicks **Manage Workspace** or the existing workspace control, open one clean, properly formatted Workspace Management dropdown or popover.

The interaction must be:

- Click or tap to open
- Click or tap to close
- Fully visible
- Properly aligned
- Inside the viewport
- Responsive
- Easy to understand
- Easy to use

Do not use hover to reveal information or controls.

---

# Workspace Selector

At the top of the Workspace Management interface:

Display the active workspace clearly.

Allow employees to:

- Select an existing workspace
- Create a new workspace
- Rename a user-created workspace
- Delete a user-created workspace
- Switch between saved workspaces

Keep the existing Default Workspace protection.

The Default Workspace must:

- Be clearly identified as **Default**
- Display a subtle lock indicator
- Be selectable
- Not be renameable
- Not be deletable

Do not show editable controls for the protected Default Workspace.

---

# Modules and Visibility

Inside the same Workspace Management interface, include a clearly labelled section:

**Workspace Modules**

Display all available workspace modules as a clean, easy-to-scan list.

Use a simple checkbox list or clean toggle controls.

The selected control must immediately update the workspace.

Do not require a separate Add Module button.

Do not require an additional confirmation step.

Do not require a Save action before the employee can see the module appear or disappear.

---

## Immediate Module Behaviour

When an employee checks a module:

- Display the module immediately in the active workspace.
- Place the module in the next valid position.
- Reflow the workspace automatically.
- Maintain the current structured masonry layout.
- Maintain consistent spacing.
- Do not overlap cards.
- Do not create unnecessary empty gaps.

When an employee unchecks a module:

- Hide or remove the module immediately from the active workspace.
- Reflow the remaining cards immediately.
- Maintain consistent spacing.
- Close unnecessary gaps.
- Do not leave an empty placeholder.

The employee must see the workspace update instantly while making selections.

---

# Identity Card Protection

The Employee Identity Card is required.

The Identity Card must:

- Always remain visible.
- Always remain included in every workspace.
- Never be removable.
- Never be hidden.
- Never be duplicated.
- Never appear as an optional module.

In the Workspace Modules list:

- Display the Identity Card.
- Show it as selected.
- Show a subtle lock indicator.
- Disable its checkbox or toggle.
- Do not allow the employee to uncheck it.
- Do not display a remove action.

Use a clean, accessible locked state.

Do not use a large warning message.

Do not use a red error state.

Add a short explanation that is visible through click, tap or keyboard focus:

**Identity Card is required and cannot be hidden.**

Do not rely only on hover.

---

# Optional Modules

Every module except the Identity Card must be optional.

Employees must be able to:

- Check a hidden module to show it.
- Uncheck a visible module to hide it.
- Remove every optional module if they choose.

The employee must be allowed to have a workspace containing only the required Identity Card.

Do not force employees to keep any optional module.

Do not automatically restore optional modules after they are unchecked.

---

# Clean Module List Design

The Workspace Modules list must be clean and compact.

Use:

- Clear module names
- Consistent alignment
- One control per module
- Comfortable spacing
- Clear selected and unselected states
- Accessible click and tap targets

Do not use large cards for every module.

Do not make the list visually heavy.

Do not use unnecessary descriptions beside every module.

Do not display all module details at once.

The module list should feel like a simple, modern workspace visibility manager.

Use the existing design system.

---

# Recommended Interaction Pattern

Use checkboxes if multiple modules can be visible at the same time.

Each row should contain:

**Checkbox → Module icon → Module name → Optional status where necessary**

The Identity Card row should contain:

**Checked disabled checkbox → Identity Card icon → Identity Card → Lock icon**

The module visibility should update immediately when a checkbox is checked or unchecked.

Do not use a single-select control.

Do not use tabs for module visibility.

---

# Workspace Arrangement

Keep the existing drag-and-drop functionality.

Employees must be able to:

- Rearrange visible modules.
- Drag cards to valid positions.
- Reorder cards.
- Save the workspace arrangement.

Hidden modules must not occupy workspace space.

When a hidden module is checked again:

- Restore it to the next valid workspace position.
- Do not overlap existing cards.
- Maintain the structured workspace layout.

Do not redesign the cards.

---

# Saving Behaviour

Module visibility changes should appear immediately in the workspace.

However, changes must remain unsaved until the employee saves the workspace.

Display a subtle **Unsaved changes** status when the employee:

- Shows a module
- Hides a module
- Rearranges a card

Provide:

- Save Workspace
- Cancel
- Reset to Default

Save Workspace must save:

- Visible modules
- Hidden modules
- Card arrangement
- Card order
- Workspace configuration

Cancel must restore the last saved workspace state.

Reset to Default must restore the approved default module selection and arrangement.

---

# New Workspace Behaviour

When the employee creates a new workspace:

- Include the Identity Card automatically.
- Keep the Identity Card locked and visible.
- Allow the employee to select any optional modules using the module list.
- Allow the employee to rearrange visible modules.
- Allow the employee to save the workspace.

If the employee saves without entering a workspace name, use:

**Untitled DD/MM/YYYY**

Keep the visible edit pen so the employee can rename it later.

Do not use timestamps.

Do not use the words **Untitled Workspace**.

---

# Responsive Behaviour

Support:

- Desktop — 1440px
- Tablet — 768px
- Mobile

At every screen size:

- The Workspace Management interface must remain inside the viewport.
- The module list must be readable.
- Checkboxes or toggles must be easy to tap.
- No controls may overflow.
- No content may be clipped.
- The workspace must update immediately after a selection changes.
- The module list must remain accessible without hover.

On mobile, use a clean full-width popover, sheet or modal if required.

Do not allow the module manager to extend outside the screen.

---

# Preserve Existing Design

Do not change:

- Employee persona data
- Header
- Greeting
- Existing dashboard cards
- Card content
- Card visual styling
- Card dimensions
- App Launcher
- Navigation
- Existing workspace grid
- Existing responsive card design

Do not add unrelated features.

Do not create a new page.

Do not create a sidebar.

Only unify Workspace Management and Module Management into one clean feature.

---

# Final Validation

Verify that:

✓ Workspace Management and Module Management are one feature.

✓ Employees can select and manage workspaces.

✓ Employees can create, rename and delete user-created workspaces.

✓ Default Workspace remains protected.

✓ All modules appear in one clean visibility list.

✓ Checking a module displays it immediately.

✓ Unchecking a module hides it immediately.

✓ The workspace reflows immediately after each change.

✓ The Identity Card is always selected.

✓ The Identity Card cannot be unchecked.

✓ The Identity Card cannot be hidden or removed.

✓ All other modules can be shown or hidden.

✓ Employees can hide every optional module.

✓ The workspace can contain only the Identity Card.

✓ Module visibility changes remain unsaved until Save Workspace is clicked.

✓ Cancel restores the previously saved state.

✓ Reset to Default restores the approved workspace.

✓ The feature works on Desktop, Tablet and Mobile.

✓ No existing Employee Workspace design has been redesigned.

This is a unified Workspace and Module Management update only.