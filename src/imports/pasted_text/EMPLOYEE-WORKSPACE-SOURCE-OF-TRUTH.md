# EMPLOYEE WORKSPACE — CURRENT DESIGN SYSTEM & COMPONENT SOURCE OF TRUTH

**Source file:** `/workspaces/default/code/src/app/App.tsx` (~5393 lines)
**Audit date:** 2026-08-14
**Status:** Forensic record of what CURRENTLY EXISTS. Not a proposal.

---

## TABLE OF CONTENTS

1. Visual Design System
2. Header System
3. App Launcher
4. Global Search
5. Profile / Notifications / Help / Language
6. Card System
7. Dashboard Grid / Layout Engine
8. Workspace Management
9. Authentication / Employee Entry
10. Organization Branding
11. Shared Component System
12. Data vs Presentation Separation
13. Admin Workspace Application
14. Color Tokens

---

## SECTION 1 — VISUAL DESIGN SYSTEM

### Overall Visual Style

- **Style:** Clean, rounded-corner, card-based SaaS dashboard with a purple/magenta brand palette
- **Font family:** `'Poppins', sans-serif` — HARDCODED throughout, applied via inline `fontFamily` and Tailwind `font-['Poppins']`
- **App outer shell background:** `#ddd8e8` (HARDCODED in App root div)
- **Page/content background:** `C.bg = #f4f0f9` (the `<main>` element and frame)
- **Control bar background:** `C.tertiary900 = #1e192e`
- **Auth page background:** `white` (`min-h-screen`, `background: "white"`)

### Typography

| Use | Size | Weight | Color |
|---|---|---|---|
| Card section title (SecHead) | `text-[13px]` | `font-semibold` | `C.tertiary = #5e5873` |
| Card link/action | `text-[11px]` | `font-medium` | `C.magenta = #d62196` |
| Row data primary | `text-[12px]` | `font-semibold` | `C.tertiary` |
| Row data secondary | `text-[10px]` | normal | `C.tertiary` |
| Row data tertiary/timestamp | `text-[10px]` | normal | `C.tertiary300 = #9b90aa` |
| Notification title | `text-[12px]` | `font-semibold` | `C.tertiary` |
| Notification desc | `text-[11px]` | normal | `C.tertiary` |
| Badge/pill text | `text-[9px]`–`text-[10px]` | `font-semibold`/`font-bold` | varies |
| Section label (uppercased) | `text-[10px]` | `font-bold uppercase tracking-widest` | `C.tertiary400 = #7a6e8e` |
| Empty card title | `text-[12px]` | `font-semibold` | `C.tertiary` |
| Empty card body | `text-[10px]` | normal | `C.tertiary` |
| Header greeting | `text-base` | `font-bold` | `C.tertiary` |
| Workspace name button | `text-[11px]` | `font-medium` | `C.tertiary` |
| FigmaTable header | `14px` | `600` | `#5e5873` |
| FigmaTable data | `14px` | `400` | `#5e5873` |
| Auth headings | `text-2xl sm:text-[28px]` | `font-bold` | `C.tertiary800 = #2d2640` |
| Auth body | `text-sm` | normal | `C.tertiary` |
| Auth slide heading | `clamp(26px, 3vw, 48px)` | `font-bold` | `C.purple = #440f7c` |
| Auth slide highlight | same | `font-bold` | `C.magenta = #d62196` |

### Colors — Full Palette

See Section 14 for all hex values.

### Spacing / Gap

- Dashboard outer padding: `px-6 py-5` (desktop), `px-4 py-5` (tablet), `px-3 py-5` (mobile)
- Card padding: `p-4` (16px all sides)
- Card grid gap: `16px` (both axes)
- SecHead margin bottom: `mb-4` (16px)
- Row item internal gap: `gap-3` (12px)
- Horizontal separator: `w-px h-[20px]` bg `#e4e2ee`
- Control bar height: `48px`
- Header height: `54px`

### Card System — Shell

```
bg-white rounded-2xl p-4 shadow-sm border border-border h-full
```

- Background: `white`
- Border radius: `rounded-2xl` (16px)
- Padding: `p-4` (16px)
- Shadow: Tailwind `shadow-sm` (0 1px 2px rgba(0,0,0,0.05))
- Border: Tailwind `border-border` (CSS variable `--border`, resolves to `#e4e2ee` based on context)
- Height: `h-full` (fills grid cell)

### Buttons

**Primary (solid purple):**
```
py-3.5 rounded-xl text-sm font-semibold text-white
background: C.purple (#440f7c)
opacity: 0.45 when disabled
```

**Secondary (ghost/outline):**
```
border border-border text-[11px] font-medium px-3 py-1.5 rounded-xl
background: white, color: C.tertiary
```

**Ghost text link:**
```
text-[11px] font-medium color: C.tertiary300
hover: color: C.tertiary (via onMouseEnter/Leave)
```

**Action button inside card (muted fill):**
```
py-2 rounded-xl text-[11px] font-semibold
background: C.purple100, color: C.tertiary
```

**Danger:**
```
background: #dc2626, color: white
OR background: #fff1f2, color: #dc2626
```

**Approve (inline row):**
```
background: S.success50, color: S.success, text-[10px] px-2.5 py-1 rounded-lg
```

**Decline (inline row):**
```
background: S.error50, color: S.error, text-[10px] px-2.5 py-1 rounded-lg
```

### Badges / Pills / Chips

All badges follow this pattern:
```
text-[9px]–text-[10px] font-semibold px-2–px-2.5 py-0.5 rounded-full
background: semantic50, color: semantic (from S object)
```

Status color map:
- Pending / Warning: `S.warning50` bg, `S.warning` text
- Approved / Success / Active: `S.success50` bg, `S.success` text
- Info / Processing / New: `S.info50` bg, `S.info` text
- Error / Expired: `S.error50` bg, `S.error` text
- On Leave: `S.warning50` bg, `S.warning` text
- "Paid": `S.success50` bg, `S.success` text
- Plan tag Basic: `S.success50` bg, `S.success` text
- Plan tag Standard: `S.info50` bg, `S.info` text
- Plan tag Premium: `C.purple100` bg, `C.purple` text

Unread badge (notifications, announcements): `C.magenta` bg, `white` text

### Tabs

Internal card tabs (e.g. payslip sub-tabs, help panel, events card, academic card):
```
pb-2–pb-2.5 mr-3–mr-5 text-[11px]–text-[12px] font-medium transition-colors whitespace-nowrap
active: color: C.magenta or C.purple, borderBottom: 2px solid active-color
inactive: color: C.tertiary300, borderBottom: 2px solid transparent
```

### Dropdowns / Popovers

Common pattern for all dropdown panels (notifications, profile, language, launcher, help):
- `bg-white rounded-2xl border border-border`
- Shadow: `0 8px 40px rgba(68,15,124,0.16)` (standard) or `0 8px 32px rgba(68,15,124,0.14)` (lighter)
- Positioned via `panelAt(width)` helper: `position: absolute, right: 8, top: calc(100% + 8px), zIndex: 50`
- Max width: `calc(100% - 16px)`

Specific widths:
- App Launcher panel: `340px`
- Language panel: `252px`
- Notifications panel: `384px`
- Help panel: `380px`
- Profile panel: `272px`

### Modals

Manage Workspace panel is the only full modal. MOCKED as a centered overlay.
- Desktop/tablet: `position: fixed, top: 50%, left: 50%, transform: translate(-50%, -50%)`, `border-radius: 20px`
- Desktop width: `min(700px, calc(100vw - 80px))`
- Tablet width: `min(540px, calc(100vw - 48px))`
- Mobile: bottom-sheet, `bottom: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0"`
- Max height: `min(88vh, 780px)` (desktop/tablet) / `88vh` (mobile)
- Background: `white`, border: `1px solid C.purple200`, shadow: `0 20px 60px rgba(68,15,124,0.22)`
- Backdrop: `rgba(30,25,46,0.48)` fixed overlay

### Empty States

Component: `EmptyCard`
```jsx
<div className="flex flex-col items-center text-center py-3">
  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5" style={{ background: C.purple100 }}>
    <Icon size={18} style={{ color: C.purple }} />
  </div>
  <div className="text-[12px] font-semibold mb-1" style={{ color: C.tertiary }}>{title}</div>
  <div className="text-[10px] leading-relaxed mb-3 max-w-[200px]" style={{ color: C.tertiary }}>{body}</div>
  {cta && <button ... rounded-xl text-[10px] font-semibold text-white bg-C.purple>}
</div>
```

### Tooltips

Two implementations:
1. **Workspace lock tooltip** (inline): `position: absolute, right: 0, top: full, mt: 1`, `background: C.tertiary800, color: white, rounded-lg, text-[10px], whiteSpace: nowrap`
2. **Tour spotlight tooltip**: custom placement logic via `getTooltipPlacement()` — smart-placed (below, above, right, left) adjacent to DOM target, width `380px`, `zIndex: 202`

### Dividers / Separators

