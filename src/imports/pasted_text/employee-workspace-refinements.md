# NOTCHHR EMPLOYEE WORKSPACE — FINAL CORRECTION, FLOW AUDIT & UX REFINEMENT

IMPORTANT:

Do not redesign or rebuild the Employee Workspace.

Do not change the approved visual direction, design system, card styling, typography, colours, existing content, or overall product structure unless explicitly instructed below.

This is a focused implementation correction, workspace-flow audit, and usability refinement.

Review the complete Employee Workspace before making changes, including:

- Desktop
- Tablet
- Mobile
- All licence-plan scenarios
- Workspace Management
- Workspace dropdowns
- Card menus
- Module visibility controls
- Save and reset flows
- Drag-and-drop
- Workspace switching
- Payroll tabs
- All employee-facing menus and actions

Fix only the issues listed in this prompt.

---

# 1. REMOVE ALL EMPLOYEE-FACING UPGRADE CONTENT

Remove every upgrade-related item from the Employee Workspace.

Perform a complete audit of all visible and conditional UI, including:

- Workspace Management dropdown
- Workspace selector dropdown
- Header menus
- Profile menus
- Three-dot menus
- Card overflow menus
- Module Management
- Add Module
- Show/Hide Module controls
- Plan-related menus
- Feature-gated cards
- Locked feature cards
- Empty states
- Mobile menus
- Tablet menus
- Desktop menus
- Hidden or conditional menu branches

Remove all employee-facing references or actions related to:

- Upgrade
- Upgrade Plan
- Upgrade Now
- Upgrade to Unlock
- Unlock Feature
- View Plans
- Compare Plans
- Plan Pricing
- Purchase Plan
- Subscribe
- Change Plan
- Premium Upgrade
- Upgrade Account
- Any equivalent upgrade or sales CTA

Employees must never be asked to upgrade, purchase, compare, subscribe to, or manage licence plans.

Do not replace upgrade content with another promotional item.

Unavailable modules must simply be absent.

Do not show unavailable modules as:

- Locked cards
- Disabled cards
- Feature-gated cards
- Upgrade cards
- Placeholder cards

Also check all dropdown menus carefully. Remove upgrade-related menu items from every employee-facing dropdown.

---

# 2. PLAN-SPECIFIC MODULE VISIBILITY

Review the Employee Workspace separately for:

- HR Basic and Payroll
- HR Standard
- HR Premium

For each plan:

- Display only modules available to that plan.
- Display the approved universal employee-information modules.
- Remove modules that are unavailable to the active plan.
- Do not reserve empty spaces for unavailable modules.
- Do not display unavailable modules in Workspace Management.
- Do not display unavailable modules in Add Module.
- Do not show upgrade or locked states for unavailable modules.

Do not invent new Employee Workspace cards merely because a module exists in the licence plan.

Only use approved existing workspace cards and the requirements already provided.

---

# 3. FLUID CARD-WIDTH WORKSPACE SYSTEM

Improve the workspace layout using a controlled fluid card-width system.

This is a layout-behaviour refinement, not a card redesign.

Use the existing grid system or CSS Grid equivalent and apply appropriate minimum and maximum widths to card types.

The workspace should:

- Fill available horizontal space naturally.
- Reflow cards intelligently when modules are hidden or shown.
- Avoid unnecessary empty spaces.
- Avoid scattered or uneven card placement.
- Avoid fixed rows that leave large blank areas.
- Maintain consistent horizontal and vertical spacing.
- Keep card edges visually aligned.
- Preserve a clean and balanced workspace.
- Adapt properly to the number of cards available in each plan.

Use controlled sizing rules such as:

- `min-width` values that prevent cards from becoming too narrow.
- `max-width` values that prevent cards from becoming excessively wide.
- Flexible grid columns that use available space efficiently.
- Appropriate spans for larger or information-heavy cards.

Do not force every card to have the same width.

Do not force every card to have the same height.

Preserve the intended hierarchy of:

- Compact utility cards
- Standard information cards
- Wider data-heavy cards

The workspace should feel intentionally arranged for each plan rather than looking like cards were placed randomly.

When a card is:

