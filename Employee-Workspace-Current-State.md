# Employee Workspace — Current State Audit

**Generated:** 2026-08-04  
**Source:** `/src/app/App.tsx` — read-only audit. No code was changed.

---

## 1. Workspace Overview

### Purpose
The Employee Workspace is the primary entry point of the NotchHR Employee Portal. It gives each employee a personalised, configurable dashboard showing key HR data, contextual actions, and module summaries relevant to their plan and onboarding state.

### Page Structure
The page has two zones:
1. **Header** — fixed at the top; contains branding, global search, app launcher, language selector, notification centre, and profile menu.
2. **Dashboard** — scrollable content area below the header; contains a greeting bar, workspace management controls, and a card grid.

A **prototype control bar** sits above the header. It exposes plan, scenario, and viewport switchers for demo purposes. This bar is not part of the product UI.

### Layout System
- **Desktop (1440 px):** Row-packed 60-column CSS grid (masonry). Cards fill rows greedily by column span; a new row starts when the next card would overflow 60 columns.
- **Tablet (768 px):** Uniform 2-column CSS grid.
- **Mobile (390 px):** Single-column stack.

### Workspace Customisation Capabilities
- Show or hide individual modules via the Workspace Management panel.
- Drag-and-drop cards to rearrange (desktop/tablet) or use up/down arrow buttons (mobile), in editing mode.
- Create, rename, and delete named workspaces.
- Save or discard card-order changes per workspace.
- Reset to the default card order.
- Multiple workspaces supported; one is active at a time.
- State persists to `localStorage`.

### Supported Screen Sizes

| Mode | Frame Width | Grid |
|---|---|---|
| Desktop | 1440 px | 60-column row-packed masonry |
| Tablet | 768 px | 2-column uniform grid |
| Mobile | 390 px | 1-column stack |

---

## 2. Complete Workspace Card Inventory

### Cards in the Default Workspace Order (`WS_FLAT_DEFAULT`)

| # | Card ID | Label | Visible by Default | Show/Hide | Removable | Rearrangeable | Addable via Mgmt | Mandatory | Plan |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `identity` | Identity Card | Yes | No | No | Yes | No | Yes (locked) | All |
| 2 | `attendance` | Attendance Today | Yes | Yes | Yes | Yes | Yes | No | All |
| 3 | `tasks` | Pending Tasks | Yes | Yes | Yes | Yes | Yes | No | All |
| 4 | `actions` | Quick Actions | Yes | Yes | Yes | Yes | Yes | No | All |
| 5 | `leave-summary` | My Leave Summary | Yes | Yes | Yes | Yes | Yes | No | Standard+ (FeatureGate on Basic) |
| 6 | `announcements` | Announcements | Yes | Yes | Yes | Yes | Yes | No | All |
| 7 | `team` | Team | Yes | Yes | Yes | Yes | Yes | No | All |
| 8 | `approvals` | Approvals | Yes | Yes | Yes | Yes | Yes | No | All |
| 9 | `payslip` | Payslip | Yes | Yes | Yes | Yes | Yes | No | All |
| 10 | `on-leave` | Employees on Leave | Yes | Yes | Yes | Yes | Yes | No | Standard+ (FeatureGate on Basic) |
| 11 | `events` | Events & Calendar | Yes | Yes | Yes | Yes | Yes | No | All (Events tab: Standard+) |
| 12 | `directory` | Employee Directory | Yes | Yes | Yes | Yes | Yes | No | All |
| 13 | `kpi` | KPI Summary | Yes | Yes | Yes | Yes | Yes | No | Premium only (FeatureGate on Basic/Standard) |
| 14 | `documents` | Document Hub | Yes | Yes | Yes | Yes | Yes | No | Standard+ (FeatureGate on Basic) |
| 15 | `grievance` | Grievance & Compliance | Yes | Yes | Yes | Yes | Yes | No | Standard+ (FeatureGate on Basic) |
| 16 | `performance` | Performance Overview | Yes | Yes | Yes | Yes | Yes | No | Premium only (FeatureGate on Basic/Standard) |
| 17 | `learning` | Learning & Development | Yes | Yes | Yes | Yes | Yes | No | Premium only (FeatureGate on Basic/Standard) |
| 18 | `enps` | eNPS | Yes | Yes | Yes | Yes | Yes | No | Premium only (FeatureGate on Basic/Standard) |

### Cards Available via Add Module (not in default order)

| Card ID | Label | Visible by Default | Addable | Removable | Rearrangeable | Mandatory | Plan |
|---|---|---|---|---|---|---|---|
| `about-me` | About Me | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `competency` | My Competency | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `work-history` | My Work History | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `academic-professional` | Academic & Professional History | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `payroll-history` | Payroll History | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `pension` | Pension History | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `tax-history` | Tax History | No | Yes | Yes | Yes | No | All (requires confirmation) |
| `employment-details` | Employment Details | No | Yes | Yes | Yes | No | All (requires confirmation) |

> **Note on "Removable":** The Remove (×) button in the card editing overlay renders only for `ADDABLE_CARD_IDS` (the 8 profile modules above). The 18 default cards cannot be individually removed via the ×; they can only be unchecked in the Workspace Management module list.

> **Note on plan-gated default cards:** When a plan-gated card is not available (e.g. KPI on Basic plan), the card slot displays a `FeatureGate` tile instead of real content. The card remains in the workspace and cannot be removed by the employee while gated.

---

## 3. Current Employee Information Modules