- Between card rows: `border-b border-border last:border-0` (px-0 full width)
- Between header sections: `w-px h-[20px]` inline element, `background: #e4e2ee`
- Between panel sections: `mx-4` divider line, `height: 1, background: C.purple100`
- Notification group sticky header: `border-b border-border`

### Hover / Active / Selected / Disabled / Focus / Loading States

- **Hover on list items:** Tailwind `hover:bg-muted` (CSS variable, light muted background)
- **Selected/Active panel trigger:** `background: C.purple100` on trigger button
- **Selected item in dropdown:** `background: C.purple100`
- **Dragging card:** `opacity: 0.3`
- **Drag insert target:** `outline: 2px dashed C.purple300, outlineOffset: 3, borderRadius: 16`
- **Disabled primary button:** `opacity: 0.38 / 0.45, cursor: default / not-allowed`
- **Focus (profile trigger):** `outline: 2px solid C.purple300, outlineOffset: 1`
- **Loading spinner (auth):** spinning border `borderTopColor: C.purple`, pulsing logo inside
- **Tour spotlight ring:** `border: 2px solid step.color, animation: tour-ring-pulse 1.2s ease-in-out infinite`
- **Launcher nudge ring:** `conic-gradient(C.purple, C.magenta, #f97316, C.purple), animation: spin 2s linear infinite`
- **Unsaved changes indicator:** magenta dot `w-1.5 h-1.5 rounded-full background: C.magenta`
- **Profile trigger focus ring:** `outline: 2px solid C.purple300, outlineOffset: 1`
- **OTP input incorrect state:** `borderColor: S.error, color: S.error, background: S.error100`

---

## SECTION 2 — HEADER SYSTEM

### Component

`DashboardHeader` function component, lines 3780–4146.

### Structure

```
<header className="bg-white border-b border-[#e4e2ee] relative">
  <div className="h-[54px] flex items-center px-4 gap-2">
    [Logo area]
    [Search bar — desktop only]
    <div className="flex items-center gap-1.5 flex-shrink-0">
      [Mobile search icon — mobile only]
      [AppLauncher trigger]
      [LanguageTrigger — desktop only]
      [NotifTrigger]
      [HelpCircle button]
      [Separator: w-px h-[20px] bg-[#e4e2ee]]
      [ProfileTrigger]
    </div>
  </div>
  [GlobalSearch panel — absolute, full width below header]
  [Shared backdrop for non-search panels]
  [AppLauncherPanel — absolute, right:8, top:calc(100%+8px)]
  [LanguageSelectorPanel — same positioning]
  [NotificationPanel — same positioning]
  [HelpSupportPanel — same positioning]
  [ProfileMenuPanel — same positioning]
  [Tour overlay — fixed full viewport]
  [Launcher nudge tooltip — absolute]
</header>
```

### Height
`h-[54px]` — HARDCODED

### Background / Border / Shadow

- Background: `bg-white`
- Border bottom: `border-b border-[#e4e2ee]` — HARDCODED `#e4e2ee`
- Shadow: `boxShadow: "0px 1px 4px rgba(68,15,124,0.07)"` — inline style
- Border radius: `borderRadius: isConstrained ? "16px 16px 0 0" : 0` — rounded top corners on tablet/mobile frame

### Logo (Left)

FUNCTIONAL — driven by `activeOrgId` prop.

```jsx
const activeOrg = ORG_ACCOUNTS.find(o => o.id === activeOrgId) ?? ORG_ACCOUNTS[0];
<img src={activeOrg.logo} alt={activeOrg.name}
  className="h-[28px] w-auto max-w-[120px] pointer-events-none flex-shrink-0"
  style={{ objectFit: "contain" }} />
```

Logo is followed (desktop only) by two-line text block:
- Line 1: `"My Workspace"` — text-[11px] font-bold color: `#3b2a6e` — HARDCODED string
- Line 2: `"powered by NotchHR"` — text-[8.5px] font-medium color: `#857f9b`

### Search Bar (Desktop)

FUNCTIONAL (UI opens + filters employees; data is MOCKED)

- Visible: desktop only (`!isMobile`)
- `flex-1 flex justify-center px-3` wrapper
- Button: `h-[38px] w-full max-w-[420px] px-[14px] rounded-full border transition-all`
- Default bg: `#f5f2fe`, border: `#c7c5d0`
- Active bg: `C.purple100`, border: `C.purple300`
- Placeholder text: `"Search workspace"` text-[13px] color C.tertiary
- Right side: `⌘K` kbd + search SVG icon (from `svgPaths.p32697080`)
- Click opens GlobalSearch panel

### App Launcher Trigger

See Section 3.

### Language Trigger

- Visible: desktop only (`!isMobile`)
- Component: `LanguageTrigger`
- Size: `h-[32px] px-[9px] rounded-full border`
- Default: `borderColor: #e4e2ee, background: white`
- Open: `borderColor: C.purple300, background: C.purple100`
- Shows current flag emoji + language code in uppercase

### Notifications Trigger

- Component: `NotifTrigger`
- Size: `w-[36px] h-[36px] rounded-full`
- Default bg: `#f5f2fe`; Open bg: `C.purple100`
- Custom SVG bell icon (from `svgPaths.p11013580` + `svgPaths.p12c36f00`)
- Unread badge: `-top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full`, bg: `C.magenta`, text white, font-bold text-[9px]
- Unread count: MOCKED from `NOTIFS` array (3 unread by default; toggleable via "Mark all as read")

### Help Trigger

- Standard `w-[36px] h-[36px] rounded-full` button
- Default bg: `#f5f2fe`; Open bg: `C.purple100`
- Icon: `HelpCircle` size 17
- Default icon color: `C.tertiary`; Open: `C.purple`

### Profile Trigger

- Component: `ProfileTrigger`
- Wrapping button: `rounded-full p-0.5`
- Focus ring: `outline: 2px solid C.purple300, outlineOffset: 1` (when open)
- Photo: `w-[34px] h-[34px] rounded-full object-cover border border-[#e4e2ee]`
- Fallback avatar: `w-[34px] h-[34px] rounded-full font-bold text-white text-xs border border-[#e4e2ee]`, bg: `#f97316` (scenario 1,3) or `C.magenta` (scenario 2)
- Chevron: `w-[14px] h-[14px] hidden sm:block` — hidden on mobile

### Separator Between Controls and Profile

`<div className="w-px h-[20px] flex-shrink-0" style={{ background: "#e4e2ee" }} />` — HARDCODED

### Panel Positioning (All Panels)

```js
const panelAt = (w: number): React.CSSProperties => ({
  position: "absolute",
  right: 8,
  top: "calc(100% + 8px)",
  zIndex: 50,
  width: w,
  maxWidth: "calc(100% - 16px)",
});
```

Backdrop (for non-search panels): `fixed inset-0 z-40` transparent click-to-close layer.

### Responsive Behavior

- `isMobile = viewMode === "mobile"` (390px frame width)
- `isConstrained = viewMode !== "desktop"` (tablet + mobile)
- Desktop: search bar visible, language trigger visible, "My Workspace" text visible
- Mobile: search bar hidden → replaced by search icon button; language trigger hidden; "My Workspace" text hidden; chevron on profile hidden
- Header borderRadius: `16px 16px 0 0` on constrained frames

---

## SECTION 3 — APP LAUNCHER

### Components

- **Trigger:** `AppLauncher` function component (lines 733–755)
- **Panel:** `AppLauncherPanel` function component (lines 757–780)

### Trigger

```jsx
<button
  className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors"
  style={{ background: isOpen ? C.purple100 : "#f5f2fe", position: "relative", zIndex: 2 }}
  title="App Launcher">
  <LayoutGrid size={17} style={{ color: isOpen ? C.purple : nudge ? C.purple : C.tertiary }} />
</button>
```

- Size: `36×36px` — HARDCODED
- Closed bg: `#f5f2fe`; Open bg: `C.purple100`
- Icon: `LayoutGrid` (lucide-react), size 17px
- DOM id: `id="tour-launcher"`

### Nudge Animation (FUNCTIONAL)

Triggered after tour completion: shows 4s after completion, visible 3s, repeats every 14s.
```jsx
{nudge && (
  <div style={{
    position: "absolute", inset: -3, borderRadius: "50%", zIndex: 0,
    background: `conic-gradient(${C.purple}, ${C.magenta}, #f97316, ${C.purple})`,
    animation: "spin 2s linear infinite",
  }} />
)}
{nudge && (
  <div style={{ position: "absolute", inset: -1, borderRadius: "50%", zIndex: 1, background: "white" }} />
)}
```
Gradient ring behind button, white shield over gradient = ring effect.

### Panel

Width: `340px` — HARDCODED in `panelAt(340)` call.

Positioning: `position: absolute, right: 8, top: calc(100% + 8px), zIndex: 50` (via `panelAt`).

```
bg-white rounded-2xl border border-border
boxShadow: "0 8px 40px rgba(68,15,124,0.16), 0 2px 8px rgba(0,0,0,0.06)"
```

**Panel header:**
```
px-5 py-4 border-b border-border
background: linear-gradient(135deg, C.purple100 0%, C.magenta100 100%)
title: "My Workspace" text-[13px] font-bold color: C.tertiary
```

**Module grid:**
```
p-4 grid grid-cols-4 gap-1.5 max-h-[360px] overflow-y-auto
```

Each module tile:
```jsx
<button className="flex flex-col items-center gap-1.5 px-1 py-3 rounded-xl transition-colors hover:bg-muted">
  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: m.iconBg }}>
    <m.icon size={20} style={{ color: m.iconFg }} />
  </div>
  <span className="text-[10px] font-medium text-center leading-tight" style={{ color: C.tertiary }}>{m.label}</span>