- Hidden
- Shown
- Removed
- Added
- Dragged
- Moved to another position
- Restored through Reset Workspace
- Loaded from a saved workspace

…the grid should reflow smoothly and fill available space without creating unnecessary gaps.

Do not create extra rows simply to preserve old positions.

---

# 4. PAYROLL CARD — LOANS AND RENT RELIEF

Loans and Rent Relief are not currently visible in the Payroll card.

Fix this.

The existing Payroll card must contain these visible internal tabs:

1. Payroll
2. Payroll History
3. Pension History
4. Tax History
5. Loans
6. Rent Relief

All six must be inside the same Payroll card.

Do not create separate workspace cards for:

- Payroll History
- Pension History
- Tax History
- Loans
- Rent Relief

Do not redesign or relocate the Payroll card.

Do not unnecessarily increase the card dimensions.

---

## Loans

Ensure the Loans tab is visible and testable in the current prototype/demo scenario.

Use representative prototype data where necessary so stakeholders can review the design.

Do not invent backend functionality.

Use relevant loan information only, such as:

- Loan name or type
- Original loan amount
- Outstanding balance
- Repayment status
- Repayment progress
- Next repayment date, where available

Do not show irrelevant or empty loan information in a real employee scenario.

---

## Rent Relief

Ensure the Rent Relief tab is visible and testable in the current prototype/demo scenario.

Use representative prototype data where necessary so stakeholders can review the design.

Do not invent backend functionality.

Use relevant Rent Relief information only, such as:

- Rent Relief status
- Approved or available amount
- Amount used or remaining
- Relevant repayment or deduction information
- Relevant dates or status

Do not show irrelevant or empty Rent Relief information in a real employee scenario.

---

# 5. USE NIGERIAN NAIRA

All financial values displayed in the Employee Workspace must use Nigerian Naira.

Use:

**₦**

Do not display:

- $
- USD
- US Dollars
- Any foreign currency

Audit all financial areas, including:

- Payroll
- Payroll History
- Loans
- Rent Relief
- Payslip-related information
- Loan balances
- Repayment amounts
- Deductions
- Any financial summaries

Use Nigerian-style currency formatting consistently.

Example:

- ₦250,000
- ₦1,500,000
- ₦45,000

Do not change non-financial information.

---

# 6. WORKSPACE MANAGEMENT — RESET WORKSPACE

Ensure users can reset their workspace successfully.

The existing **Reset Workspace** action must:

- Be visible and easy to find.
- Be available in the Workspace Management flow.
- Restore the active workspace to its correct default configuration.
- Restore the default card arrangement.
- Restore the default visible modules for the employee’s active plan.
- Restore the correct plan-specific workspace structure.
- Remove user-made layout changes from the active workspace when confirmed.
- Work correctly after cards have been moved, hidden, shown, added, or removed.

Do not remove:

- Create Workspace
- Save Workspace
- Rename Workspace
- Delete Workspace
- Workspace switching
- Drag-and-drop
- Show/Hide Module controls

---

## Reset Confirmation

Use a clear confirmation step before resetting.

The confirmation should explain that:

> Resetting will restore the default workspace layout and module arrangement for this plan.

Use clear actions such as:

- Cancel
- Reset Workspace

Do not use destructive language unnecessarily.

Do not redesign the Workspace Management interface.

---

# 7. COMPLETE WORKSPACE MANAGEMENT FLOW AUDIT

Audit the full Workspace Management experience from start to finish.

Test and verify:

1. Open Workspace Management.
2. Open the workspace dropdown.
3. Select an existing workspace.
4. Create a new workspace.
5. Enter a workspace name.
6. Save a workspace.
7. Leave a workspace unnamed and verify the existing untitled naming behaviour.
8. Rename a workspace.
9. Delete a workspace.
10. Switch between workspaces.
11. Show a module.
12. Hide a module.
13. Add an available module.
14. Remove an optional module.
15. Confirm the Identity/Profile Card cannot be removed.
16. Drag and rearrange cards.
17. Move cards across available grid positions.
18. Save the new arrangement.
19. Reload or switch away and return.
20. Verify the saved arrangement persists.
21. Reset the workspace.
22. Confirm the correct default layout returns.
23. Verify the active plan still controls module availability.