### Identity Card (`identity`)
- **Exists:** Yes
- **Visible by default:** Yes (position 1)
- **Optional:** No (locked, mandatory)
- **Available via Workspace Management:** Listed, locked, cannot be unchecked
- **Editable:** No — view-only. Contains a "View Full Profile" button (Scenarios 1 and 3) or "Complete Your Profile →" (Scenario 2)
- **Current content:** Employee photo/avatar, full name, role, department, employee ID, joined date, tenure, supervisor name
- **Current actions:** "View Full Profile" / "Complete Your Profile →" button
- **Placement:** First card, first row (10-column span on desktop)
- **Plan availability:** All plans

### About Me (`about-me`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** Yes — inline edit mode; fields: Professional Summary (textarea), Facebook URL, LinkedIn URL
- **Current content (S1):** Summary text + social profile links
- **Current content (S2/S3):** Empty fields
- **Current actions:** Edit button → opens inline form with Save / Cancel
- **Placement:** Addable; placed at end of card order when added; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### My Competency (`competency`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content (S1):** Table of 4 competencies — name, category, level pill (colour-coded), status, last updated date
- **Current content (S2/S3):** EmptyCard — "No competencies recorded yet"
- **Current actions:** None
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### My Work History (`work-history`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content (S1):** 3 employment entries — org name, role, date range, contract type, detail text
- **Current content (S2/S3):** EmptyCard — "No work history added yet"
- **Current actions:** None
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### Academic & Professional History (`academic-professional`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content (S1):** Two tabs — "Academic" (qualifications table: institution, qualification, field, years) and "Professional" (certifications table: name, issuing org, issued date, expiry)
- **Current content (S2/S3):** EmptyCard per tab
- **Current actions:** Tab switch between Academic and Professional
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### Employment Details (`employment-details`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content:** Labelled rows: Cadre, Cadre Step, Contract Type, Grade, Location
- **Current actions:** None
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### Payroll History (`payroll-history`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content (S1):** 2 payroll records — period, employer name, monthly contribution, status badge (Active / Deferred)
- **Current content (S2/S3):** EmptyCard — "No payroll history yet"
- **Current actions:** None
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### Pension History (`pension`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content (S1):** 2 pension records — period, employer name, monthly contribution amount, status badge (Active / Deferred)
- **Current content (S2/S3):** EmptyCard — "No pension records yet"
- **Current actions:** None
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

### Tax History (`tax-history`)
- **Exists:** Yes
- **Visible by default:** No
- **Optional:** Yes
- **Available via Workspace Management:** Yes (addable)
- **Editable:** No — view-only
- **Current content (S1):** 2 annual tax records — tax year, gross income, tax paid, filing status badge (Filed)
- **Current content (S2/S3):** EmptyCard — "No tax records yet"
- **Current actions:** None
- **Placement:** Addable; 20-column span on desktop
- **Plan availability:** No `CARD_MODULE` key — **Requires stakeholder confirmation**

---

## 4. Current Payroll Card

### Card Title
"Payslip"

### Card Size and Placement
- **Desktop column span:** 15 (out of 60 columns) — same width as Announcements, Team, Approvals
- **Default placement:** Row 2, position 4 (rightmost card in its row)
- **Tablet:** Full-width single card in the 2-column grid
- **Mobile:** Full-width single column

### Current Content

**Scenario 1 — Active Employee (payroll configured):**
- Purple-to-magenta gradient card
- Label: "Net Salary — June 2025"
- Value: ₦850,000 (masked with `••••••••` when privacy mode is on)
- Sub-fields: Gross (₦1,000,000) · Deductions (₦150,000) · Tax (₦80,000) — each masked when privacy is on
- App download row: Apple App Store button + Google Play button (inline, always visible — no click-to-reveal)

**Scenario 2 — Newly Onboarded (payroll not configured):**
- Dark gradient card (tertiary-700 to tertiary-900)
- Label: "Payroll Not Configured"
- Value: "No payslip available"
- Body: "Your payroll details haven't been configured yet. HR will set this up as part of onboarding. Expected: Aug 1, 2025."
- No app download buttons

**Scenario 3 — Onboarding In Progress:**
- Dark gradient card
- Label: "Payroll Setup In Progress"
- Value: "Processing…"
- Body: "HR is finalising your payroll setup. Your first payslip will be issued on Aug 1, 2025."
- Progress bar at 40%
- No app download buttons

### Current Actions

| Action | Availability |
|---|---|
| Privacy toggle (Eye / EyeOff icon) | Scenario 1 only — toggles value masking |
| Apple App Store link | Scenario 1 only — opens `https://apps.apple.com/us/app/myxalary-app/id1557894792` in a new tab |
| Google Play link | Scenario 1 only — opens `https://play.google.com/store/apps/details?id=com.myxalary` in a new tab |

### Footer Content
None. No card footer element is implemented in the Payslip card.

### Tabs
None. The Payslip card has no tabs.

### App Download Links
Two download buttons are rendered **inline inside the gradient card** on Scenario 1 (active payslip state). They are always visible without requiring any click-to-reveal interaction:
- **App Store** — Apple logo SVG + "App Store" label; links to `https://apps.apple.com/us/app/myxalary-app/id1557894792`
- **Google Play** — Google Play logo SVG + "Google Play" label; links to `https://play.google.com/store/apps/details?id=com.myxalary`
- Both buttons use `background: rgba(255,255,255,0.2)` with white text, styled as rounded pill buttons inside the gradient card.

### Responsive Behaviour
- All viewports: card renders at full width of its column allocation. Content does not change between desktop, tablet, and mobile.
- Privacy toggle position: top-right of card header row.

### Related Modules — Current Status

| Module | Currently Implemented | Notes |
|---|---|---|
| Payroll History | Yes — addable card (`payroll-history`) | Not in default workspace; must be added via module checklist |
| Pension History | Yes — addable card (`pension`) | Not in default workspace; must be added via module checklist |
| Tax History | Yes — addable card (`tax-history`) | Not in default workspace; must be added via module checklist |
| Loans | **Not implemented** | No loan card, data, state, or plan logic exists anywhere in the current implementation |
| Rent Relief | **Not implemented** | No rent relief card, data, state, or plan logic exists anywhere in the current implementation |

