import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { sparkleVariants } from '../utils/animations';

// Trust message items with icons
const trustItems = [
  { text: "Reliable", icon: "🛡️" },
  { text: "Flexible scheduling", icon: "📅" },
  { text: "Friendly to families & pets", icon: "🏠" },
  { text: "Straightforward communication", icon: "💬" }
];

// Trust item component with staggered animation
const TrustItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10%" 
  });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-soft border border-gray-100 text-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] // --ease-southern
      }}
      whileHover={{
        scale: 1.02,
        backgroundColor: "#f0fdfd", // primary-50
        borderColor: "#00AFAF", // primary
        boxShadow: "0 4px 25px -2px rgba(0, 175, 175, 0.1)",
        transition: {
          duration: 0.2,
          ease: [0.25, 0.1, 0.25, 1] // --ease-gentle
        }
      }}
    >
      {/* Icon with subtle animation */}
      <motion.span 
        className="text-primary text-lg"
        whileHover={{
          scale: 1.2,
          rotate: [0, -5, 5, 0],
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
      >
        {item.icon}
      </motion.span>
      
      {/* Trust message text */}
      <span className="font-medium text-sm whitespace-nowrap">
        {item.text}
      </span>
    </motion.div>
  );
};

// Animated separator dot
const SeparatorDot = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10%" 
  });

  return (
    <motion.div
      ref={ref}
      className="w-1.5 h-1.5 bg-gray-300 rounded-full hidden sm:block"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1 + 0.2,
        ease: [0.165, 0.84, 0.44, 1] // --ease-welcome
      }}
      whileHover={{
        scale: 1.5,
        backgroundColor: "#00AFAF", // primary color
        transition: {
          duration: 0.2
        }
      }}
    />
  );
};

// Main TrustBar component
const TrustBar = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: "-20%" 
  });

  return (
    <section className="relative py-8 bg-white border-b border-gray-100 overflow-hidden">
      {/* Background gradient for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-accent-50/30" />
      
      {/* Subtle background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-4 left-1/4 text-secondary-200 text-sm"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
          style={{ animationDelay: '1.5s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-6 right-1/4 text-secondary-200 text-sm"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '2.8s' }}
        >
          ⭐
        </motion.div>
      </div>
      
      {/* Container with trust messaging */}
      <motion.div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] // --ease-southern
        }}
      >
        {/* Trust items container with responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {trustItems.map((item, index) => (
            <TrustItem key={item.text} item={item} index={index} />
          ))}
        </div>

        {/* Subtle sparkle accent for mobile */}
        <motion.div
          className="sm:hidden flex justify-center mt-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.165, 0.84, 0.44, 1] // --ease-welcome
          }}
        >
          <motion.span 
            className="text-secondary text-lg"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Decorative wave bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
    </section>
  );
};

export default TrustBar;