Fix any broken, incomplete, inconsistent, or non-functional part of this flow.

Do not add new Workspace Management features.

Do not redesign the feature.

Only make the existing flow reliable, clear, and functional.

---

# 8. WORKSPACE MANAGEMENT TEXT SIZE

The current text in Workspace Management appears too small.

Improve readability while preserving the approved visual style.

Increase text sizes appropriately for:

- Workspace names
- Section headings
- Module names
- Descriptions
- Labels
- Dropdown items
- Buttons
- Rename input labels
- Reset Workspace information
- Confirmation text
- Empty-state text

The interface should be easy to scan in a busy workspace environment.

Use clear hierarchy.

Do not make all text large.

Do not overcrowd the interface.

Do not change the overall Workspace Management structure.

Maintain:

- Good contrast
- Readable line height
- Clear spacing
- Comfortable touch targets
- Consistent typography

Ensure the text remains readable at:

- Desktop
- Tablet
- Mobile

---

# 9. WORKSPACE MANAGEMENT USABILITY

Review the Workspace Management UI for:

- Text that is too small
- Buttons that are too close together
- Poor spacing
- Unclear labels
- Unclear active states
- Difficult-to-find actions
- Poor dropdown behaviour
- Clipped content
- Overflow problems
- Actions that are difficult to use
- Inconsistent interaction states

Improve only the usability issues found.

Do not redesign the feature.

Preserve the existing structure and design language.

---

# 10. FINAL VALIDATION

Before completing, validate the following.

## Upgrade Removal

Confirm that no employee-facing upgrade content remains in:

- Workspace dropdowns
- Header menus
- Profile menus
- Card menus
- Workspace Management
- Module Management
- Add Module
- Feature-gated cards
- Empty states
- Desktop
- Tablet
- Mobile

## Plans

Validate:

### HR Basic and Payroll

- Only eligible modules appear.
- The workspace is clean and balanced.
- No unavailable-module placeholders exist.
- No upgrade UI exists.

### HR Standard

- Only eligible modules appear.
- The workspace is clean and balanced.
- No unavailable-module placeholders exist.
- No upgrade UI exists.

### HR Premium

- Only eligible modules appear.
- The workspace is clean and balanced.
- No unavailable-module placeholders exist.
- No upgrade UI exists.

## Fluid Grid

Confirm:

- Cards fill available space naturally.
- No unnecessary gaps exist.
- Cards do not become too narrow.
- Cards do not become excessively wide.
- Card hierarchy is preserved.
- The layout reflows correctly after module changes.
- The layout reflows correctly after drag-and-drop.
- The layout remains clean across plans.

## Payroll

Confirm:

- All six tabs are visible in the prototype.
- Loans is visible and contains representative Naira data.
- Rent Relief is visible and contains representative Naira data.
- All financial values use ₦.
- All views remain inside one Payroll card.
- No separate financial-history cards appear on the workspace.

## Workspace Management

Confirm:

- Text is readable.
- Create works.
- Save works.
- Rename works.
- Delete works.
- Workspace switching works.
- Show/Hide modules works.
- Drag-and-drop works.
- Saved layouts persist.
- Reset Workspace works.
- Reset restores the correct default layout for the active plan.
- Identity/Profile Card remains protected.

## Responsive

Validate:

- Desktop
- Tablet
- Mobile

Do not introduce responsive regressions.

---

# FINAL PROTECTION RULE

Do not redesign the Employee Workspace.

Do not rebuild the workspace.

Do not change unrelated content.

Do not add unrelated modules.

Do not remove approved functionality.

Do not alter the approved design language.

Only:

1. Remove all employee-facing upgrade content, including dropdown items.
2. Correct plan-specific module visibility.
3. Apply a controlled fluid card-width system using appropriate minimum and maximum widths.
4. Make Loans and Rent Relief visible inside the Payroll card.
5. Use Nigerian Naira consistently for all financial values.
6. Make Reset Workspace visible and fully functional.
7. Audit and fix the complete Workspace Management flow.
8. Improve Workspace Management text readability and usability.