---

## 5. Current Workspace Management

### Accessing Workspace Management
A **"Manage Workspace"** button (Sliders icon + active workspace name + chevron) sits in the dashboard greeting row. Clicking it opens the Manage Workspace panel.

### Workspace Selector
The panel's **Workspaces** section lists all saved workspaces. The active workspace has a purple checkmark. Clicking an inactive workspace immediately switches to it, loads its card order, and closes the panel.

### Default Workspace
- ID: `"default"`, Name: `"Default Workspace"`
- Always present; created if missing.
- Protected — cannot be renamed or deleted.
- Indicated by a Lock icon in the workspace list row. Clicking the lock shows a tooltip: *"Default Workspace — cannot be renamed or deleted."*

### Create Workspace
Clicking **"Create New Workspace"** at the bottom of the workspace list:
- Creates a new workspace with auto-name `Untitled DD/MM/YYYY` and the default card order.
- Makes it the active workspace immediately.
- Closes the Manage panel and opens the layout editor (`isEditing = true`).

### Save Workspace
- Available in the editing toolbar (disabled until changes are made — `isDirty`).
- Also accessible from the Manage panel footer when `isDirty`.
- Clicking opens an inline **Save Workspace** naming panel below the greeting bar.

### Workspace Naming
- The naming panel contains a text input pre-filled with the current workspace name (empty if the name starts with `"Untitled "`).
- **Save Workspace** button: disabled if input is empty.
- **Save as Untitled** button: saves immediately as `Untitled DD/MM/YYYY`.
- **Cancel**: closes the panel without saving.

### Untitled Workspace Behaviour
- New workspaces are auto-named `Untitled DD/MM/YYYY` using the current date at creation time.
- When saving an untitled workspace, the name input pre-fills empty to prompt the user to provide a name.
- If saved with no name entered, the name resolves to `Untitled DD/MM/YYYY`.

### Timestamp Behaviour
- Untitled workspace names include a timestamp in `DD/MM/YYYY` format.
- The timestamp is set at workspace creation (new workspace) or at save time (Save as Untitled).

### Rename Workspace
- Only non-default workspaces show a Pencil icon.
- Clicking the Pencil expands an inline action sub-row with **Rename** and **Delete** buttons.
- Clicking **Rename** replaces the row with a text input pre-filled with the current name.
- Pressing **Enter** or clicking **Save** commits. **Escape** or **Cancel** reverts.
- A success toast confirms: *"Workspace renamed"*.

### Delete Workspace
- Only non-default workspaces can be deleted.
- Clicking **Delete** in the expanded row shows an inline confirmation panel inside the row showing the workspace name.
- Clicking **Delete** (red) removes the workspace. If the deleted workspace was active, the first remaining workspace becomes active.
- If all user workspaces are deleted, the default workspace is recreated and activated.
- Clicking **Cancel** returns to the unexpanded list item.

### Reset to Default
Available in two locations:

1. **Workspace editing toolbar**: "Reset" link. Shows confirm prompt inline (*"Reset to default?"* + Confirm / Cancel). Confirm resets only the live card order to `WS_FLAT_DEFAULT` without saving.
2. **Manage panel footer** (only when `isDirty`): "Reset to Default" button. Confirm step required. Confirm restores the Default Workspace, sets it active, resets and persists the card order, and shows toast: *"Workspace reset to default"*.

### Unsaved Workspace Behaviour
- **`isDirty` indicator (editing mode):** A magenta dot + "Unsaved" badge appears in the editing toolbar.
- **Manage button indicator:** A magenta dot appears next to the workspace name in the Manage button when `isDirty`.
- **Manage panel footer:** An "Unsaved changes" labelled row with save/discard/reset actions appears when `isDirty`.

### Workspace Switching
Clicking an inactive workspace in the list:
- Loads its saved card order.
- Sets it as active and persists the active ID.
- Closes the Manage panel and resets all editing state.

### Workspace Persistence
- All workspaces are saved as a JSON array in `localStorage` under key `notchr-workspaces-v1`.
- The active workspace ID is saved under key `notchr-active-ws-v1`.
- Persisted on: workspace save, create, rename, delete, switch, reset.

### Drag-and-Drop
- Active only in editing mode.
- **Desktop / Tablet:** HTML5 drag events. A GripVertical handle appears at the top-right of each card. Dragging the handle reorders the card. The dragged card shows 30% opacity; the drop target gets a dashed purple outline.
- **Mobile:** No drag. Up and down arrow buttons replace the handle. Tapping them moves the card one position in the flat order.
- Keyboard accessible: Arrow Up/Left moves the card earlier; Arrow Right/Down moves it later.

### Card Rearrangement
- Available only in editing mode.
- Reordering updates `cardOrder` state immediately; grid re-renders with live preview during drag.
- Not persisted until the user saves the workspace.

### Workspace Reflow
- Adding or removing a module via the checklist updates `cardOrder` immediately.
- The grid re-renders to reflect the change without a page reload.
- No save is required to see the reflow; saving persists it.

### Module Visibility Management
The **Workspace Modules** section in the Manage panel lists all modules available on the active plan, one row each.

#### Show Module
Checking an unchecked module appends the module's card to the end of the current card order. The grid immediately shows the card.

#### Hide Module
Unchecking a checked module removes it from the card order. The card disappears from the grid immediately.

#### Add Module / Remove Module
"Add" and "Remove" are the same gestures as Show and Hide (the checkbox). Additionally, in editing mode, the 8 profile-module cards (`about-me` through `employment-details`) show a Remove (×) button overlay that removes the card from the order.

---

