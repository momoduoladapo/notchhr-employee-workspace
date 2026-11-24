SMART FLUID WORKSPACE GRID — REBUILD THE LAYOUT ENGINE

I want you to rebuild the Employee Workspace layout behaviour.

DO NOT change:
- Any existing module
- Any existing card content
- Any data
- Any plan/module logic
- Any copy/text
- Any card functionality
- Any visual design of the cards unless required to support the new layout behaviour

The task is specifically to replace the current rigid/manual 12-column span logic with a genuinely content-aware smart fluid packing system.

REFERENCE BEHAVIOUR

Use the smart-grid reference I provided as the conceptual behaviour.

The reference demonstrates that items of different sizes can intelligently pack together while maintaining a consistent gap.

For our Employee Workspace, the equivalent should be:

CONTENT-AWARE SMART FLUID GRID

1. WORKSPACE WRAPPER

The workspace has a defined outer wrapper.

Treat that wrapper as the available layout area.

The cards must intelligently use the available horizontal space inside that wrapper.

Use:

- Horizontal gap: 16px
- Vertical gap: 16px

These gaps must remain consistent.

Do not introduce arbitrary spacing between cards.

Do not leave large unexplained empty areas inside a row when the available space can be used by another card.

--------------------------------------------------
2. REMOVE THE CURRENT RIGID WIDTH MODEL
--------------------------------------------------

The current implementation uses manually assigned 12-column spans and predefined card spans.

Do not continue using that as the primary layout mechanism.

Do not solve this by simply changing the existing span numbers.

The layout must become content-aware and fluid.

Cards should not have a fixed width simply because a particular plan or card has been assigned a predefined grid span.

The final width should be calculated from:

- the card's content requirements
- its minimum usable width
- its preferred width
- the available wrapper width
- the cards currently occupying the same row
- the 16px grid gap
- the current position/order of the cards

--------------------------------------------------
3. CONTENT DETERMINES THE MINIMUM WIDTH
--------------------------------------------------

This is the most important rule.

Every card must have a minimum usable width.

The minimum width should be based on what the card needs to display its content correctly.

Example:

If Payroll requires 500px for its content to display properly:

Payroll minimum width = 500px.

The layout must NEVER reduce Payroll below 500px simply to make another card fit.

If Employee Directory requires 420px:

Employee Directory minimum width = 420px.

If another simple card only requires 250px:

That card may have a minimum width of approximately 250px.

Do NOT use one universal minimum width for every card.

Different cards have different content requirements.

--------------------------------------------------
4. CONTENT MUST NOT SHRINK
--------------------------------------------------

Do not allow the layout engine to solve spacing problems by shrinking the content.

This includes:

- table columns
- dates
- buttons
- badges
- labels
- scores
- employee names
- status indicators
- inline-flex elements
- navigation/tab labels
- card headings
- important values
- action controls

Content should remain readable.

Avoid:

- unnecessary text wrapping
- collapsed controls
- compressed tables
- overlapping elements
- squeezed buttons
- truncated important information
- data becoming visually tiny

The card should change size before its content is compromised.

Think:

CONTENT → determines minimum card width

NOT:

GRID → forces content into an arbitrary width

--------------------------------------------------
5. CARDS SHOULD HUG THEIR CONTENT
--------------------------------------------------

Do not make every card unnecessarily wide.

If a card only needs 300px to display its content properly, do not automatically stretch it to 1,000px.

A card should use its preferred/content width when possible.

However, if additional available space can be intelligently given to another card in the same row, use that space.

The objective is:

CONTENT-AWARE WIDTH

not:

EQUAL WIDTH

and not:

MAXIMUM WIDTH

--------------------------------------------------
6. AVAILABLE SPACE SHOULD BE DISTRIBUTED INTELLIGENTLY
--------------------------------------------------

Example:

Workspace wrapper:

1032px

Card A requires:

500px minimum

Gap:

16px

Remaining space:

1032 - 500 - 16 = 516px

Therefore another card can use up to 516px if that card can meaningfully use the additional space.

But if the second card only needs 250px and another card can occupy the remaining space:

250px + 16px + another card

should be preferred over unnecessarily stretching the 250px card.

The layout should continuously attempt to make the row composition efficient.

Do not distribute free space equally by default.

Distribute it according to card requirements.

--------------------------------------------------
7. SMART PACKING
--------------------------------------------------

Cards should behave like a smart packed grid.

Think of the reference image I provided:

Different-sized items pack together naturally.

The same principle should apply to workspace cards.

The system should:

1. Determine each card's minimum usable width.
2. Determine each card's preferred width.
3. Look at the available wrapper width.
4. Determine which cards can coexist on the same row.
5. Respect the 16px gap.
6. Give each card enough width to display its content correctly.
7. Use remaining space intelligently.
8. Move cards to the next row when they cannot fit without violating their minimum width.
9. Recalculate the layout whenever cards move.

Do not force cards into equal-width columns.

--------------------------------------------------
8. DRAG AND DROP MUST TRIGGER A NEW LAYOUT
--------------------------------------------------

Users must be able to drag a card from its current position and move it anywhere within the workspace.

When a card is moved:

- The layout must recalculate.
- Other cards must reflow.
- Row composition must update.
- Available widths must be recalculated.
- Cards may grow.
- Cards may reduce in width.
- Cards may move between rows.
- Cards may occupy newly available space.

Do not preserve the old width simply because the card previously occupied that width.

The layout should respond to the new arrangement.

Example:

If moving Card A creates enough room beside Card B, Card B may expand.

If moving Card A removes available space from Card B, Card B may reduce — but NEVER below its content minimum.

--------------------------------------------------
9. NO UNNECESSARY EMPTY SPACE
--------------------------------------------------

Do not leave large empty areas inside a row when another card could intelligently use that space.

However:

Do not stretch a card merely to eliminate every pixel of empty space.

There is a difference between:

GOOD:

Card uses its preferred width and the layout remains clean.

BAD:

Card is stretched unnecessarily to fill the entire row.

The goal is balanced, professional packing.

--------------------------------------------------
10. CARD HEIGHT
--------------------------------------------------

Card height should remain content-driven.

Do not force every card in a row to have the same height.

Cards may have different heights.

Maintain:

16px vertical spacing.

Do not stretch short cards simply because a neighbouring card is taller.

This should behave more like a professional masonry/smart-packed workspace than a rigid dashboard grid.

--------------------------------------------------
11. PLAN-SPECIFIC WORKSPACES
--------------------------------------------------

Apply the same smart layout engine to:

HR Basic
HR Standard
HR Premium

Do not create separate hardcoded width systems for each plan.

The cards available in each plan will naturally produce different compositions.

The same layout engine should intelligently calculate the best arrangement for whichever modules are present.

Therefore:

Basic may produce one arrangement.

Standard may produce another.

Premium may produce another.

That is expected.

The cards do NOT need to have identical widths across plans.

The goal is:

BEST FIT FOR THE CURRENT CONTENT AND AVAILABLE SPACE.

--------------------------------------------------
12. IMPORTANT EXAMPLES FROM THE CURRENT WORKSPACE
--------------------------------------------------

The following cards should be allowed to become wider when their content requires it:

- Payroll
- Employee Directory
- Employees on Leave
- Performance
- Learning
- Disciplinary & Grievance History
- My Competency
- Document Hub

In particular:

Payroll contains multiple tabs and financial information.

Employee Directory contains employee information, recently contacted employees and chat actions.

Disciplinary & Grievance History contains a multi-column table.

My Competency contains structured competency data.

These cards must not be squeezed simply because the current grid span is too small.

--------------------------------------------------
13. TABLE CONTENT IS A HARD CONSTRAINT
--------------------------------------------------

For cards containing tables:

Do not allow the table to become so narrow that:

