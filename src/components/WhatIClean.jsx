import { motion } from 'motion/react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import ContentDrawer from './ContentDrawer';

const WhatIClean = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // State for drawer modals
  const [isAddonsDrawerOpen, setIsAddonsDrawerOpen] = useState(false);
  const [isNotOfferingDrawerOpen, setIsNotOfferingDrawerOpen] = useState(false);

  const cleaningAreas = [
    {
      category: "Kitchens",
      items: ["counters", "cabinet fronts", "sink/faucet", "stovetop", "microwave interior", "exterior of appliances", "floors"],
      icon: "🍳"
    },
    {
      category: "Bathrooms", 
      items: ["toilets", "tubs/showers", "sinks", "mirrors", "counters", "floors"],
      icon: "🛁"
    },
    {
      category: "Bedrooms & Living Areas",
      items: ["dust/wipe reachable surfaces", "tidy", "make beds (fresh sheets if left out)", "floors"],
      icon: "🛏️"
    }
  ];

  const addOns = [
    "inside oven", "inside fridge", "baseboards/detail dusting", 
    "interior windows within reach", "light wall spot‑cleaning", 
    "dish wash‑up", "laundry fold (your detergent)"
  ];

  const notOffered = [
    "carpet shampoo/extraction", "pressure washing", "exterior windows", 
    "tall‑ladder/roof work", "post‑construction debris", "mold/biohazard/animal waste", 
    "severe hoarding", "active pest issues"
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden" id="details">
      {/* Background sparkles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="absolute top-20 left-10 text-primary opacity-60"
          variants={getVariants(sparkleVariants.floating)}
          custom={0.5}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-32 right-16 text-secondary opacity-50"
          variants={getVariants(sparkleVariants.twinkling)}
          custom={1}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-64 left-1/4 text-primary opacity-40"
          variants={getVariants(sparkleVariants.dancing)}
          custom={1.5}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-20 text-secondary opacity-60"
          variants={getVariants(sparkleVariants.floating)}
          custom={2}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-1/3 text-primary opacity-50"
          variants={getVariants(sparkleVariants.twinkling)}
          custom={0.8}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-8 text-secondary opacity-40"
          variants={getVariants(sparkleVariants.dancing)}
          custom={2.2}
        >
          ✨
        </motion.div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-accent mb-6"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            What's <span className="text-primary">Included</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            I keep things tidy and comfortable—no drama, no shortcuts.
          </motion.p>
        </motion.div>

        {/* Standard cleaning areas */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={getVariants(scrollVariants.staggerChildren)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cleaningAreas.map((area, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
              variants={getVariants(scrollVariants.fadeInUp)}
            >
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="text-4xl mb-3">{area.icon}</div>
                  {/* Icon sparkles */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-xs text-secondary opacity-70"
                    variants={getVariants(sparkleVariants.twinkling)}
                    custom={index * 0.3}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-1 text-xs text-primary opacity-60"
                    variants={getVariants(sparkleVariants.floating)}
                    custom={index * 0.4 + 0.5}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    ✨
                  </motion.div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-primary">
                  {area.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {area.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons section - clickable card */}
        <motion.button
          className="w-full bg-secondary-50 hover:bg-secondary-100 rounded-3xl p-8 mb-12 text-left transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-secondary-200"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => setIsAddonsDrawerOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="View available add-on services"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-semibold text-accent mb-2">
                Add‑ons (by request)
              </h3>
              <p className="text-gray-700 mb-4">
                Extra services to enhance your cleaning experience
              </p>
              <div className="flex flex-wrap gap-2">
                {addOns.slice(0, 3).map((addon, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 bg-white rounded-lg px-3 py-1 text-sm text-gray-700 shadow-sm"
                  >
                    <span className="text-secondary text-xs">+</span>
                    {addon}
                  </span>
                ))}
                {addOns.length > 3 && (
                  <span className="inline-flex items-center gap-1 bg-white rounded-lg px-3 py-1 text-sm text-gray-500 shadow-sm">
                    +{addOns.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center text-secondary">
              <motion.div
                className="text-3xl mb-2"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
              <span className="text-sm font-medium">View All</span>
              <motion.svg 
                className="w-4 h-4 mt-1" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path d="M9 5l7 7-7 7" />
              </motion.svg>
            </div>
          </div>
        </motion.button>

        {/* Not currently offering - clickable card */}
        <motion.button
          className="w-full bg-gray-100 hover:bg-gray-150 rounded-3xl p-8 text-left transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => setIsNotOfferingDrawerOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="View services not currently offered"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-semibold text-accent mb-2">
                Not currently offering
              </h3>
              <p className="text-gray-700 mb-4">
                Services we focus away from to deliver better quality
              </p>
              <div className="flex flex-wrap gap-2">
                {notOffered.slice(0, 3).map((item, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 bg-white rounded-lg px-3 py-1 text-sm text-gray-600 shadow-sm"
                  >
                    <span className="text-gray-400 text-xs">•</span>
                    {item}
                  </span>
                ))}
                {notOffered.length > 3 && (
                  <span className="inline-flex items-center gap-1 bg-white rounded-lg px-3 py-1 text-sm text-gray-500 shadow-sm">
                    +{notOffered.length - 3} more
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-4 italic text-sm">
                Keeping it straightforward and focusing on what I do best
              </p>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <motion.div
                className="text-3xl mb-2"
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎯
              </motion.div>
              <span className="text-sm font-medium">View All</span>
              <motion.svg 
                className="w-4 h-4 mt-1" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path d="M9 5l7 7-7 7" />
              </motion.svg>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Drawer Modals */}
      <ContentDrawer
        isOpen={isAddonsDrawerOpen}
        onClose={() => setIsAddonsDrawerOpen(false)}
        title="Add‑ons (by request)"
        items={addOns}
        type="addons"
      />

      <ContentDrawer
        isOpen={isNotOfferingDrawerOpen}
        onClose={() => setIsNotOfferingDrawerOpen(false)}
        title="Not currently offering"
        items={notOffered}
        type="notOffering"
      />
    </section>
  );
};

export default WhatIClean;