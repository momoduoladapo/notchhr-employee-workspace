# NOTCHHR DESKTOP AUTHENTICATION — SMART LEFT PANE

Update the existing NotchHR desktop authentication experience.

Keep the existing authentication flow exactly as it is:

Phone Number
→ 4-Digit PIN
→ OTP Verification
→ Employee Workspace

Also keep the existing PIN recovery flow.

Do not change the authentication logic.

---

## 1. DESKTOP COMPOSITION

Keep the existing two-column desktop authentication layout:

### LEFT
Create a smart **Workplace Information Pane**.

### RIGHT
Keep the existing authentication interface.

The left pane should complement the authentication experience without competing with it.

The authentication side remains the primary functional area.

---

# 2. KEEP THE EXISTING WALKTHROUGH

The existing employee walkthrough that was already designed must remain.

Do NOT redesign it.

Do NOT replace its content.

Do NOT create new walkthrough illustrations.

Do NOT rewrite its messages.

Use the walkthrough that already exists in the project.

Turn it into an **autoplay slider**.

The walkthrough should remain the main visual element of the left pane.

### Autoplay

- Automatically advance through the existing slides.
- Use a smooth, subtle transition.
- Give each slide enough time to be read.
- Use approximately 5–7 seconds per slide unless the existing implementation already has a defined timing.
- Display slide indicators.
- Allow manual navigation.
- Pause autoplay when the user interacts with the slider.
- Resume autoplay appropriately after interaction.

Do not make the animation distracting.

---

# 3. SMART INFORMATION ABOVE/AROUND THE WALKTHROUGH

Add useful real-time workplace information to the left pane.

The information should feel like a natural part of the authentication experience rather than separate dashboard widgets.

## TIME

Display:

- Current time
- Current day/date
- Timezone

Example:

10:43 AM
Thursday, August 13
WAT

Make the time visually prominent but not oversized.

---

## WEATHER

Display a compact weather summary.

Include:

- Current temperature
- Weather condition
- Location

Example:

☁️ 28°C
Partly cloudy
Kaduna

Keep this compact.

Do not turn the authentication screen into a weather dashboard.

If the user's location/weather cannot be determined, use an appropriate fallback rather than inventing data.

---

# 4. ORGANIZATION ANNOUNCEMENTS

Because this authentication experience is accessible to employees across the organization, introduce a compact **Organization Announcements** section.

This should show announcements relevant to all employees.

Example:

### FROM YOUR ORGANIZATION

🎉 Annual Company Retreat

August 20–22

Allow multiple announcements to rotate where applicable.

Use a small carousel/slider treatment or compact announcement card.

Show an indicator such as:

● ○ ○

The announcement section should remain secondary to the walkthrough.

Do not make it look like a full announcement dashboard.

---

# 5. LEFT PANE HIERARCHY

The hierarchy should be:

### 1. Time / Date
Small utility information.

### 2. Weather
Small contextual information.

### 3. Existing Employee Walkthrough
**Largest and most visually important element.**

### 4. Organization Announcements
Compact supporting information.

Do not give all four elements equal visual weight.

The walkthrough should remain the hero element of the left pane.

---

# 6. RIGHT SIDE — AUTHENTICATION

Keep the existing authentication experience on the right.

Do not redesign the authentication logic.

It must remain:

### Sign In

Phone Number

4-Digit PIN

Forgot PIN

Sign In

↓

### OTP Verification

4-digit OTP

60-second resend restriction

↓

### Employee Workspace

---

# 7. OTP RULE

The OTP cannot be resent until 60 seconds have passed.

Display:

Resend in 60s

Then count down until:

Resend OTP

becomes available.

Do not allow the user to bypass the timer.

---

# 8. PIN RECOVERY

Keep the existing recovery flow:

Forgot PIN
→ Phone Number
→ OTP
→ Create New PIN
→ Confirm New PIN
→ PIN Updated
→ Sign In

Use the same OTP component and 60-second resend restriction.

---

# 9. VISUAL STYLE

Use the existing authentication design and the uploaded reference image as the visual/aesthetic direction.

The result should be:

- Premium
- Clean
- Spacious
- Modern
- Professional
- Friendly
- Enterprise-ready

Maintain the existing NotchHR visual language.

Do not introduce a new visual identity.

Avoid:

- Excessive gradients
- Heavy illustrations
- Glassmorphism
- Busy backgrounds
- Excessive shadows
- Large decorative elements
- Marketing-heavy content

---

# 10. RESPONSIVE BEHAVIOUR

The design must be fully responsive.

Desktop is the primary design.

At desktop widths:

**Smart Workplace Pane | Authentication**

On smaller desktop/tablet widths, adjust spacing and proportions appropriately.

On mobile web:

- Collapse the two-column layout.
- Prioritize authentication.
- Keep the walkthrough available.
- Move the walkthrough and smart information into an appropriate position above or below authentication.
- Do not create a separate mobile-app design.
- Do not remove the existing walkthrough.

Everything should remain one coherent authentication experience.

---

# 11. IMPORTANT CONSTRAINT

Do not turn the left pane into another dashboard.

It should feel like a **smart welcome area before entering the Employee Workspace**.

The employee should see:

**What time is it?**
**What's the weather like?**
**What's happening in my organization?**
**What can I expect from my workspace?**

Then, on the right:

**Sign in and enter my workspace.**

Keep the experience clean and balanced.

Do not add anything else that has not been requested.