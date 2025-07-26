import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { shouldReduceMotion } from './utils/animations';

// Navigation component for the one-page site
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-gentle' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-sm font-bold">
              SS
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-lg font-bold text-primary">
                Southern Sparkle
              </div>
              <div className="text-xs text-accent -mt-1">
                & Scrub
              </div>
            </div>
          </motion.div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <motion.a
              href="#services"
              className="text-gray-800 hover:text-primary transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#contact"
              className="text-gray-800 hover:text-primary transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
            <motion.a
              href="tel:6155552532"
              className="btn-primary py-2 px-6 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 Call Now
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">☰</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

// Loading screen component
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-southern-gradient flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        {/* Loading logo */}
        <motion.div
          className="w-24 h-24 mx-auto mb-6 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full bg-primary rounded-2xl flex items-center justify-center text-white text-4xl relative overflow-hidden">
            🏠
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: [-100, 100],
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
            />
          </div>
          
          {/* Loading sparkles */}
          <motion.div
            className="absolute -top-2 -right-2 text-secondary text-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Southern Sparkle & Scrub
          </h1>
          <p className="text-accent font-medium">
            Preparing your sparkling experience...
          </p>
        </motion.div>

        {/* Loading progress */}
        <motion.div
          className="w-48 h-1 bg-gray-100 rounded-full mx-auto mt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    setReducedMotion(shouldReduceMotion());
    
    // Add smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  // Show loading screen initially
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="App">
      {/* Global motion config for accessibility */}
      {reducedMotion && (
        <style>{`
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `}</style>
      )}

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary-600 text-white rounded-full shadow-gentle hover:shadow-warm flex items-center justify-center z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <span className="text-lg">↑</span>
      </motion.button>

      {/* Background sparkles for ambient effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-secondary-200 text-sm opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
