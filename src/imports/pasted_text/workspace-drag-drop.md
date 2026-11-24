# Employee Workspace — Fluid Grid and Intelligent Card Packing

Keep the current Employee Workspace design exactly as approved.

Do not redesign:

- Workspace cards
- Card styling
- Card content
- Card dimensions
- Header
- Navigation
- Workspace Management
- Save Workspace functionality
- Existing responsive layouts

Only update the workspace drag-and-drop layout behaviour.

---

## Replace Row-Based Behaviour

Do not treat workspace rows as separate fixed containers.

Do not lock cards into their original rows.

Do not create a new row simply because a card has been moved.

The Employee Workspace must behave as one connected, fluid workspace grid.

Cards must be able to move freely across the entire available workspace area.

---

## Fluid Card Placement

When a user moves a card:

- The card must retain its approved width and height.
- The card must retain its assigned grid span.
- The card must occupy its complete destination space.
- The card must not be compressed.
- The card must not be stretched.
- The card must not overlap another card.

The moved card should take the exact amount of space required by its existing dimensions.

---

## Intelligent Repacking

After a card is moved:

- Recalculate all available spaces in the existing workspace.
- Automatically reposition the other cards.
- Allow cards to move into available gaps.
- Allow smaller cards to fill spaces where they fit.
- Move displaced cards to the nearest valid available position.
- Repack the workspace efficiently.
- Preserve each card’s existing dimensions.

The workspace should behave like a responsive packing grid rather than a collection of fixed rows.

---

## Do Not Create Unnecessary Rows

Do not create additional rows when there is enough available space within the current workspace.

Before adding a new row:

1. Check all available spaces in the existing grid.
2. Reposition cards where they fit.
3. Fill valid gaps with appropriately sized cards.
4. Compact the existing layout.
5. Only create a new row if no valid placement exists.

Do not leave unnecessary empty spaces while creating a new row below.

---

## Existing Workspace Height

Keep the current workspace area compact.

Do not increase the workspace height unnecessarily after moving a card.

Do not add blank rows.

Do not create extra vertical space merely to preserve the original card order.

The workspace should use the existing area efficiently.

---

## Drag Preview

While dragging:

- Display the card at its full approved size.
- Show the exact destination footprint.
- Preview how surrounding cards will move.
- Show the packed layout before the user releases the card.
- Do not show a new row if the card can fit within the current workspace.

The preview should accurately match the final layout.

---

## Card Reflow Rules

When a card is dropped:

- The moved card takes priority at the selected destination.
- Other cards move around it.
- Cards should fill available spaces efficiently.
- Cards should preserve their dimensions.
- The workspace should remain compact.
- The system should minimise empty gaps.
- The system should minimise the creation of new rows.

Do not preserve the previous row assignment.

Only preserve:

- Card size
- Card dimensions
- Card content
- Card styling

---

## Important Constraint

The workspace should not create additional rows merely because a card changes position.

The system must first attempt to:

- Repack the existing cards.
- Shift cards horizontally.
- Shift cards vertically within the existing workspace area.
- Fill available gaps.
- Reorder surrounding cards where necessary.

Only create a new row when the total card footprint cannot fit within the existing workspace area.

---

## Responsive Behaviour

Maintain the approved layouts for:

- Desktop — 1440px
- Tablet — 768px
- Mobile

At each screen size:

- Use the available workspace width efficiently.
- Repack cards within the available grid.
- Preserve the approved card dimensions for that breakpoint.
- Avoid unnecessary new rows.
- Prevent overlap.
- Prevent horizontal overflow.

Do not use the desktop grid dimensions directly on tablet or mobile.

---

## Final Validation

Verify that:

✓ The workspace behaves as one connected fluid grid.

✓ Cards are not locked into individual rows.

✓ A moved card occupies its complete footprint.

✓ Other cards automatically move into available spaces.

✓ Smaller cards fill valid gaps.

✓ Existing space is used before creating a new row.

✓ No unnecessary rows are created.

✓ No unnecessary empty spaces remain.

✓ Cards retain their approved dimensions.

✓ Cards do not overlap.

✓ Workspace height does not increase unnecessarily.

✓ The existing Employee Workspace design remains unchanged.

This is a fluid workspace packing and drag-and-drop behaviour update only.