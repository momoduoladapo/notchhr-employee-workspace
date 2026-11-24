# Employee Workspace — Convert the Card Layout to a Structured Masonry Grid

Keep the current Employee Workspace design exactly as approved.

Do not redesign:

- Header
- Greeting section
- Workspace Management
- Workspace dropdown
- Dashboard cards
- Card visual styling
- Card content
- Typography
- Colours
- Icons
- App Launcher
- Navigation
- Quick Actions
- Add Module
- Save Workspace
- Default Workspace behaviour
- Existing employee data

Only change the workspace card layout behaviour.

---

# Masonry Layout Requirement

Convert the Employee Workspace card area from a strict row-based layout into a structured, responsive masonry layout.

The workspace should use:

- Fixed responsive column widths
- Variable card heights
- Consistent gaps
- Intelligent vertical packing
- Stable card placement
- Drag-and-drop support

Do not use a random or uncontrolled Pinterest-style layout.

The workspace must remain structured, professional and easy to scan.

---

# Card Widths

Preserve the approved card widths and column spans.

Do not make every card the same width.

Cards should retain their intended responsive width.

For example:

- Small cards remain small.
- Medium cards retain their approved width.
- Wide cards retain their approved width.
- Large cards retain their approved width.

Do not stretch cards to fill empty areas.

Do not compress cards when they are moved.

Only allow card height to adapt naturally to its content where appropriate.

---

# Variable Card Heights

Allow cards to have different heights based on:

- Content amount
- Data complexity
- Card purpose
- Existing internal content requirements

Do not force all cards in a horizontal row to have the same height.

Do not add unnecessary empty space inside shorter cards just to match a taller card.

Cards below should move upward into available vertical space.

---

# Intelligent Vertical Packing

After cards are displayed, added, removed or moved:

- Detect available vertical spaces.
- Move cards upward where they fit.
- Fill valid gaps beneath shorter cards.
- Keep all cards aligned to the workspace column system.
- Maintain consistent spacing.
- Minimise unnecessary blank areas.
- Keep the workspace compact.

Do not preserve empty vertical gaps simply because another card in a neighbouring column is taller.

---

# Drag-and-Drop Behaviour

When an employee drags a card:

- Preserve the card’s approved width and column span.
- Preserve its content.
- Preserve its visual design.
- Show the card’s complete footprint during dragging.
- Display a clear placement preview.
- Recalculate surrounding card positions.
- Repack the workspace after the card is dropped.
- Allow other cards to move into available spaces.

Do not:

- Overlap cards.
- Compress cards.
- Stretch cards.
- Create unnecessary empty areas.
- Create unnecessary additional rows.

The moved card should take priority at the selected destination.

Other cards should intelligently reposition around it.

---

# Add Module Behaviour

When a new module card is added:

- Place it in the nearest valid available masonry position.
- Use its approved width.
- Allow its height to follow its content.
- Repack surrounding cards.
- Avoid creating unnecessary empty space.
- Do not redesign the Add Module experience.

---

# Remove Module Behaviour

When a card is removed:

- Recalculate the available workspace space.
- Move remaining cards upward where appropriate.
- Fill valid gaps.
- Compact the workspace automatically.
- Do not leave a large empty area where the removed card was.

---

# Workspace Saving

When the employee saves a workspace:

Save the complete masonry arrangement, including:

- Card order
- Column placement
- Card width or span
- Card position
- Card visibility
- Custom workspace configuration

When the employee switches back to a saved workspace:

- Restore the exact saved masonry arrangement.
- Do not automatically reorder the saved cards.
- Do not change the saved card positions.

---

# Responsive Behaviour

Maintain the approved responsive layouts:

## Desktop — 1440px

- Use the existing desktop workspace width.
- Use the approved desktop card widths.
- Allow cards of different heights to pack vertically.
- Maintain consistent grid gaps.

## Tablet — 768px

- Recalculate the masonry layout for the tablet column structure.
- Preserve the intended tablet card widths.
- Prevent overlap and horizontal overflow.
- Repack cards efficiently.

## Mobile

- Use the approved mobile card widths.
- Stack or pack cards according to the available mobile width.
- Maintain clear reading order.
- Prevent horizontal scrolling.
- Keep drag-and-drop accessible.

Do not copy the desktop masonry positions directly onto tablet or mobile.

Each breakpoint should calculate a valid responsive layout while preserving the employee’s intended card order.

---

# Accessibility and Usability

Ensure:

- Cards remain easy to scan.
- Visual order remains understandable.
- Keyboard navigation follows a logical order.
- Drag-and-drop has an accessible alternative.
- Click and tap interactions remain functional.
- No information is revealed only on hover.
- Card controls remain visible and accessible.

---

# Important Constraint

Do not turn the workspace into a freeform canvas.

Do not allow cards to be placed at arbitrary pixel positions.

Use a structured column-based masonry system with intelligent packing.

The layout must remain:

- Organised
- Predictable
- Professional
- Responsive
- Easy to scan
- Easy to customise

---

# Final Validation

Verify that:

✓ Cards can have different heights.

✓ Cards retain their approved widths.

✓ Shorter cards do not create unnecessary empty space.

✓ Cards below move upward into valid gaps.

✓ The workspace remains compact.

✓ Cards remain aligned to the column structure.

✓ Drag-and-drop works across the workspace.

✓ Moving a card intelligently repacks surrounding cards.

✓ Added cards fit into the nearest valid space.

✓ Removing a card compacts the layout.

✓ Saved workspaces retain their masonry arrangement.

✓ Desktop, tablet and mobile render correctly.

✓ No cards overlap.

✓ No cards overflow.

✓ No existing visual design has been changed.

This is a masonry layout behaviour update only.