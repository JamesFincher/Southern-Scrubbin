# Quote Form Implementation Checklist

## Task Checkout
- **STATUS**: 🔄 Available
- **ASSIGNED TO**: [AI_ID - UPDATE THIS WHEN CLAIMING]
- **ESTIMATED TIME**: 45-60 minutes
- **DEPENDENCIES**: None

## Files to Modify
- Quote form component
- Form validation logic
- Contact/ContactForm.jsx components

## Implementation Overview
Convert existing form to progressive structure:
- 3 initial fields visible by default
- "More details" section expands optionally
- Conditional field logic based on contact preference
- Mobile-friendly with sticky CTA

## Progressive Form Structure

### Initial Fields (Always Visible)
- [ ] **Name Field**: Text input, required
- [ ] **City/ZIP Field**: Text input, required
- [ ] **Contact Preference**: Radio buttons (Text / Email / Call), required

### Conditional Contact Fields
- [ ] **Phone Field**: Show when "Text" or "Call" selected, required
- [ ] **Email Field**: Show when "Email" selected, required
- [ ] **Field Validation**: Conditional required based on selection
- [ ] **Smooth Transition**: Fields appear/disappear smoothly

### "More Details" Expansion
- [ ] **Expand Button**: "More details" button/link
- [ ] **Optional Section**: Clearly marked as optional
- [ ] **Smooth Animation**: Expand/collapse with height transition
- [ ] **State Management**: Remember expansion state

## More Details Section (Optional)

### Additional Fields
- [ ] **Service Type**: Dropdown/radio (Homes / Airbnb / Small Offices)
- [ ] **Beds/Baths**: Number inputs or dropdown for homes/Airbnb
- [ ] **Rooms Field**: Alternative for Small Offices
- [ ] **Add-ons**: Multi-select chips matching Services section
- [ ] **Preferred Days/Times**: Free text area

### Add-ons Multi-Select
Create chips matching Services section add-ons:
- [ ] **Inside oven** chip
- [ ] **Inside fridge** chip  
- [ ] **Interior windows (reachable)** chip
- [ ] **Baseboards/detail dusting** chip
- [ ] **Light wall spot‑cleaning** chip
- [ ] **Laundry fold (your detergent)** chip
- [ ] **Dish wash‑up** chip

## Form UX & Validation

### Client-Side Validation
- [ ] **Real-time Validation**: Validate as user types
- [ ] **Friendly Messages**: Clear, helpful error messages
- [ ] **Required Field Indicators**: Visual indicators for required fields
- [ ] **Format Validation**: Phone, email format validation
- [ ] **Conditional Validation**: Only validate visible/required fields

### Form Labels & Placeholders
- [ ] **Concise Labels**: Clear, short field labels
- [ ] **Helpful Placeholders**: Guidance without being verbose
- [ ] **Error States**: Clear error state styling
- [ ] **Success States**: Confirmation of successful input

### Accessibility
- [ ] **Label Association**: Proper label/input association
- [ ] **Error Announcements**: Screen reader error announcements
- [ ] **Required Indicators**: ARIA required attributes
- [ ] **Focus Management**: Logical tab order
- [ ] **Fieldset Grouping**: Related fields grouped with fieldset/legend

## Mobile Optimization

### Responsive Design
- [ ] **Mobile-First**: Design works well on smallest screens
- [ ] **Touch Targets**: 44px minimum for all interactive elements
- [ ] **Input Types**: Appropriate input types (tel, email, number)
- [ ] **Keyboard Support**: Proper keyboard for field types

### Sticky Mobile Footer CTA
- [ ] **Sticky Footer**: Fixed position at bottom on mobile
- [ ] **Three CTAs**: Call | Text | Get Quote
- [ ] **Phone CTA**: Opens phone dialer
- [ ] **Text CTA**: Opens SMS with pre-filled message
- [ ] **Quote CTA**: Scrolls to/focuses form
- [ ] **Z-index**: Proper layering over content

## Form Functionality

### Submit Handling
- [ ] **Form Submission**: Handle form submit properly
- [ ] **Loading States**: Show loading during submission
- [ ] **Success State**: Clear success message/redirect
- [ ] **Error Handling**: Handle and display submission errors
- [ ] **Form Reset**: Clear form after successful submission

### Data Handling
- [ ] **Save Partials**: Save partial data if possible
- [ ] **Local Storage**: Consider saving draft locally
- [ ] **Data Validation**: Server-side validation backup
- [ ] **Spam Prevention**: Basic spam prevention measures

## Analytics Integration

