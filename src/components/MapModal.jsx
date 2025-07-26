import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import { modalVariants } from '../utils/animations';

const MapModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Store the element that was focused before opening the modal
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal container
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Return focus to the element that opened the modal
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  // Focus trap within modal
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={modalVariants.overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          {/* Modal background overlay */}
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          
          {/* Modal content */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            variants={modalVariants.drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-modal-title"
            tabIndex={-1}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 
                id="map-modal-title"
                className="text-2xl font-display font-semibold text-accent"
              >
                Service Area Map
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Close map"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Map content */}
            <motion.div
              className="p-6"
              variants={modalVariants.content}
              initial="hidden"
              animate="visible"
            >
              {/* Service area description */}
              <div className="mb-6 text-center">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Based in <span className="font-semibold text-primary">Ten Mile, TN</span>, 
                  serving <span className="font-semibold text-secondary">Knoxville</span> and nearby areas.
                </p>
                <p className="text-gray-600 mt-2">
                  Add your ZIP code in the estimate request to confirm service availability.
                </p>
              </div>

              {/* Embedded map container */}
              <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                {/* Google Maps embed - lazy loaded only when modal opens */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52000.0!2d-84.2!3d35.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c162246ce42a9%3A0x7464a9d8a6b4c7f1!2sTen%20Mile%2C%20TN!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Southern Scrubbin Service Area Map - Ten Mile and Knoxville Area"
                  className="w-full h-full"
                />
                
                {/* Fallback content in case map fails to load */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-sm">Interactive map loading...</p>
                  </div>
                </div>
              </div>

              {/* Service radius info */}
              <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary text-xl mt-1">📍</div>
                  <div>
                    <h3 className="font-semibold text-accent mb-2">Coverage Details</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• <strong>Primary service area:</strong> Ten Mile, Knoxville, and surrounding communities</li>
                      <li>• <strong>Extended area:</strong> May travel further for larger jobs</li>
                      <li>• <strong>Response time:</strong> Same-day estimates within service area</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact encouragement */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Not sure if you're in the service area? 
                  <span className="text-primary font-medium"> Just ask!</span> ✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapModal;