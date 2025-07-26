import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useId, useEffect, useCallback, useMemo } from 'react';
import { trustVariants, sparkleVariants, getVariants } from '../utils/animations';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    serviceType: '',
    rooms: '',
    addOns: '',
    preferredDays: '',
    parkingNotes: '',
    // Honeypot field
    website: ''
  });
  const [textOk, setTextOk] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  // Refs for managing focus and screen reader announcements
  const firstFieldRef = useRef(null);
  const errorSummaryRef = useRef(null);
  const announceRef = useRef(null);
  
  // Generate unique IDs for form fields
  const formId = useId();
  const fieldIds = {
    name: `${formId}-name`,
    mobile: `${formId}-mobile`,
    email: `${formId}-email`,
    address: `${formId}-address`,
    serviceType: `${formId}-service-type`,
    rooms: `${formId}-rooms`,
    addOns: `${formId}-add-ons`,
    preferredDays: `${formId}-preferred-days`,
    parkingNotes: `${formId}-parking-notes`,
    textOk: `${formId}-text-ok`
  };

  // Validation rules with Southern hospitality messages
  const validationRules = useMemo(() => ({
    name: {
      required: true,
      minLength: 2,
      message: "We'd love to know your name, sugar! Please share at least 2 characters."
    },
    mobile: {
      required: true,
      pattern: /^[+]?[1-9]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      message: "Bless your heart! Could you share a valid phone number so we can reach you?"
    },
    email: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Honey, we need a valid email address to send you your estimate!"
    },
    address: {
      required: true,
      minLength: 3,
      message: "Darlin', we need to know what city or area you're in to provide service!"
    },
    serviceType: {
      required: true,
      message: "Please let us know what type of space needs our special touch!"
    },
    rooms: {
      required: true,
      minLength: 1,
      message: "Help us out, hon! How many rooms or what size space are we looking at?"
    }
  }), []);

  // Success messages for completed fields
  const successMessages = {
    name: "Perfect, thank you!",
    mobile: "Great! We can reach you there.",
    email: "Wonderful! Your estimate will be sent here.",
    address: "Excellent! We serve that area.",
    serviceType: "Perfect choice!",
    rooms: "Got it! That helps us plan."
  };

  // Validate individual field with Southern hospitality
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && (!value || value.trim() === '')) {
      return rule.message;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    return '';
  };

  // Validate entire form
  const validateForm = useCallback((data = formData) => {
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    return { errors: newErrors, isValid: !hasErrors };
  }, [formData, validationRules, validateField]);

  // Effect to check form validity whenever formData changes
  useEffect(() => {
    const { isValid: formIsValid } = validateForm();
    setIsValid(formIsValid);
  }, [formData, validateForm]);

  // Effect to clear announcements after they're read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  // Handle field blur (mark as touched and validate)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Announce error to screen readers
    if (error) {
      setAnnouncement(`${name} field has an error: ${error}`);
    } else if (validationRules[name]) {
      // Announce success for required fields
      setAnnouncement(`${name} field is valid`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot spam protection
    if (formData.website) {
      return; // Silently reject spam
    }

    // Mark all fields as touched for validation display
    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate entire form
    const { errors: validationErrors, isValid: formIsValid } = validateForm();
    setErrors(validationErrors);

    if (!formIsValid) {
      // Find first error field and focus it
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
        setAnnouncement(`Please correct the errors in the form. Starting with ${firstErrorField}: ${validationErrors[firstErrorField]}`);
      }
      return;
    }
    
    setIsSubmitting(true);
    setAnnouncement('Sending your request. Please wait...');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubmitted(true);
      setAnnouncement('Thank you! Your request has been submitted successfully.');
    } catch {
      setIsSubmitting(false);
      setErrors({ submit: 'Bless your heart, there was a hiccup sending your request. Please try again in just a moment!' });
      setAnnouncement('There was an error submitting your request. Please try again.');
    }
  };

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
        <h3 className="text-2xl font-serif font-semibold text-primary mb-4" role="status" aria-live="polite">
          Thank you kindly!
        </h3>
        <p className="text-gray-800 mb-6">
          I've received your request and will get back to you soon. 
          In the meantime, feel free to reach out directly at{' '}
          <span className="text-primary font-medium">(TBD)</span>
        </p>
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true" ref={announceRef}>
        {announcement}
      </div>

      {/* Error summary for screen readers */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={errorSummaryRef}
          className="bg-red-50 border border-error rounded-xl p-4 mb-6"
          role="alert"
          aria-labelledby="error-summary-title"
          tabIndex="-1"
        >
          <h3 id="error-summary-title" className="text-error font-medium mb-2 flex items-center gap-2">
            <span className="text-error">💝</span>
            Sweet pea, we need to fix a few things:
          </h3>
          <ul className="text-sm text-error space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <button
                  type="button"
                  className="text-left underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-error/50 rounded"
                  onClick={() => {
                    const element = document.querySelector(`[name="${field}"]`);
                    if (element) element.focus();
                  }}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}: {error}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
          <label htmlFor={fieldIds.name} className="block text-sm font-medium text-accent mb-2">
            Name *
          </label>
          <motion.input
            ref={firstFieldRef}
            type="text"
            id={fieldIds.name}
            name="name"
            required
            aria-required="true"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
              touched.name && errors.name 
                ? 'border-error bg-red-50 focus:ring-error/20' 
                : touched.name && !errors.name && validationRules.name
                ? 'border-success bg-green-50' 
                : 'border-gray-200'
            }`}
            placeholder="Your name"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-invalid={touched.name && errors.name ? 'true' : 'false'}
            aria-describedby={touched.name && errors.name ? `${fieldIds.name}-error` : undefined}
          />
          <AnimatePresence>
            {touched.name && errors.name && (
              <motion.div
                id={`${fieldIds.name}-error`}
                role="alert"
                className="mt-2 text-sm text-error flex items-start gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-error mt-0.5">💝</span>
                <span>{errors.name}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {touched.name && !errors.name && validationRules.name && (
            <motion.div
              className="mt-2 text-sm text-success flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-success">✨</span>
              <span>{successMessages.name}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Mobile input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label htmlFor={fieldIds.mobile} className="block text-sm font-medium text-accent mb-2">
            Mobile *
          </label>
          <motion.input
            type="tel"
            id={fieldIds.mobile}
            name="mobile"
            required
            aria-required="true"
            value={formData.mobile}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
              touched.mobile && errors.mobile 
                ? 'border-error bg-red-50 focus:ring-error/20' 
                : touched.mobile && !errors.mobile && validationRules.mobile
                ? 'border-success bg-green-50' 
                : 'border-gray-200'
            }`}
            placeholder="(865) 555-0123"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-invalid={touched.mobile && errors.mobile ? 'true' : 'false'}
            aria-describedby={`${fieldIds.mobile}-help ${touched.mobile && errors.mobile ? fieldIds.mobile + '-error' : ''}`.trim()}
          />
          <div id={`${fieldIds.mobile}-help`} className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id={fieldIds.textOk}
              checked={textOk}
              onChange={(e) => setTextOk(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor={fieldIds.textOk} className="text-sm text-gray-600">
              Text OK? <span className="text-xs text-gray-500">(We'll use this to coordinate your appointment)</span>
            </label>
          </div>
          <AnimatePresence>
            {touched.mobile && errors.mobile && (
              <motion.div
                id={`${fieldIds.mobile}-error`}
                role="alert"
                className="mt-2 text-sm text-error flex items-start gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-error mt-0.5">💝</span>
                <span>{errors.mobile}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {touched.mobile && !errors.mobile && validationRules.mobile && (
            <motion.div
              className="mt-2 text-sm text-success flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-success">✨</span>
              <span>{successMessages.mobile}</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label htmlFor={fieldIds.email} className="block text-sm font-medium text-accent mb-2">
            Email *
          </label>
          <motion.input
            type="email"
            id={fieldIds.email}
            name="email"
            required
            aria-required="true"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
              touched.email && errors.email 
                ? 'border-error bg-red-50 focus:ring-error/20' 
                : touched.email && !errors.email && validationRules.email
                ? 'border-success bg-green-50' 
                : 'border-gray-200'
            }`}
            placeholder="your.email@example.com"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-invalid={touched.email && errors.email ? 'true' : 'false'}
            aria-describedby={`${fieldIds.email}-help ${touched.email && errors.email ? fieldIds.email + '-error' : ''}`.trim()}
          />
          <div id={`${fieldIds.email}-help`} className="text-xs text-gray-500 mt-1">
            Your estimate will be sent here
          </div>
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.div
                id={`${fieldIds.email}-error`}
                role="alert"
                className="mt-2 text-sm text-error flex items-start gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-error mt-0.5">💝</span>
                <span>{errors.email}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {touched.email && !errors.email && validationRules.email && (
            <motion.div
              className="mt-2 text-sm text-success flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-success">✨</span>
              <span>{successMessages.email}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Address input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label htmlFor={fieldIds.address} className="block text-sm font-medium text-accent mb-2">
            Address/City *
          </label>
          <motion.input
            type="text"
            id={fieldIds.address}
            name="address"
            required
            aria-required="true"
            value={formData.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
              touched.address && errors.address 
                ? 'border-error bg-red-50 focus:ring-error/20' 
                : touched.address && !errors.address && validationRules.address
                ? 'border-success bg-green-50' 
                : 'border-gray-200'
            }`}
            placeholder="City or ZIP code"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-invalid={touched.address && errors.address ? 'true' : 'false'}
            aria-describedby={`${fieldIds.address}-help ${touched.address && errors.address ? fieldIds.address + '-error' : ''}`.trim()}
          />
          <div id={`${fieldIds.address}-help`} className="text-xs text-gray-500 mt-1">
            Help us confirm we serve your area
          </div>
          <AnimatePresence>
            {touched.address && errors.address && (
              <motion.div
                id={`${fieldIds.address}-error`}
                role="alert"
                className="mt-2 text-sm text-error flex items-start gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-error mt-0.5">💝</span>
                <span>{errors.address}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {touched.address && !errors.address && validationRules.address && (
            <motion.div
              className="mt-2 text-sm text-success flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-success">✨</span>
              <span>{successMessages.address}</span>
            </motion.div>
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
          <label htmlFor={fieldIds.serviceType} className="block text-sm font-medium text-accent mb-2">
            Service Type *
          </label>
          <motion.select
            id={fieldIds.serviceType}
            name="serviceType"
            required
            aria-required="true"
            value={formData.serviceType}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle bg-white ${
              touched.serviceType && errors.serviceType 
                ? 'border-error bg-red-50 focus:ring-error/20' 
                : touched.serviceType && !errors.serviceType && validationRules.serviceType
                ? 'border-success bg-green-50' 
                : 'border-gray-200'
            }`}
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-invalid={touched.serviceType && errors.serviceType ? 'true' : 'false'}
            aria-describedby={touched.serviceType && errors.serviceType ? `${fieldIds.serviceType}-error` : undefined}
          >
            <option value="">Select service type</option>
            <option value="home">Home</option>
            <option value="str">STR/Office</option>
            <option value="office">Office</option>
          </motion.select>
          <AnimatePresence>
            {touched.serviceType && errors.serviceType && (
              <motion.div
                id={`${fieldIds.serviceType}-error`}
                role="alert"
                className="mt-2 text-sm text-error flex items-start gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-error mt-0.5">💝</span>
                <span>{errors.serviceType}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {touched.serviceType && !errors.serviceType && validationRules.serviceType && (
            <motion.div
              className="mt-2 text-sm text-success flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-success">✨</span>
              <span>{successMessages.serviceType}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Beds/Baths or rooms */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label htmlFor={fieldIds.rooms} className="block text-sm font-medium text-accent mb-2">
            Beds/Baths (or rooms) *
          </label>
          <motion.input
            type="text"
            id={fieldIds.rooms}
            name="rooms"
            required
            aria-required="true"
            value={formData.rooms}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle ${
              touched.rooms && errors.rooms 
                ? 'border-error bg-red-50 focus:ring-error/20' 
                : touched.rooms && !errors.rooms && validationRules.rooms
                ? 'border-success bg-green-50' 
                : 'border-gray-200'
            }`}
            placeholder="e.g., 3 bed / 2 bath"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-invalid={touched.rooms && errors.rooms ? 'true' : 'false'}
            aria-describedby={`${fieldIds.rooms}-help ${touched.rooms && errors.rooms ? fieldIds.rooms + '-error' : ''}`.trim()}
          />
          <div id={`${fieldIds.rooms}-help`} className="text-xs text-gray-500 mt-1">
            This helps us estimate time and pricing
          </div>
          <AnimatePresence>
            {touched.rooms && errors.rooms && (
              <motion.div
                id={`${fieldIds.rooms}-error`}
                role="alert"
                className="mt-2 text-sm text-error flex items-start gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-error mt-0.5">💝</span>
                <span>{errors.rooms}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {touched.rooms && !errors.rooms && validationRules.rooms && (
            <motion.div
              className="mt-2 text-sm text-success flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-success">✨</span>
              <span>{successMessages.rooms}</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Add-ons */}
      <motion.div
        variants={getVariants(trustVariants.input)}
        initial="rest"
        whileFocus="focus"
      >
        <label htmlFor={fieldIds.addOns} className="block text-sm font-medium text-accent mb-2">
          Add‑ons
        </label>
        <motion.textarea
          id={fieldIds.addOns}
          name="addOns"
          rows="2"
          value={formData.addOns}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 resize-none focus-sparkle border-gray-200"
          placeholder="Any specific requests (inside oven, baseboards, etc.)"
          variants={getVariants(trustVariants.input)}
          whileFocus="focus"
          aria-describedby={`${fieldIds.addOns}-help`}
        />
        <div id={`${fieldIds.addOns}-help`} className="text-xs text-gray-500 mt-1">
          Optional: Let us know about any special cleaning requests
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Preferred days/times */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label htmlFor={fieldIds.preferredDays} className="block text-sm font-medium text-accent mb-2">
            Preferred days/times
          </label>
          <motion.input
            type="text"
            id={fieldIds.preferredDays}
            name="preferredDays"
            value={formData.preferredDays}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle border-gray-200"
            placeholder="e.g., Weekday mornings"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-describedby={`${fieldIds.preferredDays}-help`}
          />
          <div id={`${fieldIds.preferredDays}-help`} className="text-xs text-gray-500 mt-1">
            Optional: Help us schedule at your convenience
          </div>
        </motion.div>

        {/* Parking/entry notes */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label htmlFor={fieldIds.parkingNotes} className="block text-sm font-medium text-accent mb-2">
            Parking/entry notes
          </label>
          <motion.input
            type="text"
            id={fieldIds.parkingNotes}
            name="parkingNotes"
            value={formData.parkingNotes}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle border-gray-200"
            placeholder="Special instructions"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
            aria-describedby={`${fieldIds.parkingNotes}-help`}
          />
          <div id={`${fieldIds.parkingNotes}-help`} className="text-xs text-gray-500 mt-1">
            Optional: Gate codes, parking instructions, etc.
          </div>
        </motion.div>
      </div>

      {/* Form validation status */}
      {!isValid && Object.keys(touched).length > 0 && (
        <div className="text-center text-sm text-gray-600 mb-4">
          <motion.p
            className="text-warning flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>💝</span>
            Please fill out all required fields above to continue
          </motion.p>
        </div>
      )}

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`w-full text-lg py-4 relative overflow-hidden transition-all duration-300 ${
          isValid 
            ? 'btn-primary' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        variants={getVariants(trustVariants.button)}
        initial="rest"
        whileHover={isValid ? "hover" : undefined}
        whileTap={isValid ? "tap" : undefined}
        aria-describedby="submit-help"
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

      <div id="submit-help" className="sr-only">
        {isValid ? "Form is ready to submit" : "Please complete all required fields to submit"}
      </div>

      {/* Trust indicators */}
      <div className="text-center text-sm text-gray-800 mt-4">
        <p>🔒 No spam—I only use this info to reply about cleaning.</p>
        <p>📞 Phone: (TBD) • Email: (TBD)</p>
      </div>
    </form>
  );
};

export default ContactForm;