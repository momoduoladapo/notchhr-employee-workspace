# Employee Workspace — Add Employee Profile, Career and Statutory Information

The current Employee Workspace design is approved.

Keep the existing Employee Workspace design, layout, visual language, workspace management, drag-and-drop behaviour and responsive structure.

Do not redesign the Employee Workspace.

Do not remove or modify existing workspace cards.

Do not change:

- Header
- Navigation
- App Launcher
- Search
- Workspace Management
- Save Workspace
- Default Workspace
- Quick Actions
- Existing workspace cards
- Existing card styling
- Typography
- Colours
- Icons
- Responsive behaviour

Only extend the Employee Workspace to support the new stakeholder requirements below.

---

# New Employee Information Areas

Add support for the following employee information:

1. About Me
2. My Competency
3. My Work History
4. My Academic & Professional History
5. Payroll
6. Pension History
7. Tax History
8. Current Cadre
9. Current Cadre Step

These additions must follow the existing Employee Workspace design system.

Do not create a completely new visual style.

---

# 1. About Me

Add an **About Me** employee profile area.

This area should allow the employee to manage personal professional information.

Include:

- About Me summary
- Facebook profile URL
- LinkedIn profile URL

The employee must be able to:

- View their information
- Edit their information
- Save changes
- Cancel changes

Use clear labels:

**About Me**

**Facebook Profile URL**

**LinkedIn Profile URL**

Use proper URL input behaviour.

Do not display raw URLs as long, visually disruptive text in the normal viewing state.

When a valid profile URL has been saved:

- Display the appropriate social icon.
- Make the icon clickable.
- Open the profile safely in a new browser tab.
- Keep the employee’s information private and visible only according to existing permissions.

Do not add unnecessary social networks.

Only include Facebook and LinkedIn.

---

# 2. My Competency

Add a **My Competency** area.

This should allow employees to view their recorded competencies.

Use the existing card and information patterns.

The competency information should be easy to scan.

Support:

- Competency name
- Competency category where available
- Competency level or proficiency
- Assessment status where available
- Last updated information where available

Do not invent competency data.

Use the employee data already available in the current design.

If no competency information exists, show a meaningful empty state.

Do not display an empty card with no explanation.

The empty state should clearly explain that competency information has not yet been added or assessed.

---

# 3. My Work History

Add a **My Work History** area.

This should display the employee’s employment and work history.

Support:

- Organisation or employer
- Job title or role
- Employment period
- Employment type where available
- Relevant work details where available

Use a clean chronological structure.

The employee should be able to view their work history clearly.

Do not create a crowded dashboard table.

Use a detailed view or existing employee information pattern where appropriate.

Do not invent work-history records.

---

# 4. My Academic & Professional History

Add a combined area titled:

**My Academic & Professional History**

This area should support both academic qualifications and professional qualifications.

Use clear internal sections or tabs:

- Academic History
- Professional History

Academic History may contain:

- Institution
- Qualification
- Field of study
- Start date
- Completion date

Professional History may contain:

- Professional qualification
- Certification
- Awarding organisation
- Issue date
- Expiry date where applicable

Do not display all information in one crowded view.

Use clear hierarchy and progressive disclosure.

Do not invent academic or professional records.

If information is unavailable, display a useful empty state.

---

# 5. Payroll

Ensure the Employee Workspace includes access to the employee’s payroll information.

The Payroll area should follow the employee’s licence-plan availability and permissions.

Support access to relevant employee payroll information, including:

- Current payroll information
- Payslips
- Payroll history
- Relevant payroll records

Do not expose HR administrator payroll controls inside the Employee Workspace.

Employees should only see payroll information they are authorised to access.

Do not display unavailable payroll functionality.

---

# 6. Pension History

Add a **Pension History** area.

The employee should be able to view their pension-related history where data is available.

Support relevant pension records without inventing data.

Use a chronological and easy-to-scan presentation.

Do not expose sensitive pension administration controls that belong to HR administrators.

If no pension history is available, show a meaningful empty state.

---

# 7. Tax History

Add a **Tax History** area.

The employee should be able to view relevant tax history and records where available.

Use a clear chronological structure.

Do not expose organisation-wide tax administration features.

Only display information appropriate to the employee’s access level.

If no tax history is available, show a meaningful empty state.

---

# 8. Current Cadre and Cadre Step

Add the employee’s current:

- Cadre
- Cadre Step

Display these as current employment information.

Use clear labels:

**Current Cadre**

**Cadre Step**

Place them within the employee’s current employment information rather than presenting them as unrelated dashboard metrics.

Do not invent cadre or cadre-step values.

Use the employee data already available in the system.

---

# Information Architecture

Do not place all new information directly on the dashboard at once.

Keep the Employee Workspace focused and uncluttered.

Use the existing:

- App Launcher
- Employee profile navigation
- Workspace module selection
- Add Module functionality
- Existing employee information patterns

Allow employees to add relevant areas to their workspace where appropriate.

The employee should be able to choose which supported information cards appear in their personalised workspace.

Do not force every new information area onto every employee’s default workspace.

---

# Add Module Integration

Add the new employee information areas to the existing **Add Module** experience where appropriate.

Employees should be able to add supported cards such as:

- About Me
- My Competency
- My Work History
- My Academic & Professional History
- Payroll
- Pension History
- Tax History
- Current Employment Details

Maintain the existing Add Module design.

Do not redesign the Add Module card.

Do not add a new sidebar.

Do not create a separate dashboard.

---

# Permissions and Data Ownership

Respect existing employee permissions.

Employees may edit only information that is intended to be employee-managed.

Employee-managed information includes:

- About Me summary
- Facebook profile URL
- LinkedIn profile URL

Information that is managed by HR or the organisation should be view-only for employees unless the existing system permits editing.

This may include:

- Work history
- Competency assessments
- Academic and professional records
- Payroll records
- Pension history
- Tax history
- Current cadre
- Current cadre step

Do not automatically make HR-managed information editable.

---

# Empty States

Do not show empty cards with no explanation.

When information is unavailable, use a clear, helpful empty state.

The empty state should:

- Explain what information is unavailable.
- Indicate whether the employee can add or update the information.
- Direct the employee to the correct next action where appropriate.
- Follow the existing Employee Workspace visual style.

Do not use upgrade messaging for missing employee data.

---

# Responsive Behaviour

Maintain the approved layouts for:

- Desktop — 1440px
- Tablet — 768px
- Mobile

Ensure all new employee information:

- Fits inside the viewport.
- Does not overflow.
- Does not create horizontal scrolling.
- Uses clear responsive hierarchy.
- Remains readable.
- Has accessible touch targets.
- Works consistently in both presentation view and manual screen resizing.

The presentation screen-size toggle must match the actual responsive rendering.

---

# Final Validation

Verify that:

✓ About Me supports an employee summary.

✓ Employees can add and edit Facebook and LinkedIn profile URLs.

✓ My Competency is supported.

✓ My Work History is supported.

✓ My Academic & Professional History is supported.

✓ Academic and Professional History are clearly organised.

✓ Payroll is available according to licence and permissions.

✓ Pension History is supported.

✓ Tax History is supported.

✓ Current Cadre is supported.

✓ Cadre Step is supported.

✓ HR-managed information is not automatically editable.

✓ Employee-managed information can be edited and saved.

✓ Missing information uses meaningful empty states.

✓ The workspace remains uncluttered.

✓ Existing Employee Workspace design remains unchanged.

✓ No sidebar is added.

✓ No unrelated features are added.