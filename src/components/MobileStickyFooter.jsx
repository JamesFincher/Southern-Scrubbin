import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { easings } from '../utils/animations';

// Mobile Sticky Footer CTA Component
const MobileStickyFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide based on scroll position and viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      
      // Show on mobile after scrolling past hero section
      setIsVisible(isMobile && scrollTop > viewportHeight * 0.3);
    };

    const handleResize = () => {
      // Update visibility on resize
      handleScroll();
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth scroll to contact form
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Focus the form after scroll completes
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input, textarea');
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  };

  // Handle phone call
  const handleCall = () => {
    window.location.href = 'tel:+1-555-SPARKLE';
  };

  // Handle SMS with pre-filled message
  const handleText = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your cleaning services. Could you please provide me with more information and a quote?"
    );
    window.location.href = `sms:+1-555-SPARKLE?body=${message}`;
  };

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        duration: 0.3,
        ease: easings.welcome
      }}
    >
      {/* Background with safe area padding */}
      <div className="mobile-sticky-cta">
        <div className="safe-area-bottom">
          {/* CTA Container */}
          <div className="flex items-center justify-between px-4 py-3 gap-3">
            {/* Call CTA */}
            <motion.button
              onClick={handleCall}
              className="mobile-cta-button bg-primary hover:bg-primary-600 text-white focus:ring-4 focus:ring-primary-200"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1, ease: easings.gentle }}
              aria-label="Call us now at 555-SPARKLE"
            >
              <span className="text-lg" role="img" aria-hidden="true">📞</span>
              <span className="text-sm font-semibold">Call</span>
            </motion.button>

            {/* Text CTA */}
            <motion.button
              onClick={handleText}
              className="mobile-cta-button bg-secondary hover:bg-secondary-600 text-white focus:ring-4 focus:ring-secondary-200"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1, ease: easings.gentle }}
              aria-label="Send us a text message"
            >
              <span className="text-lg" role="img" aria-hidden="true">💬</span>
              <span className="text-sm font-semibold">Text</span>
            </motion.button>

            {/* Get Quote CTA */}
            <motion.button
              onClick={scrollToContact}
              className="mobile-cta-button bg-accent hover:bg-accent-600 text-white focus:ring-4 focus:ring-accent-200"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1, ease: easings.gentle }}
              aria-label="Get a quote - scroll to contact form"
            >
              <span className="text-lg" role="img" aria-hidden="true">✨</span>
              <span className="text-sm font-semibold">Quote</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Subtle sparkle animation on the background */}
      <motion.div
        className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-secondary text-xs opacity-30"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default MobileStickyFooter;