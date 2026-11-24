# NOTCHHR AUTHENTICATION — DESKTOP WEB UI REDESIGN

Redesign the existing NotchHR authentication screens using the **uploaded reference image as the visual style and aesthetic direction**.

IMPORTANT:

The uploaded image is a **STYLE REFERENCE**, not a content or layout specification.

Study its:
- Visual tone
- Spacing
- Typography hierarchy
- Colour balance
- Card treatment
- Border radius
- Soft shadows
- White/lavender surfaces
- Premium SaaS feel
- Overall composition
- Visual polish

Do NOT copy the exact content, illustrations, text, or UI from the reference image.

---

# 1. DESKTOP WEB ONLY

This is a **desktop web authentication experience**.

Design for desktop web viewports.

The primary composition should work beautifully at approximately 1440px width.

Do NOT design mobile screens.

Do NOT make the design look like a mobile app.

Do NOT use a phone-sized authentication layout.

Responsive behaviour can be considered later, but the primary design must be desktop web.

---

# 2. AUTHENTICATION + WALKTHROUGH COMPOSITION

Use a two-column desktop layout:

### LEFT SIDE
The existing **NotchHR employee walkthrough that has already been designed earlier in this project**.

### RIGHT SIDE
The complete authentication experience.

The overall composition should feel balanced and premium, similar in visual quality and tone to the uploaded reference image.

The authentication side should remain clean and focused.

---

# 3. DO NOT REDESIGN THE EXISTING WALKTHROUGH

This is extremely important.

There is already an approved walkthrough process/design in the project.

**Use the existing walkthrough exactly as it has already been designed.**

Do NOT:

- Create new walkthrough content
- Rewrite the walkthrough
- Invent new slides
- Replace the existing illustrations
- Change the existing messaging
- Redesign the walkthrough concept
- Add new product features to the walkthrough

Simply integrate the already-designed walkthrough into the new desktop authentication composition.

The walkthrough should become the **left-side visual experience**.

---

# 4. WALKTHROUGH AUTOPLAY

Turn the existing walkthrough into an **autoplay slider**.

The walkthrough should:

- Automatically advance through the existing slides
- Move smoothly from one slide to the next
- Use a subtle transition
- Show the current slide indicator
- Allow manual navigation if navigation controls already exist
- Pause autoplay when the user manually interacts with the slider
- Resume autoplay appropriately after interaction

Do not make the animation distracting.

The walkthrough should feel alive but calm.

Use a tasteful autoplay interval that gives the user enough time to read each slide.

Approximately **5–7 seconds per slide** is appropriate unless the existing walkthrough already has a defined timing.

---

# 5. AUTHENTICATION FLOW

Keep the authentication logic already established.

The employee signs in using:

**Phone Number → 4-Digit PIN → OTP Verification → Employee Workspace**

There is NO email authentication.

Do not add email.

Do not add password authentication.

Do not add Google/Microsoft/social login.

---

# 6. SIGN-IN SCREEN

Create the primary desktop authentication screen with:

### Heading

"Welcome back! 👋"

### Supporting text

"Sign in to access your Employee Workspace."

### Phone Number

Use a phone number field with the appropriate country selector.

Example:

🇳🇬 +234 | 801 234 5678

### 4-Digit PIN

Use four PIN inputs or an appropriate secure 4-digit PIN component.

Include a show/hide PIN control.

### Secondary action

"Forgot PIN?"

### Primary action

"Sign In"

The authentication panel should be visually clean and spacious.

---

# 7. OTP VERIFICATION

After successful phone number + PIN validation, show the OTP verification screen.

Heading:

"Verify your phone number"

Supporting text should explain that a verification code was sent to the employee's phone.

Display the masked phone number.

Use a four-digit OTP input.

The employee cannot enter the workspace until OTP verification succeeds.

---

# 8. OTP RESEND RULE

The OTP **cannot be resent until 60 seconds have elapsed**.

Show a visible countdown:

"Resend in 60s"

Then:

"Resend in 59s"

Continue until the countdown reaches zero.

Only then should:

"Resend OTP"

become active.

Do not allow the user to bypass this restriction.

Keep the countdown visually subtle and clear.

---

# 9. OTP STATES

Design the appropriate states:

- Empty OTP
- Partially entered OTP
- Verifying
- Incorrect OTP
- Expired OTP
- Resend countdown
- Resend available
- Successful verification

Keep the states visually consistent with the main authentication screen.

---

# 10. PIN RECOVERY

Include the already-defined PIN recovery experience.

Flow:

**Forgot PIN**
→ **Enter Phone Number**
→ **OTP Verification**
→ **Create New 4-Digit PIN**
→ **Confirm New PIN**
→ **PIN Updated Successfully**
→ **Return to Sign In**

Do not introduce email recovery.

Do not introduce unnecessary recovery steps.

Use the same OTP component and 60-second resend restriction used in the normal authentication flow.

---

# 11. VISUAL STYLE

Use the uploaded reference image as the aesthetic benchmark.

The final experience should feel:

- Premium
- Modern
- Clean
- Spacious
- Professional
- Enterprise-ready
- Friendly
- Calm
- Polished

Use the existing NotchHR visual identity.

The uploaded image should guide the **tone and aesthetics**, not dictate the exact layout.

Maintain:

- Clean white surfaces
- Soft lavender/purple environment
- NotchHR purple as the primary action colour
- Subtle borders
- Soft shadows
- Rounded corners
- Strong typography hierarchy
- Generous whitespace
- Refined spacing

Avoid:

- Heavy gradients
- Excessive decoration
- Glassmorphism
- Large generic stock illustrations
- Excessive shadows
- Busy backgrounds
- Marketing-heavy content
- Overly colourful UI
- Excessive animation

---

# 12. RELATIONSHIP BETWEEN LEFT AND RIGHT

The walkthrough and authentication should feel like one product.

The left side communicates the value and experience of the Employee Workspace.

The right side allows the employee to access it.

Maintain a clear visual distinction between the two areas without making them feel like unrelated screens.

The authentication panel should remain the functional focus.

The walkthrough should support the experience rather than compete with the login.

---

# 13. DO NOT CHANGE THE EMPLOYEE WORKSPACE

The existing Employee Workspace is already approved.

Do NOT redesign it.

Do NOT change its cards.

Do NOT change its layout.

Do NOT change its workspace management.

Do NOT change its modules.

Authentication simply leads into the existing Employee Workspace after successful verification.

---

# 14. REQUIRED SCREENS

Design the complete authentication system in this visual style:

1. Sign In
2. Sign In — Loading
3. OTP Verification
4. OTP — Countdown
5. OTP — Incorrect Code
6. OTP — Expired Code
7. OTP — Verifying
8. Successful Authentication
9. Forgot PIN
10. PIN Recovery OTP
11. Create New PIN
12. Confirm New PIN
13. PIN Updated Successfully

All screens should feel like different states of the **same authentication experience**.

---

# FINAL INSTRUCTION

Use the **uploaded image strictly as the visual/aesthetic reference**.

Use the **already-designed walkthrough from this project as the actual walkthrough content**.

Do not invent a replacement walkthrough.

Integrate that existing walkthrough on the **left side as an autoplay slider**.

Place the authentication experience on the **right side**.

Keep everything desktop web.

The final result should feel like a polished, premium NotchHR Employee Workspace entrance — simple, intelligent, spacious and professional.