</button>
```

Icon container: `44×44px rounded-2xl` — HARDCODED sizes
Icon: size 20px
Label: `text-[10px] font-medium text-center`

### Module Data

`APP_MODULES` array — 19 modules total. Each has:
```
id, label, icon (lucide-react), module (plan key | null), iconBg (hex), iconFg (hex)
```

**Module Filtering — FUNCTIONAL:**
```js
const tiles = APP_MODULES.filter(m => m.module === null || has(plan, m.module));
```
Dashboard entry always shown (module: null). Other modules filtered by active plan.

### Module Grid Layout

- 4 columns, always
- `gap-1.5` (6px)
- max height 360px with `overflow-y-auto` scroll

### No Footer

The AppLauncherPanel has no footer — comment in code suggests it was removed.

### Close Behavior

- Each tile calls `onClose` on click — FUNCTIONAL
- Shared backdrop `fixed inset-0 z-40` click-to-close — FUNCTIONAL
- Escape key: NOT IMPLEMENTED directly on panel (only GlobalSearch implements Escape)
- Outside click: FUNCTIONAL via backdrop

### Responsive Behavior

Panel uses absolute positioning — adapts via `maxWidth: "calc(100% - 16px)"`. No grid column change on mobile.

---

## SECTION 4 — GLOBAL SEARCH

### Component

`GlobalSearch` function component, lines 808–959.

### Trigger Appearance

**Desktop:**
```jsx
<button className="... h-[38px] w-full max-w-[420px] px-[14px] rounded-full border">
  <span className="text-[13px] font-normal" style={{ color: C.tertiary }}>Search workspace</span>
  <kbd className="text-[9px] font-mono ...">⌘K</kbd>
  [search SVG icon]
</button>
```

**Mobile:**
```jsx
<button className="flex items-center justify-center w-[36px] h-[36px] rounded-full">
  [search SVG icon]
</button>
```

### Search Overlay

- Fixed backdrop: `fixed inset-0 z-40 background: rgba(45,38,64,0.38)` — click closes
- Panel: `absolute left-0 right-0 top-full z-50 bg-white`
- Border radius: `0 0 20px 20px`
- Shadow: `0 16px 48px rgba(68,15,124,0.18)`
- Max height: `74vh`
- Display: `flex flex-col overflow hidden`

### Input Row

```
flex items-center gap-3 px-5 py-3.5 border-b border-border
```
- Search icon (SVG from svgPaths, 18×18px)
- Input: `flex-1 text-[13px] outline-none bg-transparent`, color C.tertiary, caretColor C.purple
- Clear button (X): visible when `hasQuery`, `w-5 h-5 rounded-full hover:bg-muted`
- Keyboard hints (desktop only): `⌘K` and `Esc` as `<kbd>` elements, `bg: C.tertiary100, color: C.tertiary, border: C.tertiary200`
- Placeholder: `"Search employees, documents, modules, actions…"`

### Results — With Query

**Employees section:**
- Section label: `text-[10px] font-bold uppercase tracking-widest color: C.tertiary400`
- Result row: `flex items-center gap-3 px-5 py-2.5 hover:bg-muted`
- Avatar (Av component, sm size), name `text-[12px] font-semibold`, role `text-[10px]`
- Right arrow: `ArrowRight size 13, color C.tertiary400`
- Empty message: `text-[12px] color C.tertiary400`

**Documents section:**
- Icon container: `w-7 h-7 rounded-xl bg: C.purple100`
- FileText icon color: C.purple

**Modules section:**
- Pill chips: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg: C.purple100`
- Module icon + name `text-[11px] font-semibold color: C.tertiary`

**Quick Actions section:**
- Icon: `w-7 h-7 rounded-xl bg: C.purple100`, icon color C.purple
- Row: same as employees format

### No-Query State (Recent + Quick Actions)

Two-column layout: `flex divide-x divide-border`

**Recent Searches column:**
- `text-[10px] font-bold uppercase tracking-widest` label
- Items: `Clock` icon 12px color C.tertiary400 + text `text-[12px] color C.tertiary`
- Click sets query — FUNCTIONAL

**Quick Actions column:**
- `w-6 h-6 rounded-lg bg: C.purple100` icon container
- MOCKED — clicking calls `onClose`, no real action

### Footer

```
flex items-center justify-between px-5 py-2.5 border-t border-border
background: C.tertiary50
```
- Left: keyboard hints `↑↓ Navigate`, `↵ Select`, `Esc Close` — VISUAL ONLY (keyboard nav NOT IMPLEMENTED)
- Right: `"Global Search · NotchHR"` — text-[10px] font-medium color C.tertiary400

### Close Behavior

- Escape key: `onKeyDown={e => e.key === "Escape" && onClose()}` on input — FUNCTIONAL
- Backdrop click: FUNCTIONAL
- Clear button clears query, does not close — FUNCTIONAL

### Data

- `RECENT_SEARCHES`: HARDCODED array of 4 strings
- `SEARCH_DATA.employees`: HARDCODED 3 employees (filtered by name/role on query)
- `SEARCH_DATA.documents`: HARDCODED 3 documents (not filtered by query — all always shown)
- `SEARCH_DATA.modules`: HARDCODED 3 modules
- `SEARCH_DATA.quickActions`: HARDCODED 4 actions

### Keyboard Navigation

NOT IMPLEMENTED (footer hints are decorative only)

---

## SECTION 5 — PROFILE / NOTIFICATIONS / HELP / LANGUAGE

### 5A — Profile Menu

**Trigger:** `ProfileTrigger` (lines 1139–1157)
- Photo: `w-[34px] h-[34px] rounded-full object-cover border border-[#e4e2ee]`
- Fallback: `w-[34px] h-[34px] rounded-full font-bold text-white text-xs`, bg: `#f97316` (s1,s3) / `C.magenta` (s2)
- Chevron: `w-[14px] h-[14px] hidden sm:block`, color C.tertiary
- Focus ring: `outline: 2px solid C.purple300, outlineOffset: 1` (when panel open)

**Panel:** `ProfileMenuPanel` (lines 1290–1336), width 272px
```
bg-white rounded-2xl border border-border overflow-hidden
boxShadow: "0 8px 40px rgba(68,15,124,0.16)"
```

Panel header:
```
p-4 border-b border-border
background: linear-gradient(135deg, C.purple100 0%, C.magenta100 100%)
```
- Photo: `w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-sm`
- Name: `text-[13px] font-bold color: C.tertiary`
- Role: `text-[11px] color: C.tertiary`
- Dept + ID: `text-[10px] color: C.tertiary`
- Status: green dot `w-1.5 h-1.5 bg: S.success` + "Active — Online"

Menu groups (from `PROFILE_GROUPS`):
- "Account": My Profile, Switch Organisation, Settings, Preferences
- "Personalization": Change Language, Notification Preferences, Security
- "Support": Help & Support, Keyboard Shortcuts, About NotchHR
- "Session": Sign Out (danger)

Each item row:
```
w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted
icon container: w-7 h-7 rounded-xl bg: C.tertiary100 (or S.error50 for danger)
label: text-[12px] font-medium color: C.tertiary800 (or S.error for danger)
```

Dividers between groups: `mx-4 my-0.5 border-t border-border`

Scroll max height: `55vh`

**Functional actions:**
- Sign Out: calls `onLogout()` — FUNCTIONAL (returns to auth)
- Switch Organisation: calls `onSwitchOrg()` — FUNCTIONAL (returns to auth org-select step)
- All other items: call `onClose()` only — NOT IMPLEMENTED (no navigation)

### 5B — Notifications

**Trigger:** `NotifTrigger` (lines 1028–1043)
- Size: `w-[36px] h-[36px] rounded-full`
- Default bg: `#f5f2fe`; Open bg: `C.purple100`
- Custom SVG bell (not lucide, uses svgPaths)
- Badge: `absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg: C.magenta`

**Panel:** `NotificationPanel` (lines 1045–1113), width 384px
```
bg-white rounded-2xl border border-border
maxHeight: "80vh", display: flex flex-col
boxShadow: "0 8px 40px rgba(68,15,124,0.16)"
```

