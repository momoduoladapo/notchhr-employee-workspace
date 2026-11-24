# Workspace Management Dropdown — Add Reset to Default and Protect the Default Workspace

Keep the current Employee Workspace design and Workspace Management dropdown.

Do not redesign the Employee Workspace.

Do not change:

- Dashboard layout
- Workspace cards
- Workspace dropdown structure
- Existing workspace names
- Existing workspace switching behaviour
- Create New Workspace
- Customize Layout
- Existing colours
- Typography
- Icons
- Responsive layouts

Only improve the Workspace Management dropdown by adding **Reset to Default** and properly handling the protected **Default Workspace**.

---

## 1. Add Reset to Default

Add a new dropdown action:

**Reset to Default**

Place it inside the Workspace Management dropdown as a secondary utility action.

The action should be visually grouped with:

- Customize Layout
- Reset to Default
- Create New Workspace

Use clear spacing and separators so these actions do not appear attached to the workspace list.

Reset to Default should be easy to find but should not compete visually with Create New Workspace.

Use an appropriate reset or restore icon.

Do not use a destructive red style.

---

## 2. Reset to Default Behaviour

When the user selects **Reset to Default**:

- Restore the original approved default workspace arrangement.
- Restore the original card order.
- Restore the original card positions.
- Restore the original card layout.
- Restore the original workspace configuration.

Do not:

- Delete employee information.
- Delete HR data.
- Delete workspace cards globally.
- Change card content.
- Change employee data.
- Redesign the workspace.

Only restore the default workspace arrangement.

---

## 3. Reset Confirmation

Before applying the reset, show a compact confirmation interface.

Use:

### Title

**Reset workspace?**

### Supporting text

**Your current workspace arrangement will be replaced with the default layout.**

Use clear actions:

- **Reset to Default** — primary action
- **Cancel** — secondary action

The confirmation should be compact and easy to understand.

Do not use a large or visually heavy modal.

---

## 4. Default Workspace Display

When the employee is currently using the original system workspace:

Display the workspace as:

**Default Workspace**

Add a subtle lock icon beside the workspace name.

The lock icon should communicate that the workspace is protected.

Do not use a warning colour.

Do not make the lock visually dominant.

Use the existing neutral or primary design-system colours.

The workspace should remain selectable and usable.

---

## 5. Default Workspace Protection

The Default Workspace must not be renamed.

The Default Workspace must not be deleted.

The Default Workspace must not display the normal editable pen icon.

Do not show Rename or Delete controls for the Default Workspace.

Instead, display a subtle lock indicator.

The lock should communicate:

**This workspace is protected**

Do not make the user discover this only after clicking Rename or Delete.

The protected status should be visible before interaction.

---

## 6. Default Workspace Tooltip

When the user clicks or focuses on the lock icon, reveal a small tooltip:

**Default Workspace — cannot be renamed or deleted**

Use click or keyboard focus to reveal this information.

Do not rely only on hover.

The tooltip must:

- Remain inside the viewport.
- Be properly positioned.
- Be readable on Desktop, Tablet and Mobile.
- Not cover important workspace controls.

---

## 7. Active Default State

When the Default Workspace is active:

- Show the existing active check indicator.
- Keep the Default Workspace label visible.
- Keep the lock icon visible.
- Do not show the pen icon.
- Do not show Rename.
- Do not show Delete.

The active state and protected state should be understandable without creating visual clutter.

The user should clearly understand:

> This is the active workspace, and it is the protected default workspace.

---

## 8. User-Created Workspaces

For all user-created workspaces:

- Keep the pen icon.
- Allow Rename.
- Allow Delete.
- Keep the existing workspace management behaviour.

Do not apply the Default Workspace restrictions to user-created workspaces.

Only the original Default Workspace should be protected.

---

## 9. Dropdown Structure

Format the dropdown in this order:

### WORKSPACES

- Default Workspace
  - Active indicator when selected
  - Lock icon
  - No pen icon

- User-created workspace items
  - Active indicator when selected
  - Pen icon
  - Rename and Delete actions when editing

Divider

### WORKSPACE ACTIONS

- Customize Layout
- Reset to Default
- Create New Workspace

Use clear spacing between:

- Workspace items
- The divider
- Workspace actions

Do not overcrowd the dropdown.

---

## 10. Reset State After Completion

After the employee confirms Reset to Default:

- Switch to the Default Workspace.
- Apply the original default layout.
- Update the workspace dropdown trigger to:

**Default Workspace**

- Close the dropdown.
- Display a brief confirmation:

**Workspace reset to default**

Do not use a blocking notification.

---

## 11. Responsive Behaviour

Support:

- Desktop — 1440px
- Tablet — 768px
- Mobile

Ensure:

- The lock icon remains visible.
- The Default Workspace label does not collide with the active indicator.
- The dropdown remains inside the viewport.
- The tooltip remains inside the viewport.
- Reset to Default is easy to tap.
- All controls maintain comfortable touch targets.

Do not allow the dropdown or tooltip to overflow outside the screen.

---

## Final Validation

Verify that:

✓ Reset to Default is available inside the Workspace Management dropdown.

✓ Reset restores only the default workspace arrangement.

✓ Reset does not affect employee or HR data.

✓ The Default Workspace is clearly labelled.

✓ The Default Workspace has a subtle lock icon.

✓ The Default Workspace cannot be renamed.

✓ The Default Workspace cannot be deleted.

✓ The Default Workspace does not show a pen icon.

✓ User-created workspaces can still be renamed and deleted.

✓ The protected state is understandable before interaction.

✓ The existing Employee Workspace design remains unchanged.

✓ No unnecessary features have been added.

This is a Workspace Management dropdown update only.