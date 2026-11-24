# Employee Workspace — Enforce Plan-Based Module Availability

Keep the current Employee Workspace design, Workspace Management, Module Management, card styling, layout, responsiveness and interactions exactly as they are.

Do not redesign the Employee Workspace.

Do not change:

- Header
- Greeting section
- Workspace Management
- Workspace selector
- Module visibility controls
- Identity Card protection
- Card styling
- Card layout
- Structured masonry behaviour
- Drag-and-drop
- Save Workspace
- Default Workspace
- App Launcher
- Navigation
- Employee persona data
- Existing responsive behaviour

Only update the plan-based availability rules for Employee Workspace cards.

---

## Core Plan Rule

Employees must only see and use modules that are included in the plan purchased and activated by their organisation’s HR Administrator.

Do not display cards for modules that are unavailable in the organisation’s active plan.

Do not show unavailable cards anywhere in the Employee Workspace.

The HR Administrator is responsible for purchasing or activating additional plans and modules.

Employees cannot upgrade plans themselves.

Employees must not see upgrade prompts.

Employees must not see upgrade buttons.

Employees must not see pricing information.

Employees must not see locked module cards.

Employees must not see unavailable module placeholders.

Employees must not see “Upgrade to unlock” messages.

Employees must not see cards for features that are not included in their organisation’s active plan.

---

# KPI Summary Card

Remove the **KPI Summary** card from:

- Basic Plan
- Standard Plan

The KPI Summary card must not appear:

- In the Basic Plan workspace
- In the Standard Plan workspace
- In the Workspace Modules list for Basic Plan
- In the Workspace Modules list for Standard Plan
- In Add Module
- As a locked card
- As a disabled card
- As an unavailable placeholder

Do not leave an empty space where the KPI Summary card was previously displayed.

Reflow the remaining workspace cards immediately.

Only make KPI Summary available in plans where it is included.

---

# Remove Unavailable Cards From Every Plan

Review every Employee Workspace plan and its available modules.

For each plan:

- Display only cards included in that plan.
- Remove all cards that are not included in that plan.
- Do not render unavailable cards at the bottom of the workspace.
- Do not render unavailable cards after the available workspace content.
- Do not display unavailable cards as disabled.
- Do not display unavailable cards with locks.
- Do not display unavailable cards with reduced opacity.
- Do not display unavailable cards as empty placeholders.
- Do not display unavailable cards with upgrade messages.

Unavailable modules must be completely absent from the employee-facing interface.

---

# Workspace Modules List

The unified Workspace and Module Management feature must display only modules available to the employee’s organisation.

The Workspace Modules list must be dynamically filtered based on the active organisation plan.

Do not show unavailable modules in the checkbox or toggle list.

Do not show unavailable modules as:

- Disabled checkboxes
- Disabled toggles
- Locked rows
- Greyed-out items
- Upgrade options
- Hidden feature indicators

The employee should only manage modules that they are authorised to use.

---

# Employee Experience

Employees should have a clean workspace containing only:

- Modules included in their organisation’s active plan
- Modules enabled or made available by their HR Administrator
- The required Identity Card

The employee should not be asked to make plan or purchasing decisions.

The employee should not be shown features they cannot access.

The employee should not be directed to upgrade.

The employee should not see any pricing or subscription messaging.

---

# HR Administrator Responsibility

Plan upgrades and additional module purchases belong to the HR Administrator.

If an organisation needs an additional module:

- The HR Administrator purchases or activates the required plan or module.
- The module becomes available to authorised employees.
- The employee can then see and manage the module in Workspace Management.

Do not add any employee-facing upgrade action.

Do not add an employee-facing purchase action.

Do not add an employee-facing “Request Upgrade” action.

---

# Dynamic Plan Updates

When the HR Administrator activates a new plan or module:

- Make the newly available module accessible to authorised employees.
- Add it to the Workspace Modules list.
- Allow the employee to show or hide it using the existing module visibility controls.
- Do not automatically force the new module onto the employee’s workspace unless the existing product rules require it.

When a module is no longer included in the active plan:

- Remove it from the Employee Workspace.
- Remove it from the Workspace Modules list.
- Remove it from saved workspace configurations.
- Reflow the workspace cleanly.
- Do not leave an empty space.
- Do not display an unavailable placeholder.

---

# Identity Card Exception

The Identity Card remains required.

The Identity Card must:

- Always be visible.
- Always remain included.
- Never be removable.
- Never be hidden.
- Remain protected in Workspace Management.

Do not change the existing Identity Card behaviour.

---

# Workspace Reflow

Whenever unavailable cards are removed:

- Reflow the remaining cards immediately.
- Maintain the existing structured workspace layout.
- Maintain consistent spacing.
- Do not leave empty spaces.
- Do not create unnecessary rows.
- Do not redesign the workspace.

---

# Responsive Behaviour

Apply these plan rules consistently at:

- Desktop — 1440px
- Tablet — 768px
- Mobile

The same plan must show the same available modules across all screen sizes.

Do not allow unavailable cards to appear at another breakpoint.

Do not allow unavailable cards to render below the visible workspace on tablet or mobile.

---

# Final Validation

Verify that:

✓ KPI Summary is removed from Basic Plan.

✓ KPI Summary is removed from Standard Plan.

✓ KPI Summary is absent from the Basic and Standard Workspace Modules lists.

✓ Only plan-available cards appear in each Employee Workspace.

✓ Unavailable cards are removed from the bottom of the workspace.

✓ Unavailable cards are not displayed as locked or disabled.

✓ Unavailable cards are not displayed as placeholders.

✓ Employees do not see upgrade prompts.

✓ Employees do not see upgrade buttons.

✓ Employees do not see pricing or purchase options.

✓ Employees only manage modules included in their organisation’s active plan.

✓ HR Administrators remain responsible for plan purchases and upgrades.

✓ Newly purchased modules become available to authorised employees.

✓ The Identity Card remains permanently visible and protected.

✓ Workspace cards reflow cleanly after unavailable cards are removed.

✓ The same plan availability is enforced on desktop, tablet and mobile.

Do not redesign anything.

This is a plan-based module visibility update only.