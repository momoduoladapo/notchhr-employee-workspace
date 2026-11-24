FIX THE WALKTHROUGH PREVIEW SYSTEM — GLOBAL RULE

The excessive white/empty space problem is NOT isolated to the Employee Benefits card.

I can see the same problem occurring across multiple walkthrough slides.

The walkthrough preview cards/components are being placed inside fixed-height containers, causing the actual product UI to occupy only part of the available space while a large amount of unnecessary empty space remains underneath.

DO NOT FIX EACH CARD INDIVIDUALLY.

Fix the underlying WALKTHROUGH PREVIEW COMPONENT/SYSTEM so that this behaviour is corrected across ALL 5 SLIDES.

==================================================
CORE RULE
==================================================

EVERY PRODUCT PREVIEW MUST HUG ITS CONTENT.

The preview container must derive its height from the actual product content being displayed.

It must NOT force every preview to have the same height.

It must NOT stretch short cards to match the height of the showcase area.

It must NOT create artificial whitespace.

Think:

CONTENT → NATURAL HEIGHT → PREVIEW

NOT:

PREVIEW HEIGHT → FORCE CONTENT INTO IT

==================================================
WHAT I WANT
==================================================

Each walkthrough visual should behave like a proportional crop/snapshot of the REAL PRODUCT INTERFACE.

If the actual product component is 320px tall:

→ preview should represent that proportionally.

If another component is 460px tall:

→ preview should represent that proportionally.

If another is 240px tall:

→ preview should NOT be stretched to 460px.

Every preview has its own natural dimensions.

==================================================
RESPONSIVE SCALING
==================================================

The preview can scale proportionally to fit the available showcase width.

For example:

Actual component:
1000 × 400

Displayed:
650 × 260

That is correct.

Do NOT do:

1000 × 400

inside a:

650 × 500

frame

with 240px of artificial empty space.

The aspect ratio must remain intact.

==================================================
IMPORTANT
==================================================

The preview area itself may have a defined maximum width/visual boundary, but the PRODUCT COMPONENT inside it must NOT have a forced height.

Separate these concepts:

1. Showcase area
2. Product preview
3. Product content

The showcase area provides the visual stage.

The product preview determines its own natural height.

The product content determines the preview's height.

==================================================
DO NOT INVENT CONTENT
==================================================

This global change must NOT cause Make to add information to fill empty space.

If a real product card contains little information:

SHOW THE LITTLE INFORMATION.

Do not add:

- fake rows
- fake statistics
- fake benefits
- fake buttons
- fake labels
- fake values
- decorative UI pretending to be product data

Empty space inside the overall showcase is acceptable.

FABRICATED PRODUCT CONTENT IS NOT.

==================================================
DO NOT STRETCH PRODUCT CARDS
==================================================

Never use the available showcase height as the minimum height of the product component.

Avoid behaviour equivalent to:

height: 100%;
min-height: 100%;
flex: 1;
stretching the product preview vertically.

The product preview should behave like:

height: auto;
width: 100%;
aspect-ratio preserved where applicable.

The internal content must determine its natural height.

==================================================
ALL FIVE WALKTHROUGH SLIDES
==================================================

Apply this rule globally to:

01 — Everything in one workspace
02 — Your dashboard, your way
03 — Your data, stays private
04 — Drag, drop, done
05 — Never miss what matters

Every product preview on every slide must follow the same content-hugging principle.

==================================================
SMART PRODUCT PREVIEW
==================================================

Create a reusable preview behaviour:

- responsive width
- natural/content-driven height
- proportional scaling
- no vertical stretching
- no artificial whitespace
- no content shrinking below usable readability
- no fabricated content
- exact source component fidelity

When the source component changes size or content, the preview should automatically adapt.

==================================================
FINAL QUALITY CHECK
==================================================

Review all five slides after implementing this.

For every product preview ask:

1. Does the preview contain unnecessary empty space?
2. Is the product component being vertically stretched?
3. Is the aspect ratio preserved?
4. Does the card end immediately after its real content?
5. Is any fake information being added to fill space?
6. Is the actual source component being represented faithfully?
7. Is the content still readable?
8. Does the preview look like a proportional product screenshot rather than a card placed inside a fixed-height box?

If any answer is wrong, fix the underlying preview system rather than adding slide-specific hacks.

DO NOT redesign the five slides.

DO NOT change their typography, headlines, navigation, authentication panel, colours, or overall composition.

ONLY FIX THE PRODUCT PREVIEW CONTAINER/SCALING BEHAVIOUR GLOBALLY.