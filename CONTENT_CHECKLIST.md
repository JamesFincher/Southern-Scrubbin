# Content Sections Checklist (FAQs + About + Testimonials)

## Task Checkout
- **STATUS**: 🔄 Available
- **ASSIGNED TO**: [AI_ID - UPDATE THIS WHEN CLAIMING]
- **ESTIMATED TIME**: 45-60 minutes
- **DEPENDENCIES**: None

## Files to Modify
- FAQs component (accordion implementation)
- About component (card with expand)
- Testimonials component (carousel)

## Implementation Overview
Transform three content sections with space-saving interactive components:
- FAQs: Top 5 accordion + "See all" inline expansion
- About: Short card + "Read more" toggle
- Testimonials: Carousel/slider with 3-5 quotes

## FAQs Section (#faqs)

### Accordion Implementation - Top 5
- [ ] **Accordion Component**: Collapsible Q&A format
- [ ] **Button Headers**: Use buttons for questions (accessibility)
- [ ] **aria-expanded**: Toggle on expand/collapse
- [ ] **aria-controls**: Connect question to answer panel
- [ ] **Show Top 5 Only**: Initially display only 5 questions

### Top 5 FAQ Content (exact copy)
- [ ] **Q1**: "Do you bring supplies?" / **A1**: "Yes. If you prefer certain brands, tell me."
- [ ] **Q2**: "Scent‑free options?" / **A2**: "Yes—just let me know."
- [ ] **Q3**: "Recurring cleans?" / **A3**: "Yes: weekly, bi‑weekly, or monthly."
- [ ] **Q4**: "Interior windows?" / **A4**: "Reachable only; it's an add‑on."
- [ ] **Q5**: "Invoices/receipts?" / **A5**: "Yes—emailed."

### "See All FAQs" Expansion
- [ ] **Expand Button**: "See all FAQs" below Top 5
- [ ] **Inline Expansion**: Expands additional FAQs in same section
- [ ] **Lazy Rendering**: Render extended list only after click
- [ ] **Collapse Option**: "Show less" to return to Top 5
- [ ] **Smooth Animation**: Expand/collapse with smooth transition

### Extended FAQ List
Create additional relevant FAQs following the same format:
- [ ] **Q6-10**: Add 5 more common questions about pricing, scheduling, etc.
- [ ] **Consistent Format**: Same Q&A pattern as Top 5
- [ ] **Local Focus**: Questions relevant to Ten Mile/Knoxville area

## About Section (#about)

### Card Implementation
- [ ] **Card Container**: Visual card design
- [ ] **Text Clamp**: Two-line clamp on mobile, appropriate clamp on desktop
- [ ] **Character Limit**: ≤60 words in card view
- [ ] **Read More Toggle**: Button to expand full content

### About Card Content (exact copy)
- [ ] **Card Text**: "Hi—I'm the one cleaning your place. I keep it straightforward, show up when I say I will, and make sure the basics are done right every time. If you have product preferences or routines, tell me once and I'll stick to them."
- [ ] **Word Count**: Verify ≤60 words

### Read More Expansion
- [ ] **Toggle Mechanism**: "Read more" expands, "Read less" collapses
- [ ] **Height Animation**: Smooth height transition
- [ ] **Full Content**: Add expanded content about owner/operator story
- [ ] **Accessibility**: Screen reader friendly expansion

## Testimonials Section (#reviews)

### Carousel Implementation
- [ ] **Carousel Component**: Horizontal slider for quotes
- [ ] **3-5 Testimonials**: Multiple customer quotes
- [ ] **Auto-Advance**: Automatic progression between testimonials
- [ ] **Manual Controls**: Next/prev buttons
- [ ] **Touch Support**: Swipe gesture on mobile
- [ ] **Keyboard Support**: Arrow keys for navigation
- [ ] **Pause on Hover**: Stop auto-advance when hovering

### Testimonial Content (exact copy)
- [ ] **Quote 1**: "Clean, on time, and easy to work with. House felt brand‑new." — Sarah J., Ten Mile
- [ ] **Quote 2**: "Reliable and flexible for our Airbnb turns. Guests notice." — Mark T., Knoxville  
- [ ] **Quote 3**: "Clear communication and great results—no drama." — Elaine P., Lenoir City

### Additional Testimonials
- [ ] **Quote 4-5**: Create 2 more testimonials following same pattern
- [ ] **Local Names**: Use appropriate local names and nearby cities
- [ ] **≤25 Words**: Keep each quote under 25 words
- [ ] **Authentic Tone**: Match Southern, straightforward voice