## 6. Identity Card Rules

- **Always visible:** Yes. `identity` is always in `WS_FLAT_DEFAULT` and cannot be toggled off.
- **Can be hidden:** No. The `toggleModule` function returns early for `id === "identity"`.
- **Can be removed:** No. The Remove (×) overlay button only renders for `ADDABLE_CARD_IDS`; `identity` is not in that set.
- **Can be rearranged:** Yes. The drag handle and keyboard controls work for all cards including `identity`.
- **Is it locked:** Yes. Marked `locked: true` in `ALL_WS_MODULES`.
- **How locked state is communicated:** In the Workspace Management module checklist, the Identity Card row shows a Lock icon button. The checkbox is rendered in a grey/tertiary-300 colour to indicate it is permanently checked. Clicking the Lock shows a tooltip: *"Identity Card is required and cannot be hidden."*
- **Available across all plans:** Yes. No `CARD_MODULE` key; always rendered.

---

## 7. Current Plan and Module Availability

Plan availability is enforced by the `CARD_MODULE` map and the `isPlanCard()` function. Module keys map to plan permission sets defined in `MODULES`.

### Plan Definitions

| Plan | Module Keys Included |
|---|---|
| HR Basic + Payroll | employee, attendance, payroll, announcements, requisitions, approvals, settings |
| HR Standard | All Basic + events, leave, multitenancy, meetings, grievance, confirmation, exit, promotions, documents |
| HR Premium | All Standard + kpi, performance, learning, elearning, talent, esb, safety, enps, volunteering |

### Card-to-Plan Mapping

| Card | Module Key | Basic | Standard | Premium |
|---|---|---|---|---|
| Identity Card | — | ✅ | ✅ | ✅ |
| Attendance Today | `attendance` | ✅ | ✅ | ✅ |
| Pending Tasks | — | ✅ | ✅ | ✅ |
| Quick Actions | — | ✅ | ✅ | ✅ |
| My Leave Summary | `leave` | FeatureGate | ✅ | ✅ |
| Announcements | `announcements` | ✅ | ✅ | ✅ |
| Team | — | ✅ | ✅ | ✅ |
| Approvals | `approvals` | ✅ | ✅ | ✅ |
| Payslip | `payroll` | ✅ | ✅ | ✅ |
| Employees on Leave | `leave` | FeatureGate | ✅ | ✅ |
| Events & Calendar (Holiday/Anniversary/Birthday tabs) | — | ✅ | ✅ | ✅ |
| Events & Calendar (Events tab) | `events` | FeatureGate (tab hidden) | ✅ | ✅ |
| Employee Directory | — | ✅ | ✅ | ✅ |
| KPI Summary | `kpi` | FeatureGate | FeatureGate | ✅ |
| Document Hub | `documents` | FeatureGate | ✅ | ✅ |
| Grievance & Compliance | `grievance` | FeatureGate | ✅ | ✅ |
| Performance Overview | `performance` | FeatureGate | FeatureGate | ✅ |
| Learning & Development | `learning` | FeatureGate | FeatureGate | ✅ |
| eNPS | `enps` | FeatureGate | FeatureGate | ✅ |
| About Me | — | ✅ | ✅ | ✅ |
| My Competency | — | ✅ | ✅ | ✅ |
| My Work History | — | ✅ | ✅ | ✅ |
| Academic & Professional History | — | ✅ | ✅ | ✅ |
| Payroll History | — | ✅ | ✅ | ✅ |
| Pension History | — | ✅ | ✅ | ✅ |
| Tax History | — | ✅ | ✅ | ✅ |
| Employment Details | — | ✅ | ✅ | ✅ |

> Rows marked **FeatureGate** render a locked-plan informational tile in place of real card content.  
> The 8 profile modules (About Me through Employment Details) have no `CARD_MODULE` key. They are currently available on all plans. **Requires stakeholder confirmation** on whether these should be plan-restricted.

---

## 8. Current Card Content

### Attendance Today
- **Header:** "Attendance Today" · "View Attendance" link (Scenario 1 only)
- **S1 / S3 content:** Check-In Time (9:00 AM / 8:45 AM) · Hours Worked (4h 38m / 3h 15m) · Status chip: "Clocked In" (green)
- **S1 / S3 action:** "Clock Out" button (purple-100 background)
- **S2 empty state:** EmptyCard — icon: Clock · title: "No attendance recorded yet" · body: "Your first clock-in will appear here. Use the button below to start your day." · CTA: "Clock In Now"
- **Plan availability:** All plans

### Payslip
*(See Section 4 above for full detail.)*

Summary:
- **S1:** Gradient card, net salary ₦850,000, privacy toggle, App Store + Google Play links
- **S2:** Dark card, "No payslip available", expected Aug 1 2025
- **S3:** Dark card, "Processing…", 40% progress bar
- **Plan availability:** All plans (`payroll` module)

### Announcements
- **Header:** "Announcements" (no link)
- **Content:** 4 announcements per scenario — emoji icon, bold title, date in tertiary colour
- **S1 topics:** New HR Manager Joins (Jun 19) · Office Policy Update (Jun 18) · Q&A Session on Workplace Policy (Jun 15) · Staff Welfare Initiative Launched (Jun 12)
- **S2 topics:** Welcome message · Onboarding schedule ready · Meet your buddy: Jide Alabi · Office Policy Update
- **S3 topics:** Sign Employee Handbook · IT equipment ready · Submit bank details for payroll · Orientation session
- **Actions:** None (no click handlers)
- **Empty state:** None — always 4 announcements
- **Plan availability:** All plans (`announcements` module)

