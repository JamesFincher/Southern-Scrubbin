// Analytics and event tracking utilities
// Provides consistent tracking across the Southern Scrubbin website

// Simple analytics event tracker
// Can be easily replaced with Google Analytics, Plausible, or other providers
export const trackEvent = (eventName, properties = {}) => {
  // Development logging
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventName, properties);
  }

  // Google Analytics 4 (if gtag is available)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: properties.category || 'engagement',
      event_label: properties.label,
      value: properties.value,
      custom_properties: properties.custom || {},
      timestamp: new Date().toISOString()
    });
  }

  // Plausible Analytics (if plausible is available)
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, {
      props: {
        ...properties,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Custom analytics endpoint (for future implementation)
  if (typeof window !== 'undefined' && window.customAnalytics) {
    window.customAnalytics.track(eventName, properties);
  }
};

// Form-specific tracking events
export const trackFormEvent = {
  start: (formType = 'quote_form') => {
    trackEvent('form_start', {
      category: 'form_interaction',
      label: formType,
      custom: {
        page_url: window.location.href,
        user_agent: navigator.userAgent.substring(0, 100)
      }
    });
  },

  expandDetails: (formType = 'quote_form') => {
    trackEvent('form_expand_details', {
      category: 'form_interaction',
      label: formType,
      custom: {
        section: 'additional_details'
      }
    });
  },

  submitAttempt: (formType = 'quote_form') => {
    trackEvent('form_submit_attempt', {
      category: 'form_interaction',
      label: formType,
      custom: {
        timestamp: new Date().toISOString()
      }
    });
  },

  submitSuccess: (formType = 'quote_form', submissionData = {}) => {
    trackEvent('form_submit_success', {
      category: 'conversion',
      label: formType,
      value: 1,
      custom: {
        service_type: submissionData.serviceType,
        has_add_ons: !!submissionData.addOns,
        preferred_contact: submissionData.textOk ? 'text' : 'email',
        completion_time: submissionData.completionTime
      }
    });
  },

  submitError: (formType = 'quote_form', error = '') => {
    trackEvent('form_submit_error', {
      category: 'form_interaction',
      label: formType,
      custom: {
        error_type: error,
        timestamp: new Date().toISOString()
      }
    });
  },

  abandon: (formType = 'quote_form', fieldsCompleted = 0, totalFields = 0) => {
    trackEvent('form_abandon', {
      category: 'form_interaction',
      label: formType,
      custom: {
        completion_rate: totalFields > 0 ? (fieldsCompleted / totalFields) : 0,
        fields_completed: fieldsCompleted,
        total_fields: totalFields
      }
    });
  },

  fieldFocus: (fieldName, formType = 'quote_form') => {
    trackEvent('form_field_focus', {
      category: 'form_interaction',
      label: `${formType}_${fieldName}`,
      custom: {
        field_name: fieldName
      }
    });
  },

  validationError: (fieldName, errorType, formType = 'quote_form') => {
    trackEvent('form_validation_error', {
      category: 'form_interaction',
      label: formType,
      custom: {
        field_name: fieldName,
        error_type: errorType
      }
    });
  }
};

// CTA and navigation tracking
export const trackCTA = {
  click: (ctaType, location) => {
    trackEvent('cta_click', {
      category: 'navigation',
      label: ctaType,
      custom: {
        location: location,
        page_url: window.location.href
      }
    });
  },

  phoneClick: (location) => {
    trackEvent('phone_click', {
      category: 'contact',
      label: 'phone_number',
      custom: {
        location: location
      }
    });
  },

  emailClick: (location) => {
    trackEvent('email_click', {
      category: 'contact',
      label: 'email_address',
      custom: {
        location: location
      }
    });
  }
};

// Page and section tracking
export const trackPageView = (pageName = document.title) => {
  trackEvent('page_view', {
    category: 'navigation',
    label: pageName,
    custom: {
      page_url: window.location.href,
      referrer: document.referrer
    }
  });
};

export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    category: 'engagement',
    label: sectionName,
    custom: {
      page_url: window.location.href
    }
  });
};

// Utility to track user engagement time
let engagementStartTime = Date.now();
let lastActivityTime = Date.now();

export const trackEngagement = {
  start: () => {
    engagementStartTime = Date.now();
    lastActivityTime = Date.now();
  },

  activity: () => {
    lastActivityTime = Date.now();
  },

  end: () => {
    const totalTime = Date.now() - engagementStartTime;
    const activeTime = lastActivityTime - engagementStartTime;
    
    trackEvent('engagement_session', {
      category: 'engagement',
      label: 'session_duration',
      value: Math.round(totalTime / 1000), // in seconds
      custom: {
        total_time: totalTime,
        active_time: activeTime,
        engagement_rate: totalTime > 0 ? (activeTime / totalTime) : 0
      }
    });
  }
};

// Initialize engagement tracking
if (typeof window !== 'undefined') {
  // Track page load
  trackEngagement.start();
  
  // Track user activity
  ['click', 'scroll', 'keypress', 'mousemove'].forEach(event => {
    document.addEventListener(event, trackEngagement.activity, { passive: true });
  });
  
  // Track page unload
  window.addEventListener('beforeunload', trackEngagement.end);
}
