import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { trustVariants, sparkleVariants, getVariants } from '../utils/animations';
import { trackFormEvent, trackCTA } from '../utils/analytics';
import { 
  saveDraft, 
  loadDraft, 
  clearDraft, 
  hasDraft, 
  getDraftInfo, 
  validateFormField, 
  getFormCompletionRate 
} from '../utils/formStorage';

const ContactForm = () => {
  // Form ID for draft storage
  const FORM_ID = 'quote_form';
  
  // Initial form data
  const initialFormData = useMemo(() => ({
    name: '',
    mobile: '',
    email: '',
    address: '',
    serviceType: '',
    rooms: '',
    addOns: '',
    preferredDays: '',
    parkingNotes: '',
    // Honeypot field for spam protection
    website: ''
  }), []);
  
  // State management
  const [formData, setFormData] = useState(initialFormData);
  const [textOk, setTextOk] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showDraftNotice, setShowDraftNotice] = useState(false);
  const [draftInfo, setDraftInfo] = useState(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  // Refs for tracking
  const formStartTime = useRef(null);
  const lastSaveTime = useRef(null);
  const formTouchedFields = useRef(new Set());
  const hasTrackedFormStart = useRef(false);
  
  // Auto-save interval
  const AUTOSAVE_INTERVAL = 3000; // 3 seconds
  
  // Load draft data on component mount
  useEffect(() => {
    // Check for existing draft
    if (hasDraft(FORM_ID)) {
      const draft = loadDraft(FORM_ID);
      const info = getDraftInfo(FORM_ID);
      
      if (draft && info) {
        setDraftInfo(info);
        setShowDraftNotice(true);
        
        // Auto-restore if draft is recent (within 1 hour)
        if (info.ageInHours < 1) {
          setFormData({ ...initialFormData, ...draft });
          if (draft.textOk !== undefined) {
            setTextOk(draft.textOk);
          }
        }
      }
    }
  }, [initialFormData]);
  
  // Auto-save form data
  useEffect(() => {
    if (!hasUserInteracted) return;
    
    const saveTimeout = setTimeout(() => {
      if (hasUserInteracted && !submitted) {
        const dataToSave = { ...formData, textOk };
        const saved = saveDraft(FORM_ID, dataToSave);
        if (saved) {
          lastSaveTime.current = Date.now();
        }
      }
    }, AUTOSAVE_INTERVAL);
    
    return () => clearTimeout(saveTimeout);
  }, [formData, textOk, hasUserInteracted, submitted]);
  
  // Track form abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasUserInteracted && !submitted) {
        const completion = getFormCompletionRate(formData);
        trackFormEvent.abandon(FORM_ID, completion.completedFields, completion.totalFields);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, hasUserInteracted, submitted]);
  
  // Field change handler with validation and tracking
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Track form start on first interaction
    if (!hasTrackedFormStart.current) {
      trackFormEvent.start(FORM_ID);
      formStartTime.current = Date.now();
      hasTrackedFormStart.current = true;
    }
    
    // Mark as user interacted
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    // Track field focus for new fields
    if (!formTouchedFields.current.has(name)) {
      formTouchedFields.current.add(name);
      trackFormEvent.fieldFocus(name, FORM_ID);
    }
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    
    // Hide draft notice once user starts editing
    if (showDraftNotice) {
      setShowDraftNotice(false);
    }
  }, [hasUserInteracted, showDraftNotice, fieldErrors]);
  
  // Text OK checkbox handler
  const handleTextOkChange = useCallback((e) => {
    setTextOk(e.target.checked);
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  }, [hasUserInteracted]);
  
  // Restore draft data
  const restoreDraft = useCallback(() => {
    const draft = loadDraft(FORM_ID);
    if (draft) {
      setFormData({ ...initialFormData, ...draft });
      if (draft.textOk !== undefined) {
        setTextOk(draft.textOk);
      }
      setShowDraftNotice(false);
      setHasUserInteracted(true);
    }
  }, [initialFormData]);
  
  // Dismiss draft notice
  const dismissDraftNotice = useCallback(() => {
    setShowDraftNotice(false);
    clearDraft(FORM_ID);
  }, []);
  
  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    const requiredFields = ['name', 'mobile', 'email', 'address', 'serviceType', 'rooms'];
    
    requiredFields.forEach(field => {
      const validation = validateFormField(field, formData[field], formData);
      if (!validation.isValid) {
        errors[field] = validation.error;
        trackFormEvent.validationError(field, validation.error, FORM_ID);
      }
    });
    
    return errors;
  }, [formData]);
  
  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setTextOk(false);
    setFieldErrors({});
    setSubmitError(null);
    setHasUserInteracted(false);
    formTouchedFields.current.clear();
    hasTrackedFormStart.current = false;
    formStartTime.current = null;
    
    // Clear any saved draft
    clearDraft(FORM_ID);
  }, [initialFormData]);
  
  // Additional spam protection checks
  const isSpamSubmission = useCallback((data) => {
    // Honeypot field check
    if (data.website && data.website.trim() !== '') {
      return true;
    }
    
    // Submission too fast (less than 5 seconds)
    if (formStartTime.current && Date.now() - formStartTime.current < 5000) {
      return true;
    }
    
    // Too many repeated characters in name or email
    const hasRepeatedChars = (str) => {
      if (!str) return false;
      const chars = str.toLowerCase().replace(/\s/g, '');
      const uniqueChars = new Set(chars).size;
      return chars.length > 4 && uniqueChars / chars.length < 0.4;
    };
    
    if (hasRepeatedChars(data.name) || hasRepeatedChars(data.email)) {
      return true;
    }
    
    // Suspicious patterns in content
    const suspiciousPatterns = [
      /https?:\/\//i, // URLs in name/email
      /\b(viagra|casino|poker|loan|credit)\b/i, // Common spam keywords
      /[A-Z]{10,}/, // Too many consecutive capitals
      /\d{10,}/ // Too many consecutive numbers
    ];
    
    const textFields = [data.name, data.email, data.addOns, data.parkingNotes].filter(Boolean);
    for (const field of textFields) {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(field)) {
          return true;
        }
      }
    }
    
    return false;
  }, []);
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Track submission attempt
    trackFormEvent.submitAttempt(FORM_ID);
    
    // Comprehensive spam protection
    if (isSpamSubmission(formData)) {
      // Silently reject spam without showing error
      console.log('Spam submission detected and blocked');
      return;
    }
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate completion time
      const completionTime = formStartTime.current 
        ? Math.round((Date.now() - formStartTime.current) / 1000) 
        : null;
      
      // Prepare submission data (excluding honeypot)
      const submissionData = {
        ...formData,
        textOk,
        completionTime,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      delete submissionData.website; // Remove honeypot field
      
      // TODO: Replace with actual form submission endpoint
      // For now, simulate API call with realistic delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional network errors for testing
          if (Math.random() < 0.05) { // 5% chance of error
            reject(new Error('Network error - please try again'));
          } else {
            resolve();
          }
        }, 1500 + Math.random() * 1000); // 1.5-2.5s delay
      });
      
      // Real form submission would go here:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submissionData)
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`Server error: ${response.status}`);
      // }
      
      // Track successful submission
      trackFormEvent.submitSuccess(FORM_ID, {
        serviceType: formData.serviceType,
        addOns: formData.addOns,
        textOk,
        completionTime
      });
      
      // Clear draft on successful submission
      clearDraft(FORM_ID);
      
      // Set success state
      setSubmitted(true);
      setIsSubmitting(false);
      
      // Track CTA conversion
      trackCTA.click('form_submit_success', 'contact_form');
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track submission error
      trackFormEvent.submitError(FORM_ID, error.message);
      
      // Show user-friendly error message
      setSubmitError(
        error.message.includes('Network') 
          ? 'Connection issue - please check your internet and try again'
          : 'Something went wrong - please try again or call us directly'
      );
      
      setIsSubmitting(false);
    }
  };
  
  // Success state
  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center text-white text-3xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          ✓
        </motion.div>
        <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
          Thank you kindly!
        </h3>
        <p className="text-gray-800 mb-6">
          I've received your request and will get back to you soon. 
          In the meantime, feel free to reach out directly at{' '}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => {
              trackCTA.phoneClick('success_message');
              window.location.href = 'tel:+1234567890'; // TODO: Replace with actual phone
            }}
          >
            (TBD)
          </button>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <motion.button
            className="btn-secondary px-6 py-2 text-sm"
            onClick={() => {
              resetForm();
              setSubmitted(false);
              trackCTA.click('submit_another', 'success_message');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Another Request
          </motion.button>
        </div>
        <motion.div
          className="text-secondary text-2xl"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
        >
          ✨ Looking forward to serving you! ✨
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Draft restoration notice */}
      {showDraftNotice && draftInfo && (
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-blue-500 text-xl">💾</div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                Draft Found
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                We found a draft from {draftInfo.ageInHours < 1 
                  ? 'less than an hour ago' 
                  : `${draftInfo.ageInDays === 0 ? 'today' : `${draftInfo.ageInDays} day(s) ago`}`
                }. Would you like to restore it?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Restore Draft
                </button>
                <button
                  type="button"
                  onClick={dismissDraftNotice}
                  className="text-xs text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Start Fresh
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Error message */}
      {submitError && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-xl p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800 mb-1">
                Submission Error
              </h4>
              <p className="text-sm text-red-700">
                {submitError}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitError(null)}
              className="text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <div className="hidden">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name input */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Name *
            </label>
            <motion.input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
                fieldErrors.name ? 'border-red-300 bg-red-50' : ''
              }`}
              placeholder="Your name"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
            {fieldErrors.name && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
            )}
          </motion.div>

          {/* Mobile input */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Mobile *
            </label>
            <motion.input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
                fieldErrors.mobile ? 'border-red-300 bg-red-50' : ''
              }`}
              placeholder="(865) 555-0123"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
            {fieldErrors.mobile && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.mobile}</p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="textOk"
                checked={textOk}
                onChange={handleTextOkChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="textOk" className="text-sm text-gray-600">
                Text OK?
              </label>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email input */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Email *
            </label>
            <motion.input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
                fieldErrors.email ? 'border-red-300 bg-red-50' : ''
              }`}
              placeholder="your.email@example.com"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </motion.div>

          {/* Address input */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Address/City *
            </label>
            <motion.input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
                fieldErrors.address ? 'border-red-300 bg-red-50' : ''
              }`}
              placeholder="City or ZIP code"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
            {fieldErrors.address && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.address}</p>
            )}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Service type */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Service Type *
            </label>
            <motion.select
              name="serviceType"
              required
              value={formData.serviceType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle bg-white ${
                fieldErrors.serviceType ? 'border-red-300 bg-red-50' : ''
              }`}
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            >
              <option value="">Select service type</option>
              <option value="home">Home</option>
              <option value="str">STR/Office</option>
              <option value="office">Office</option>
            </motion.select>
            {fieldErrors.serviceType && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.serviceType}</p>
            )}
          </motion.div>

          {/* Beds/Baths or rooms */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Beds/Baths (or rooms) *
            </label>
            <motion.input
              type="text"
              name="rooms"
              required
              value={formData.rooms}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
                fieldErrors.rooms ? 'border-red-300 bg-red-50' : ''
              }`}
              placeholder="e.g., 3 bed / 2 bath"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
            {fieldErrors.rooms && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.rooms}</p>
            )}
          </motion.div>
        </div>

        {/* Add-ons */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Add‑ons
          </label>
          <motion.textarea
            name="addOns"
            rows="2"
            value={formData.addOns}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 resize-none focus-sparkle"
            placeholder="Any specific requests (inside oven, baseboards, etc.)"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Preferred days/times */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Preferred days/times
            </label>
            <motion.input
              type="text"
              name="preferredDays"
              value={formData.preferredDays}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
              placeholder="e.g., Weekday mornings"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
          </motion.div>

          {/* Parking/entry notes */}
          <motion.div
            variants={getVariants(trustVariants.input)}
            initial="rest"
            whileFocus="focus"
          >
            <label className="block text-sm font-medium text-accent mb-2">
              Parking/entry notes
            </label>
            <motion.input
              type="text"
              name="parkingNotes"
              value={formData.parkingNotes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
              placeholder="Special instructions"
              variants={getVariants(trustVariants.input)}
              whileFocus="focus"
            />
          </motion.div>
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || Object.keys(fieldErrors).length > 0}
          className="w-full btn-primary text-lg py-4 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          variants={getVariants(trustVariants.button)}
          initial="rest"
          whileHover={!isSubmitting ? "hover" : "rest"}
          whileTap={!isSubmitting ? "tap" : "rest"}
        >
          {isSubmitting ? (
            <motion.div
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Sending your request...
            </motion.div>
          ) : (
            <>
              <span className="relative z-10">Request Estimate</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                whileHover={{
                  opacity: [0, 0.3, 0],
                  x: [-100, 100],
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              />
            </>
          )}
        </motion.button>

        {/* Trust indicators */}
        <div className="text-center text-sm text-gray-800 mt-4">
          <p>🔒 No spam—I only use this info to reply about cleaning.</p>
          <p>📞 Phone: (TBD) • Email: (TBD)</p>
          {hasUserInteracted && lastSaveTime.current && (
            <p className="text-xs text-gray-500 mt-2">
              ✨ Draft saved automatically
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;