### Approvals
- **Header:** "Approvals"
- **S1 content:** 3 approval requests — Annual Leave Request · Travel Expense Claim · Remote Work Request
- **S1 action per row:** Approve button (green) + Decline button (red)
- **S2 empty state:** EmptyCard — "No pending approvals" · body: "Approval requests submitted on your behalf will appear here."
- **S3 content:** 3 requests with status chips — Policy Acceptance (Awaiting Signature, amber) · Payroll Setup (Processing, blue) · Equipment Collection (Approved, green)
- **S3 actions:** Status display only; no Approve/Decline buttons
- **Plan availability:** All plans (`approvals` module)

### Team
- **Header:** "Team"
- **S1:** Manager row (Amaka Eze, Engineering Manager · Design) + 2-column grid of 6 team members with photo/avatar, name, role
- **S2:** Manager row + Buddy row (Jide Alabi — Senior Product Designer) + EmptyCard — "Team members loading" · body: "Your team will appear here once your manager completes onboarding setup."
- **S3:** Manager row + Buddy row (James Obi — Backend Engineer) + 2 team members (James Obi, Natalie Cooper)
- **Manager badge:** "Manager" chip (purple-100 background)
- **Buddy indicator:** No explicit "Buddy" badge; buddy is included in member grid
- **Actions:** None
- **Plan availability:** All plans

### Employee Directory
- **Header:** "Employee Directory"
- **Content:** 3 static entries — Natalie Cooper (UI Designer, Design) · James Obi (Backend Engineer, Engineering) · Sarah Mensah (Product Manager, Product)
- **Each row:** Avatar · Name · Role · Dept chip (purple-100)
- **Action:** "View All Employees" button (full width, with Plus icon). No navigation — prototype placeholder.
- **Empty state:** Not implemented
- **Plan availability:** All plans

### Quick Actions
- **Header:** "Quick Actions"
- **Layout:** 2×2 grid of 4 button tiles
- **Button style:** Purple-100 background (standard actions) · Magenta-100 background ("Get the MyXalary App")
- **Plan- and scenario-aware content:**

| Plan | S1 | S2 | S3 |
|---|---|---|---|
| Basic | Clock In/Out · Get the MyXalary App · Submit Request · Upload Document | Complete Profile · Sign Policies · Upload Documents · Clock In/Out | Complete Profile · Clock In/Out · Upload Document · Submit Request |
| Standard | Request Leave · Get the MyXalary App · Upload Document · Clock In/Out | Complete Profile · Sign Policies · Upload Documents · Request Leave | Complete Profile · Request Leave · Upload Document · Clock In/Out |
| Premium | Request Leave · Apply for Training · Upload Document · View Performance | Complete Profile · Sign Policies · Apply for Training · Meet Your Buddy | Complete Profile · Request Leave · Apply for Training · Upload Document |

- **"Get the MyXalary App" action:** Toggles `showAppLinks` boolean in component state. No additional UI is rendered in the Quick Actions card from this toggle; the actual MyXalary download links appear in the Payslip card.
- **All other actions:** No navigation — prototype placeholders
- **Plan availability:** All plans

### My Leave Summary
- **Header:** "My Leave Summary"
- **S1 content:** Donut chart (72% used) · Annual Leave bar (18 / 25 days) · Sick Leave bar (3 / 10 days)
- **S2 empty state:** EmptyCard — "Leave balance pending" · body: "Your leave entitlement will be allocated once onboarding is complete." · CTA: "Learn More"
- **S3 content:** Info banner — "Balance confirmed after 30-day probation." (blue) · Donut at 0% · Both bars at 0
- **Actions:** None
- **Plan availability:** Standard and Premium. Basic plan → FeatureGate ("Leave Management — Contact Your HR Administrator")

### Employees on Leave (Workforce Highlights)
- **Header:** "Employees on Leave" · "View All" link · "Filter by" dropdown
- **Content:** 3 employees — John Adewale (Product Designer, Design, Mid-level, Jun 18→25) · Grace Okafor (Frontend Engineer, Engineering, Senior, Jun 20→27) · Emeka Peters (HR Analyst, HR, Junior, Jun 22→24)
- **Each row:** Avatar · Name · Role · Dept · Cadre · Date range · "On Leave" amber chip
- **Filter dropdown:** Groups: Department · Cadre · Job Role. Shows filter values from the data. "Clear filter" appears when a filter is active.
- **Empty filter state:** "No employees match this filter." text
- **Plan availability:** Standard and Premium. Basic plan → FeatureGate ("Leave Management — Ask Your Administrator")

### Events & Calendar
- **Header (tab bar):** Holiday · Work Anniversaries · Birthdays · Events (Events tab only shown on Standard/Premium)
- **"View All" link:** Right of tab bar
- **Holiday tab:** 3 public holidays — Democracy Day (Jun 12, Public) · Eid el-Kabir (Jun 28–29, Public) · Independence Day (Oct 1, Public). Blue info chips.
- **Work Anniversaries tab:** 3 employees — Emeka Peters (3 yrs 🎉) · Grace Okafor (5 yrs 🎉) · Daniel Eze (2 yrs 🎉)
- **Birthdays tab:** 3 employees — Amaka Eze (🎂 Jul 18) · Daniel Eze (🎂 Jul 22) · Sarah Mensah (🎂 Aug 3)
- **Events tab (Standard/Premium):** Team meetings/sessions per scenario — title, project label, duration, avatar colour stack (up to 3 coloured circles)
- **Default tab:** "Holiday"
- **Actions:** Tab switch; "View All" (no navigation)
- **Plan availability:** Holiday/Anniversary/Birthday tabs: All plans. Events tab: Standard and Premium (hidden on Basic)

