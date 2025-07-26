import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useCallback } from 'react';
import { useInView } from 'motion/react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';

// Sparkle component for magical effects
const SparkleIcon = ({ delay = 0, size = "w-6 h-6", className = "" }) => (
  <motion.div
    className={`${size} ${className} text-secondary absolute pointer-events-none`}
    variants={sparkleVariants.twinkling}
    animate="twinkling"
    style={{ 
      animationDelay: `${delay}s`,
    }}
  >
    ✨
  </motion.div>
);

// Tab content data
const tabsData = [
  {
    id: 'homes',
    title: 'Homes',
    emoji: '🏠',
    description: 'kitchens, baths, bedrooms, living areas, floors',
    details: [
      'Counters, cabinet fronts, sink & faucet, stovetop',
      'Microwave interior, exterior of appliances',
      'Toilets, tubs/showers, sinks, mirrors',
      'Dust/wipe reachable surfaces, make beds, floors'
    ]
  },
  {
    id: 'airbnb',
    title: 'Airbnb / Short‑Term Rental',
    emoji: '🏨',
    description: 'guest‑ready turns, fresh linens, simple restock',
    details: [
      'Swap & make beds with fresh linens',
      'Kitchen & bath cleaning',
      'Dishes (run/put away)',
      'Simple restock with on‑site supplies',
      'After‑clean photos if requested'
    ]
  },
  {
    id: 'offices',
    title: 'Small Offices',
    emoji: '🏢',
    description: 'clear desks/common areas, restrooms, floors, trash',
    details: [
      'Desks & common surfaces (keep areas reasonably tidy)',
      'Restrooms & break areas',
      'Trash/recycling removal',
      'Floor care (vacuum/sweep/mop)',
      'After‑hours with key/fob available'
    ]
  }
];

// Individual slide content component
const SlideContent = ({ tab, direction = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ 
        opacity: 0, 
        x: direction > 0 ? 300 : direction < 0 ? -300 : 0,
        y: 20 
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ 
        opacity: 0, 
        x: direction > 0 ? -300 : direction < 0 ? 300 : 0,
        y: -20 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Tab icon and description */}
      <div className="text-center mb-8">
        <motion.div
          className="w-24 h-24 mx-auto mb-4 bg-sparkle-gradient rounded-2xl flex items-center justify-center text-4xl relative sparkle-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          {tab.emoji}
          <SparkleIcon delay={0.3} className="top-1 right-1" size="w-3 h-3" />
          <SparkleIcon delay={1.5} className="bottom-1 left-1" size="w-3 h-3" />
        </motion.div>
        
        <motion.p
          className="text-lg text-gray-800 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {tab.description}
        </motion.p>
      </div>

      {/* Detailed features list */}
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h4 className="text-xl font-display font-medium text-accent mb-4 text-center">
          What's Included:
        </h4>
        <ul className="space-y-3">
          {tab.details.map((detail, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.8 + (idx * 0.1), duration: 0.5 }}
            >
              <span className="text-secondary text-lg mt-0.5 flex-shrink-0">✓</span>
              <span>{detail}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

// Main ServicesTabs component (now carousel)
const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState('homes');
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Navigation helpers
  const goToSlide = useCallback((newTabId, dir = 0) => {
    setDirection(dir);
    setActiveTab(newTabId);
  }, []);

  // Keyboard navigation handler for carousel
  const handleKeyDown = useCallback((event) => {
    const tabs = tabsData;
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    let newIndex = currentIndex;
    let dir = 0;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        dir = -1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        dir = 1;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        dir = currentIndex > 0 ? -1 : 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        dir = currentIndex < tabs.length - 1 ? 1 : 0;
        break;
      default:
        return;
    }

    const newTabId = tabs[newIndex].id;
    goToSlide(newTabId, dir);
  }, [activeTab, goToSlide]);

  // Navigation button handlers
  const goToPrevious = useCallback(() => {
    const tabs = tabsData;
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    goToSlide(tabs[newIndex].id, -1);
  }, [activeTab, goToSlide]);

  const goToNext = useCallback(() => {
    const tabs = tabsData;
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    goToSlide(tabs[newIndex].id, 1);
  }, [activeTab, goToSlide]);


  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto mb-16 bg-white rounded-3xl p-8 shadow-soft border-0"
      variants={getVariants(scrollVariants.scaleIn)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service carousel"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-semibold text-accent mb-4">
          Services Overview
        </h3>
        <p className="text-gray-800 max-w-2xl mx-auto">
          Owner-operated cleaning with straightforward service for three main areas:
        </p>
      </div>

      {/* Carousel Navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {/* Previous Button */}
        <motion.button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous service"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {tabsData.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => goToSlide(tab.id, 0)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                activeTab === tab.id 
                  ? 'bg-primary scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${tab.title} service`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next service"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
      {/* Carousel Content */}
      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <SlideContent 
            key={activeTab}
            tab={tabsData.find(tab => tab.id === activeTab)}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Instructions for keyboard users */}
      <motion.div
        className="mt-8 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p className="sr-only">
          Use arrow keys to navigate between carousel slides, or click navigation buttons
        </p>
        <p aria-hidden="true" className="text-xs">
          Use ← → arrow keys to navigate carousel slides
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ServicesTabs;