# Update Workspace Management Module List by Active Plan

Keep the current Employee Workspace design and the unified Workspace and Module Management feature exactly as they are.

Do not redesign:

- Employee Workspace
- Workspace Management interface
- Workspace selector
- Module list layout
- Checkbox or toggle controls
- Identity Card protection
- Card styling
- Workspace layout
- Drag-and-drop
- Save Workspace
- Responsive behaviour

Only update the module list so that it displays modules according to the organisation’s active plan.

---

## Plan-Respecting Module List

The modules displayed inside **Workspace Management** must be specific to the organisation’s active plan.

Do not show every available product module to every employee.

For each plan:

- Display only modules included in that plan.
- Display only modules the employee is authorised to use.
- Exclude modules that are unavailable in the active plan.
- Do not show unavailable modules at the bottom of the module list.
- Do not show unavailable modules in another column.
- Do not show unavailable modules after scrolling.

The Workspace Modules list must dynamically match the modules available in the active plan.

---

## Module Visibility Controls

For modules included in the active plan:

- Display them in the Workspace Modules list.
- Allow employees to check or uncheck optional modules.
- Update the workspace immediately when a module is checked or unchecked.
- Keep the existing Save Workspace behaviour.

For modules not included in the active plan:

- Do not display them in Workspace Management.
- Do not display them as disabled.
- Do not display them as locked.
- Do not display them with reduced opacity.
- Do not display upgrade messaging.
- Do not display pricing.
- Do not display purchase actions.
- Do not display “Contact Admin” or “Request Access” actions.

Unavailable modules must be completely absent from the employee-facing Workspace Management interface.

---

## KPI Summary Rule

The **KPI Summary** module must not appear in:

- Basic Plan Workspace
- Standard Plan Workspace
- Basic Plan Workspace Management
- Standard Plan Workspace Management
- Basic Plan module visibility list
- Standard Plan module visibility list

Do not display KPI Summary as locked, disabled or unavailable.

Only display KPI Summary in plans where it is included.

---

## Identity Card Exception

The Identity Card remains required in every plan.

Inside Workspace Management:

- Always display the Identity Card.
- Keep it selected.
- Keep its checkbox or toggle disabled.
- Display the existing subtle lock indicator.
- Do not allow it to be hidden or removed.

Do not change the current Identity Card behaviour.

---

## Dynamic Plan Synchronisation

The Employee Workspace and Workspace Management must use the same plan availability source.

This means:

> A module can appear in Workspace Management only if it is available in the employee’s active plan.

Do not maintain separate or conflicting module lists.

Do not allow a module to appear in Workspace Management if its card cannot appear in the Employee Workspace.

Do not allow a module card to appear in the Employee Workspace if it is absent from the active plan.

The workspace and Workspace Management must always remain synchronised.

---

## Plan Change Behaviour

When the HR Administrator purchases or activates a new plan or module:

- Add newly available modules to the employee’s Workspace Management list.
- Allow authorised employees to select or hide those modules.
- Make the modules available in the Employee Workspace.
- Do not automatically add the new modules to every employee’s workspace unless required by existing product rules.

When the HR Administrator removes or changes a plan:

- Remove unavailable modules from the Employee Workspace.
- Remove unavailable modules from Workspace Management.
- Remove unavailable modules from saved workspace configurations.
- Reflow the workspace without empty gaps.
- Do not display unavailable placeholders.

---

## Responsive Consistency

Apply the same plan-specific module list at:

- Desktop — 1440px
- Tablet — 768px
- Mobile

The active plan must display the same authorised module set across all screen sizes.

Do not allow unavailable modules to appear at a different breakpoint.

---

## Final Validation

Verify that:

✓ Workspace Management displays only modules included in the active plan.

✓ The Employee Workspace and Workspace Management use the same module availability rules.

✓ Unavailable modules are completely absent from both interfaces.

✓ KPI Summary is absent from Basic and Standard plans.

✓ Available modules remain selectable.

✓ Module selections update the workspace immediately.

✓ The Identity Card remains visible, selected and protected.

✓ Plan changes update both the workspace and Workspace Management.

✓ Desktop, tablet and mobile show the same plan-appropriate modules.

Do not redesign anything.

This is a plan-based Workspace Management module-list update only.