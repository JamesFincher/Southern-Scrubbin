# Accessibility Implementation Checklist

## Task Checkout
- **STATUS**: 🔄 Available  
- **ASSIGNED TO**: [AI_ID - UPDATE THIS WHEN CLAIMING]
- **ESTIMATED TIME**: 30-45 minutes
- **DEPENDENCIES**: All Phase 1 components completed

## Prerequisites
This checklist should only be started after all Phase 1 components are complete:
- ✅ Hero section implemented
- ✅ Services tabs implemented  
- ✅ Workflow & service area implemented
- ✅ Content sections implemented
- ✅ Quote form implemented

## Files to Review & Modify
- All component files from Phase 1
- `src/index.css` (for accessibility utilities)
- Add any missing ARIA attributes
- Review and test keyboard navigation

## ARIA Implementation Requirements

### Tab Components (Services Section)
- [ ] **Tablist ARIA**: `role="tablist"` on tab container
- [ ] **Tab ARIA**: `role="tab"` on each tab button
- [ ] **Tabpanel ARIA**: `role="tabpanel"` on each content panel
- [ ] **aria-controls**: Each tab controls its panel (aria-controls="panel-id")
- [ ] **aria-selected**: "true" for active tab, "false" for inactive
- [ ] **aria-labelledby**: Each panel labeled by its tab
- [ ] **tabindex**: Active tab "0", inactive tabs "-1"

### Accordion Components (FAQs, Services "What's included")
- [ ] **Button Headers**: Use `<button>` elements for question headers
- [ ] **aria-expanded**: "true" when open, "false" when closed
- [ ] **aria-controls**: Button controls panel (aria-controls="answer-id")
- [ ] **Unique IDs**: Each question/answer pair has unique IDs
- [ ] **Header Hierarchy**: Proper heading levels (h3, h4, etc.)

### Modal/Drawer Components (Add-ons, Map, etc.)
- [ ] **Modal ARIA**: `role="dialog"` on modal container
- [ ] **aria-labelledby**: Modal labeled by title element
- [ ] **aria-describedby**: Modal described by content if needed
- [ ] **Focus Trap**: Focus stays within modal when open
- [ ] **Focus Return**: Focus returns to trigger when modal closes
- [ ] **ESC Key**: ESC key closes modal
- [ ] **Click Outside**: Clicking backdrop closes modal

### Form Components (Quote Form)
- [ ] **Label Association**: All inputs properly labeled
- [ ] **Required Fields**: aria-required="true" where needed
- [ ] **Error Messages**: aria-describedby links to error messages
- [ ] **Fieldset/Legend**: Related inputs grouped with fieldset
- [ ] **Error Announcements**: Errors announced to screen readers
- [ ] **Success Messages**: Success feedback accessible

### Carousel/Slider Components (Testimonials)
- [ ] **ARIA Live**: aria-live="polite" for slide changes
- [ ] **Button Controls**: Next/prev as buttons with labels
- [ ] **Current Slide**: aria-current="true" on current slide
- [ ] **Slide Count**: Announce "slide X of Y" pattern
- [ ] **Auto-play Control**: Accessible pause/play controls

## Keyboard Navigation Implementation

### Tab Navigation (Services)
- [ ] **Arrow Keys**: Left/right arrows move between tabs
- [ ] **Home/End**: Home goes to first tab, End to last tab
- [ ] **Enter/Space**: Activates selected tab
- [ ] **Tab Key**: Moves to tab panel content
- [ ] **Focus Indicators**: Clear visual focus on tabs

### Accordion Navigation (FAQs, Services)
- [ ] **Tab Order**: Logical tab order through questions
- [ ] **Enter/Space**: Toggles accordion panels
- [ ] **Arrow Keys**: Optional up/down navigation between questions
- [ ] **Focus Indicators**: Clear focus on question buttons

### Modal Navigation
- [ ] **Focus Trap**: Tab cycles within modal only
- [ ] **Initial Focus**: Focus moves to modal on open
- [ ] **Close Focus**: Focus returns to trigger on close
- [ ] **ESC Key**: Closes modal from any focusable element

### Form Navigation
- [ ] **Tab Order**: Logical progression through form fields
- [ ] **Field Focus**: Clear focus indicators on form fields
- [ ] **Error Focus**: Focus moves to first error on submit
- [ ] **Skip Links**: Consider skip link for long forms

### General Keyboard Support
- [ ] **Focus Indicators**: All interactive elements have focus styles
- [ ] **Tab Order**: Logical tab order throughout page
- [ ] **Skip Links**: "Skip to main content" link at top
- [ ] **No Keyboard Traps**: No focus traps outside modals

## Semantic HTML Review

### Heading Structure
- [ ] **Single H1**: Only one H1 per page (Hero title)
- [ ] **Logical Hierarchy**: H2 for sections, H3 for subsections
- [ ] **No Skipping**: Don't skip heading levels (H2→H4)
- [ ] **Descriptive Headings**: Headings clearly describe content