- columns collapse unnecessarily
- values wrap awkwardly
- headings become unreadable
- data becomes visually compressed
- important values are truncated

The table's minimum usable width must influence the card's minimum width.

For example:

Disciplinary & Grievance History

contains:

Type
Ref. No.
Date
Disciplinary
Penalty

The card must have enough width to display this information professionally.

Do not force this table into a narrow card simply because a predefined grid span says it should fit there.

--------------------------------------------------
14. INLINE CONTENT
--------------------------------------------------

For content using inline-flex or horizontal layouts:

Treat the natural width of the content as an important layout constraint.

Do not allow important inline content to shrink unnecessarily.

Examples:

- badges
- status labels
- dates
- action buttons
- tab labels
- employee metadata
- scores
- table headings

If content requires more horizontal room, allow the card to grow.

--------------------------------------------------
15. RESPONSIVE BEHAVIOUR
--------------------------------------------------

The same content-aware logic must work across desktop widths.

Do not rely on only one desktop breakpoint.

As the viewport changes:

- available wrapper width changes
- the grid recalculates
- cards re-pack
- cards grow/shrink within their allowed range
- cards move to another row when necessary

Never shrink content simply to preserve the previous desktop arrangement.

At narrower widths, cards should move to new rows naturally.

--------------------------------------------------
16. DO NOT USE FIXED CARD SPANS AS THE DECISION MAKER
--------------------------------------------------

Do not use:

Card X = 4 columns
Card Y = 6 columns
Card Z = 8 columns

as the fundamental layout logic.

Instead use something conceptually equivalent to:

minimum usable width
preferred width
maximum useful width

The grid should determine the actual final width based on available space.

--------------------------------------------------
17. EXISTING DRAG/DROP EXPERIENCE
--------------------------------------------------

Preserve the existing drag-and-drop workspace functionality.

Do not remove:

- Edit Mode
- Dragging
- Saving layouts
- Restoring layouts
- Existing workspace management

Only change the underlying layout calculation so that the cards intelligently reflow after movement.

--------------------------------------------------
18. IMPORTANT: DO NOT CHANGE THE DESIGN
--------------------------------------------------

This task is about layout behaviour.

Do NOT redesign the cards.

Do NOT change:

- typography
- colours
- borders
- shadows
- icons
- card content
- data
- labels
- buttons
- modules
- plan logic

The existing cards should remain visually as designed.

Only their positioning, width allocation, packing and responsive behaviour should change.

--------------------------------------------------
19. VALIDATION
--------------------------------------------------

After implementing the new layout engine, test it using the actual Employee Workspace cards.

Test:

HR Basic
HR Standard
HR Premium

At minimum test:

- Payroll
- Employee Directory
- Employees on Leave
- Birthday/Events card
- Disciplinary & Grievance History
- My Competency
- Document Hub
- Performance
- Learning

Test multiple drag-and-drop arrangements.

For every arrangement verify:

✓ 16px horizontal gap
✓ 16px vertical gap
✓ No card below its content minimum
✓ No important content shrinking
✓ No unnecessary card stretching
✓ No large unexplained empty areas
✓ Tables remain readable
✓ Inline content remains readable
✓ Cards reflow after dragging
✓ Cards can grow when useful
✓ Cards can reduce when possible
✓ Different cards can have different widths
✓ Different plans can naturally produce different layouts
✓ Workspace remains clean and professional

IMPORTANT:

Do not simply make the existing 12-column system more flexible.

Replace the current manual span-driven behaviour with a genuine content-aware smart packing system.

Before changing the implementation, inspect the current layout engine and identify exactly which code controls:

- column spans
- minimum/maximum widths
- card placement
- drag/drop positioning
- row packing
- responsive behaviour

Then modify only the layout engine necessary to achieve the behaviour described above.

Do not change the existing workspace information or module content.

The final result should feel like a professionally designed smart dashboard where cards intelligently find the best available space while always protecting the readability of their content.