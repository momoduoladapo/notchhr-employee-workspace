# Employee Workspace — Fixed Card Dimensions and Smart Grid Reflow

The current Employee Workspace design is approved.

Do not redesign the workspace.

Do not change:

- Card visual design
- Card content
- Card styling
- Typography
- Colours
- Icons
- Header
- Navigation
- Existing workspace functionality
- Existing card sizes or proportions
- Responsive design

Do not add or remove cards.

This update is only for the drag-and-drop grid behaviour.

---

# Fixed Card Dimensions

Every workspace card must retain its assigned grid dimensions.

Each card should have a fixed:

- Grid width
- Column span
- Minimum width
- Maximum width
- Grid footprint

When a card is moved, it must retain its complete approved width and grid span.

Do not automatically shrink a card after it is moved.

Do not stretch a card to fill an unrelated empty area.

Do not change a card’s width based only on its new row.

The card should move as one complete unit with its original grid footprint.

---

# Card Movement

When an employee drags a card to another position:

- Move the complete card.
- Preserve its assigned width.
- Preserve its column span.
- Preserve its approved proportions.
- Preserve its internal layout.
- Preserve its content arrangement.

The moved card must fully occupy its valid destination space.

Do not compress the moved card.

Do not allow the moved card to become narrower because it has entered another row.

Do not allow the moved card to overlap another card.

---

# Smart Grid Reflow

After a card is moved:

- Recalculate the available grid space.
- Allow the moved card to occupy its complete grid footprint.
- Automatically reposition the remaining cards around it.
- Move other cards into valid available positions.
- Preserve each remaining card’s assigned dimensions.
- Maintain consistent gaps between cards.
- Remove unintended empty spaces where possible.

The other cards should adapt their **positions**, not change their approved widths.

Cards should reflow naturally based on the available grid space.

---

# Example Behaviour

If a wide card is moved from one row to another:

- The wide card must retain its full approved width.
- The destination row must create enough space for the complete card.
- Other cards should move or reflow to valid positions.
- Cards that no longer fit should move naturally to the next available position or row.
- The wide card must not be compressed to fit beside other cards.

If a smaller card is moved:

- Keep its existing fixed width.
- Allow other cards to fill valid remaining grid positions.
- Do not stretch the smaller card to fill the entire row.

---

# Grid Rules

Use one connected workspace grid.

Do not treat each row as a separate fixed container.

The grid must support:

- Cross-row card movement
- Automatic card reflow
- Fixed card dimensions
- Consistent grid gaps
- Valid placement
- Responsive reflow

The grid should determine where cards fit after movement.

Do not use freeform or absolute positioning.

Do not allow cards to be placed on top of one another.

---

# Empty Space Behaviour

When a card is moved:

- Allow the moved card to occupy its full assigned space.
- Reflow other cards into valid available spaces.
- Avoid unnecessary gaps.
- Do not stretch cards merely to remove empty space.
- Do not alter fixed card dimensions.

If a temporary empty area is unavoidable because of the card grid spans, preserve the grid structure rather than distorting cards.

---

# Drag Preview

While dragging:

- Show the card at its full assigned width.
- Show its complete grid footprint.
- Display an accurate destination placeholder.
- Make it clear how much space the card will occupy after dropping.
- Reflow surrounding cards in the preview.

The drag preview must accurately match the card’s final size after it is dropped.

---

# Responsive Behaviour

Maintain the approved responsive card rules for:

- Desktop — 1440px
- Tablet — 768px
- Mobile

Each breakpoint may use its own predefined card dimensions and grid spans.

Within each breakpoint:

- Card dimensions must remain fixed.
- Moving a card must not resize it.
- Other cards must reflow around it.
- No card may overflow outside the viewport.
- No card may overlap another card.
- No horizontal scrolling should be introduced.

Do not simply use Desktop card widths on Mobile.

Use the approved responsive card dimensions for each screen size.

---

# Preserve the Existing Design

Do not change:

- Card order by default
- Card dimensions before user interaction
- Card visual appearance
- Card content
- Dashboard layout
- Header
- Navigation
- Workspace Management dropdown
- Save Workspace flow

Only update the drag-and-drop layout logic.

---

# Final Validation

Before completing the update, verify:

✓ Every card retains its assigned width when moved.

✓ Every card retains its assigned grid span when moved.

✓ A moved card occupies its complete destination space.

✓ Cards are never compressed to fit a new row.

✓ Cards are never stretched to fill empty space.

✓ Other cards reposition appropriately around the moved card.

✓ Cards can move across rows.

✓ The workspace remains one connected grid.

✓ No cards overlap.

✓ No cards overflow.

✓ Grid gaps remain consistent.

✓ The approved workspace design remains unchanged.

This is a **fixed-card-dimension and intelligent grid-reflow update only**.