### Document Hub
- **Header:** "Document Hub" · "View All" link
- **S1 content:** 3 documents — Employment Contract (Contract, Jan 10 2023, Signed) · NDA Agreement (Legal, Jan 10 2023, Signed) · Q1 Appraisal Form (HR, Mar 15 2025, Pending)
- **S2 empty state:** EmptyCard — "No documents yet"
- **S3 content:** 3 documents — Offer Letter (HR, Jul 1 2025, Uploaded) · NDA Agreement (Legal, Jul 3 2025, Pending) · Employee Handbook (Policy, Jul 3 2025, Pending)
- **Status badges:** Signed (green) · Pending (amber) · Uploaded (blue)
- **Actions:** None (no download or view handlers)
- **Plan availability:** Standard and Premium. Basic → FeatureGate ("Document Management — Request Access")

### Grievance & Compliance
- **Header:** "Grievance & Compliance"
- **S1 content:** 2 cases — Workplace Conduct Complaint (In Review, amber) · Noise Disturbance (Resolved, green)
- **S2 empty state:** EmptyCard — "No active cases"
- **S3 content:** 1 case — Induction Feedback (Under Review, amber)
- **Actions:** None
- **Plan availability:** Standard and Premium. Basic → FeatureGate ("Grievance & Disciplinary — Contact Your HR Administrator")

### Performance Overview
- **Header:** "Performance Overview"
- **S1 content:** Overall score 4.2/5 displayed with filled/partial star indicators · 3 goal progress bars (Q2 Design Sprint 75%, Mentorship Program 60%, Skills Assessment 40%) · "Next Review: Sep 2025" label
- **S2/S3 empty state:** EmptyCard — "No performance data yet"
- **Actions:** None
- **Plan availability:** Premium only. Basic and Standard → FeatureGate ("Performance Management — Learn About This Feature")

### Learning & Development
- **Header:** "Learning & Development"
- **S1 content:** 3 courses — Leadership Essentials (80%, In Progress) · Data Privacy Compliance (100%, Completed) · Design Systems Mastery (45%, In Progress)
- **S2 empty state:** EmptyCard — "No courses assigned yet"
- **S3 content:** 3 courses — Company Culture & Values (100%, Completed) · IT Security Basics (60%, In Progress) · HR Policies Overview (0%, Not Started)
- **Status badges:** In Progress (blue) · Completed (green) · Not Started (tertiary)
- **Actions:** None
- **Plan availability:** Premium only. Basic and Standard → FeatureGate ("Learning & Development — Request Access")

### KPI Summary
- **Header:** "KPI Summary" · "View Goals" link
- **S1 content:** 3 KPI rows — Task Completion (87%, +5%, green) · Attendance Rate (94%, +2%, green) · Projects On Track (3/4, -1 stalled, red)
- **S2 empty state:** EmptyCard — "No KPIs assigned yet" · body: "Your manager will assign KPI targets once onboarding is confirmed." · CTA: "View KPI Framework"
- **S3 content:** 3 KPI rows — Onboarding Progress (65%, 14 days left, amber) · Training Modules (2/5, In Progress, amber) · Policy Sign-offs (1/3, 2 pending, amber)
- **Actions:** None
- **Plan availability:** Premium only. Basic and Standard → FeatureGate ("KPI Management — Ask Your Administrator")

### eNPS
- **Header:** "eNPS Score"
- **S1 content:** Donut chart (72/100) · Score: 72 · Category: "Promoter" · Trend: "+8 vs last quarter"
- **S2/S3 empty state:** EmptyCard — "Survey not yet available"
- **Actions:** None
- **Plan availability:** Premium only. Basic and Standard → FeatureGate ("Employee Net Promoter Score — Learn About This Feature")

### KPI Summary, Performance, Learning, eNPS — FeatureGate Variants

| Card | Basic Gate | Standard Gate |
|---|---|---|
| KPI | Variant: `standard` (blue) — "Included in HR Standard" | Variant: `premium` (purple) — "Included in HR Premium" |
| Performance | Variant: `premium` (purple) | Variant: `premium` (purple) |
| Learning | Variant: `premium` (purple) | Variant: `premium` (purple) |
| eNPS | Variant: `premium` (purple) | Variant: `premium` (purple) |
| Leave Summary | Variant: `standard` (blue) | n/a |
| Employees on Leave | Variant: `standard` (blue) | n/a |
| Documents | Variant: `standard` (blue) | n/a |
| Grievance | Variant: `standard` (blue) | n/a |

### Addable Profile Module Cards (content summary)

| Card | S1 Content | S2/S3 Content |
|---|---|---|
| About Me | Summary text + Facebook/LinkedIn links | Empty fields (editable) |
| My Competency | 4-row competency table | EmptyCard |
| My Work History | 3 employment entries | EmptyCard |
| Academic & Professional History | Academic + Professional tabs with data | EmptyCard per tab |
| Payroll History | 2 payroll period records | EmptyCard |
| Pension History | 2 pension records | EmptyCard |
| Tax History | 2 annual tax filing records | EmptyCard |
| Employment Details | Cadre · Step · Contract Type · Grade · Location | Same structure; some fields null |

---

## 9. Current Employee States

### Attendance States
- **Clocked in (S1, S3):** Check-in time shown, hours worked shown, "Clocked In" green status chip, "Clock Out" button
- **No attendance recorded (S2):** EmptyCard with "Clock In Now" CTA

### Payroll / Payslip States
- **Active payslip (S1):** Gradient card with net salary, deductions, tax, privacy toggle; App Store + Google Play links
- **Privacy mode on (S1):** All values masked with bullet characters `••••••••`
- **Payroll not configured (S2):** Dark card, no salary figures, no download links, expected date shown
- **Payroll setup in progress (S3):** Dark card with 40% progress bar, no salary figures, no download links

### Leave States
- **Leave balance active (S1):** Annual Leave 18/25 and Sick Leave 3/10, donut at 72%
- **Leave balance pending (S2):** EmptyCard
- **On probation / no balance yet (S3):** Info banner + 0 balances

