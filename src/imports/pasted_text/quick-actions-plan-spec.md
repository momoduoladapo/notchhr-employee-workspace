# Employee Workspace — Plan-Specific Quick Actions

Keep the current Employee Workspace design exactly as approved.

Do not redesign:

- Employee Workspace layout
- Dashboard cards
- Quick Actions card design
- Header
- Navigation
- App Launcher
- Workspace Management
- Card sizes
- Card positions
- Typography
- Colours
- Icons
- Responsive layouts

Only update the **Quick Actions content and functionality** so that the actions are tailored to the employee’s active licence plan.

---

## Core Requirement

The Quick Actions card must be plan-aware.

Quick Actions should display only actions that are relevant to:

1. The employee’s active licence plan.
2. Modules available within that plan.
3. Actions the employee is permitted to perform.

Do not display actions for modules that are unavailable under the employee’s current plan.

Do not display locked or unavailable module actions inside Quick Actions.

Do not show upgrade messages inside Quick Actions.

Quick Actions should remain useful and actionable rather than displaying unavailable features.

---

# HR Basic and Payroll Plan

For employees using the **HR Basic and Payroll** plan, display Quick Actions only from the modules available in this plan:

- Employee Module (HRIS)
- Payroll
- Chats and Announcements
- Requisition
- Attendance
- Approval Workflow
- Settings

Ensure every Quick Action is connected to an available module.

Do not show Quick Actions from modules outside the HR Basic and Payroll plan.

---

# HR Standard Plan

For employees using the **HR Standard** plan, display Quick Actions relevant to the modules available in the Standard plan.

Include actions from available Standard-plan modules where relevant, including:

- Employee
- Attendance
- Events
- Payroll
- Leave
- Meetings
- Chat and Announcements
- Grievance and Disciplinary
- Confirmation
- Requisition
- Exit Management
- Promotion Management
- Approval Workflow
- KPI Management
- Document Management System

Do not display Quick Actions for Premium-only modules.

---

# HR Premium Plan

For employees using the **HR Premium** plan, display Quick Actions relevant to all modules available under the Premium plan.

Include actions from available Premium-plan modules where relevant, including:

- Employee
- Attendance
- Events
- Payroll
- Leave
- Meetings
- Chat and Announcements
- Grievance and Disciplinary
- Confirmation
- Requisition
- Exit Management
- Promotion Management
- Approval Workflow
- E-Learning
- Learning and Development
- Talent Management
- KPI Management
- Performance Management
- Document Management System
- Enterprise Service Bus
- Safety Incident Report
- Employee Net Promoter Score
- Volunteering

Do not show unavailable or restricted actions.

---

## Quick Actions Behaviour

Quick Actions must update automatically when the active licence plan changes.

When switching between:

- HR Basic and Payroll
- HR Standard
- HR Premium

the Quick Actions card should immediately display the correct actions for the selected plan.

Do not require a page refresh.

Do not retain Quick Actions from the previously selected plan.

Do not mix actions from different plans.

---

## Action Relevance

Quick Actions should prioritise actions that employees are most likely to perform frequently.

The actions should be:

- Relevant
- Useful
- Easy to understand
- Available to the employee
- Appropriate for the active plan

Do not fill the card with every possible action from every available module.

Keep the Quick Actions card focused and uncluttered.

Use the existing Quick Actions card capacity and layout.

If more actions are available than can fit in the card, use the existing **View All** or expansion interaction rather than changing the card layout.

---

## Permissions

Licence availability and employee permissions are separate.

An action should appear only when:

- The module is included in the active licence plan, and
- The employee has permission to perform the action.

Do not display administrative actions to employees who do not have permission to use them.

Do not expose HR administrator actions inside the Employee Workspace.

---

## Interaction

Each Quick Action must:

- Be clickable or tappable.
- Open the relevant available module or workflow.
- Use the existing interaction style.
- Have a clear label.
- Use the appropriate existing icon.
- Work consistently on Desktop, Tablet and Mobile.

Do not use hover as the only way to reveal Quick Action information.

All actions must be accessible through click or tap.

---

## Responsive Behaviour

Maintain the existing Quick Actions design at:

- Desktop — 1440px
- Tablet — 768px
- Mobile

Do not change the card dimensions or visual design.

Ensure actions:

- Remain readable.
- Remain easy to tap.
- Do not overflow.
- Do not overlap.
- Maintain consistent spacing.

---

## Preserve Existing Design

This is a content and functionality update only.

Do not:

- Redesign Quick Actions.
- Add new dashboard cards.
- Remove existing dashboard cards.
- Change the workspace grid.
- Change workspace card dimensions.
- Change the header.
- Change the App Launcher.
- Change the licence-plan selector.
- Add unavailable-module messaging to Quick Actions.

Only ensure that the Quick Actions content is tailored correctly to the active licence plan and employee permissions.

---

## Final Validation

Verify that:

✓ HR Basic and Payroll shows only relevant Basic-plan actions.

✓ HR Standard shows only relevant Standard-plan actions.

✓ HR Premium shows relevant Premium-plan actions.

✓ Quick Actions update when the active plan changes.

✓ Actions from unavailable modules do not appear.

✓ Actions respect employee permissions.

✓ Quick Actions remain useful and uncluttered.

✓ The existing Quick Actions design remains unchanged.

✓ No other part of the Employee Workspace is modified.