Panel header:
```
flex items-center justify-between px-5 py-3.5 border-b border-border
```
- "Notifications" text-[14px] font-bold
- Unread count badge: `C.magenta` bg, white text, text-[10px] font-bold
- "Mark all as read" button: `text-[11px] font-semibold color: C.purple` (when unread > 0)

Body: `overflow-y-auto flex-1`

Groups: Today / Yesterday / Earlier

Group header: `px-5 py-2 text-[10px] font-bold uppercase tracking-widest sticky top-0 bg-white border-b border-border color: C.tertiary400`

Notification row:
```
w-full flex items-start gap-3 px-5 py-3 hover:bg-muted
unread bg: rgba(68,15,124,0.03)
```
- Unread dot: `absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg: C.purple`
- Icon container: `w-9 h-9 rounded-2xl flex items-center justify-center mt-0.5`
- Title: `text-[12px] font-semibold truncate color: C.tertiary`
- Optional badge chip (per-notification type)
- Desc: `text-[11px] leading-snug line-clamp-2 color: C.tertiary`
- Time: `text-[10px] color: C.tertiary400`

Footer: `border-t border-border px-5 py-3 bg: C.tertiary50`
- "Notification Settings" link (text-[11px] font-medium)
- "View All →" link (text-[11px] font-semibold)
- Both call `onClose()` — NOT IMPLEMENTED (no real settings/view)

**Data:** HARDCODED `NOTIFS` array (10 items across 3 groups).
**Mark all as read:** FUNCTIONAL (local state toggle, does not persist).

### 5C — Help & Support

**Trigger:** `HelpCircle` icon button, `w-[36px] h-[36px] rounded-full`
Default bg: `#f5f2fe`; Open bg: `C.purple100`

**Panel:** `HelpSupportPanel` (lines 1175–1288), width 380px
```
bg-white rounded-2xl border border-border flex flex-col
maxHeight: "80vh"
boxShadow: "0 8px 40px rgba(68,15,124,0.16)"
```

Panel header:
```
background: linear-gradient(135deg, C.purple100 0%, C.magenta100 100%)
border-b border-border
icon: w-8 h-8 rounded-xl bg C.purple200, HelpCircle size 15 color C.purple
title: "Help & Support" text-[14px] font-bold
subtitle: text-[10px] color C.tertiary300
X close button: w-7 h-7 rounded-full hover:bg-white/60
```

Tabs: Guides / FAQ / Contact Us
```
pb-2.5 pt-2.5 mr-5 text-[12px] font-medium capitalize
active: color: C.purple, borderBottom: 2px solid C.purple
inactive: color: C.tertiary300, borderBottom: 2px solid transparent
```

**Guides tab:** HARDCODED `HELP_ARTICLES` (6 items). Each:
```
w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-border hover:border-purple-200
background: #faf9ff
```
- Emoji icon, category label text-[10px] font-bold uppercase color C.tertiary400
- Title text-[12px] font-semibold, time text-[10px] color C.tertiary400
- ExternalLink icon
- Click: toast `"Opening: {title}"` — MOCKED

**FAQ tab:** HARDCODED `HELP_FAQS` (3 items). Accordion-style:
```
border border-border rounded-xl overflow-hidden
open header: bg C.purple100
open body: px-4 pb-3 pt-1 text-[11px] bg C.purple100
ChevronRight rotates 90deg when open
```

**Contact Us tab:** 3 contact options with gradient backgrounds:
```
background: linear-gradient(135deg, {color}15, {color}08)
border: 1px solid {color}25
```
Colors: C.purple (Live Chat), C.magenta (Email), #f97316 (Docs)
Action buttons: text-white bg: item.color, text-[10px] font-semibold px-3 py-1.5 rounded-lg
Click: toast `"{action} coming soon"` — MOCKED

### 5D — Language Selector

**Trigger:** `LanguageTrigger` (lines 967–977)
- `h-[32px] px-[9px] rounded-full border`
- Open: `borderColor: C.purple300, background: C.purple100`
- Closed: `borderColor: #e4e2ee, background: white`
- Shows: flag emoji + lang code uppercase `text-[12px] font-semibold color C.tertiary`

**Panel:** `LanguageSelectorPanel` (lines 979–1007), width 252px
```
bg-white rounded-2xl border border-border overflow-hidden
boxShadow: "0 8px 32px rgba(68,15,124,0.14)"
```

Panel header:
```
px-4 py-3 border-b border-border bg: C.tertiary50
title: text-[12px] font-bold color C.tertiary
subtitle: text-[10px] color C.tertiary
```

Item row:
```
w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted
active: background: C.purple100
flag: text-xl; name: text-[12px] font-medium; native: text-[10px]
active check: Check size 14 color C.purple
```

**Data:** HARDCODED `LANGUAGES` array — only English and French.
**Selection:** FUNCTIONAL (local state, updates trigger display, closes panel).

---

## SECTION 6 — CARD SYSTEM

### Card Shell Component

```jsx
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border border-border h-full ${className}`}>
      {children}
    </div>
  );
}
```

- Background: `white`
- Border radius: `rounded-2xl` (16px)
- Padding: `p-4` (16px)
- Shadow: `shadow-sm` (Tailwind — resolves to `0 1px 2px 0 rgba(0,0,0,0.05)`)
- Border: `border-border` (Tailwind CSS variable)
- Height: `h-full` (fills grid cell height)
- Extra classes passed via `className` prop (e.g. `flex flex-col`, `h-full flex flex-col`)

### SecHead Component

```jsx
function SecHead({ title, link }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>{title}</span>
      {link && <button className="text-[11px] font-medium" style={{ color: C.magenta }}>{link}</button>}
    </div>
  );
}
```

- Title: `text-[13px] font-semibold color: C.tertiary = #5e5873`
- Link: `text-[11px] font-medium color: C.magenta = #d62196`
- Margin bottom: `mb-4` (16px)
- Link buttons are NOT IMPLEMENTED (they render but click does nothing)

### Card Action Buttons (inside cards)

Standard pattern:
```jsx
<button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold"
  style={{ background: C.purple100, color: C.tertiary }}>
  <Icon size={12} /> Label
</button>
```

All such CTA buttons are MOCKED — no navigation or action, just visuals.

### EmptyCard Component

```jsx
function EmptyCard({ icon: Icon, title, body, cta }) {
  return (
    <div className="flex flex-col items-center text-center py-3">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5 flex-shrink-0"
        style={{ background: C.purple100 }}>
        <Icon size={18} style={{ color: C.purple }} />
      </div>
      <div className="text-[12px] font-semibold mb-1" style={{ color: C.tertiary }}>{title}</div>
      <div className="text-[10px] leading-relaxed mb-3 max-w-[200px]" style={{ color: C.tertiary }}>{body}</div>
      {cta && (
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-white"
          style={{ background: C.purple }}>
          {cta} <ArrowRight size={10} />
        </button>
      )}
    </div>
  );
}
```

- Icon container: `40×40px rounded-2xl bg: C.purple100`, icon `18px color C.purple`
- Title: `text-[12px] font-semibold color C.tertiary`
- Body: `text-[10px] leading-relaxed max-w-[200px] color C.tertiary`
- CTA button: `px-3 py-1.5 rounded-xl text-[10px] font-semibold text-white bg: C.purple`
- CTA button is MOCKED (no action)

### Card Height Behavior

- `h-full` fills the assigned grid cell in the CSS grid layout
- Desktop: CSS grid cells share row height (all cards in same row have equal height from grid)
- No masonry / no independent height tracking — grid rows share the tallest card's height
- `flex flex-col` used on cards with internal sections (enables flex children to fill available space)

### Card Overflow / Truncation

- Text truncation: `truncate` Tailwind class (overflow-hidden, text-overflow: ellipsis, white-space: nowrap)
- Line clamp: `line-clamp-2` (notification descriptions)
- Overflow-y-auto: used on card inner scroll areas (Employees on Leave list, etc.)

### FigmaTable Component

Special table used in GrievanceCard and CompetencyCard:
```
bg-white relative rounded-[8px] w-full
border: absolute overlay div with border-[#e4e2ee] rounded-[8px] inset-0
```
- Header row: `height: 45px, background: rgba(68,15,124,0.02), border-bottom: 1px solid #e4e2ee`
- Header text: `fontSize: 14, fontWeight: 600, color: #5e5873`
- Data rows: `minHeight: 45px, border-bottom: 1px solid #e4e2ee` (except last row)
- Data text: `fontSize: 14, fontWeight: 400, color: #5e5873`
- Mono columns: `fontFamily: 'Consolas', monospace, fontWeight: 700`

---

## SECTION 7 — DASHBOARD GRID / LAYOUT ENGINE

### 12-Column Grid Setup

**Desktop only:**
```jsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: "16px",
}}>
```

**Tablet:** `grid grid-cols-2 gap-4` — all visible cards in 2 columns
**Mobile:** `grid grid-cols-1 gap-4` — single column

### packLayout() Algorithm

Located at lines 2107–2171. Takes array of card IDs and active plan, returns `Array<{id, span}>`.