### Announcement States
- **Has announcements (all scenarios):** 4 announcements always shown

### Approval States
- **Has actionable approvals (S1):** Approve + Decline buttons per row
- **No approvals (S2):** EmptyCard
- **Has status-tracked approvals (S3):** Status chips — Awaiting Signature · Processing · Approved

### Team States
- **Full team (S1):** Manager + 6 team members
- **New hire — buddy only (S2):** Manager + Buddy + members EmptyCard
- **Onboarding in progress (S3):** Manager + Buddy + 2 members

### Pending Tasks States
- **Has tasks (S1):** 3 tasks — Complete Annual Self-Assessment (High) · Acknowledge New Policy (Medium) · Update Training Record (Low)
- **No tasks (S2):** EmptyCard — "No tasks assigned yet"
- **Has onboarding tasks (S3):** 3 tasks — Sign Employee Handbook (High) · Complete IT Security Training (High) · Submit Bank Details for Payroll (Medium)

### Performance States
- **Has active performance data (S1):** Score, goals, next review date
- **No performance data (S2/S3):** EmptyCard

### Learning States
- **Has assigned learning (S1):** 3 courses with progress
- **No learning assigned (S2):** EmptyCard
- **Has onboarding learning (S3):** 3 onboarding courses with progress

### KPI States
- **Has KPI targets (S1):** 3 KPI rows with trend indicators
- **No KPIs (S2):** EmptyCard
- **Has onboarding KPIs (S3):** 3 progress-tracking rows

### Document States
- **Has documents (S1):** 3 documents with signed/pending status
- **No documents (S2):** EmptyCard
- **Has pending onboarding documents (S3):** 3 documents with pending/uploaded status

### eNPS States
- **Has eNPS data (S1):** Score 72, Promoter category, trend indicator
- **No survey (S2/S3):** EmptyCard

### Grievance States
- **Has active grievance cases (S1):** 2 cases shown
- **No active cases (S2):** EmptyCard
- **Has onboarding feedback case (S3):** 1 case shown

### Employee on Leave States
- **Employees on leave visible (all scenarios):** Same 3 employees shown regardless of scenario
- **Filter active:** Filtered list shown; "No employees match this filter." if no match
- **No employees on leave:** Not implemented — there are always 3 static records

### Profile Completion State (S3 only)
- Profile progress bar (65%) renders inside the Identity Card, with banner: "Complete your profile to unlock all features"

### Employee ID States
- **ID confirmed (S1, S3):** `#1042`
- **ID pending (S2):** Displays as `"Pending"` in warning amber colour

---

## 10. Current Card Arrangement

### Default Card Order
```
Row 1: identity (10) · attendance (14) · tasks (14) · actions (14) · leave-summary (8)
Row 2: announcements (15) · team (15) · approvals (15) · payslip (15)
Row 3: on-leave (24) · events (24) · directory (12)
Row 4: kpi (20) · documents (20) · grievance (20)
Row 5: performance (20) · learning (20) · enps (20)
```
Numbers = column span in the 60-column grid.

### All Column Spans

| Card | Desktop Span (/ 60) |
|---|---|
| identity | 10 |
| attendance | 14 |
| tasks | 14 |
| actions | 14 |
| leave-summary | 8 |
| announcements | 15 |
| team | 15 |
| approvals | 15 |
| payslip | 15 |
| on-leave | 24 |
| events | 24 |
| directory | 12 |
| kpi | 20 |
| documents | 20 |
| grievance | 20 |
| performance | 20 |
| learning | 20 |
| enps | 20 |
| about-me | 20 |
| competency | 20 |
| work-history | 20 |
| academic-professional | 20 |
| payroll-history | 20 |
| pension | 20 |
| tax-history | 20 |
| employment-details | 20 |

### Card Heights
All cards use auto height determined by their content. No fixed heights are set. Cards within the same row are independently sized (CSS grid `align-items: start`).

### Spacing
- Column gap (desktop): 16 px
- Row gap (desktop): 16 px
- Grid gap (tablet / mobile): `gap-4` (16 px)
- Horizontal padding: `px-6` desktop · `px-4` tablet · `px-3` mobile
- Vertical padding: `py-5` top and between greeting row and card grid

### Masonry / Grid Behaviour
- **Desktop:** `packedRows` algorithm fills rows greedily. Cards are appended to the current row until the next card's span would exceed 60; then a new row begins. Each row renders as `display: grid; grid-template-columns: repeat(60, 1fr)`.
- **Tablet:** All active cards rendered in a single `grid-cols-2` grid.
- **Mobile:** All active cards rendered in a single `grid-cols-1` stack.

### Drag-and-Drop Behaviour
- Active only in editing mode (`isEditing = true`).
- Desktop/Tablet: HTML5 `draggable` on the grip handle. `previewOrder` updates live during hover (before drop). On `drop`, `cardOrder` is updated in state.
- Mobile: Arrow buttons. Up button: `moveCard(idx, -1)`. Down button: `moveCard(idx, +1)`.
- Dragged card: 30% opacity. Drop target: 2 px dashed `C.purple300` outline.

### Workspace Reflow
- Any change to `cardOrder` (toggle, drag, reset) immediately re-evaluates `packedRows` and re-renders the grid.
- No animation on reflow — grid snaps to new layout.

---

## 11. Responsive Audit

### Desktop — 1440 px
- Frame fills the full viewport; no border-radius; no shadow.
- Control bar (plan/scenario/viewport prototype selector) spans full width at the top.
- **Header:** Full logo + "Employee Portal · v2.1" subtext + centred search pill (max-width 420 px) + language selector + notification bell + divider + profile photo + chevron.
- **Greeting bar:** H1 greeting + subgreeting left-aligned; workspace control buttons right-aligned; inline row.
- **Dashboard grid:** Row-packed 60-column masonry. Up to 5 cards per row depending on spans.
- **Workspace Management panel:** Centred modal. Width: `min(700px, calc(100vw - 80px))`. Max height: `min(88vh, 780px)`. Module checklist: 3 columns.
- **Editing mode:** GripVertical drag handle on each card. No arrow buttons.

