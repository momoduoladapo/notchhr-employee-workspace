# NOTCHHR EMPLOYEE WORKSPACE
## CONTROLLED PLAN AUDIT AND STAKEHOLDER UPDATE

IMPORTANT: Read the attached `Employee-Workspace-Current-State.md` before making any changes.

The current Employee Workspace is an approved design and implementation. It is the baseline that must be preserved.

This is NOT a redesign, rebuild, refactor, or visual exploration.

Use the finalized licence-plan matrix and stakeholder requirements below to audit and update the existing Employee Workspace.

Apply only the changes explicitly required in this prompt or the attached stakeholder document.

Do not make assumptions.

Do not introduce new features, cards, layouts, interactions, content, or visual changes that are not explicitly requested.

---

# 1. NON-NEGOTIABLE PRESERVATION RULES

Keep the following exactly as they currently are unless a specific instruction below requires a change:

- Existing approved visual design
- Existing design system
- Existing colours
- Typography
- Card styling
- Card dimensions
- Card spacing
- Existing structured masonry/grid behaviour
- Existing workspace layout
- Existing header
- Existing navigation
- Existing responsiveness
- Existing Desktop, Tablet, and Mobile behaviour
- Existing Workspace Management
- Workspace selector
- Create Workspace
- Save Workspace
- Rename Workspace
- Delete Workspace
- Untitled workspace behaviour
- Default Workspace behaviour
- Reset to Default
- Show/hide module controls
- Drag-and-drop
- Card rearrangement
- Workspace persistence
- Existing interactions
- Existing accessibility behaviour

Do not redesign any existing card.

Do not restyle cards.

Do not change the workspace layout unless the stakeholder document explicitly requests a specific arrangement.

Do not add new cards outside the requirements below.

Do not remove any existing card unless the finalized plan rules or stakeholder requirements explicitly require its removal.

Do not change information that is not explicitly identified for change.

---

# 2. FINALIZED NOTCHHR LICENCE PLANS

Use this licence matrix as the source of truth for plan-based module availability.

## HR Basic and Payroll

- Attendance
- Payroll
- Meetings
- Chat and Announcement
- Requisition
- Approval Workflow
- Employee

## HR Standard

- Attendance
- Events
- Payroll
- Leave
- Chat and Announcement
- Grievance and Disciplinary
- Confirmation
- Requisition
- Exit Management
- Promotion Management
- Approval Workflow
- Document Management System
- Employee

## HR Premium

- Attendance
- Events
- Payroll
- Leave
- Chat and Announcement
- Grievance and Disciplinary
- Confirmation
- Requisition
- Exit Management
- Promotion Management
- Approval Workflow
- E-Learning
- Learning and Development
- Talent Management
- Performance Management
- Document Management System
- Employee
- Safety Incident Report
- Employee Net Promoter Score
- Volunteering

---

# 3. UNIVERSAL EMPLOYEE INFORMATION MODULES

The following employee information modules must be available across all three plans:

- Employee Identity / Profile
- About Me
- My Competency
- My Work History
- My Academic & Professional History
- Employment Details

Apply these as universal employee modules across:

- HR Basic and Payroll
- HR Standard
- HR Premium

Do not redesign these modules.

Preserve their existing content, styling, interactions, and behaviour.

Do not invent new information.

The Employee Identity / Profile Card remains protected and cannot be removed.

Preserve its existing locked/non-removable behaviour.

The other universal modules should retain their current Workspace Management behaviour unless explicitly changed in this prompt.

---

# 4. PLAN-BASED MODULE VISIBILITY

Audit every current workspace card and Workspace Management module against the finalized licence plans.

For each plan:

- Show only modules available under that plan.
- Remove modules that do not belong to that plan.
- Do not display unavailable modules as locked cards.
- Do not display unavailable modules as disabled cards.
- Do not display FeatureGate tiles.
- Do not display upgrade prompts.
- Do not display pricing.
- Do not display “Upgrade” actions.
- Do not tell employees to upgrade their plan.
- Do not show unavailable modules inside Workspace Management.

Employees should only see modules available under their organisation’s active licence plan.

Do not create a new workspace card merely because a product module exists in the licence list.

If a licence module does not currently have an approved Employee Workspace card, do not invent or design a new card for it.

Only map existing workspace cards to the relevant licence module where the relationship is already clear.

---

# 5. REMOVE PENDING TASKS

Remove the existing **Pending Tasks** card from:

- The Employee Workspace
- Default workspace layouts
- Workspace Management
- Add Module
- All plan scenarios

Do not replace it with another card.

Do not create a new task-related module.

---

# 6. GENERAL EMPLOYEE WORKSPACE UPDATES

## Greeting

Use:

**Good morning, Shola! 👋**

**Welcome back! Here's your workplace snapshot.**

Do not redesign the greeting area.

Only update the copy where required.

---

## Employee Identity / Profile

The Profile view is currently too text-heavy.

Improve scanability by using the existing icon system beside relevant information.

Use the following information structure:

