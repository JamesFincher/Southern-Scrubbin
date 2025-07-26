import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhatIClean from './components/WhatIClean';
import AirbnbTurns from './components/AirbnbTurns';
import SmallOffices from './components/SmallOffices';
import SuppliesPreferences from './components/SuppliesPreferences';
import HowItWorks from './components/HowItWorks';
import ServiceArea from './components/ServiceArea';
import FAQs from './components/FAQs';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileStickyFooter from './components/MobileStickyFooter';
import { shouldReduceMotion } from './utils/animations';

// Main App Component
function App() {
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

      {/* Header/Navigation */}
      <Header />

      {/* Main content */}
      <main id="main-content" tabIndex="-1">
        {/* Hero Section */}
        <Hero />

        {/* Services Overview */}
        <Services />

        {/* What I Clean (Details) */}
        <WhatIClean />

        {/* Airbnb/STR Turns */}
        <AirbnbTurns />

        {/* Small Offices */}
        <SmallOffices />

        {/* Supplies & Preferences */}
        <SuppliesPreferences />

        {/* How It Works */}
        <HowItWorks />

        {/* Service Area */}
        <ServiceArea />

        {/* FAQs */}
        <FAQs />

        {/* About */}
        <About />

        {/* Contact/Estimate Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Footer CTA */}
      <MobileStickyFooter />

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary-600 text-white rounded-full shadow-gentle hover:shadow-warm flex items-center justify-center z-40 md:z-40 hidden md:flex focus:outline-none focus:ring-4 focus:ring-primary-200 focus:ring-offset-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Return focus to skip link for better keyboard navigation
          setTimeout(() => {
            const skipLink = document.querySelector('a[href="#main-content"]');
            if (skipLink) skipLink.focus();
          }, 500);
        }}
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <span className="text-lg" aria-hidden="true">↑</span>
      </motion.button>
    </div>
  );
}

export default App;