### Tablet — 768 px
- Frame rendered as a floating card with `border-radius: 16px` and drop shadow, centred on a grey canvas.
- Header top-left and top-right corners rounded.
- **Header:** Logo + subtext · centred search pill · App Launcher · Language Selector · Notifications · Profile (chevron `hidden sm:block` — visible at 768 px)
- **Dashboard grid:** `grid-cols-2`, uniform 2-column layout.
- **Workspace Management panel:** Centred modal. Width: `min(540px, calc(100vw - 48px))`. Module checklist: 2 columns.
- **Editing mode:** GripVertical drag handle. No arrow buttons.

### Mobile — 390 px
- Frame rendered as a floating card with `border-radius: 16px`, centred on canvas.
- **Header:** Logo (no subtext) · icon-only search button · App Launcher · (Language hidden) · Notifications · Profile photo (no chevron)
- **Greeting bar:** Stacks vertically (`flex-col items-start`); workspace controls wrap below greeting text.
- **Dashboard grid:** `grid-cols-1` single stack.
- **Workspace Management panel:** Bottom sheet (`border-radius: 20px 20px 0 0`, full viewport width, max-height 88 vh).
- **Editing mode:** Up and down arrow buttons per card. GripVertical icon renders but is not draggable.
- **Workspace editing toolbar:** Wraps (`flex-wrap w-full`).

### Header Element Visibility by Breakpoint

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Logo | ✅ + subtext | ✅ + subtext | ✅, no subtext |
| Search bar | Pill input | Pill input | Icon button only |
| App Launcher | ✅ | ✅ | ✅ |
| Language Selector | ✅ | ✅ | Hidden |
| Notifications | ✅ | ✅ | ✅ |
| Profile Chevron | ✅ | ✅ | Hidden (`hidden sm:block`) |

---

## 12. Current Known Limitations

### Incomplete / Placeholder Functionality

1. **Quick Actions — "Get the MyXalary App":** Toggles `showAppLinks` boolean in state. No additional UI renders in the Quick Actions card. The actual MyXalary download links are located in the Payslip card, not here. The toggle has no visible effect.
2. **All Quick Action buttons (except the above):** No navigation routing. All are visual placeholders.
3. **Approvals — Approve / Decline buttons:** Visual only. No state change, no API call.
4. **Employee Directory — "View All Employees":** No navigation or modal. Prototype placeholder.
5. **Document Hub:** No download or open functionality. Cards are display-only.
6. **Announcements:** No click handler, no read/unread state, no detail view.
7. **Payroll History / Pension History / Tax History:** No download, export, or detail view.
8. **About Me edit:** Saves to React component state only. Not persisted to `localStorage` or any backend. Refreshing the page resets it.
9. **Notification Settings link:** No navigation.
10. **Notifications "View All" link:** No navigation.
11. **Profile menu items:** All close the panel; none navigate.
12. **App Launcher tiles:** All close the panel; none navigate.
13. **Events "View All" link:** No navigation.
14. **Team member rows:** No click-through to employee profile.
15. **Leave Summary "Learn More" CTA:** No navigation.

### Placeholder / Static Content

1. All employee data (Shola Adeleke, team, payslip figures, KPI values, grievance cases) is static mock data hardcoded in the component.
2. Notification items are static. "Mark all as read" is session-only; it is not persisted.
3. Language selector changes `selectedLang` state but no interface copy changes language.
4. Attendance clock-in time and hours worked are hardcoded per scenario.
5. Leave balances are hardcoded per scenario.
6. Onboarding progress percentage (65%, S3) is hardcoded.
7. Payroll setup progress bar (40%, S3) is hardcoded.

### Not Implemented (no presence in current code)

1. **Loans:** No card, data, state, module key, or plan logic. Not implemented.
2. **Rent Relief:** No card, data, state, module key, or plan logic. Not implemented.
3. **Work Schedule / No Work Schedule state:** No card or data for assigned or missing work schedule. Not implemented.
4. **eNPS Survey interaction:** Display only; no survey form or submission.
5. **Performance review submission:** Display only; no form.

### Unclear Plan Assignment (Requires Stakeholder Confirmation)

The following 8 profile-module cards have no `CARD_MODULE` entry and therefore appear on all plans by default. Whether any of them should be plan-restricted is not defined in the current implementation:

- About Me
- My Competency
- My Work History
- Academic & Professional History
- Payroll History
- Pension History
- Tax History
- Employment Details

### Responsive Inconsistencies

1. **Mobile GripVertical icon:** The grip handle renders on mobile (it is not conditionally hidden) but is non-functional (`cursor: "default"`; `draggable` prop not set on mobile). It is visible in the card overlay alongside the up/down arrow buttons, creating a redundant control.
2. **Editing toolbar on mobile:** Wraps with `flex-wrap w-full`, but the "Unsaved" badge and "Arrange Workspace" label can crowd the row at 390 px.
3. **`hidden sm:block` on profile chevron:** The chevron is hidden below `sm` (640 px). The tablet frame is 768 px so the chevron is visible there, but this breakpoint is based on viewport width, not frame width.

### Temporary / Prototype Elements

1. The control bar (plan / scenario / viewport switcher) is prototype scaffolding. It must be replaced with real authentication, plan resolution, and viewport detection before production deployment.
2. All employee states (Scenario 1, 2, 3) are hardcoded scenarios. Real data binding is not implemented.