- Shola Adeleke
- Product Designer
- 🏢 Design
- 🎖️ Cadre Level
- 👤 Employee ID: #1042
- 📅 Joined: Jan 2023
- ⭐ Tenure: 3 Years
- 👩 Manager: Amaka Eze
- View Profile

Rules:

- Preserve the existing Identity/Profile card design.
- Do not redesign the card.
- Add or retain appropriate icons beside the information.
- Show **Cadre Level only when it has been configured for the employee**.
- If no cadre information exists, hide the Cadre Level item completely.
- Do not show an empty cadre label.
- Preserve the protected/non-removable Identity Card behaviour.

---

# 7. ATTENDANCE CARD

Keep the existing Attendance card design.

Update its content and conditional states only.

## When the employee has clocked in

Display:

- Clocked in at 9:00 AM
- You've worked 4h 38m
- Attendance Status: Clocked In
- Today's Schedule: 9:00 AM – 5:00 PM
- Break Remaining: 45 mins

Use the existing card design and information hierarchy.

Do not redesign the card.

## When the employee has not clocked in

Display:

**You haven't clocked in today.**

**Use the NotchHR mobile app to clock in.**

Do not display incorrect clock-in information.

## When the employee has no assigned work schedule

Do not display the normal clock-in section.

Display:

**You have not been assigned to a work schedule. Please contact your admin or HR.**

Do not show empty attendance values.

---

# 8. PAYROLL CARD

Rename the existing employee workspace card from:

**Payslip**

to:

**Payroll**

Do not redesign the card.

Do not create separate workspace cards for Payroll History, Pension History, Tax History, Loans, or Rent Relief.

All related information must remain inside the existing Payroll card.

## Payroll Card Tabs

Use the existing card design and introduce clean internal tabs for:

1. Payroll
2. Payroll History
3. Pension History
4. Tax History
5. Loans
6. Rent Relief

These are internal views within one Payroll card.

They are not separate workspace cards.

Do not unnecessarily increase the Payroll card’s width or height.

Maintain the approved card placement and layout.

## Payroll Footer Copy

Add this copy to the Payroll card footer:

**To download payslips, please log in to your mobile app.**

Preserve any existing approved mobile-app links or actions unless this prompt explicitly changes them.

## Loans

Loans are a new contextual feature inside the Payroll card.

Show the Loans tab only when the employee has relevant loan information.

Do not show an empty Loans tab.

Do not create a separate Loans workspace card.

Do not invent unsupported loan information.

Use only relevant available loan data.

## Rent Relief

Rent Relief is a new contextual feature inside the Payroll card.

Show the Rent Relief tab only when the employee has relevant Rent Relief information.

Do not show an empty Rent Relief tab.

Do not create a separate Rent Relief workspace card.

Do not invent unsupported Rent Relief information.

Use only relevant available data.

---

# 9. ANNOUNCEMENTS

Keep the existing Announcements card design.

Add an unread indicator when unread announcements exist.

The indicator should:

- Be visible but unobtrusive.
- Follow the existing design system.
- Not change the card size.
- Not cause layout shifts.
- Not redesign the card.

Do not show an unread indicator when there are no unread announcements.

---

# 10. TEAM

Keep the existing Team card design.

Where relevant, include:

- Online indicator
- Birthday badge
- On Leave badge

Rules:

- Show the Online indicator only when the employee is online.
- Show the Birthday badge only when the team member has a birthday.
- Show the On Leave badge only when the team member is on leave.
- Do not display irrelevant or empty badges.
- Do not redesign the Team card.

---

# 11. EMPLOYEE DIRECTORY

Keep the existing Employee Directory card design.

Add:

- Recently Contacted
- Chat icon/action

The Chat action should use the existing interaction and icon system.

Do not redesign the card.

Do not add unnecessary new content.

---

# 12. QUICK ACTIONS

Remove any current Quick Action that is not listed below for the applicable plan.

Do not add extra Quick Actions.

## HR Basic and Payroll

- Create Requisition
- View Payslip
- Open Chat
- View Employee Profile

## HR Standard

- Create Requisition
- View Payslip
- Upload Document
- Request Leave

## HR Premium

Keep the existing approved Quick Actions unless the current implementation already has a clear plan-specific configuration.

Do not invent additional Premium Quick Actions.

---

# 13. GENERAL CARD ARRANGEMENT

Apply only the explicitly requested arrangement:

1. Announcements
2. Approvals
3. Payroll
4. Team

Do not redesign these cards.

Do not change their visual style.

Do not change unrelated card positions.

Do not reorganize the rest of the workspace.

Do not create additional rows unless required by the existing responsive layout.

---

# 14. HR STANDARD UPDATES

Apply these updates only where the employee’s organisation is on HR Standard or HR Premium and the relevant module is available.

## Leave Summary

Keep the existing Leave Summary card design.

Prioritize days remaining rather than percentages.

Display information such as:

- 18 Days Remaining
- Annual Leave
- 3 Sick Days Left

Do not redesign the card.

Do not remove relevant existing leave information unless it conflicts with this requirement.

## Employees on Leave

Change the return copy to:

**Returns Jun 25**

Use the existing card design.