### Form Events (Optional but Recommended)
- [ ] **form_start**: Track when user starts form
- [ ] **form_expand_details**: Track "More details" expansion
- [ ] **form_submit_success**: Track successful submissions
- [ ] **form_submit_error**: Track submission errors
- [ ] **cta_click**: Track CTA button clicks with location

### Event Implementation
```javascript
// Example event tracking structure
// form_start: When user focuses first field
// form_expand_details: When "More details" is expanded
// form_submit_success: After successful form submission
// form_submit_error: On submission failure
// cta_click: location: 'hero'|'services'|'footer'
```

## Copy & Content

### Form Labels (Exact Copy)
- [ ] **Name**: "Name"
- [ ] **Location**: "City or ZIP"
- [ ] **Contact Preference**: "Contact preference"
- [ ] **Contact Options**: "Text", "Email", "Call"

### More Details Labels
- [ ] **Service Type**: "Service type"
- [ ] **Service Options**: "Homes", "Airbnb", "Small Offices"
- [ ] **Size Field**: "Beds/Baths" or "Rooms" based on service type
- [ ] **Add-ons**: "Add-ons"
- [ ] **Timing**: "Preferred days/times"

### Form Messaging
- [ ] **Expansion Text**: "More details" (expand button)
- [ ] **Optional Indicator**: Clear indication optional section is optional
- [ ] **Submit Button**: "Request Quote" or "Send Request"
- [ ] **Success Message**: Confirmation message after submission

## Technical Implementation

### Form State Management
- [ ] **React State**: Proper state management for all fields
- [ ] **Conditional Logic**: Show/hide fields based on selections
- [ ] **Validation State**: Track validation errors and success
- [ ] **Submission State**: Handle loading and success states

### Component Structure
```jsx
// Example structure (adapt to your patterns)
<form onSubmit={handleSubmit}>
  {/* Initial Fields */}
  <div className="initial-fields">
    <input name="name" required />
    <input name="location" required />
    <fieldset name="contact-preference" required>
      <input type="radio" value="text" />
      <input type="radio" value="email" />
      <input type="radio" value="call" />
    </fieldset>
    {/* Conditional contact field */}
  </div>
  
  {/* More Details Section */}
  <button type="button" onClick={toggleDetails}>
    More details
  </button>
  <div className={`details ${isExpanded ? 'expanded' : ''}`}>
    {/* Optional fields */}
  </div>
  
  <button type="submit">Request Quote</button>
</form>
```

## Testing & Validation

### Functionality Testing
- [ ] **Field Visibility**: Conditional fields show/hide correctly
- [ ] **Validation**: All validation rules work properly
- [ ] **Submission**: Form submits successfully
- [ ] **Error Handling**: Errors display and clear appropriately
- [ ] **Progressive Enhancement**: Works without JavaScript

### Mobile Testing
- [ ] **Sticky Footer**: Footer CTAs work on mobile
- [ ] **Form Usability**: Easy to fill out on mobile
- [ ] **Keyboard Support**: Virtual keyboard behavior
- [ ] **Touch Interactions**: All interactions work via touch

### Accessibility Testing
- [ ] **Keyboard Only**: Complete form using only keyboard
- [ ] **Screen Reader**: Test with screen reader
- [ ] **Error Announcements**: Errors announced to screen readers
- [ ] **Focus Management**: Logical focus order

### Cross-Browser Testing
- [ ] **Modern Browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile Browsers**: iOS Safari, Chrome Mobile
- [ ] **Form Features**: All features work across browsers

## Integration Requirements

### Navigation Integration
- [ ] **Form Anchor**: #quote anchor works correctly
- [ ] **Scroll Behavior**: Smooth scroll to form from CTAs
- [ ] **Focus Management**: Form focused when navigated to

### CTA Integration
- [ ] **Hero CTA**: "Request a quick estimate" links to form
- [ ] **Mobile Footer**: "Get Quote" action works correctly
- [ ] **Service Section**: Any CTAs link to form properly

## Completion Checklist
- [ ] Progressive form structure implemented
- [ ] Initial 3 fields always visible
- [ ] Conditional contact fields working
- [ ] "More details" expansion functional
- [ ] All validation working correctly
- [ ] Mobile sticky footer CTA implemented
- [ ] Accessibility compliance verified
- [ ] Cross-browser testing completed
- [ ] Analytics events implemented (optional)
- [ ] Form submission handling working

## When Complete
1. Update STATUS to "Complete - [YOUR_AI_ID]"
2. Update MASTER_CHECKLIST.md Quote Form checkboxes
3. Test form submission end-to-end
4. Verify mobile functionality and sticky footer

## Notes & Issues
[Add any implementation notes, form handling decisions, validation approaches, analytics setup, or issues encountered here]