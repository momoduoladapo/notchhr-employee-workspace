# Employee Workspace — Drag-and-Drop Personalisation

The current Employee Workspace design is approved.

Do not redesign the workspace.

Do not change:

- The existing visual design
- Dashboard cards
- Card content
- Card styling
- Typography
- Colours
- Icons
- Filters
- Header
- Navigation
- Existing interactions
- Desktop, Tablet or Mobile layouts

Do not add new dashboard content.

The only new capability is to allow employees to rearrange eligible workspace items according to their personal preferences.

---

# Workspace Personalisation

Allow employees to:

- Drag eligible workspace cards
- Drop cards into supported positions
- Rearrange the order of cards
- Create a workspace arrangement that suits how they work

The existing workspace should remain the default arrangement.

Do not automatically rearrange cards.

Personalisation should happen only when the employee intentionally enters workspace customisation mode.

---

# Customise Workspace Entry

Add a clear but unobtrusive action named:

**Customize Workspace**

Place it in an appropriate existing workspace-level action area.

Do not add a large permanent button inside the dashboard content.

When the employee selects **Customize Workspace**, enter workspace editing mode.

---

# Editing Mode

While customisation mode is active:

- Clearly indicate that the workspace is editable.
- Make draggable cards visually recognisable.
- Show a subtle drag handle on eligible cards.
- Maintain the existing card design.
- Do not permanently display drag handles during normal workspace use.
- Do not make every part of a card draggable.

Use the drag handle as the primary drag interaction.

This prevents accidental dragging when employees interact with:

- Buttons
- Filters
- Links
- Tabs
- Charts
- Forms
- Other card controls

---

# Drag Behaviour

When an employee begins dragging a card:

- Lift the card visually above the dashboard.
- Use subtle elevation to indicate that it is being moved.
- Maintain the card’s existing appearance.
- Show a clear destination indicator.
- Display a placeholder in the potential drop position.
- Allow the surrounding cards to move naturally to create space.

The interaction should feel smooth, controlled and modern.

Do not use excessive animation.

Do not use decorative effects or gradients.

---

# Drop Behaviour

Allow cards to be dropped only into valid positions within the workspace grid.

When a card is dropped:

- Place it cleanly in the selected position.
- Reflow the surrounding cards automatically.
- Preserve consistent spacing.
- Prevent card overlap.
- Prevent broken grid alignment.
- Preserve the existing Bento Grid rules.

The employee must not be able to place cards freely on top of one another.

Do not allow absolute-position placement.

---

# Card Size Rules

Employees may rearrange eligible cards, but they must not resize cards in this phase.

Preserve each card’s approved:

- Width
- Height
- Column span
- Visual structure

Do not allow users to stretch, shrink or distort cards.

The system should manage the grid automatically after each rearrangement.

---

# Protected Cards

Do not make critical workspace structure draggable unless it is explicitly approved.

Keep the following fixed:

- Header
- Main navigation
- App Launcher
- Search
- Notifications
- Profile menu
- Workspace title or page-level context

Only eligible workspace content cards should be movable.

---

# Save Behaviour

Automatically save the employee’s workspace arrangement after a successful drop.

The employee should not need to manually save after every movement.

Show a subtle confirmation such as:

**Workspace updated**

Do not use intrusive alerts or large notifications.

The personalised arrangement should remain available when the employee:

- Refreshes the page
- Returns to the workspace
- Signs in again

---

# Reset Workspace

Provide a secondary action:

**Reset to Default**

When selected:

- Restore the original approved workspace arrangement.
- Return all cards to their default positions.
- Preserve all employee data.
- Preserve all card content.
- Do not delete or modify any information.

Use a confirmation step before resetting.

---

# Exit Customisation

Provide a clear action:

**Done**

When selected:

- Exit workspace customisation mode.
- Remove drag handles.
- Return cards to normal interaction behaviour.
- Preserve the employee’s saved arrangement.

---

# Responsive Behaviour

Support workspace personalisation across:

- Desktop — 1440px
- Tablet — 768px
- Mobile

The layout must remain responsive after cards are rearranged.

Do not simply scale the Desktop arrangement.

The system should intelligently reflow cards for each screen size.

Ensure:

- No card overlap
- No clipped content
- No horizontal scrolling
- No broken grid
- No empty unintended gaps
- Consistent card spacing
- Logical reading order

---

# Mobile Behaviour

Because mobile has limited space:

- Use a dedicated customization mode.
- Make drag handles large enough for touch interaction.
- Use clear insertion indicators.
- Keep all drag interactions inside the screen width.
- Prevent cards from being dragged outside the viewport.

Do not allow accidental dragging during normal card interaction.

---

# Accessibility

Ensure the workspace can be rearranged without requiring a mouse.

Provide keyboard-accessible controls for moving eligible cards.

Maintain:

- Visible focus states
- Clear interaction feedback
- Accessible labels
- Adequate touch targets
- Predictable movement behaviour

---

# Preserve the Approved Design

Do not redesign the Employee Workspace.

Do not add new workspace cards.

Do not remove existing cards.

Do not change card content.

Do not change the approved Bento Grid visual language.

Only add a controlled, accessible and responsive drag-and-drop personalisation system that allows employees to rearrange eligible workspace items while preserving layout integrity.