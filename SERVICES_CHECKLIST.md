# Services Section Checklist

## Task Checkout
- **STATUS**: 🔄 Available
- **ASSIGNED TO**: [AI_ID - UPDATE THIS WHEN CLAIMING]
- **ESTIMATED TIME**: 60-90 minutes
- **DEPENDENCIES**: None

## Files to Modify
- `src/components/Services.jsx`
- `src/components/ServiceCard.jsx` (may need refactoring)
- Create new components as needed for tabs/accordions/drawers

## Implementation Overview
Convert three stacked service sections into a single tabbed container with:
- 3 tabs: Homes | Airbnb/STR | Small Offices
- Each tab contains: Summary + "What's included" accordion + Add-ons/Not offering drawers

## Core Implementation Tasks

### Tab Structure Setup
- [ ] **Create Tab Container**: Implement accessible tab component
- [ ] **Three Tab Headers**: "Homes", "Airbnb / Short-Term Rental", "Small Offices"
- [ ] **Tab Panel Structure**: Each tab has its own content panel
- [ ] **Accessibility**: role="tablist", role="tab", aria-controls, aria-selected
- [ ] **Keyboard Navigation**: Left/right arrow keys between tabs
- [ ] **Active State Styling**: Clear visual indication of active tab

### Tab Content - Summaries
Add exact summaries (≤45 words each):

#### Homes Tab
- [ ] **Summary Text**: "Kitchens, baths, bedrooms, living areas, and floors—kept tidy and comfortable. I stick to the plan we set and show up when I say I will. Straightforward communication and a clean you can count on."

#### Airbnb/STR Tab  
- [ ] **Summary Text**: "Guest‑ready turns with sanitizing touchpoints, fresh linens and towels, light restock when supplies are on‑site, and quick photo check on request. Same‑day turns when I can fit them."

#### Small Offices Tab
- [ ] **Summary Text**: "Cozy workspaces like private practices or small suites. Clear common surfaces, restrooms and break area, floors, and trash/recycling. After‑hours possible for suites."

### "What's Included" Accordions
Implement accordion within each tab (same content across all tabs):

- [ ] **Accordion Component**: Collapsible panels with proper ARIA
- [ ] **Three Panels**: Kitchens | Bathrooms | Bedrooms & Living Areas
- [ ] **Button Headers**: Use buttons for accessibility
- [ ] **aria-expanded**: Toggle attribute on expand/collapse
- [ ] **aria-controls**: Connect header to panel ID

#### Panel Content (exact copy)
- [ ] **Kitchens Panel**: "Counters • Sink/faucet • Cabinet fronts • Microwave interior • Appliance exteriors • Floors"
- [ ] **Bathrooms Panel**: "Toilets • Tubs/showers • Sinks/vanity • Mirrors • Floors"  
- [ ] **Bedrooms & Living Panel**: "Dust reachable surfaces • Tidy • Floors"

### Add-ons Drawer/Modal
- [ ] **Trigger Button**: "Add-ons" or similar in each tab
- [ ] **Drawer/Modal Component**: Overlay or slide-out panel
- [ ] **Focus Management**: Focus trap, ESC closes, return focus to trigger
- [ ] **Intro Text**: "Ask ahead so I can plan enough time."
- [ ] **Chip Layout**: Chips for each add-on service

#### Add-ons Content (exact copy)
- [ ] **Add-on Chips**: "Inside oven · Inside fridge · Interior windows (reachable) · Baseboards/detail dusting · Light wall spot‑cleaning · Laundry fold (your detergent) · Dish wash‑up"

### "Not Currently Offering" Drawer/Modal
- [ ] **Trigger Link**: "Not currently offering" or similar
- [ ] **Same Modal/Drawer Pattern**: Consistent with add-ons
- [ ] **Intro Text**: "Keeping it straightforward and focused on what I do best."
- [ ] **Chip Layout**: Chips for excluded services

#### Not Offering Content (exact copy)
- [ ] **Exclusion Chips**: "Carpet shampoo/extraction · Post‑construction debris · Tall‑ladder/roof work · Severe hoarding · Active pest issues · Mold/biohazard · Exterior windows"

## Layout & Responsive Design

### Desktop Layout
- [ ] **Horizontal Tabs**: Tab headers in horizontal row
- [ ] **Multi-Column Lists**: 2-3 columns for "What's included" bullets to reduce scroll
- [ ] **Proper Spacing**: Maintain brand spacing standards
- [ ] **Width Constraints**: Appropriate max-width for readability

### Mobile Layout  
- [ ] **Responsive Tabs**: Tabs work well on mobile (stacked or scrollable)
- [ ] **Single Column**: Bullet lists in single column
- [ ] **Touch Targets**: 44px minimum for tab headers and buttons
- [ ] **Drawer Behavior**: Modals/drawers appropriate for mobile

## Technical Requirements

### Accessibility
- [ ] **Tab ARIA**: Complete tab pattern implementation
- [ ] **Accordion ARIA**: Proper accordion accessibility
- [ ] **Modal ARIA**: Focus management and keyboard interaction
- [ ] **Semantic HTML**: Proper heading hierarchy within tabs
- [ ] **Screen Reader**: Clear announcements for state changes

### Performance
- [ ] **Lazy Loading**: Consider lazy loading tab content
- [ ] **Animation Performance**: Smooth transitions without jank
- [ ] **Code Splitting**: Efficient component organization

### Integration
- [ ] **Navigation**: #services anchor still works
- [ ] **Styling**: Matches existing brand theme
- [ ] **Animations**: Preserve any existing sparkle effects in section

## Testing & Validation

### Functionality
- [ ] **Tab Switching**: All three tabs switch correctly
- [ ] **Accordion Expand**: All panels expand/collapse
- [ ] **Drawer/Modal**: Add-ons and exclusions open/close properly
- [ ] **Keyboard Navigation**: Full keyboard accessibility
- [ ] **Screen Reader**: Test with screen reader

### Content Verification
- [ ] **Exact Copy**: All text matches imp.md exactly
- [ ] **Word Counts**: Summaries are ≤45 words each
- [ ] **Bullet Format**: Using • separator for lists
- [ ] **Chip Format**: Using · separator for chips

### Responsive Testing
- [ ] **Desktop**: Tabs and content work at various widths
- [ ] **Mobile**: Touch-friendly and readable
- [ ] **Tablet**: Intermediate sizes work well

## Completion Checklist
- [ ] Three-tab structure implemented and functional
- [ ] All summaries match imp.md (≤45 words each)
- [ ] "What's included" accordion in each tab
- [ ] Add-ons drawer/modal working
- [ ] "Not offering" drawer/modal working
- [ ] Full accessibility compliance
- [ ] Responsive design verified
- [ ] Performance maintained
- [ ] Integration with existing codebase

## When Complete
1. Update STATUS to "Complete - [YOUR_AI_ID]"
2. Update MASTER_CHECKLIST.md Services section checkboxes  
3. Test full functionality across devices
4. Document any implementation decisions below

## Notes & Issues
[Add any implementation notes, component decisions, accessibility considerations, or issues encountered here]