**Parameters:**
- `COLS = 12` (total columns)
- `def(id)` — preferred default span from `CARD_SPAN_DEFAULT`
- `min(id)` — minimum span from `CARD_SPAN_MIN`
- `max(id)` — maximum span from `CARD_SPAN_MAX`
- `clamp(id, n)` — clamps value between min and max

**Step 1 — Greedy Row Grouping (using default spans):**
Iterates cards in order:
1. If card fits at its default span → add to current row
2. If current row is full (rowSpan === 12) → push row, start new row
3. If card doesn't fit at default BUT fits at minimum → add at min span (will be expanded in Step 2)
4. If card doesn't fit even at min → push current row, start new row with card at default span

**Step 2 — Fill Each Row to Exactly 12 Columns:**
For each row:
- If budget > 0 (row is short):
  - First pass: expand cards that landed at their minimum up to their default
  - Second pass: distribute remaining slack to cards ordered by largest max (most stretchable first)
- If budget < 0 (overflow): shrink cards from right to left down to their minimum

**Result:** Every row sums exactly to 12 columns.

### CARD_SPAN_DEFAULT

```js
{
  "identity": 3,         "attendance": 3,   "leave-summary": 3,
  "announcements": 3,    "approvals": 3,    "enps": 3,
  "team": 4,             "on-leave": 4,     "events": 4,     "directory": 4,
  "documents": 4,        "grievance": 6,    "learning": 4,
  "performance": 5,      "payslip": 5,
  "about-me": 3,         "competency": 6,   "work-history": 3,
  "academic-professional": 3,               "employment-details": 3,
}
```

Default for unlisted cards: `3`.

### CARD_SPAN_MIN

```js
{
  "identity": 3,
  "attendance": 3,    "leave-summary": 3,
  "announcements": 3, "approvals": 3,    "enps": 3,
  "performance": 3,   "learning": 3,
  "events": 4,        "payslip": 4,      "team": 4,     "on-leave": 4,
  "directory": 4,     "documents": 4,
  "grievance": 5,     "competency": 5,
}
```

Min for unlisted: `3`.

### CARD_SPAN_MAX

```js
{
  "identity": 3,        // locked — never grows
  "attendance": 12,     "leave-summary": 12,
  "announcements": 12,  "approvals": 12,
  "enps": 12,           "performance": 12,  "learning": 12,  "events": 12,
  "payslip": 12,        "team": 12,         "on-leave": 12,
  "directory": 5,       "documents": 5,
  "grievance": 7,       "competency": 8,
}
```

Max for unlisted: `12`.

### Drag and Reorder (FUNCTIONAL)

State variables:
- `dragging: string | null` — card ID being dragged
- `dragOver: string | null` — card ID currently hovered over
- `previewOrder` — useMemo computed preview of rearranged order during drag

Handlers:
- `handleDragStart(id, e)`: sets `dragging`, sets `e.dataTransfer.effectAllowed = "move"`. Identity card prevented.
- `handleDragOver(cardId, e)`: sets `dragOver` to hovering card. Identity card never becomes drop target.
- `commitDrop()`: commits the previewOrder to `cardOrder`. Identity card enforced at index 0.
- `handleDragEnd()`: clears drag state.
- `moveCard(flatIdx, dir)`: arrow-key based reorder for mobile (up/down buttons).

Desktop: drag-and-drop. Mobile: up/down arrow buttons.

### previewOrder

```js
const previewOrder = useMemo(() => {
  if (!dragging || !dragOver || dragOver === dragging) return cardOrder;
  const arr = [...cardOrder];
  const fi = arr.indexOf(dragging);
  arr.splice(fi, 1);
  const ti = arr.indexOf(dragOver);
  arr.splice(ti, 0, dragging);
  return arr;
}, [dragging, dragOver, cardOrder]);
```

Live preview: card grid re-renders with `previewOrder` during drag, showing the would-be layout before drop is committed.

### Save / Discard Flow

`isDirty = JSON.stringify(cardOrder) !== JSON.stringify(savedOrder)` — FUNCTIONAL comparison.

Save triggers `saveWorkspace()` → opens `savePanelOpen` naming panel → user enters name → `commitSave(name)`.
`commitSave` persists to `localStorage[WS_MULTI_KEY]`, sets `savedOrder`, closes edit mode.

Discard: `discardAndExit()` — reverts `cardOrder` to `savedOrder`, exits edit mode.

### Workspace Layouts — Tablet and Mobile

Tablet: `grid-cols-2` — 2-column, no packLayout, all visible cards in equal-width columns.
Mobile: `grid-cols-1` — single column, stack.

---

## SECTION 8 — WORKSPACE MANAGEMENT

### localStorage Keys

- `"notchr-workspaces-v1"` (`WS_MULTI_KEY`) — array of all workspaces
- `"notchr-active-ws-v1"` (`WS_ACTIVE_KEY`) — ID of active workspace

### WsRecord Type

```typescript
type WsRecord = { id: string; name: string; order: string[] }
```

### Default Workspace

Created by `makeDefaultWs()`:
```js
{ id: "default", name: "Default Workspace", order: [...WS_FLAT_DEFAULT] }
```

`WS_FLAT_DEFAULT` — HARDCODED 14-card order:
```js
[
  "identity", "attendance", "leave-summary",
  "announcements", "approvals", "payslip", "team",
  "on-leave", "events", "directory",
  "documents", "grievance",
  "performance", "learning",
]
```

### Workspace Switcher

"Manage Workspace" button (top-right of dashboard, not editing mode):
- Shows active workspace name (truncated to `max-w-[140px]`)
- Magenta dot indicator when `isDirty`
- ChevronDown icon rotates when open

### Workspace Panel — FUNCTIONAL

Full panel UI in `isManageOpen` state. See Section 1 for panel dimensions/style.

**Section: Workspaces list**

Each workspace entry:
- Click to switch (non-active)
- Default workspace: Lock icon → tooltip "Default Workspace — cannot be renamed or deleted"
- Non-default: Pencil icon → expands inline action strip (Rename / Delete)
  - Rename: inline input with save/cancel
  - Delete: confirm strip with red Delete button / Cancel

**Section: Workspace Modules**

Checkbox list of ALL `ALL_WS_MODULES` filtered by active plan.
- Responsive grid: 1 col (mobile) / 2 col (tablet) / 3 col (desktop)
- Checkbox: `w-4 h-4 rounded` border/fill animated, Check icon white inside
- Module icon: `w-6 h-6 rounded-md bg: C.purple100`, icon color C.purple
- Label: `text-[12px] color C.tertiary`
- Locked modules (identity card): Lock icon with tooltip, checkbox grayed
- Check/uncheck calls `toggleModule(id)` — FUNCTIONAL

**Panel Footer:**
- "Customize Layout" → exits panel, enters edit mode
- "Reset Workspace" → confirmation strip → `resetToDefault()` FUNCTIONAL
- "Save Workspace" / "Discard" → only shown when `isDirty`

### Edit Mode (Layout Editing)

Entered via "Customize Layout" link in Manage Workspace panel.

When `isEditing` AND not in save/exit confirm:
- Left: "Arrange Workspace" label with GripVertical icon
- "Unsaved" pill badge (magenta) when dirty
- "Reset" link → confirm flow
- "Cancel" → `handleCancelClick()`:
  - If dirty: shows exit-confirm strip
  - If clean: exits edit mode immediately
- "Save Workspace" button (disabled + 0.38 opacity when not dirty)

Each card gets overlaid controls:
- Desktop: drag handle (GripVertical 13px) + remove button (X icon, red)
- Mobile: up/down arrow buttons + grip + remove

### Drag Handles — Style

```js
const handleStyle: React.CSSProperties = {
  width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
  borderRadius: 6, background: "rgba(255,255,255,0.92)", border: "none", padding: 0,
  boxShadow: "0 1px 6px rgba(68,15,124,0.14)",
};
```

### Locked Cards

Only `"identity"` card has `locked: true` in `ALL_WS_MODULES`.
- Cannot be dragged
- Cannot be removed
- Always stays at index 0 of cardOrder (enforced in `commitDrop` and `moveCard`)
- Checkbox in module list grayed with lock icon tooltip

### Save Bar

Inline in dashboard header row when `isEditing`:
```
flex items-center gap-2 flex-shrink-0 (isMobile: flex-wrap w-full)
```
Exit-confirm strip (when dirty + cancel pressed):
```
background: C.magenta100, border: 1px solid C.magenta200, rounded-xl, px-3 py-2
```
"Continue Editing" / "Discard" / "Save Workspace" buttons.

### Save Naming Panel

Inline below header row when `savePanelOpen`:
```
rounded-2xl p-4 bg-white border: 1px solid C.purple200 boxShadow: 0 4px 20px rgba(68,15,124,0.10)
```
- Auto-focuses name input
- "Save Workspace" (disabled if empty)
- "Save as Untitled" (generates `Untitled DD/MM/YYYY` name)
- "Cancel"