## Workforce Highlights

Keep the existing Workforce Highlights card.

Use this tab order:

1. 🎉 Birthdays
2. 🏆 Work Anniversaries
3. 🏖 Holidays
4. 📅 Events

Do not redesign the card.

Do not create separate cards for these items.

## Document Hub

Keep the existing Document Hub unchanged.

## Grievance and Disciplinary

Keep the existing card design.

Support relevant states such as:

- No active cases
- 1 grievance under review

Include:

- View Case Status
- Submit a Grievance

Do not show irrelevant case information.

---

# 15. HR PREMIUM UPDATES

Apply these updates only where the employee’s organisation is on HR Premium and the relevant module is available.

## Performance

Keep the existing Performance card design.

Display relevant information such as:

- Current Goals
- Goal Progress
- Performance Rating
- Upcoming Review
- Assessment Status
- Manager Feedback
- Review Stage

Example content:

- Goal Progress: 78%
- Review Due: 15 Aug
- Status: On Track or Behind
- Manager Feedback Available
- Stage: Pending Line Manager Review
- Performance Rating: Excellent
- View Performance

Do not invent data.

Use scenario-appropriate data already available in the implementation.

### No Performance Cycle

If the employee has not started a performance cycle:

- Do not show an empty Performance card.
- Do not show empty metrics.
- Display:

**Your performance review hasn't started yet.**

Keep the existing card style.

Do not redesign the card.

## Learning

Keep the existing Learning card design.

Display relevant information such as:

- Assigned Courses
- Learning Progress
- Certificates Earned
- Mandatory Training
- Recommended Courses

Example content:

- 2 Courses Assigned
- 1 Course Due This Week
- 68% Completion
- Continue Learning

Do not invent data.

Use scenario-appropriate information already available.

### No Learning Assigned

If the employee has no learning assigned:

- Do not show an empty Learning widget.
- Display:

**No learning has been assigned yet.**

Keep the existing card style.

Do not redesign the card.

---

# 16. EMPLOYEE RELEVANCE RULE

Do not display a module that is irrelevant to the logged-in employee.

Examples:

- Do not show empty Performance metrics when no performance cycle exists.
- Do not show an empty Learning card when no learning is assigned.
- Do not show Cadre Level when it has not been configured.
- Do not show empty Loans information.
- Do not show empty Rent Relief information.
- Do not show irrelevant badges.
- Do not show empty data sections.

Use the contextual messages explicitly provided in this prompt where applicable.

Do not invent additional empty-state copy.

---

# 17. WORKSPACE MANAGEMENT

Preserve all approved Workspace Management functionality.

Update module availability so that Workspace Management displays only:

- Universal employee modules
- Modules available under the employee’s active licence plan
- Existing approved modules that remain relevant to that plan

Do not show:

- Unavailable plan modules
- Upgrade prompts
- Locked upgrade modules
- Pricing
- Plan-purchase actions

Keep:

- Workspace creation
- Save Workspace
- Rename
- Delete
- Reset to Default
- Workspace switching
- Drag-and-drop
- Show/hide module controls
- Existing workspace persistence

The Employee Identity / Profile Card must remain protected and non-removable.

---

# 18. FINAL VALIDATION

Before completing the update, verify:

## Design

- No redesign occurred.
- No unrequested visual changes were made.
- Existing card styles remain intact.
- Existing layout remains intact except for the explicitly requested arrangement.
- Existing responsive behaviour remains intact.

## Plans

- HR Basic and Payroll displays only its available modules.
- HR Standard displays only its available modules.
- HR Premium displays only its available modules.
- Universal employee information modules are available across all plans.
- Unavailable modules are absent.
- No upgrade prompts are visible to employees.

## Payroll

- The card is titled Payroll.
- Payroll is one existing workspace card.
- Payroll History is an internal tab.
- Pension History is an internal tab.
- Tax History is an internal tab.
- Loans is a contextual internal tab.
- Rent Relief is a contextual internal tab.
- No separate Payroll History, Pension History, Tax History, Loans, or Rent Relief workspace cards remain.
- The footer copy is present.

## Workspace

- Pending Tasks is removed.
- Identity Card remains protected.
- Workspace Management still works.
- Drag-and-drop still works.
- Save, Rename, Delete, and Reset still work.
- Plan-based module visibility works.

## Responsive Behaviour

Verify the updated workspace at:

- Desktop
- Tablet
- Mobile

The updated design must preserve the approved responsive behaviour.

Do not create inconsistent layouts between manual resizing and the presentation/device preview controls.

---

# FINAL INSTRUCTION

Implement only the requirements explicitly stated in this prompt and the attached stakeholder document.

Do not add anything else.

Do not remove anything else.

Do not redesign anything.

Do not refactor unrelated parts of the project.

Do not change existing information unless explicitly instructed.

Preserve the approved Employee Workspace as the foundation.

After implementation, provide a concise change summary grouped under:

1. Universal modules
2. HR Basic and Payroll
3. HR Standard
4. HR Premium
5. Payroll card
6. Removed items
7. Preserved functionality
8. Responsive validation