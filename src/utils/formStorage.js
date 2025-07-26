// Form draft storage utilities
// Provides automatic saving and restoration of form data

const STORAGE_KEY_PREFIX = 'southern_scrubbin_form_';
const DRAFT_EXPIRY_DAYS = 7; // Drafts expire after 7 days

// Check if localStorage is available
const isStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// Generate storage key for a specific form
const getStorageKey = (formId) => `${STORAGE_KEY_PREFIX}${formId}`;

// Save form draft to localStorage
export const saveDraft = (formId, formData) => {
  if (!isStorageAvailable()) return false;
  
  try {
    const draftData = {
      data: formData,
      timestamp: Date.now(),
      version: '1.0'
    };
    
    localStorage.setItem(getStorageKey(formId), JSON.stringify(draftData));
    return true;
  } catch (error) {
    console.warn('Failed to save form draft:', error);
    return false;
  }
};

// Load form draft from localStorage
export const loadDraft = (formId) => {
  if (!isStorageAvailable()) return null;
  
  try {
    const stored = localStorage.getItem(getStorageKey(formId));
    if (!stored) return null;
    
    const draftData = JSON.parse(stored);
    const now = Date.now();
    const expiryTime = DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 7 days in ms
    
    // Check if draft has expired
    if (now - draftData.timestamp > expiryTime) {
      clearDraft(formId);
      return null;
    }
    
    return draftData.data;
  } catch (error) {
    console.warn('Failed to load form draft:', error);
    return null;
  }
};

// Clear form draft from localStorage
export const clearDraft = (formId) => {
  if (!isStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(getStorageKey(formId));
    return true;
  } catch (error) {
    console.warn('Failed to clear form draft:', error);
    return false;
  }
};

// Check if a draft exists for a form
export const hasDraft = (formId) => {
  if (!isStorageAvailable()) return false;
  
  try {
    const stored = localStorage.getItem(getStorageKey(formId));
    if (!stored) return false;
    
    const draftData = JSON.parse(stored);
    const now = Date.now();
    const expiryTime = DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    // Check if draft has expired
    if (now - draftData.timestamp > expiryTime) {
      clearDraft(formId);
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn('Failed to check for form draft:', error);
    return false;
  }
};

// Get info about a draft (timestamp, etc.)
export const getDraftInfo = (formId) => {
  if (!isStorageAvailable()) return null;
  
  try {
    const stored = localStorage.getItem(getStorageKey(formId));
    if (!stored) return null;
    
    const draftData = JSON.parse(stored);
    const now = Date.now();
    const age = now - draftData.timestamp;
    
    return {
      timestamp: draftData.timestamp,
      age: age,
      ageInHours: Math.floor(age / (1000 * 60 * 60)),
      ageInDays: Math.floor(age / (1000 * 60 * 60 * 24)),
      version: draftData.version
    };
  } catch (error) {
    console.warn('Failed to get draft info:', error);
    return null;
  }
};

// Clean up expired drafts across all forms
export const cleanupExpiredDrafts = () => {
  if (!isStorageAvailable()) return 0;
  
  let cleanedCount = 0;
  const now = Date.now();
  const expiryTime = DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  
  try {
    // Iterate through all localStorage keys
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      
      // Check if it's one of our form draft keys
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const draftData = JSON.parse(stored);
            
            // Remove if expired
            if (now - draftData.timestamp > expiryTime) {
              localStorage.removeItem(key);
              cleanedCount++;
            }
          }
        } catch {
          // Remove corrupted entries
          localStorage.removeItem(key);
          cleanedCount++;
        }
      }
    }
  } catch (error) {
    console.warn('Failed to cleanup expired drafts:', error);
  }
  
  return cleanedCount;
};

// Form field validation and tracking
export const validateFormField = (fieldName, value, _formData = {}) => {
  const validators = {
    name: (val) => {
      if (!val || val.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
      }
      return { isValid: true };
    },
    
    mobile: (val) => {
      if (!val || val.trim().length < 10) {
        return { isValid: false, error: 'Please enter a valid phone number' };
      }
      // Basic phone number format check
      const phoneRegex = /^[\d\s()-+.]+$/;
      if (!phoneRegex.test(val)) {
        return { isValid: false, error: 'Phone number contains invalid characters' };
      }
      return { isValid: true };
    },
    
    email: (val) => {
      if (!val || val.trim().length === 0) {
        return { isValid: false, error: 'Email is required' };
      }
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return { isValid: false, error: 'Please enter a valid email address' };
      }
      return { isValid: true };
    },
    
    address: (val) => {
      if (!val || val.trim().length < 3) {
        return { isValid: false, error: 'Please enter your city or ZIP code' };
      }
      return { isValid: true };
    },
    
    serviceType: (val) => {
      if (!val) {
        return { isValid: false, error: 'Please select a service type' };
      }
      return { isValid: true };
    },
    
    rooms: (val) => {
      if (!val || val.trim().length === 0) {
        return { isValid: false, error: 'Please specify beds/baths or rooms' };
      }
      return { isValid: true };
    }
  };
  
  const validator = validators[fieldName];
  if (validator) {
    return validator(value);
  }
  
  // Default validation for optional fields
  return { isValid: true };
};

// Calculate form completion percentage
export const getFormCompletionRate = (formData) => {
  const requiredFields = ['name', 'mobile', 'email', 'address', 'serviceType', 'rooms'];
  const optionalFields = ['addOns', 'preferredDays', 'parkingNotes'];
  const allFields = [...requiredFields, ...optionalFields];
  
  let completedFields = 0;
  
  allFields.forEach(field => {
    if (formData[field] && formData[field].toString().trim().length > 0) {
      completedFields++;
    }
  });
  
  return {
    completedFields,
    totalFields: allFields.length,
    requiredCompleted: requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim().length > 0
    ).length,
    requiredTotal: requiredFields.length,
    completionRate: completedFields / allFields.length,
    requiredCompletionRate: requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim().length > 0
    ).length / requiredFields.length
  };
};

// Initialize cleanup on page load
if (typeof window !== 'undefined') {
  // Clean up expired drafts when the app loads
  setTimeout(() => {
    const cleaned = cleanupExpiredDrafts();
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired form draft(s)`);
    }
  }, 1000);
}
