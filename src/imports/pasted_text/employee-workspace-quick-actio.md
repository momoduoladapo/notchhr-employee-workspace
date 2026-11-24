# EMPLOYEE WORKSPACE — TEAM CHAT ACTION & PLAN-SPECIFIC QUICK ACTIONS UPDATE

IMPORTANT:

Do not redesign the Employee Workspace.

Do not change the approved visual design, card styles, typography, colours, workspace layout, card widths, Workspace Management, or existing functionality.

This is a focused interaction and Quick Actions correction only.

---

# 1. TEAM CARD — ADD DIRECT CHAT ICON

In the existing Team card, add a clear chat icon for every team member.

Each team member should have a compact chat/message icon that allows the logged-in employee to start or open a direct conversation with that specific team member.

Keep all existing Team card information unchanged, including:

- Employee avatar
- Employee name
- Job title or role
- Online indicator
- Birthday badge
- On Leave badge
- Any other existing status information

Add the chat icon at the far right of each team-member row.

The chat icon should:

- Be clearly recognisable as a chat action.
- Use the existing NotchHR icon style.
- Match the chat interaction already used in the Employee Directory where appropriate.
- Be aligned consistently across all team-member rows.
- Not overlap names, roles, badges, or status indicators.
- Not make the row feel crowded.
- Have a comfortable clickable and tappable area.

When the user clicks or taps the chat icon:

- Open the existing Chat experience.
- Open the existing direct conversation with the selected team member if one already exists.
- Otherwise, open a new direct conversation with that specific team member.
- Pass the selected team member into the chat flow automatically.
- Do not make the employee search for the team member again.

Do not create a new chat system.

Do not create a separate chat interface.

Reuse the existing Chat module and interaction flow.

Add an accessible label:

`Chat with [Team Member Name]`

Use a tooltip on desktop where appropriate.

---

# 2. REMOVE “VIEW PAYSLIP” FROM QUICK ACTIONS

Remove the **View Payslip** action from Quick Actions across all plans.

The employee cannot view or download payslips directly from the Employee Workspace.

Do not replace it with another payroll action.

Do not add a disabled payslip action.

Do not add a “Coming Soon” payslip action.

The Payroll card already directs employees to use the NotchHR mobile app for payslip access.

Keep the Payroll card and its existing mobile-app guidance unchanged.

---

# 3. REPLACE VIEW PAYSLIP WITH PLAN-SPECIFIC QUICK ACTIONS

Replace the removed View Payslip action with a useful action that is available within the employee’s active plan.

Quick Actions must be plan-aware.

Do not show actions for modules that are unavailable in the employee’s active plan.

Do not show upgrade prompts.

Do not show locked actions.

Do not show unavailable actions as disabled.

Only show actions the employee can actually use.

---

# 4. HR BASIC AND PAYROLL — QUICK ACTIONS

For HR Basic and Payroll, use:

1. Create Requisition
2. Open Chat
3. View Employee Profile
4. View Announcements

Replace **View Payslip** with:

**View Announcements**

The action should:

- Open the existing Announcements experience.
- Take the employee directly to announcements.
- Highlight unread announcements where applicable.
- Reuse the existing Announcements module.
- Not create a new Announcements page.

Do not add actions for modules that are not available in HR Basic and Payroll.

---

# 5. HR STANDARD — QUICK ACTIONS

For HR Standard, use:

1. Create Requisition
2. Open Chat
3. Upload Document
4. Request Leave

Do not show View Payslip.

Do not add actions for unavailable HR Premium modules.

Each action must open its existing module or workflow.

---

# 6. HR PREMIUM — QUICK ACTIONS

For HR Premium, use:

1. Create Requisition
2. Open Chat
3. Request Leave
4. Continue Learning

Replace **View Payslip** with:

**Continue Learning**

The action should:

- Open the existing Learning or E-Learning experience.
- Take the employee to their assigned or in-progress learning.
- Resume the relevant course where an in-progress course exists.
- Otherwise, open the employee’s Learning dashboard.
- Reuse the existing Learning module.
- Not create a new learning experience.

Only show Continue Learning when Learning is relevant and available to the logged-in employee.

If the employee has no assigned learning, use the existing contextual Learning state rather than displaying misleading course information.

---

# 7. QUICK ACTIONS RULES

For every plan:

- Display only actions supported by the employee’s active plan.
- Display only actions the employee can access.
- Do not show unavailable modules.
- Do not show upgrade actions.
- Do not show locked actions.
- Do not show disabled actions for unavailable features.
- Do not show View Payslip.
- Do not add extra actions merely to fill space.
- Keep the Quick Actions card clean and balanced.

Do not change the approved Quick Actions card style.

Do not change its existing icon treatment.

Do not change the card’s width or position unless required by the existing fluid workspace layout.

---

# 8. FUNCTIONAL FLOW CHECK

Audit and test each Quick Action.

Confirm:

### HR Basic and Payroll

- Create Requisition opens the requisition workflow.
- Open Chat opens the existing Chat experience.
- View Employee Profile opens the employee profile.
- View Announcements opens announcements.
- View Payslip is completely removed.

### HR Standard

- Create Requisition works.
- Open Chat works.
- Upload Document opens the document-upload flow.
- Request Leave opens the leave-request flow.
- View Payslip is completely removed.

### HR Premium

- Create Requisition works.
- Open Chat works.
- Request Leave works.
- Continue Learning opens the correct Learning experience.
- View Payslip is completely removed.

---

# 9. FINAL VALIDATION

Before completing, confirm:

## Team Card

- Every team member has a chat icon.
- The chat icon is consistently positioned.
- The icon does not crowd team-member information.
- Existing online indicators remain.
- Existing Birthday badges remain.
- Existing On Leave badges remain.
- Clicking the icon opens a direct conversation with the correct team member.
- The existing Chat experience is reused.

## Quick Actions

- View Payslip is removed from every plan.
- No employee-facing upgrade action exists.
- HR Basic and Payroll actions are plan-specific.
- HR Standard actions are plan-specific.
- HR Premium actions are plan-specific.
- No action links to an unavailable module.
- No action is disabled because of plan limitations.
- All actions open the correct existing workflow.

# FINAL PROTECTION RULE

Do not redesign the Employee Workspace.

Do not change unrelated cards.

Do not change the approved design language.

Only:

1. Add a direct chat icon to each Team member.
2. Remove View Payslip from Quick Actions.
3. Replace it with useful, plan-specific actions.
4. Ensure every Quick Action is available and functional for the employee’s active plan.