### ALL_WS_MODULES (All possible workspace cards)

```js
const ALL_WS_MODULES = [
  { id: "identity",              label: "Identity Card",                   icon: User,          locked: true },
  { id: "attendance",            label: "Attendance Today",                icon: Clock          },
  { id: "leave-summary",         label: "My Leave Summary",                icon: Calendar       },
  { id: "announcements",         label: "Announcements",                   icon: Bell           },
  { id: "team",                  label: "Team",                            icon: Users          },
  { id: "approvals",             label: "Approvals",                       icon: CheckSquare    },
  { id: "payslip",               label: "Employee Benefits",               icon: DollarSign     },
  { id: "on-leave",              label: "Employees on Leave",              icon: Calendar       },
  { id: "events",                label: "Events & Calendar",               icon: Award          },
  { id: "directory",             label: "Employee Directory",              icon: Users          },
  { id: "documents",             label: "Document Hub",                    icon: FileText       },
  { id: "grievance",             label: "Grievance & Compliance",          icon: AlertTriangle  },
  { id: "performance",           label: "Performance Overview",            icon: TrendingUp     },
  { id: "learning",              label: "E-Learning",                      icon: GraduationCap  },
  { id: "about-me",              label: "About Me",                        icon: User           },
  { id: "competency",            label: "My Competency",                   icon: Star           },
  { id: "work-history",          label: "My Work History",                 icon: Briefcase      },
  { id: "academic-professional", label: "Academic & Professional History", icon: GraduationCap  },
  { id: "employment-details",    label: "Employment Details",              icon: Briefcase      },
];
```

Note: `enps`, `kpi`, `payroll-history`, `pension`, `tax-history` cards exist in `renderCardById` but are NOT in `ALL_WS_MODULES` and therefore cannot be toggled via the module list.

---

## SECTION 9 — AUTHENTICATION / EMPLOYEE ENTRY

### Component

`AuthFlow` function component (lines 4162–5277)

### Auth Steps (Type)

```typescript
type AuthStep = "login" | "pin" | "otp" | "org-select" | "loading" |
                "forgot-phone" | "forgot-otp" | "forgot-newpin" | "forgot-confirmpin" | "forgot-success";
```

### Main Login Flow

1. **`login`** — Phone number entry
   - Left pane: walkthrough slider (5 slides) + live clock + weather
   - Right pane: "Welcome back! 👋" heading
   - `PhoneRow` component: Nigeria flag 🇬🇧 (+234 selector) + phone input `type="tel"`
   - Validation: phone must have ≥7 digits (non-digits stripped)
   - "Continue" button → loading → **`pin`**
   - Error message: red text-xs below input

2. **`loading`** (intermediate)
   - Centered spinner: `w-14 h-14` outer ring `border: 3px solid C.purple200`, inner spinning `borderTopColor: C.purple animation: auth-spin 1s linear infinite`
   - Center: pulsing NotchHR logo
   - "Please wait…" text-sm color C.tertiary400
   - Duration: 1200ms (default) / 1000ms (pin→otp, otp→org-select)

3. **`pin`** — 4-digit PIN entry
   - Back button → login
   - "Enter your PIN" heading
   - 4 individual single-character inputs in row: `h-56px rounded-xl border`
   - Default border: `C.purple200`; Filled border: `C.purple`; Filled bg: `C.purple100`
   - Values displayed as `●` (masking) or actual digit if `showPin`
   - Show/hide toggle: EyeOff/Eye icon
   - Auto-advances focus on digit entry
   - Backspace clears and moves focus left
   - On 4th digit complete: auto-submits (loading → otp)
   - "Forgot PIN?" link → **`forgot-phone`**

4. **`otp`** — 6-digit OTP verification
   - Back button → pin
   - "Verify your phone number" heading
   - Phone number displayed masked as `+234 {phone}`
   - 6 individual OTP inputs: `h-52px rounded-lg border`
   - Error state: `borderColor: S.error, color: S.error, background: S.error100`
   - Countdown: 60s timer → "Resend in {n}s" → "Resend OTP" button
   - On 6th digit: auto-submits (loading → org-select)
   - Error messages: "Incorrect code", "This code has expired" (states exist but not triggered automatically)

5. **`org-select`** — Organisation selection
   - "Select an organisation" heading
   - 2-column grid of org cards from `ORG_ACCOUNTS` (10 orgs)
   - Each org card:
     ```
     flex flex-row items-center rounded-2xl
     padding: 10px 12px
     border: 2px solid C.purple (selected) / C.purple200 (unselected)
     background: C.purple100 (selected) / white (unselected)
     ```
     - Logo: `44×36px` container, `bg: C.purple50 (selected) / #f5f5f5 (unselected)`
     - Org name: `text-[11px] font-bold color C.purple800 (selected) / C.tertiary`
     - Role: `text-[9px] color C.purple (selected) / C.tertiary300`
     - Country: `text-[8px] color C.purple300 (selected) / C.tertiary300 opacity 0.75`
     - Selection indicator: `w-4 h-4 rounded-full border: 2px solid C.purple`, filled `bg: C.purple` with Check icon (9px white) when selected
   - "Continue" button: disabled until org selected; calls `onComplete(selectedOrgId)` → sets App-level `activeOrgId`

### Forgot PIN Flow

```
forgot-phone → loading → forgot-otp → loading → forgot-newpin → forgot-confirmpin → loading → forgot-success
```

- **`forgot-phone`**: Same PhoneRow as login, "Send Verification Code" button
- **`forgot-otp`**: 6-digit OTP with countdown (same style as main otp step)
- **`forgot-newpin`**: 4-digit PIN entry (using `PinRow` component)
- **`forgot-confirmpin`**: Re-enter PIN; validates match; if mismatch: error "PINs do not match"
- **`forgot-success`**: Success state with green CheckCircle icon, `S.success50` bg circle, "Back to Sign In" button

### Layout Structure

```
min-h-screen flex flex-col md:flex-row background: white
```

**Left pane** (`hidden md:flex` — desktop only):
- `md:w-[44%] lg:w-[48%]` relative overflow-hidden
- Background: `linear-gradient(160deg, #f8f4ff 0%, #ede8fe 55%, #e2d9fd 100%)`
- Top bar: NotchHR logo (h-8) + time/date/weather (right aligned)
- Live clock: WAT timezone, updates every 1000ms
- Weather: fetched from `https://wttr.in/?format=j1` (FUNCTIONAL live fetch — no API key)
- Walkthrough slider: 5 slides with illustrated previews
  - Each slide: counter, heading (C.purple) + highlight (C.magenta), body, illustrated preview div, nav (prev/next buttons + dot indicators)
  - Slide counter format: `"01 / 05"` etc.
  - Active dot: `width: 20px, background: C.purple`; inactive: `width: 6px, background: C.purple200`
  - `auth-step` animation: `slide-up 0.35s ease both`

**Mobile top bar** (`md:hidden`):
- `background: #f5f2fe, border-bottom: 1px solid C.purple200`
- Logo + clock/weather compact
- Slide dot indicators

**Right pane:**
- `flex-1 flex flex-col bg-white`
- Inner container: `w-full max-width: 420px` centered
- `auth-step` class for slide-up animation on step change

### Shared Sub-components (internal to AuthFlow)

- `PhoneRow` — MOCKED (no real country selector, hardcoded Nigeria +234)
- `PinRow` — 4-box PIN input (reusable within forgot flow)
- `OtpRow` — 6-box OTP input (used in forgot flow; main OTP step uses inline version)
- `PrimaryBtn` — `w-full py-3.5 rounded-xl text-sm font-semibold text-white bg C.purple`
- `BackBtn` — `flex items-center gap-1 mb-6 text-xs color C.tertiary400`
- `ErrorMsg` — `text-xs color S.error`

### Auth Completion

`onComplete(orgId)` callback (passed from `App`) sets `activeOrgId` and `isLoggedIn = true`.

---

## SECTION 10 — ORGANIZATION BRANDING

### Rule

- **Employee view:** Header shows active org's logo (e.g. MTN, Dangote, Flutterwave)
- **Admin view:** NOT YET BUILT — per design intent, Admin shows NotchHR logo (inferred)
- Text alongside logo: `"My Workspace"` / `"powered by NotchHR"` — always NotchHR brand text regardless of org

### ORG_ACCOUNTS Data Structure

```typescript
type OrgAccount = {
  id: string;         // e.g. "mtn-001"
  name: string;       // e.g. "MTN Nigeria"
  country: string;    // e.g. "Nigeria"
  industry: string;   // e.g. "Telecommunications"
  role: string;       // e.g. "Product Designer"
  logo: string;       // URL (mostly Wikipedia SVG/PNG CDN)
  avatarBg: string;   // hex, for fallback avatar background
  avatarFg: string;   // hex, for fallback avatar text
  initials: string;   // e.g. "MTN"
};
```

### Current Org Accounts (10 total)

