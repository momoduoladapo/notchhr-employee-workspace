# Redesign Employee Workspace Management

The Employee Workspace dashboard design is approved and must remain unchanged.

Redesign only the **Workspace Management experience** used for personalising and arranging workspace cards.

The current workspace management interaction feels too complex. Replace it with a simpler, clearer and more user-friendly experience that makes workspace personalisation easy to understand and easy to control.

Do not redesign the Employee Workspace itself.

Do not change:

- The existing dashboard layout
- Workspace cards
- Card content
- Card styling
- Card sizes
- Typography
- Colours
- Icons
- Header
- Navigation
- Existing employee data
- Existing dashboard functionality
- Desktop, Tablet or Mobile workspace designs

Do not add new dashboard content.

Only redesign the workspace management controls and interactions.

---

# Design Goal

Create a workspace management experience that is:

- Simple
- Clear
- Easy to discover
- Easy to use
- Visually lightweight
- Modern
- Accessible
- Effective on Desktop, Tablet and Mobile

Employees should immediately understand:

1. How to start customising their workspace.
2. How to move workspace cards.
3. How to save their changes.
4. How to cancel unwanted changes.
5. How to restore the default workspace.

Avoid making the experience feel like an advanced settings page.

---

# Entry Point

Use one clear workspace-level action:

**Customize Workspace**

Place it in a logical existing workspace-level area.

Do not place it inside an individual card.

Do not create a large permanent banner.

Do not make the action visually compete with important workspace actions.

The entry point should be easy to find but visually unobtrusive.

---

# Customization Mode

When the employee selects **Customize Workspace**, activate a focused workspace editing mode.

Show a compact and clear management bar above the workspace.

The management bar should communicate that the workspace is now editable without taking up unnecessary space.

Use a simple instructional message such as:

**Arrange your workspace**

Include a short supporting instruction that clearly explains how cards can be moved.

Do not use long instructional text.

---

# Workspace Editing Controls

The customization controls should be simple and focused.

Include:

- Save Workspace
- Cancel
- Reset to Default

Use the existing design system and button styles.

Button hierarchy:

- **Save Workspace** should be the primary action.
- **Cancel** should be a secondary action.
- **Reset to Default** should be a subtle tertiary action.

Do not give all actions equal visual emphasis.

Do not use large or distracting controls.

---

# Drag-and-Drop Experience

While customization mode is active:

- Show a subtle drag handle only on eligible workspace cards.
- Make the drag handle easy to recognise.
- Keep the card’s existing design intact.
- Do not make the entire card permanently draggable.
- Do not interfere with buttons, filters, links or other card interactions.

Employees must be able to:

- Move cards within a row.
- Move cards to another row.
- Move cards upward.
- Move cards downward.
- Rearrange cards across the complete workspace grid.

The entire workspace must behave as one connected draggable grid.

Do not treat each row as a separate drag area.

---

# Drag Feedback

During dragging:

- Lift the active card slightly above the workspace.
- Use subtle elevation to indicate movement.
- Show a clear placeholder at the potential destination.
- Reflow surrounding cards smoothly.
- Make valid drop locations easy to understand.

Do not use excessive animation.

Do not use large coloured overlays.

Do not use gradients.

Do not allow cards to overlap.

Do not allow cards to move outside the workspace boundaries.

---

# Save Behaviour

Do not automatically save every movement.

The employee should intentionally select:

**Save Workspace**

When Save Workspace is selected:

- Save the current card order.
- Save card positions.
- Save cross-row placement.
- Preserve the employee’s personalised arrangement.
- Keep the arrangement after refresh.
- Keep the arrangement when the employee returns.
- Keep the arrangement after signing in again.

After a successful save:

- Exit customization mode.
- Remove drag handles.
- Return cards to normal interaction mode.
- Display a brief, unobtrusive confirmation:

**Workspace saved**

Do not use a blocking modal.

Do not cover important workspace content.

---

# Unsaved Changes

When the employee changes the workspace:

- Enable Save Workspace.
- Indicate that changes have not yet been saved.
- Keep this feedback subtle.

If the employee selects Cancel or attempts to leave customization mode with unsaved changes:

Show a small, clear confirmation.

Allow the employee to:

- Save changes
- Discard changes
- Continue editing

Do not discard changes automatically.

---

# Cancel Behaviour

When the employee selects **Cancel**:

- Restore the workspace to the last saved arrangement.
- Remove all temporary changes made during the current editing session.
- Exit customization mode.
- Remove drag handles.
- Return the workspace to normal interaction mode.

Do not change employee data.

Do not remove cards.

---

# Reset to Default

The **Reset to Default** action should:

- Restore the original approved workspace arrangement.
- Keep all cards.
- Keep all employee data.
- Keep all card content.
- Change only the card arrangement.

Require confirmation before resetting.

After resetting, allow the employee to review the restored layout before saving it.

Do not automatically save the reset arrangement.

---

# Normal Workspace State

When customization mode is inactive:

- Do not show drag handles.
- Do not show Save Workspace.
- Do not show editing instructions.
- Do not display unnecessary workspace management controls.
- Keep the dashboard clean and focused.

The workspace should continue to feel like a normal employee workspace.

---

# Responsive Behaviour

Design the workspace management experience for:

- Desktop — 1440px
- Tablet — 768px
- Mobile

The same management system must work consistently across all screen sizes.

## Desktop

- Use a compact workspace management bar.
- Keep controls easy to scan.
- Maintain the approved dashboard width and alignment.

## Tablet

- Reflow controls cleanly.
- Prevent controls from overlapping.
- Keep all actions visible and accessible.

## Mobile

- Keep controls within the viewport.
- Avoid horizontal scrolling.
- Use touch-friendly controls.
- Keep the primary Save Workspace action easy to reach.
- Ensure drag-and-drop works within the screen width.
- Support moving cards vertically through the workspace.
- Do not allow menus or controls to extend outside the screen.

---

# Accessibility

Ensure workspace management supports:

- Keyboard navigation
- Visible focus states
- Clear button labels
- Accessible drag controls
- Adequate touch targets
- Clear feedback after actions

Do not rely only on colour to communicate editing or saved states.

---

# Final Design Principles

The redesigned workspace management should feel:

- Lightweight rather than complex
- Guided rather than technical
- Controlled rather than restrictive
- Flexible without allowing the workspace layout to break
- Consistent with the existing Employee Workspace design system

The employee should be able to understand and complete workspace personalisation without needing training.

---

# Final Validation

Before completing the redesign, verify:

✓ The Employee Workspace itself remains unchanged.

✓ Only workspace management has been redesigned.

✓ Customize Workspace is easy to find.

✓ Customization mode is clear and uncluttered.

✓ Cards can move across rows.

✓ The workspace behaves as one connected grid.

✓ Save Workspace is clear and intentional.

✓ Cancel restores the last saved layout.

✓ Reset to Default restores the original layout.

✓ Unsaved changes are handled clearly.

✓ Drag handles appear only during customization.

✓ The experience works at 1440px, 768px and Mobile.

✓ No controls overflow outside the screen.

✓ No dashboard content has been added or removed.

✓ No unnecessary redesign has been introduced.