Global SPA structure (anchors stay the same)

#home → #services → #how → #area → #faqs → #about → #reviews → #quote
Keep: sticky top nav with these anchors + sticky mobile footer CTA (Call | Text | Get Quote).
Why: Users jump directly; keeps SPA feel while reducing perceived length.

1) Hero (#home)

Component: Static section (H1 + subhead + 1 CTA)
Final copy:

H1: Sparkle Scrub
Subhead: Owner‑operated house cleaning for Ten Mile, Knoxville, and surrounding areas.
Body (1 line): One set of hands, done right—without the fuss.
Primary CTA: Request a quick estimate
Reasoning: Puts value prop + location + action above the fold.
Implementation hints:

Keep trust strip directly below (3–4 chips).
Only 1 primary CTA in viewport to avoid duplication.
2) Trust strip (under hero)

Component: Pills/chips (3–4)
Final copy: Local & dependable · Flexible scheduling · Pet‑friendly · Simple communication
Reasoning: Quick skim proof; no extra height.
Implementation hints: Single row; wrap on mobile.

3) Services (#services)

Component: Tabs for: Homes · Airbnb/STR · Small Offices
Each tab has: Summary (30–45 words) + “What’s included” Accordion (3 panels) + Add‑ons Drawer + Not offering Drawer.
This replaces three full sections with one container.

3A) Tab summaries (paste exactly)
Homes – Summary (≤45 words):
Kitchens, baths, bedrooms, living areas, and floors—kept tidy and comfortable. I stick to the plan we set and show up when I say I will. Straightforward communication and a clean you can count on.

Airbnb / Short‑Term Rental – Summary (≤45 words):
Guest‑ready turns with sanitizing touchpoints, fresh linens and towels, light restock when supplies are on‑site, and quick photo check on request. Same‑day turns when I can fit them.

Small Offices – Summary (≤45 words):
Cozy workspaces like private practices or small suites. Clear common surfaces, restrooms and break area, floors, and trash/recycling. After‑hours possible for suites.

Reasoning: Tabs compress vertical height by ~⅔ and keep all service content reachable with one tap.

3B) “What’s included” (Accordion within each tab)
Panel titles (same across tabs):

Kitchens
Bathrooms
Bedrooms & Living Areas
Panel lists (4–6 bullets each, paste):
Kitchens: Counters • Sink/faucet • Cabinet fronts • Microwave interior • Appliance exteriors • Floors
Bathrooms: Toilets • Tubs/showers • Sinks/vanity • Mirrors • Floors
Bedrooms & Living Areas: Dust reachable surfaces • Tidy • Floors

Reasoning: Collapsible details save space; bullets are scan‑friendly.

3C) Add‑ons (Drawer from a link or “Add‑ons” button)
Chips (paste): Inside oven · Inside fridge · Interior windows (reachable) · Baseboards/detail dusting · Light wall spot‑cleaning · Laundry fold (your detergent) · Dish wash‑up
Drawer intro (1 line): Ask ahead so I can plan enough time.

**3D) Not currently offering (Drawer)
Chips (paste): Carpet shampoo/extraction · Post‑construction debris · Tall‑ladder/roof work · Severe hoarding · Active pest issues · Mold/biohazard · Exterior windows
Drawer note (1 line): Keeping it straightforward and focused on what I do best.

Implementation hints (Services):

