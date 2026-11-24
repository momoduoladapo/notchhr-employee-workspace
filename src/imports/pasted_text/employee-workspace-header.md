# Employee Workspace — Move Workspace Management Into the Greeting Header

Keep the current Employee Workspace design exactly as it is.

Do not redesign the dashboard, cards, header, workspace dropdown, or any existing functionality.

Only change the placement and responsive layout of the Workspace Management controls.

---

## Desktop Layout — 1440px

Remove the separate full-width **Arrange your workspace** bar below the greeting.

Move the complete Workspace Management experience onto the same horizontal line as the greeting section.

Use a single end-to-end header row:

### Left side

Keep the existing greeting content:

**Good Morning, Shola 👋**

Keep the existing supporting text directly below it:

**Here’s what’s happening at NotchHR today — June 20, 2025**

The greeting and supporting text should remain left-aligned.

### Right side

Place all Workspace Management controls on the right side of the same header row.

Include:

- Workspace selector / active workspace dropdown
- Arrange Workspace or Customize Layout control
- Unsaved status when applicable
- Reset to Default
- Cancel when editing
- Save Workspace

The Workspace Management controls should be aligned horizontally and render end-to-end on the right.

The greeting occupies the left side, while Workspace Management occupies the right side.

Do not place Workspace Management below the greeting.

Do not create a second full-width workspace management bar.

---

## Layout Structure

Use a responsive two-sided header layout:

**Left: Greeting block**  
**Right: Workspace Management controls**

The overall header should use the full available page width.

Maintain consistent page padding on the left and right.

Vertically centre the Workspace Management controls relative to the greeting block.

The controls should feel like part of the page header, not like a separate toolbar.

---

## Workspace Editing State

When workspace editing is active:

Keep the following controls on the right side of the greeting row:

**Arrange Workspace → Unsaved status → Reset to Default → Cancel → Save Workspace**

Maintain clear spacing between each item.

The **Unsaved** status should remain visible but subtle.

The **Save Workspace** button should remain the primary action and should be positioned at the far right.

Do not allow Save Workspace to wrap onto another line at the 1440px desktop layout.

---

## Save Workspace Naming

When the employee clicks **Save Workspace**:

Do not add a large modal.

Open the existing compact save-name interface without changing the approved workspace design.

The workspace name input should appear as a compact contextual popover or dropdown anchored to the Save Workspace action.

Allow the employee to:

- Enter a workspace name
- Save with the entered name
- Save as Untitled
- Cancel

Do not permanently place the workspace name input in the header row unless the current interaction requires it.

Keep the header clean when the naming interface is not active.

---

## Visual Hierarchy

Maintain this priority:

1. Greeting and page context
2. Workspace selector
3. Workspace editing status
4. Save Workspace action

Use subtle separators or spacing where necessary.

Do not place all controls inside one large bordered container.

Do not recreate the previous full-width purple workspace management bar.

The controls should feel lightweight, modern and integrated into the page header.

---

## Responsive Behaviour

### Desktop — 1440px

- Greeting remains on the left.
- Workspace Management remains on the right.
- All controls remain on one horizontal line.
- Save Workspace remains at the far right.
- No unnecessary wrapping.
- Use the full available width.

### Tablet — 768px

- Keep the greeting at the top.
- Move Workspace Management to a clean second row only when there is insufficient horizontal space.
- Maintain logical grouping.
- Keep Save Workspace visible and easy to access.
- Do not allow controls to overlap or become compressed.

### Mobile

- Stack the greeting and Workspace Management vertically.
- Greeting appears first.
- Workspace Management appears directly below.
- Keep the workspace selector easy to access.
- Keep Save Workspace visible and easy to tap.
- Use full available width.
- Do not allow horizontal overflow.
- Do not allow controls to leave the viewport.

---

## Preserve Existing Design

Do not change:

- Greeting text
- Greeting styling
- Dashboard cards
- Card arrangement
- Workspace dropdown design
- Workspace CRUD functionality
- Default Workspace protection
- Reset to Default behaviour
- Save Workspace behaviour
- Colours
- Typography
- Icons
- Existing responsive card layouts

Only remove the separate workspace management bar and integrate its controls into the same horizontal header area as the greeting.

---

## Final Validation

Verify that:

✓ The separate full-width Arrange Workspace bar has been removed.

✓ The greeting remains on the left.

✓ Workspace Management is positioned on the right.

✓ Both areas share the same header row on the 1440px desktop screen.

✓ Workspace controls render cleanly from left to right.

✓ Save Workspace is at the far right.

✓ The layout uses the full available width.

✓ Controls do not overlap or wrap unnecessarily.

✓ The workspace name input remains contextual to Save Workspace.

✓ Tablet and mobile layouts remain responsive.

✓ No dashboard content has been redesigned.