| ID | Name | Country | Industry | Logo source |
|---|---|---|---|---|
| mtn-001 | MTN Nigeria | Nigeria | Telecommunications | Wikipedia |
| dangote-002 | Dangote Industries | Nigeria | Manufacturing | Wikipedia |
| flutterwave-003 | Flutterwave | Nigeria | Fintech | Wikipedia |
| gtco-004 | GTCO | Nigeria | Banking | Wikipedia |
| jumia-005 | Jumia | Nigeria | E-commerce | Wikipedia |
| safaricom-006 | Safaricom | Kenya | Telecom/Fintech | Wikipedia |
| ecobank-007 | Ecobank | Togo / Pan-African | Banking | Wikipedia |
| ethiopian-008 | Ethiopian Airlines | Ethiopia | Aviation | Wikipedia |
| shoprite-009 | Shoprite | South Africa | Retail | Wikipedia |
| leadway-010 | Leadway Assurance | Nigeria | Insurance | leadway.com CDN |

### activeOrgId Flow

```
AuthFlow (org-select step) → onComplete(orgId) → App.setActiveOrgId(orgId)
                                                  App.setIsLoggedIn(true)
                                                  
App renders DashboardHeader with activeOrgId prop
DashboardHeader passes activeOrgId to ProfileMenuPanel (for "Switch Organisation")
Header logo: ORG_ACCOUNTS.find(o => o.id === activeOrgId)
```

Default: `activeOrgId = "mtn-001"` (HARDCODED initial state, not from localStorage).

### Logo Rendering in Header

```jsx
<img src={activeOrg.logo} alt={activeOrg.name}
  className="h-[28px] w-auto max-w-[120px] pointer-events-none flex-shrink-0"
  style={{ objectFit: "contain", display: "block" }} />
```

Height: `28px` — HARDCODED. Max width: `120px` — HARDCODED.

---

## SECTION 11 — SHARED COMPONENT SYSTEM

Components that should be (or already are) shared between Employee and Admin workspaces:

| Component | Implementation | Styling | Behavior | SHOULD BE SHARED? | Reason |
|---|---|---|---|---|---|
| `Av` | Renders avatar image (from PHOTOS map) or initials div | `xs/sm/md/lg` size variants, colored background, white border, rounded-full | Checks PHOTOS map; falls back to initials | YES | Universal avatar component |
| `Card` | `bg-white rounded-2xl p-4 shadow-sm border h-full` shell | Same across all cards | Pure presentation | YES | Foundation card shell |
| `SecHead` | Title + optional link row | `text-[13px] font-semibold + text-[11px] C.magenta` | Links are currently non-functional | YES | Universal section heading pattern |
| `EmptyCard` | Centered icon + title + body + CTA | `C.purple100 bg` icon container, standardized sizes | CTA is MOCKED | YES | Universal empty state |
| `FigmaTable` | Renderable table with header + data rows | Exact Figma-spec styling: 45px rows, rgba(68,15,124,0.02) header | Supports flex/fixed cols, mono option | YES | Can be used in Admin for data tables |
| `ProfileProgress` | Profile completion progress bar | `S.warning50` bg, `S.warning` bar | Hardcoded 65% value | NO (customize) | Employee-specific progress bar; Admin wouldn't need it |
| `AppLauncher` + `AppLauncherPanel` | Trigger + dropdown panel | Gradient header, 4-col grid | Filters modules by plan | YES (as shared pattern) | Panel structure reusable; module list differs per role |
| `GlobalSearch` | Full-width search overlay | Matches header width | Employee-specific data | PARTIALLY | Overlay/input structure shared; result sections differ |
| `NotifTrigger` + `NotificationPanel` | Bell trigger + grouped notification list | 3-group grouping, read/unread state | Mark-all functional | YES | Identical pattern for Admin |
| `LanguageTrigger` + `LanguageSelectorPanel` | Language selector | Pill trigger + list with check | 2 languages only (MOCKED) | YES | Pure shared UI |
| `HelpSupportPanel` | 3-tab help panel | Gradient header | All actions MOCKED | YES | Reusable structure; content differs |
| `ProfileTrigger` | Avatar + chevron | Focus ring | Renders employee data | YES (as pattern) | Admin profile trigger same visual; different data |
| `ProfileMenuPanel` | Full profile dropdown | Gradient header, grouped menu | Switch Org functional | PARTIALLY | Account section differs; Support/Session same |
| `packLayout()` | 12-col row packer algorithm | N/A (pure logic) | Deterministic layout engine | YES | Same algorithm for Admin grid |
| `DashboardHeader` | Header container | 54px h, white, shadow | Orchestrates all panels | YES (as pattern) | Same structure; different branding logic |
| Tour system (TOUR_STEPS, overlay, spotlight) | Product walkthrough | SVG mask, tooltip card | 5 steps, spotlight + pulsing ring | NO (customize) | Admin tour would have different steps |
| `AuthFlow` | Login flow | Split-pane | Phone→PIN→OTP→OrgSelect | YES | Same auth for both Employee and Admin |

---

## SECTION 12 — DATA VS PRESENTATION SEPARATION

| Codebase Section | Classification | Notes |
|---|---|---|
| `C` object (brand token object) | ORGANIZATION BRANDING | Purple/magenta palette — shared |
| `S` object (semantic status colors) | PRESENTATION/UI | Error/warning/success/info tokens |
| `MODULES` record (plan → Set of module IDs) | PLAN/MODULE LOGIC | Controls feature availability per plan |
| `PLAN_META` record | PLAN/MODULE LOGIC + PRESENTATION/UI | Labels + badge colors per plan |
| `SCENARIO_META` record | PRESENTATION/UI | UI-layer demo scaffolding only |
| `APP_MODULES` array | PLAN/MODULE LOGIC | Module catalog with icon/color metadata |
| `PHOTOS` record | DATA | Hardcoded Unsplash URLs |
| `EMPLOYEE` record | DATA | Employee data per scenario |
| `ORG_ACCOUNTS` array | ORGANIZATION BRANDING + DATA | Org identity data |
| `ANNOUNCEMENTS`, `EVENTS`, `PENDING_TASKS` | DATA | Scenario-keyed content data |
| `QA_BASIC/STANDARD/PREMIUM` | PLAN/MODULE LOGIC + DATA | Plan-keyed quick action arrays |
| `APPROVALS`, `APPROVALS_BASIC`, `APPROVALS_STANDARD` | PLAN/MODULE LOGIC + DATA | Plan + scenario keyed |
| `TEAM`, `ON_LEAVE`, `DIRECTORY` | DATA | Static MOCKED employee data |
| `HOLIDAYS`, `ANNIVERSARIES`, `BIRTHDAYS` | DATA | Calendar content data |
| `KPI_DATA`, `PERF_DATA`, `LEARNING_DATA` | DATA | Scenario-keyed performance data |
| `DOCS_DATA`, `PENSION_DATA`, `TAX_DATA` | DATA | Scenario-keyed financial data |
| `SALARY_DEMAND_DATA`, `TAX_RELIEF_DATA` | DATA | Scenario-keyed financial data |
| `ABOUT_ME_DEFAULTS`, `COMPETENCY_DATA` | DATA | Scenario-keyed profile data |
| `WORK_HISTORY_DATA`, `ACADEMIC_HIST` | DATA | Scenario-keyed profile history |
| `EMPLOYMENT_DETAILS_DATA` | DATA | Scenario-keyed employment data |
| `MODULE_CATALOG` | PLAN/MODULE LOGIC | Addable profile module registry |
| `NOTIFS` | DATA | Hardcoded notification items |
| `SEARCH_DATA`, `RECENT_SEARCHES` | DATA | Hardcoded search results |
| `HELP_ARTICLES`, `HELP_FAQS` | DATA | Hardcoded help content |
| `LANGUAGES` | DATA | 2 hardcoded languages |
| `PROFILE_GROUPS` | PRESENTATION/UI | Menu structure |
| `Av`, `Card`, `SecHead`, `EmptyCard`, `FigmaTable` | COMPONENT BEHAVIOR | Reusable primitives |
| `AppLauncher`, `AppLauncherPanel` | COMPONENT BEHAVIOR | UI component |
| `GlobalSearch` | COMPONENT BEHAVIOR | Search overlay UI |
| `NotifTrigger`, `NotificationPanel` | COMPONENT BEHAVIOR | Notification UI |
| `LanguageTrigger`, `LanguageSelectorPanel` | COMPONENT BEHAVIOR | Language UI |
| `HelpSupportPanel` | COMPONENT BEHAVIOR | Help UI |
| `ProfileTrigger`, `ProfileMenuPanel` | COMPONENT BEHAVIOR + EMPLOYEE-SPECIFIC LOGIC | Profile display uses employee data |
| `packLayout()` | LAYOUT ENGINE | 12-col packing algorithm |
| `CARD_SPAN_DEFAULT/MIN/MAX` | LAYOUT ENGINE | Span constraints per card |
| `Dashboard` | LAYOUT ENGINE + PRESENTATION/UI | Orchestrates grid + edit mode |
| `DashboardHeader` | COMPONENT BEHAVIOR | Header orchestrator |
| `AuthFlow` | EMPLOYEE-SPECIFIC LOGIC | Phone/PIN/OTP auth for employees |
| `WS_MULTI_KEY`, `WS_ACTIVE_KEY`, workspace CRUD | EMPLOYEE-SPECIFIC LOGIC | Workspace persistence per employee |
| Tour system | EMPLOYEE-SPECIFIC LOGIC | Onboarding tour for employees |
| Salary on Demand, Tax Relief tabs | EMPLOYEE-SPECIFIC LOGIC | Employee financial features |
| All individual card renderers (`renderCardById`) | EMPLOYEE-SPECIFIC LOGIC + PRESENTATION/UI | Employee-context card content |
| Control bar (plan/scenario/viewport switcher) | PRESENTATION/UI | Prototype-only demo scaffolding |

