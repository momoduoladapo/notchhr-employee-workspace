IMPLEMENT CONTEXT-AWARE DASHBOARD MODULES

Review the existing employee dashboard/workspace implementation and
implement the following UX behavior.

This is an implementation task, not a request to redesign the dashboard.

CORE PRINCIPLE:

Do not show a dashboard module simply because the module exists.

The dashboard must respond to the logged-in employee's actual context,
eligibility, assignments and available data.

If a module is not relevant to the employee, hide it.

If the module is relevant but the employee has not reached that stage or
has no assigned data yet, show a meaningful contextual state instead of
an empty card or blank widget.

--------------------------------------------------
1. PERFORMANCE
--------------------------------------------------

If the employee has not started a performance cycle:

DO NOT show an empty Performance chart/card.

Show:

Performance

Your performance review hasn't started yet.

The state should clearly communicate that the feature exists but the
employee's performance cycle has not started.

If a performance cycle is active and data exists, show the normal
Performance module.

If the employee has completed a cycle and results exist, show the
existing results state.

Do not change populated states.

--------------------------------------------------
2. LEARNING
--------------------------------------------------

If the employee has no learning assigned:

DO NOT show an empty Learning widget.

Show:

Learning

No learning has been assigned yet.

If learning has been assigned, show the normal Learning module.

Do not change the populated state.

--------------------------------------------------
3. APPLY THE SAME LOGIC TO OTHER MODULES
--------------------------------------------------

Audit the existing dashboard and identify modules that can have
different employee states.

Examples:

• Performance
• Learning
• Goals
• Projects
• Tasks
• Leave
• Attendance
• Payslip
• Requests
• Requisitions
• Loans
• Rent Relief
• E-wallet
• Salary Advance
• Documents
• Announcements
• Events
• Any other employee-specific module already present

For each module determine:

A. Is this module relevant to this employee?

If NO:
→ Do not render the module.

B. Is the module relevant but not started?

If YES:
→ Render a contextual "not started" state.

C. Is the module relevant but nothing has been assigned?

If YES:
→ Render a contextual "not assigned" state.

D. Is the module relevant but there is currently no data?

If YES:
→ Render a contextual empty state.

E. Does the employee have valid data?

If YES:
→ Render the existing populated component.

--------------------------------------------------
4. DO NOT USE GENERIC EMPTY STATES
--------------------------------------------------

Do NOT replace everything with:

"No data"

"No information available"

"Nothing here"

Each state should explain the actual reason.

Examples:

Performance:
"Your performance review hasn't started yet."

Learning:
"No learning has been assigned yet."

Goals:
"No goals have been assigned yet."

Projects:
"You haven't been assigned to any projects yet."

Documents:
"No documents are currently available."

Requests:
"You don't have any pending requests."

Only use these examples where they accurately represent the underlying
state.

Do not invent business rules.

--------------------------------------------------
5. NOT APPLICABLE VS EMPTY
--------------------------------------------------

This distinction is extremely important.

If something does not apply to the employee:

HIDE THE MODULE.

If it applies but there is currently nothing to show:

SHOW THE MODULE WITH A CONTEXTUAL STATE.

For example:

A performance feature that is not available to a particular employee
because of their role/eligibility should not appear as an empty card.

An employee who is eligible for performance management but whose review
cycle has not started should see:

Performance

Your performance review hasn't started yet.

--------------------------------------------------
6. NEW EMPLOYEE EXPERIENCE
--------------------------------------------------

Test the dashboard mentally and in the implementation using a new
employee scenario.

Example:

Employee has:

• No performance cycle
• No learning assigned
• No goals
• No projects
• No requests
• No historical data

The dashboard must NOT look broken or unfinished.

It should feel intentionally personalized to that employee.

Some modules should disappear.

Others should remain visible with useful contextual messages.

Existing populated modules should continue to work normally.

--------------------------------------------------
7. IMPLEMENT REAL CONDITIONAL LOGIC
--------------------------------------------------

Do not merely change the text visually.

Implement the actual state logic in the existing application.

Use the application's existing data structures, mock data, state
management and component architecture.

Do not create a fake second dashboard.

Do not hard-code one employee.

The components should support different employee states.

Use conditional rendering/state handling such as:

RELEVANT + DATA
→ normal component

RELEVANT + NOT_STARTED
→ contextual state

RELEVANT + NOT_ASSIGNED
→ contextual state

RELEVANT + NO_DATA
→ contextual state

NOT_RELEVANT
→ component not rendered

Do not introduce a new framework or architecture unless the existing
implementation requires it.

--------------------------------------------------
8. PRESERVE THE CURRENT DESIGN
--------------------------------------------------

Do NOT redesign the dashboard.

Keep:

• Existing layout
• Existing cards
• Existing typography
• Existing spacing
• Existing colors
• Existing icons
• Existing navigation
• Existing interactions

Only modify the components and states necessary to implement the
context-aware behavior.

The empty/contextual states should look like natural states of the
existing component.

--------------------------------------------------
9. DO NOT INVENT PRODUCT FUNCTIONALITY
--------------------------------------------------

Do not add:

• New APIs
• New backend systems
• New navigation
• New buttons
• New workflows
• New employee permissions
• New product features

unless they already exist in the project.

If a contextual state needs an action, only provide that action if the
existing product already supports it.

--------------------------------------------------
10. VERIFY THE IMPLEMENTATION
--------------------------------------------------

After implementing the changes, test multiple scenarios:

SCENARIO A — NEW EMPLOYEE

No performance cycle.
No learning assignment.
No goals.
No projects.

Expected:
Irrelevant modules are hidden.
Relevant modules show appropriate contextual states.

SCENARIO B — EMPLOYEE WITH LEARNING

Learning assigned.

Expected:
Learning module shows its normal populated state.

SCENARIO C — EMPLOYEE IN PERFORMANCE CYCLE

Performance cycle active.

Expected:
Performance module shows its existing populated/active state.

SCENARIO D — EMPLOYEE WITH NO APPLICABLE MODULE

Expected:
The module does not render at all.

SCENARIO E — EXISTING POPULATED EMPLOYEE

Expected:
Existing populated dashboard remains unchanged.

--------------------------------------------------
FINAL UX RULE
--------------------------------------------------

The dashboard should answer:

"What is relevant to ME right now?"

It should never make the employee wonder:

"Why is this card empty?"

If something doesn't apply:
→ hide it.

If something applies but hasn't started:
→ explain that.

If something applies but hasn't been assigned:
→ explain that.

If something applies but has no current data:
→ explain that.

If data exists:
→ show the existing module.

Implement this behavior in the existing dashboard and then verify that
the interface still works correctly across all affected states.

DO NOT redesign unrelated parts of the product.