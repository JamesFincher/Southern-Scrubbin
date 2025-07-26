import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getVariants, easings } from '../utils/animations';

// Logo component with house icon and sparkle effect
const Logo = ({ className = "" }) => (
  <motion.div 
    className={`flex items-center gap-3 ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2, ease: easings.gentle }}
  >
    {/* House icon */}
    <div className="relative w-10 h-10">
      <svg 
        viewBox="0 0 40 40" 
        className="w-full h-full text-primary fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* House roof */}
        <path d="M6 18 L20 6 L34 18 L31 18 L31 15 L9 15 L9 18 Z" 
              className="fill-primary" />
        
        {/* House body */}
        <rect x="9" y="15" width="22" height="19" 
              className="fill-primary-100 stroke-primary stroke-1" />
        
        {/* Door */}
        <rect x="17" y="25" width="6" height="9" 
              className="fill-primary stroke-primary-600 stroke-0.5" />
        
        {/* Windows */}
        <rect x="12" y="20" width="4" height="3" 
              className="fill-white stroke-primary stroke-0.5" />
        <rect x="24" y="20" width="4" height="3" 
              className="fill-white stroke-primary stroke-0.5" />
        
        {/* Sparkle wave */}
        <motion.path 
          d="M5 32 Q12 30 20 32 T35 32" 
          className="stroke-primary-300 stroke-1 fill-none"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      
      {/* Subtle sparkle indicator */}
      <motion.div
        className="absolute -top-1 -right-1 text-secondary text-xs"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✨
      </motion.div>
    </div>
    
    {/* Brand text */}
    <div className="flex flex-col leading-tight">
      <span className="font-display text-xl font-bold text-primary">
        Sparkle Scrub
      </span>
      <span className="font-sans text-xs text-accent font-medium -mt-1">
        Southern clean
      </span>
    </div>
  </motion.div>
);

// Navigation menu items
const navItems = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'FAQs', href: '#faqs', id: 'faqs' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

// Desktop navigation
const DesktopNav = ({ activeSection, isScrolled }) => (
  <nav className="hidden md:flex items-center space-x-8">
    {navItems.map((item) => (
      <motion.a
        key={item.id}
        href={item.href}
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          activeSection === item.id
            ? 'text-primary'
            : isScrolled
            ? 'text-gray-700 hover:text-primary'
            : 'text-gray-800 hover:text-primary'
        }`}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2, ease: easings.gentle }}
      >
        {item.name}
        
        {/* Active indicator */}
        <AnimatePresence>
          {activeSection === item.id && (
            <motion.div
              className="absolute -bottom-1 left-1/2 w-1 h-1 bg-secondary rounded-full"
              layoutId="activeIndicator"
              initial={{ opacity: 0, scale: 0, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, scale: 0, x: '-50%' }}
              transition={{ duration: 0.2, ease: easings.gentle }}
            />
          )}
        </AnimatePresence>
      </motion.a>
    ))}
  </nav>
);

// Mobile menu button
const MobileMenuButton = ({ isOpen, onClick, isScrolled }) => (
  <motion.button
    onClick={onClick}
    className={`md:hidden relative z-50 p-2 rounded-lg transition-colors duration-200 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
    }`}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle menu"
  >
    <div className="w-6 h-6 relative">
      <motion.span
        className={`absolute left-0 w-6 h-0.5 rounded-full transition-colors duration-200 ${
          isScrolled ? 'bg-gray-800' : 'bg-gray-700'
        }`}
        animate={isOpen 
          ? { rotate: 45, y: 8, opacity: 1 }
          : { rotate: 0, y: 0, opacity: 1 }
        }
        style={{ top: '6px' }}
        transition={{ duration: 0.2, ease: easings.gentle }}
      />
      <motion.span
        className={`absolute left-0 w-6 h-0.5 rounded-full transition-colors duration-200 ${
          isScrolled ? 'bg-gray-800' : 'bg-gray-700'
        }`}
        animate={isOpen 
          ? { opacity: 0 }
          : { opacity: 1 }
        }
        style={{ top: '11px' }}
        transition={{ duration: 0.2, ease: easings.gentle }}
      />
      <motion.span
        className={`absolute left-0 w-6 h-0.5 rounded-full transition-colors duration-200 ${
          isScrolled ? 'bg-gray-800' : 'bg-gray-700'
        }`}
        animate={isOpen 
          ? { rotate: -45, y: -8, opacity: 1 }
          : { rotate: 0, y: 0, opacity: 1 }
        }
        style={{ top: '16px' }}
        transition={{ duration: 0.2, ease: easings.gentle }}
      />
    </div>
  </motion.button>
);

// Mobile navigation menu
const MobileNav = ({ isOpen, activeSection, onItemClick }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onItemClick}
        />
        
        {/* Menu panel */}
        <motion.div
          className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-2xl z-40 md:hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: easings.welcome }}
        >
          <div className="pt-20 pb-8 px-6">
            {/* Mobile nav items */}
            <nav className="space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={onItemClick}
                  className={`relative flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary-50'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.3, 
                    ease: easings.welcome 
                  }}
                >
                  {item.name}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute right-4 w-2 h-2 bg-secondary rounded-full"
                      layoutId="mobileActiveIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, ease: easings.gentle }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>
            
            {/* Mobile CTA */}
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3, ease: easings.welcome }}
            >
              <motion.button
                className="w-full btn-primary text-center"
                onClick={onItemClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: easings.gentle }}
              >
                Request an Estimate
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// CTA Button component
const CTAButton = ({ isScrolled }) => (
  <motion.button
    className={`hidden sm:inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-primary-200 ${
      isScrolled
        ? 'bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
        : 'bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
    }`}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 8px 25px -5px rgba(0, 175, 175, 0.3)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, ease: easings.gentle }}
  >
    <span>Request an Estimate</span>
    <motion.span
      className="ml-2"
      animate={{
        x: [0, 3, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      →
    </motion.span>
  </motion.button>
);

// Main Header component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section detection
  useEffect(() => {
    const handleSectionDetection = () => {
      const sections = navItems.map(item => item.id);
      const scrollTop = window.scrollY;
      const headerHeight = 80; // Account for fixed header
      
      // Find the section that's currently in view
      let activeId = 'home'; // Default to home
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;
          if (scrollTop + headerHeight >= offsetTop) {
            activeId = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(activeId);
    };

    // Initial check
    handleSectionDetection();
    
    window.addEventListener('scroll', handleSectionDetection, { passive: true });
    return () => window.removeEventListener('scroll', handleSectionDetection);
  }, []);

  // Handle mobile menu close
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: easings.welcome }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <DesktopNav activeSection={activeSection} isScrolled={isScrolled} />

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <CTAButton isScrolled={isScrolled} />
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                isScrolled={isScrolled}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onItemClick={handleMobileMenuClose}
      />
    </>
  );
};

export default Header;