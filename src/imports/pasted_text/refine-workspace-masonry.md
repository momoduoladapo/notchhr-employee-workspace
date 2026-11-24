# Refine Employee Workspace Masonry — Structured Alignment and Even Spacing

The Add Module functionality is now working correctly.

Keep the Add Module functionality exactly as it is.

Do not redesign the Employee Workspace.

Do not change:

- Header
- Greeting section
- Workspace Management
- Add Module button
- Add Module catalog
- Existing cards
- Card content
- Card styling
- Card widths
- Colours
- Typography
- Icons
- Drag-and-drop functionality
- Workspace saving
- Responsive layouts

Only refine the current masonry layout.

---

## Core Requirement

The current masonry layout appears scattered and uneven.

Convert it into a **structured, column-aligned masonry grid**.

The workspace must look organised, balanced and professionally arranged.

Cards may have different heights, but they must not appear randomly positioned.

---

## Fixed Column Structure

Use a consistent grid structure at every breakpoint.

### Desktop — 1440px

Use the existing approved workspace column structure.

All cards must align to the same invisible column grid.

Cards must begin and end on valid grid columns.

Do not allow arbitrary horizontal positioning.

### Tablet — 768px

Use the existing approved tablet column structure.

Recalculate card placement for the tablet width.

Do not use desktop positions directly.

### Mobile

Use a clean single-column layout unless the current approved mobile design supports more than one column.

Cards must remain aligned and evenly spaced.

---

## Consistent Horizontal Alignment

All cards must align cleanly across shared columns.

Cards should have:

- Consistent left edges
- Consistent right edges
- Consistent column boundaries
- Equal horizontal gaps

Do not allow cards to appear offset by arbitrary amounts.

Do not use freeform or pixel-based placement.

Do not allow cards to float between columns.

---

## Consistent Vertical Spacing

Use one consistent vertical gap between cards.

Every vertical gap should use the same spacing token.

Do not create:

- Random large spaces
- Uneven gaps
- Cards that appear disconnected
- Cards that are too close together
- Large empty holes

The distance between cards should feel intentional and consistent throughout the workspace.

---

## Structured Masonry Behaviour

Allow cards to have different heights based on their content.

However:

- Keep each card attached to a valid column.
- Stack cards vertically within their assigned columns.
- Move cards upward only into valid aligned positions.
- Preserve consistent gaps.
- Do not place cards in arbitrary empty spaces.
- Do not create a Pinterest-style scattered layout.

The workspace should look like a professional enterprise dashboard, not a social-media content feed.

---

## Balanced Card Placement

When cards are first rendered:

- Distribute cards across the available columns in a balanced way.
- Avoid placing too many cards in one column while another column is mostly empty.
- Avoid creating one extremely tall column.
- Keep the overall workspace visually balanced.
- Preserve the logical reading order as much as possible.

Use intelligent column balancing without making card placement appear random.

---

## Drag-and-Drop Behaviour

When an employee moves a card:

- Snap the card to the valid workspace grid.
- Preserve the card’s approved width.
- Preserve the card’s content.
- Maintain the consistent workspace gap.
- Reflow surrounding cards into aligned positions.
- Keep the workspace compact.
- Maintain visual balance.

Do not allow cards to be dropped at arbitrary pixel positions.

Do not allow cards to become misaligned.

---

## Add Module Behaviour

When a new module is added:

- Place it in the next valid structured masonry position.
- Align it to the existing column system.
- Maintain equal horizontal and vertical gaps.
- Rebalance the layout where necessary.
- Do not place it in a random location.
- Do not create a scattered appearance.

---

## Remove Module Behaviour

When a card is removed:

- Close the resulting gap using the structured column system.
- Move cards upward where appropriate.
- Preserve consistent spacing.
- Maintain column alignment.
- Do not leave large empty holes.

---

## Important Constraint

Do not use freeform masonry.

Do not use arbitrary absolute positioning.

Do not use random placement.

Do not create uneven spacing.

Do not scatter cards across the workspace.

Use a **structured, responsive, column-based masonry grid** with:

- Fixed column boundaries
- Consistent gaps
- Variable card heights
- Grid snapping
- Intelligent vertical packing
- Balanced distribution

---

## Visual Quality Check

The final workspace should feel:

- Organised
- Balanced
- Compact
- Consistent
- Easy to scan
- Professional
- Enterprise-ready

It should not feel:

- Random
- Scattered
- Uneven
- Overpacked
- Like a Pinterest feed
- Like a freeform canvas

---

## Final Validation

Verify that:

✓ Cards align to consistent columns.

✓ Horizontal spacing is equal.

✓ Vertical spacing is equal.

✓ Cards have different heights where required.

✓ Cards do not appear randomly positioned.

✓ Cards do not float between columns.

✓ Cards snap to the grid during drag-and-drop.

✓ Added cards align correctly.

✓ Removed cards cause the layout to compact cleanly.

✓ The workspace remains balanced.

✓ No cards overlap.

✓ No cards overflow.

✓ Add Module remains fully functional.

✓ Existing card design remains unchanged.

✓ Desktop, tablet and mobile all render cleanly.

This is a masonry alignment and spacing refinement only.