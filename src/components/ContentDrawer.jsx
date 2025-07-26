import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useCallback } from 'react';
import { modalVariants, getVariants } from '../utils/animations';

// Chip component for displaying list items
const Chip = ({ children, index, icon = "•", iconColor = "text-secondary" }) => (
  <motion.div
    className="inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200"
    variants={getVariants(modalVariants.chip)}
    custom={index}
  >
    <span className={`${iconColor} text-sm`}>{icon}</span>
    <span className="text-gray-700 text-sm">{children}</span>
  </motion.div>
);

// Main ContentDrawer component
const ContentDrawer = ({
  isOpen,
  onClose,
  title,
  items = [],
  type = 'addons', // 'addons' or 'notOffering'
  children,
}) => {
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Store the element that had focus before opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
    }
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      // Focus the close button when drawer opens
      const closeButton = drawerRef.current.querySelector('[data-close-button]');
      if (closeButton) {
        closeButton.focus();
        firstFocusableRef.current = closeButton;
        lastFocusableRef.current = closeButton;
      }
    } else if (!isOpen && previousFocusRef.current) {
      // Return focus to the element that opened the drawer
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback((event) => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      onClose();
      return;
    }

    // Trap focus within the drawer
    if (event.key === 'Tab') {
      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements?.length) return;

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }, [isOpen, onClose]);

  // Add/remove event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Get styling based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'addons':
        return {
          headerBg: 'bg-secondary-50',
          headerText: 'text-accent',
          chipIcon: '+',
          chipIconColor: 'text-secondary',
          description: 'Available by request to enhance your service'
        };
      case 'notOffering':
        return {
          headerBg: 'bg-gray-100',
          headerText: 'text-accent',
          chipIcon: '•',
          chipIconColor: 'text-gray-400',
          description: 'Services we don\'t currently provide'
        };
      default:
        return {
          headerBg: 'bg-gray-50',
          headerText: 'text-accent',
          chipIcon: '•',
          chipIconColor: 'text-gray-500',
          description: ''
        };
    }
  };

  const typeStyles = getTypeStyles();

  if (!isOpen) return null;

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={getVariants(modalVariants.overlay)}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          aria-describedby="drawer-description"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] overflow-hidden"
            variants={getVariants(modalVariants.drawer)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className={`${typeStyles.headerBg} px-6 py-4 border-b border-gray-200`}>
              <div className="flex items-center justify-between">
                <motion.h2
                  id="drawer-title"
                  className={`text-2xl font-display font-semibold ${typeStyles.headerText}`}
                  variants={getVariants(modalVariants.content)}
                  initial="hidden"
                  animate="visible"
                >
                  {title}
                </motion.h2>
                <motion.button
                  data-close-button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  variants={getVariants(modalVariants.content)}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close dialog"
                >
                  <svg 
                    className="w-6 h-6 text-gray-600" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              {typeStyles.description && (
                <motion.p
                  id="drawer-description"
                  className="text-gray-600 mt-2 text-sm"
                  variants={getVariants(modalVariants.content)}
                  initial="hidden"
                  animate="visible"
                >
                  {typeStyles.description}
                </motion.p>
              )}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              {children ? (
                <motion.div
                  variants={getVariants(modalVariants.content)}
                  initial="hidden"
                  animate="visible"
                >
                  {children}
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={getVariants(modalVariants.chipContainer)}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item, index) => (
                    <Chip
                      key={index}
                      index={index}
                      icon={typeStyles.chipIcon}
                      iconColor={typeStyles.chipIconColor}
                    >
                      {item}
                    </Chip>
                  ))}
                </motion.div>
              )}

              {/* Southern hospitality message for addons */}
              {type === 'addons' && !children && (
                <motion.div
                  className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100"
                  variants={getVariants(modalVariants.content)}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✨</span>
                    <div>
                      <p className="text-primary font-medium text-sm mb-1">
                        Let's make it perfect for you
                      </p>
                      <p className="text-gray-700 text-sm">
                        Just mention any add-ons when requesting your quote, and I'll include them in your personalized estimate.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Not offering explanation */}
              {type === 'notOffering' && !children && (
                <motion.div
                  className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  variants={getVariants(modalVariants.content)}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 text-xl">🎯</span>
                    <div>
                      <p className="text-gray-700 font-medium text-sm mb-1">
                        Keeping it focused
                      </p>
                      <p className="text-gray-600 text-sm">
                        By focusing on what I do best, I can deliver consistent quality and reliable service for every client.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer with action button */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <motion.button
                onClick={onClose}
                className="btn-primary w-full text-center"
                variants={getVariants(modalVariants.content)}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Got it!</span>
                  <span className="text-lg">✨</span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render to portal for proper stacking
  return createPortal(drawerContent, document.body);
};

export default ContentDrawer;