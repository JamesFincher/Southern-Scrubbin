import { motion } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';

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

const SuppliesPreferences = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 bg-white overflow-hidden" id="supplies">
      {/* Background decorative sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-12 left-10 text-secondary-200 text-xl"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '0.5s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-32 right-16 text-secondary-200 text-lg"
          variants={sparkleVariants.dancing}  
          animate="dancing"
          style={{ animationDelay: '1.2s' }}
        >
          🧽
        </motion.div>
        <motion.div 
          className="absolute bottom-28 left-20 text-secondary-200 text-base"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
          style={{ animationDelay: '2.1s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute bottom-12 right-12 text-secondary-200 text-lg"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '2.8s' }}
        >
          🧴
        </motion.div>
        <motion.div 
          className="absolute top-20 right-32 text-secondary-200 text-sm"
          variants={sparkleVariants.dancing}
          animate="dancing"
          style={{ animationDelay: '3.5s' }}
        >
          ⭐
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center relative"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-6 relative">
            Supplies & preferences
            {/* Interactive sparkles around the heading */}
            <SparkleIcon delay={0.3} className="top-0 -right-8" size="w-5 h-5" />
            <SparkleIcon delay={1.8} className="top-2 -left-6" size="w-4 h-4" />
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed relative">
            I bring standard, safe household cleaners and tools. If you have products you prefer—stone‑safe sprays, fragrance‑free, etc.—leave them out with a note and I'll use those.
            {/* Subtle sparkle near the text */}
            <SparkleIcon delay={2.5} className="top-0 -right-4" size="w-3 h-3" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SuppliesPreferences;