### Landmark Elements
- [ ] **Main Element**: `<main>` wraps primary content
- [ ] **Section Elements**: `<section>` for distinct content areas
- [ ] **Nav Element**: `<nav>` for navigation menus
- [ ] **Footer Element**: `<footer>` for page footer
- [ ] **Header Element**: `<header>` if applicable

### Interactive Elements
- [ ] **Button Elements**: Use `<button>` for actions
- [ ] **Link Elements**: Use `<a>` for navigation
- [ ] **Form Elements**: Proper form controls for data input
- [ ] **List Elements**: Use `<ul>/<ol>` for lists

## Screen Reader Testing

### Content Accessibility
- [ ] **Alt Text**: All images have appropriate alt text
- [ ] **Link Text**: Links have descriptive text (not "click here")
- [ ] **Button Text**: Buttons have clear action text
- [ ] **Error Messages**: Errors clearly associated with fields
- [ ] **Status Updates**: Important changes announced

### Reading Order
- [ ] **Logical Order**: Content reads in logical order
- [ ] **Hidden Content**: Properly hidden decorative content
- [ ] **Dynamic Content**: Changes announced appropriately
- [ ] **Context**: Sufficient context for all content

## Color & Contrast

### Contrast Requirements
- [ ] **Text Contrast**: 4.5:1 minimum for normal text
- [ ] **Large Text**: 3:1 minimum for large text (18pt+)
- [ ] **Interactive Elements**: 3:1 for UI components
- [ ] **Focus Indicators**: High contrast focus outlines

### Color Independence
- [ ] **No Color-Only**: Don't rely on color alone for information
- [ ] **Status Indicators**: Use text/icons in addition to color
- [ ] **Form Validation**: Errors indicated beyond just color
- [ ] **Interactive States**: Hover/focus beyond color changes

## Touch & Mobile Accessibility

### Touch Targets
- [ ] **Minimum Size**: 44px × 44px for touch targets
- [ ] **Adequate Spacing**: 8px minimum between targets
- [ ] **Easy Access**: Important actions easy to reach
- [ ] **Thumb Zones**: Consider thumb reach patterns

### Mobile Navigation
- [ ] **Touch Gestures**: Swipe gestures have alternatives
- [ ] **Orientation**: Works in both portrait and landscape
- [ ] **Zoom Support**: Content remains usable when zoomed
- [ ] **Mobile Focus**: Focus indicators work on mobile

## Testing Procedures

### Automated Testing
- [ ] **axe DevTools**: Run axe accessibility checker
- [ ] **Lighthouse**: Check accessibility score (>95)
- [ ] **WAVE**: Web Accessibility Evaluation Tool
- [ ] **Color Contrast**: Use contrast checking tools

### Manual Testing
- [ ] **Keyboard Only**: Navigate entire site with keyboard only
- [ ] **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] **Mobile Testing**: Test touch accessibility on mobile
- [ ] **Zoom Testing**: Test at 200% zoom level

### User Testing
- [ ] **Real Users**: Test with actual screen reader users if possible
- [ ] **Accessibility Feedback**: Gather feedback on accessibility
- [ ] **Edge Cases**: Test unusual interaction patterns

## Documentation & Compliance

### Accessibility Documentation
- [ ] **A11y Features**: Document accessibility features implemented
- [ ] **Known Issues**: Document any remaining accessibility issues
- [ ] **Testing Results**: Record testing results and scores
- [ ] **Maintenance**: Plan for ongoing accessibility maintenance

### WCAG Compliance
- [ ] **Level AA**: Target WCAG 2.1 AA compliance
- [ ] **Success Criteria**: Review relevant success criteria
- [ ] **Compliance Statement**: Consider accessibility statement

## Common Issues to Check

### Interactive Components
- [ ] **Dropdowns**: Keyboard accessible, properly announced
- [ ] **Carousels**: Keyboard controls, slide announcements
- [ ] **Forms**: Proper labels, error handling, validation
- [ ] **Modals**: Focus management, keyboard support

### Dynamic Content
- [ ] **Loading States**: Announced to screen readers
- [ ] **Error States**: Proper error announcements
- [ ] **Success Messages**: Accessible confirmation feedback
- [ ] **Live Regions**: Important updates announced

## Completion Checklist
- [ ] All ARIA attributes properly implemented
- [ ] Keyboard navigation working throughout site
- [ ] Screen reader testing completed
- [ ] Color contrast requirements met
- [ ] Touch accessibility verified
- [ ] Automated accessibility tests passing
- [ ] Manual testing completed
- [ ] Documentation updated

## When Complete
1. Update STATUS to "Complete - [YOUR_AI_ID]"
2. Update MASTER_CHECKLIST.md Accessibility checkboxes
3. Run final accessibility audit
4. Document any remaining issues or recommendations

## Notes & Issues
[Add any accessibility issues found, testing results, recommendations for future improvements, or implementation notes here]