### Carousel Technical Requirements
- [ ] **Single Viewport**: Only one testimonial visible at a time
- [ ] **Smooth Transitions**: Slide or fade transitions
- [ ] **Indicators**: Dots or similar progress indicators
- [ ] **Accessibility**: Screen reader announcements for changes
- [ ] **Responsive**: Works well on all screen sizes

## Layout & Design Requirements

### Section Spacing
- [ ] **Consistent Padding**: Match other sections (py-12 desktop, py-8 mobile)
- [ ] **Visual Hierarchy**: Clear H2 headings for each section
- [ ] **Brand Consistency**: Use established color scheme
- [ ] **Proper Margins**: Appropriate spacing between elements

### Mobile Optimization
- [ ] **Touch Targets**: 44px minimum for interactive elements
- [ ] **Readable Text**: Appropriate font sizes for mobile
- [ ] **Carousel Touch**: Swipe gestures work smoothly
- [ ] **Expand Behaviors**: Toggles work well on mobile

## Accessibility Implementation

### FAQ Accordion Accessibility
- [ ] **Button Elements**: Questions are buttons, not divs
- [ ] **ARIA Expanded**: aria-expanded="true/false" on questions
- [ ] **ARIA Controls**: aria-controls pointing to answer IDs
- [ ] **Keyboard Navigation**: Tab through questions, Enter/Space to toggle
- [ ] **Focus Management**: Logical focus order

### About Card Accessibility
- [ ] **Semantic Markup**: Proper heading and paragraph structure
- [ ] **Toggle Accessibility**: "Read more" as button with aria-expanded
- [ ] **Screen Reader**: Clear indication of expanded/collapsed state

### Carousel Accessibility
- [ ] **ARIA Live**: Announce testimonial changes
- [ ] **Button Controls**: Next/prev as buttons with clear labels
- [ ] **Keyboard Navigation**: Arrow keys and tab order
- [ ] **Focus Indicators**: Clear focus states on controls
- [ ] **Auto-Play Control**: Ability to pause auto-advance

## Performance Considerations

### Loading Optimization
- [ ] **Image Lazy Loading**: If testimonials have photos
- [ ] **Component Splitting**: Efficient code organization
- [ ] **Animation Performance**: Use transform/opacity for smooth animations
- [ ] **Memory Management**: Clean up carousel intervals

### Content Loading
- [ ] **Lazy FAQ Content**: Extended FAQs loaded on demand
- [ ] **Efficient Rendering**: Minimize re-renders on interactions
- [ ] **Carousel Optimization**: Efficient slide transitions

## Testing & Validation

### Functionality Testing
- [ ] **FAQ Accordion**: All questions expand/collapse correctly
- [ ] **FAQ "See All"**: Extended list expands inline
- [ ] **About Toggle**: Read more/less works smoothly
- [ ] **Carousel**: Auto-advance, manual controls, touch gestures
- [ ] **Responsive**: All components work across device sizes

### Content Verification
- [ ] **FAQ Copy**: All 5 top FAQs match imp.md exactly
- [ ] **About Copy**: Card text matches exactly (≤60 words)
- [ ] **Testimonial Copy**: All quotes match exactly (≤25 words each)
- [ ] **Attribution**: Customer names and locations included

### Accessibility Testing
- [ ] **Keyboard Only**: Full functionality without mouse
- [ ] **Screen Reader**: Test with screen reader software
- [ ] **Focus Management**: Logical tab order throughout
- [ ] **ARIA**: Proper ARIA attributes and announcements

## Completion Checklist
- [ ] FAQs accordion with Top 5 + "See all" expansion
- [ ] About card with read more toggle (≤60 words)
- [ ] Testimonials carousel with 3-5 quotes (≤25 words each)
- [ ] All copy matches imp.md exactly
- [ ] Full accessibility compliance
- [ ] Responsive design verified
- [ ] Performance optimized
- [ ] Navigation anchors working (#faqs, #about, #reviews)

## When Complete
1. Update STATUS to "Complete - [YOUR_AI_ID]"
2. Update MASTER_CHECKLIST.md Content sections checkboxes
3. Test all interactive elements
4. Verify accessibility and responsive behavior

## Notes & Issues
[Add any implementation notes, component decisions, accessibility considerations, performance optimizations, or issues encountered here]