---

## SECTION 13 — ADMIN WORKSPACE APPLICATION

Based solely on current implementation, the following is what an Admin Workspace should inherit vs. change:

### INHERIT WITHOUT CHANGE

- All color tokens (`C` and `S` objects)
- Font family: `'Poppins', sans-serif`
- Card shell (`Card` component) — same styling
- `SecHead`, `EmptyCard`, `FigmaTable` — same components
- `Av` — same avatar component
- `packLayout()` algorithm — same 12-col grid packer
- `CARD_SPAN_DEFAULT/MIN/MAX` pattern — admin cards get their own span values
- `GlobalSearch` — same overlay structure, different result data
- `NotifTrigger` + `NotificationPanel` structure — same, different notification data
- `LanguageTrigger` + `LanguageSelectorPanel` — identical
- `HelpSupportPanel` — same structure, different content
- `ProfileTrigger` visual pattern — same circle avatar + chevron
- `AuthFlow` — same phone/PIN/OTP/org-select flow (admin uses same auth system)
- Header height `54px`, spacing, separator style
- Workspace management system (localStorage keys, `WsRecord` type, `makeDefaultWs`, CRUD operations)
- Edit mode drag/reorder/save/discard mechanics
- Manage Workspace panel (panel structure, dimensions, breakpoints)
- Page background `C.bg = #f4f0f9`
- All button patterns (primary, secondary, ghost, danger, action)
- All badge/pill patterns
- Tab patterns (horizontal underline tabs)
- Dropdown panel shadow/border/radius pattern
- Modal (Manage Workspace) size/breakpoint rules
- `ProfileMenuPanel` — Support and Session groups; Account group changes

### CHANGE / OVERRIDE

- **Logo in header:** Admin shows NotchHR logo (`imgLogo`) instead of org logo. Text: `"Admin Workspace"` / `"powered by NotchHR"`
- **Profile menu Account group:** No "Switch Organisation" for admin — instead admin-specific items (e.g. "Admin Settings", "Manage Organisation")
- **App Launcher modules:** Admin module list is different (HR Management, Employees, Payroll, Reports, etc. — not the employee-facing list)
- **Dashboard default card layout (`WS_FLAT_DEFAULT`):** Admin has different default cards (Headcount, Payroll Summary, Leave Overview, etc.)
- **ALL_WS_MODULES:** Admin has its own module registry
- **Card renderers:** All card content is admin-specific (employee lists, org-wide stats, reports)
- **`CARD_SPAN_DEFAULT/MIN/MAX`:** Admin cards have different span preferences
- **Tour steps:** Admin tour covers admin-specific features
- **Plan filtering:** Admin always has full access (plan gating applies only to employee view)
- **Greeting:** Admin gets a different greeting (e.g. "Good morning, {AdminName}")
- **Salary on Demand, Tax Relief, Leave Summary, Attendance Today:** All employee-specific; Admin sees org-level equivalents
- **Quick Actions / announcements card contents:** Admin has different quick actions
- **Scenario system:** No scenario switcher in production Admin (dev tool only)

---

## SECTION 14 — COLOR TOKENS

### C Object — Brand Colors (HARDCODED, lines 18–27)

```js
const C = {
  purple:       "#440f7c",   // Primary brand purple
  purple100:    "#f0e8f9",   // Purple tint — backgrounds, hover states
  purple200:    "#d8c0ef",   // Purple border — card borders, dividers, input borders
  purple300:    "#b990e4",   // Purple medium — focus rings, active borders
  purple800:    "#2a0a4a",   // Purple dark — rare usage

  magenta:      "#d62196",   // Secondary brand magenta — links, active tabs, badges
  magenta100:   "#fce8f5",   // Magenta tint — icon backgrounds
  magenta200:   "#f8c5e8",   // Magenta border — eNPS chart, dividers
  magenta800:   "#8b1260",   // Magenta dark — events card icons
  magenta900:   "#5c0c3f",   // Magenta darkest — (not used directly)

  tertiary50:   "#faf8fc",   // Lightest tertiary — panel footers
  tertiary100:  "#f4f0f9",   // Light tertiary — icon backgrounds, checkboxes
  tertiary200:  "#c2b8cc",   // Tertiary border — work history timeline dots
  tertiary300:  "#9b90aa",   // Tertiary muted text — secondary labels, timestamps
  tertiary400:  "#7a6e8e",   // Tertiary faded — section headers, placeholders
  tertiary:     "#5e5873",   // Primary text color (most body/label text)
  tertiary600:  "#4d4262",   // Tertiary dark — icon colors
  tertiary700:  "#3d3452",   // Tertiary darker — gradient (payslip empty state)
  tertiary800:  "#2d2640",   // Tertiary very dark — auth headings, tooltip backgrounds
  tertiary900:  "#1e192e",   // Tertiary darkest — control bar background

  white:        "#ffffff",   // White
  bg:           "#f4f0f9",   // Page / frame background
};
```

### S Object — Semantic Status Colors (HARDCODED, lines 29–34)

```js
const S = {
  success:      "#14532d",   // Success text (dark green)
  success50:    "#f0fdf4",   // Success background (very light green)
  success100:   "#dcfce7",   // Success border/light fill (light green)

  error:        "#7f1d1d",   // Error text (dark red)
  error50:      "#fef2f2",   // Error background (very light red)
  error100:     "#fee2e2",   // Error fill/OTP incorrect bg

  warning:      "#78350f",   // Warning text (dark amber)
  warning50:    "#fffbeb",   // Warning background (very light amber)
  warning100:   "#fef3c7",   // Warning fill (light amber) — profile progress track

  info:         "#1e3a8a",   // Info text (dark blue)
  info50:       "#eff6ff",   // Info background (very light blue)
  info100:      "#dbeafe",   // Info fill (light blue)
};
```

### Other Hardcoded Colors (inline, not in C or S)

| Usage | Value |
|---|---|
| Header border | `#e4e2ee` |
| Header separator | `#e4e2ee` |
| Outer shell background (control bar area) | `#ddd8e8` |
| Org logo subtitle color ("powered by NotchHR") | `#857f9b` |
| "My Workspace" label color | `#3b2a6e` |
| Facebook link bg | `#e7f0fd` |
| Facebook link fg | `#1877F2` |
| LinkedIn link bg | `#e8f3fc` |
| LinkedIn link fg | `#0A66C2` |
| Attendance: present dot | `#22c55e` |
| Attendance: late dot | `#ef4444` |
| Attendance: present ring | `#86efac` |
| Attendance: late ring | `#fca5a5` |
| Leave card bar (annual) | `C.purple` |
| Leave card track (annual) | `C.purple200` |
| Leave card bar (sick) | `C.magenta` |
| Leave card track (sick) | `C.magenta200` |
| Orange avatar/event color | `#f97316` |
| Green event avatar | `#22c55e` |
| Leave request type color | `#c2410c` (leave orange-red) |
| KPI card: orange | `#f97316` |
| Grievance icon | `#dc2626` |
| Performance goal orange | `#f97316` |
| eNPS (learning) green | `#16a34a` |
| eNPS star amber | `#d97706` |
| Safety red | `#b91c1c` |
| Volunteering pink | `#e11d48` |
| Purple gradient (KPI) | `#9333ea` |
| Help panel bg tile | `#faf9ff` |
| Delete confirm bg | `#fff1f2` |
| Delete confirm border | `#fecdd3` |
| Delete button | `#dc2626` |
| Auth left pane bg start | `#f8f4ff` |
| Auth left pane bg mid | `#ede8fe` |
| Auth left pane bg end | `#e2d9fd` |
| Auth mobile top bar bg | `#f5f2fe` |
| Org card unselected logo bg | `#f5f5f5` |
| Scrollbar thumb | `#c7c0e0` |
| Scrollbar thumb hover | `#9d8fc4` |
| FigmaTable header bg | `rgba(68,15,124,0.02)` |
| Unread notification row bg | `rgba(68,15,124,0.03)` |

---

*End of document. All 14 sections covered. This record reflects the exact state of `/workspaces/default/code/src/app/App.tsx` as of 2026-08-14.*