Use a single <Tabs> container with three <TabPanel>s.
Inside each <TabPanel>, one <Accordion> for “What’s included”.
“Add‑ons” & “Not offering” open a <Drawer> or <Modal> overlay; no extra page.
On desktop, render bullets in 2–3 columns to reduce scroll.
4) How it works (#how)

Component: Stepper (3 steps, one‑liners)
Final copy:

Reach out: Send the estimate form with ZIP and what you need.
Plan: I confirm scope and set a time.
Clean day: I do the work we agreed—no drama, no shortcuts.
Reasoning: Replaces a tall three‑column section with a compact stepper.
Implementation hints: Horizontal stepper on desktop, vertical on mobile.

5) Service area (#area)

Component: Short blurb + “See map” Modal
Final copy (1 sentence): Based in Ten Mile; I serve Knoxville and nearby areas. Add your ZIP in the estimate request.
Modal hint: Simple embedded map centered on Ten Mile with radius/markers (no new page).
Reasoning: Kills a tall “area” block; keeps details on demand.

6) FAQs (#faqs)

Component: Accordion – show Top 5 only; “See all FAQs” expands the rest inline.
Top 5 (paste):

Do you bring supplies? Yes. If you prefer certain brands, tell me.
Scent‑free options? Yes—just let me know.
Recurring cleans? Yes: weekly, bi‑weekly, or monthly.
Interior windows? Reachable only; it’s an add‑on.
Invoices/receipts? Yes—emailed.
Reasoning: Top‑5 answers solve 80% of questions; the rest are collapsible to save height.
Implementation hints: Lazy‑render the extended list after “See all” is clicked.

7) About (#about)

Component: Short card (≤60 words) + “Read more” inline expand
Final copy (card):
Hi—I’m the one cleaning your place. I keep it straightforward, show up when I say I will, and make sure the basics are done right every time. If you have product preferences or routines, tell me once and I’ll stick to them.

Reasoning: Personal trust without a long bio; expanded text only if requested.
Implementation hints: Two‑line clamp on mobile; “Read more” toggles height.

8) Testimonials (#reviews)

Component: Carousel/slider with 3–5 quotes (≤25 words each)
Sample copy (you can swap names/places):

“Clean, on time, and easy to work with. House felt brand‑new.” — Sarah J., Ten Mile
“Reliable and flexible for our Airbnb turns. Guests notice.” — Mark T., Knoxville
“Clear communication and great results—no drama.” — Elaine P., Lenoir City
Reasoning: Carousel uses a single viewport height.
Implementation hints: Auto‑advance, swipe on mobile; pause on hover.

9) Quote (#quote)

Component: Progressive form (low‑friction first, details optional)

Visible by default (3 fields):

Name
City or ZIP
Contact preference: Text / Email / Call (conditionally reveals phone or email)
Optional “More details” expand:

Service type (Homes / Airbnb / Small Offices)
Beds/Baths (or Rooms for offices)
Add‑ons (chips, multi‑select)
Preferred days/times (free text)
Reasoning: Fewer initial fields = better completion; details still available on demand.
Implementation hints:

Conditionally required fields based on Contact preference.
Save partials if possible; send form analytics events (see below).
Labels concise; placeholders helpful; client‑side validation with friendly messages.
Sticky mobile footer CTA: Call | Text | Get Quote (routes to this form / opens dialer).

Content‑type changes (summary)

Services: Convert three stacked sections → Tabs (no route change).
What’s included: Long lists → Accordions (3 panels).
Add‑ons / Not offering: Full sections → Drawer/Modal triggered from Services.
About: Full section → Short card with Read‑more toggle.
FAQs: Long list → Accordion (Top 5) with inline “See all”.
Service area: Block → 1 sentence + “See map” Modal.
Testimonials: Grid/list → Carousel.
These are wrappers around your current markup/data, not a structural rewrite.

Why these changes work (quick rationale)

Tabs & accordions reduce vertical height while keeping content one tap away (less cognitive load, faster to scan).
One primary CTA per viewport avoids choice overload and repetition.
Short-copy, bullets, and chips match skim behavior and keep localized details accessible.
Progressive form minimizes friction while preserving data quality.
Implementation hints (for devs)

Components & ARIA (accessibility)
Tabs: role="tablist", role="tab", aria-controls, aria-selected; left/right arrow keys.
Accordion: Use buttons for headers; aria-expanded toggles; aria-controls to panel ID.
Drawer/Modal: Focus trap; ESC closes; return focus to trigger.
Stepper: Mark current step with aria-current="step".
Carousel: Provide next/prev buttons; ensure swipe + keyboard support.
Layout
Normalize section padding (e.g., py-12 desktop, py-8 mobile).
Use 2–3 column lists on desktop for “What’s included” to halve scroll.
Keep sparkles; just reduce excess vertical spacing between blocks.
Analytics (optional but recommended)
Event names:
tab_change (service_name)
accordion_open (section_name)
cta_click (location: hero/services/footer)
form_start, form_expand_details, form_submit_success, form_submit_error
Goals: Increase form_start and submit_success; reduce drop‑off after first field.
Performance
Lazy‑load testimonial images and any map iframe (modal open).
Use loading="lazy" on images; defer non‑critical scripts.
SEO (lightweight, stays SPA)
Keep an H1 (Hero), then H2s per section; no duplicate H1s.
Add LocalBusiness JSON‑LD with Ten Mile/Knoxville NAP.
Ensure your footer NAP matches GMB.
Tone & voice
Keep warm, straightforward, no‑nonsense.
Use short sentences; avoid jargon; keep regionally friendly phrasing.
Paste‑ready content bundle (quick copy)

Hero

H1: Sparkle Scrub
Subhead: Owner‑operated house cleaning for Ten Mile, Knoxville, and surrounding areas.
Body: One set of hands, done right—without the fuss.
CTA: Request a quick estimate
Trust chips
Local & dependable · Flexible scheduling · Pet‑friendly · Simple communication

Services → Tabs

Homes (summary): Kitchens, baths, bedrooms, living areas, and floors—kept tidy and comfortable. I stick to the plan we set and show up when I say I will. Straightforward communication and a clean you can count on.
Airbnb/STR (summary): Guest‑ready turns with sanitizing touchpoints, fresh linens and towels, light restock when supplies are on‑site, and quick photo check on request. Same‑day turns when I can fit them.
Small Offices (summary): Cozy workspaces like private practices or small suites. Clear common surfaces, restrooms and break area, floors, and trash/recycling. After‑hours possible for suites.
What’s included (accordion bullets):

Kitchens: Counters • Sink/faucet • Cabinet fronts • Microwave interior • Appliance exteriors • Floors
Bathrooms: Toilets • Tubs/showers • Sinks/vanity • Mirrors • Floors
Bedrooms & Living Areas: Dust reachable surfaces • Tidy • Floors
Add‑ons (drawer): Inside oven · Inside fridge · Interior windows (reachable) · Baseboards/detail dusting · Light wall spot‑cleaning · Laundry fold (your detergent) · Dish wash‑up
Not offering (drawer): Carpet shampoo/extraction · Post‑construction debris · Tall‑ladder/roof work · Severe hoarding · Active pest issues · Mold/biohazard · Exterior windows

How it works (stepper):

Reach out: Send the estimate form with ZIP and what you need.
Plan: I confirm scope and set a time.
Clean day: I do the work we agreed—no drama, no shortcuts.
Service area (blurb + modal):
Based in Ten Mile; I serve Knoxville and nearby areas. Add your ZIP in the estimate request.

FAQs (Top 5):

Do you bring supplies? Yes. If you prefer certain brands, tell me.
Scent‑free options? Yes—just let me know.
Recurring cleans? Yes: weekly, bi‑weekly, or monthly.
Interior windows? Reachable only; it’s an add‑on.
Invoices/receipts? Yes—emailed.
About (card):
Hi—I’m the one cleaning your place. I keep it straightforward, show up when I say I will, and make sure the basics are done right every time. If you have product preferences or routines, tell me once and I’ll stick to them.

Testimonials (3 examples):

“Clean, on time, and easy to work with. House felt brand‑new.” — Sarah J., Ten Mile
“Reliable and flexible for our Airbnb turns. Guests notice.” — Mark T., Knoxville
“Clear communication and great results—no drama.” — Elaine P., Lenoir City
Quote form:

Initial fields: Name · City/ZIP · Contact preference (Text/Email/Call)
Conditional fields: Phone or Email (based on preference)
More details (expand): Service type · Beds/Baths or Rooms · Add‑ons (chips) · Preferred days/times
