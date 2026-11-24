# Employee Workspace — Save, Name and Rename Experience

The current Employee Workspace design is approved.

Do not redesign the Employee Workspace.

Do not change:

- Dashboard layout
- Workspace cards
- Card content
- Card styling
- Typography
- Colours
- Icons
- Header
- Navigation
- Existing workspace functionality
- Responsive layouts

Do not create a separate Workspace Management page.

Keep Workspace Management as a lightweight dropdown service within the existing workspace control.

The only required update is to improve the workspace naming, saving and renaming experience.

---

# 1. Save Workspace Flow

When an employee has created or edited a workspace and selects:

**Save Workspace**

open a compact, well-formatted save interface.

The save interface should allow the employee to provide a workspace name before saving.

Use a clear structure containing:

### Title

**Save Workspace**

### Supporting Text

**Give your workspace a name so you can easily find it later.**

Keep the supporting text short and unobtrusive.

### Workspace Name Field

Label:

**Workspace name**

Use a clear text input.

Include a helpful placeholder such as:

**e.g. My Daily Workspace**

The field should be easy to find and easy to use.

---

# 2. Named Workspace Save

If the employee enters a workspace name:

- Save the workspace using the entered name.
- Preserve the current workspace arrangement.
- Save the card order.
- Save card positions.
- Save cross-row placement.
- Save added and removed workspace items.
- Close the save interface.
- Exit workspace editing mode.
- Display a brief success message:

**Workspace saved**

The saved workspace should appear in the Workspace dropdown.

---

# 3. Save Without a Name

Naming a workspace should be encouraged but not required.

If the employee leaves the Workspace Name field empty:

Do not block the save process.

Provide a secondary action:

**Save as Untitled**

When selected:

- Save the workspace immediately.
- Automatically assign a unique name using:

**Untitled Workspace — [date and time]**

Use the employee’s local date and time.

Example:

**Untitled Workspace — Jul 30, 2026, 9:42 AM**

The timestamp should make each untitled workspace easy to distinguish.

Do not force the employee to enter a name before saving.

---

# 4. Save Actions

Use clear action hierarchy:

Primary action:

**Save Workspace**

Secondary action:

**Save as Untitled**

Tertiary action:

**Cancel**

The primary Save Workspace action should become active when a valid workspace name is entered.

Save as Untitled should remain available when the name field is empty.

Cancel should close the save interface without saving.

Do not use an unnecessarily large modal.

Use a compact popover, dialog or panel that follows the existing design system.

---

# 5. Untitled Workspace Display

Inside the Workspace dropdown, display untitled workspaces using their generated name.

Example:

**Untitled Workspace — Jul 30, 2026, 9:42 AM**

Ensure the name is:

- Readable
- Properly aligned
- Not clipped
- Easy to distinguish from other workspaces

If the available space is limited, preserve the workspace identity while handling long timestamps gracefully.

Do not allow the workspace item to overflow outside the dropdown.

---

# 6. Rename Untitled Workspace

Every untitled workspace must include a visible but subtle **pen icon**.

The pen icon should:

- Be aligned consistently within the workspace item.
- Remain easy to identify.
- Be accessible by keyboard and touch.
- Not interfere with selecting the workspace.
- Not activate the workspace when clicked.

When the employee clicks the pen icon:

- Open a compact inline rename state.
- Prepopulate the name field with the current workspace name.
- Allow the employee to replace the generated untitled name.
- Provide:
  - Save
  - Cancel

After saving:

- Replace the generated untitled name with the new workspace name.
- Keep the workspace arrangement unchanged.
- Update the Workspace dropdown immediately.
- Display a subtle confirmation:

**Workspace renamed**

---

# 7. Rename Named Workspaces

Use the same pen icon and rename interaction for named workspaces.

Employees should be able to rename any personal workspace without leaving the Workspace dropdown.

Do not create a separate workspace settings page.

Keep the rename interaction lightweight and contextual.

---

# 8. Workspace Dropdown Structure

Format the Workspace dropdown clearly.

Use this hierarchy:

## Current Workspace

Display the active workspace clearly.

Use an active indicator.

## Saved Workspaces

Display the employee’s other saved workspaces as selectable items.

Each workspace item should include:

- Workspace name
- Active state where applicable
- Pen icon for rename
- Existing delete action where applicable

## Create Workspace

Place:

**+ Create New Workspace**

at the bottom of the dropdown.

Maintain clear spacing between:

- Current workspace
- Saved workspaces
- Create Workspace action

Do not overcrowd the dropdown.

---

# 9. Interaction Rules

Clicking the workspace name:

- Selects and opens that workspace.

Clicking the pen icon:

- Opens rename.
- Must not switch the active workspace.

Clicking Delete:

- Opens a confirmation.
- Must not switch the active workspace.

Ensure each action has a clear and separate click target.

Do not rely on hover to reveal important actions.

All workspace actions must be available through click or tap.

---

# 10. Responsive Behaviour

Support:

- Desktop — 1440px
- Tablet — 768px
- Mobile

Ensure the save interface and Workspace dropdown:

- Remain fully inside the viewport.
- Do not overflow.
- Do not become clipped.
- Do not require horizontal scrolling.
- Have comfortable touch targets.
- Maintain clear spacing and readable text.

On Mobile:

- Use the available screen width.
- Keep Save Workspace easy to reach.
- Keep the workspace name field easy to use.
- Ensure the keyboard does not hide important save actions.

---

# 11. Final UX Requirements

The experience should feel:

- Simple
- Clear
- Fast
- Lightweight
- Friendly
- Professional

Employees should be able to:

1. Create or customise a workspace.
2. Click Save Workspace.
3. Enter a workspace name and save it.
4. Or save without a name using Save as Untitled.
5. Return later.
6. Use the pen icon to rename an untitled workspace.
7. Switch between saved workspaces from the same dropdown.
8. Rename or delete workspaces without leaving the Employee Workspace.

Do not redesign the Employee Workspace.

Do not add a large Workspace Management module.

Only improve the naming, saving and renaming experience within the existing lightweight Workspace Management dropdown.