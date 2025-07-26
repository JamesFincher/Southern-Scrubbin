# Workflow & Service Area Checklist

## Task Checkout
- **STATUS**: 🔄 Available
- **ASSIGNED TO**: [AI_ID - UPDATE THIS WHEN CLAIMING]
- **ESTIMATED TIME**: 30-45 minutes
- **DEPENDENCIES**: None

## Files to Modify
- Create new component for stepper (How it works)
- Modify service area component
- Add map modal component

## Implementation Overview
Replace existing "How it works" section with compact stepper + convert service area to short blurb with map modal.

## How It Works Section (#how)

### Stepper Component Implementation
- [ ] **Create Stepper Component**: 3-step horizontal/vertical stepper
- [ ] **Accessibility**: aria-current="step" for current step
- [ ] **Visual Design**: Clear step progression with numbers/icons
- [ ] **Responsive**: Horizontal on desktop, vertical on mobile

### Step Content (exact copy)
- [ ] **Step 1**: "Reach out: Send the estimate form with ZIP and what you need."
- [ ] **Step 2**: "Plan: I confirm scope and set a time."  
- [ ] **Step 3**: "Clean day: I do the work we agreed—no drama, no shortcuts."

### Stepper Technical Requirements
- [ ] **Step Numbers**: Clear 1, 2, 3 progression
- [ ] **Connection Lines**: Visual flow between steps
- [ ] **Typography**: Readable on all devices
- [ ] **Brand Consistency**: Match existing color scheme
- [ ] **Animation**: Subtle reveal animation if desired

## Service Area Section (#area)

### Content Reduction
- [ ] **Replace Full Section**: Convert to short blurb
- [ ] **Single Sentence**: "Based in Ten Mile; I serve Knoxville and nearby areas. Add your ZIP in the estimate request."
- [ ] **Add Map Trigger**: "See map" button/link

### Map Modal Implementation
- [ ] **Modal Component**: Overlay modal for map
- [ ] **Map Integration**: Embedded map (Google Maps, etc.)
- [ ] **Map Center**: Ten Mile, TN with service radius
- [ ] **Markers**: Ten Mile + key Knoxville areas if needed
- [ ] **Modal Accessibility**: Focus trap, ESC closes, return focus
- [ ] **Mobile Friendly**: Map works well on mobile

### Modal Technical Requirements
- [ ] **Lazy Loading**: Load map only when modal opens
- [ ] **Performance**: Don't impact initial page load
- [ ] **Error Handling**: Graceful fallback if map fails
- [ ] **Responsive**: Map scales appropriately

## Layout & Design

### Section Layout
- [ ] **Compact Design**: Both sections take minimal vertical space
- [ ] **Proper Spacing**: Consistent with other sections
- [ ] **Section Anchors**: #how and #area still work for navigation
- [ ] **Visual Hierarchy**: Clear H2 headings for each section

### Responsive Considerations
- [ ] **Stepper Mobile**: Vertical layout on small screens
- [ ] **Service Area Mobile**: Text readable, button accessible
- [ ] **Map Modal Mobile**: Full-screen or appropriate sizing
- [ ] **Touch Targets**: 44px minimum for interactive elements

## Technical Implementation

### Stepper Component Structure
```jsx
// Example structure (adapt to your component pattern)
<div className="stepper">
  <div className="step">
    <div className="step-number">1</div>
    <div className="step-content">
      <strong>Reach out:</strong> Send the estimate form with ZIP and what you need.
    </div>
  </div>
  // ... steps 2 and 3
</div>
```

### Service Area Structure
```jsx
// Example structure
<section id="area">
  <h2>Service Area</h2>
  <p>Based in Ten Mile; I serve Knoxville and nearby areas. Add your ZIP in the estimate request.</p>
  <button onClick={openMapModal}>See map</button>
  <MapModal isOpen={isMapOpen} onClose={closeMapModal} />
</section>
```

## Content Verification

### How It Works Copy Check
- [ ] **Step 1 Exact**: "Reach out: Send the estimate form with ZIP and what you need."
- [ ] **Step 2 Exact**: "Plan: I confirm scope and set a time."
- [ ] **Step 3 Exact**: "Clean day: I do the work we agreed—no drama, no shortcuts."

### Service Area Copy Check  
- [ ] **Blurb Exact**: "Based in Ten Mile; I serve Knoxville and nearby areas. Add your ZIP in the estimate request."
- [ ] **Modal Trigger**: Clear "See map" or similar call-to-action

## Accessibility Requirements

### Stepper Accessibility
- [ ] **Semantic Markup**: Ordered list or appropriate structure
- [ ] **Step Indicators**: aria-current="step" or similar
- [ ] **Keyboard Navigation**: If interactive, proper tab order
- [ ] **Screen Reader**: Clear step progression announced

### Modal Accessibility
- [ ] **Focus Management**: Focus trap within modal
- [ ] **ESC Key**: Closes modal and returns focus
- [ ] **ARIA**: role="dialog", aria-labelledby for title
- [ ] **Background**: Clicking outside closes modal

## Testing & Validation

### Functionality Testing
- [ ] **Stepper Display**: All steps show correctly
- [ ] **Map Modal**: Opens and closes properly
- [ ] **Map Loading**: Map loads without errors
- [ ] **Navigation**: Section anchors work (#how, #area)
- [ ] **Responsive**: Works on all device sizes

### Performance Testing
- [ ] **Initial Load**: No impact on page load speed
- [ ] **Map Performance**: Modal opens quickly
- [ ] **Memory**: No memory leaks from map component
- [ ] **Animations**: Smooth without jank

### Content Testing
- [ ] **Copy Accuracy**: All text matches imp.md exactly
- [ ] **Typography**: Readable and consistent
- [ ] **Visual Hierarchy**: Clear section structure
- [ ] **Brand Consistency**: Matches overall design

## Integration Requirements

### Navigation Integration
- [ ] **Section IDs**: #how and #area anchor links work
- [ ] **Smooth Scroll**: If implemented, works to these sections
- [ ] **Mobile Nav**: Sections accessible from mobile navigation

### Design Integration
- [ ] **Color Scheme**: Matches brand colors
- [ ] **Typography**: Uses established font hierarchy
- [ ] **Spacing**: Consistent with other sections
- [ ] **Sparkle Effects**: Preserve any existing animations

## Completion Checklist
- [ ] How it works stepper implemented (3 steps)
- [ ] Service area reduced to single sentence + map modal
- [ ] Map modal functional with embedded map
- [ ] All copy matches imp.md exactly
- [ ] Responsive design verified
- [ ] Accessibility compliance confirmed
- [ ] Performance impact minimal
- [ ] Navigation anchors working

## When Complete
1. Update STATUS to "Complete - [YOUR_AI_ID]"
2. Update MASTER_CHECKLIST.md Workflow & Area checkboxes
3. Test stepper and map functionality
4. Verify navigation and responsive behavior

## Notes & Issues
[Add any implementation notes, map integration decisions, performance considerations, or issues encountered here]