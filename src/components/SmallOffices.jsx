import { motion } from 'motion/react';
import { useRef } from 'react';
import { serviceVariants, sparkleVariants, getVariants } from '../utils/animations';
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

const SmallOffices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    "Clear desks & common surfaces (please keep areas reasonably tidy)",
    "Restrooms & break area", 
    "Trash/recycling",
    "Floors (vac/sweep/mop)",
    "After‑hours available with key/fob"
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-southern-gradient relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decorative sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-32 left-16 text-secondary-200 text-xl"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '0.5s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-48 right-24 text-secondary-200 text-lg"
          variants={sparkleVariants.dancing}  
          animate="dancing"
          style={{ animationDelay: '1.8s' }}
        >
          💼
        </motion.div>
        <motion.div 
          className="absolute bottom-48 left-28 text-secondary-200 text-xl"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
          style={{ animationDelay: '2.3s' }}
        >
          ⭐
        </motion.div>
        <motion.div 
          className="absolute bottom-32 right-16 text-secondary-200 text-lg"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '1.2s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-60 left-1/2 transform -translate-x-1/2 text-secondary-200 text-sm"
          variants={sparkleVariants.dancing}
          animate="dancing"
          style={{ animationDelay: '3.0s' }}
        >
          🏢
        </motion.div>
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          className="card-sparkle relative group"
          variants={getVariants(serviceVariants.card)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
        >
          {/* Icon with animation */}
          <motion.div
            className="mb-8 relative sparkle-container"
            variants={getVariants(serviceVariants.icon)}
            whileHover="hover"
          >
            <div className="w-24 h-24 mx-auto bg-sparkle-gradient rounded-2xl flex items-center justify-center text-5xl relative overflow-hidden">
              🏢
              
              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-primary/10 to-secondary/20 opacity-0"
                whileHover={{
                  opacity: [0, 1, 0],
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              />
            </div>
            
            {/* Floating sparkles around icon */}
            <SparkleIcon delay={0} className="top-1 right-2" size="w-4 h-4" />
            <SparkleIcon delay={0.7} className="top-6 left-1" size="w-3 h-3" />
            <SparkleIcon delay={1.2} className="bottom-4 right-0" size="w-5 h-5" />
            <SparkleIcon delay={1.8} className="bottom-1 left-4" size="w-4 h-4" />
            
            {/* Additional office-themed sparkles */}
            <motion.div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-primary text-sm"
              variants={sparkleVariants.dancing}
              animate="dancing"
              style={{ animationDelay: '2.3s' }}
            >
              💼
            </motion.div>
          </motion.div>

          {/* Main title */}
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4 text-center group-hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Small Offices
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-primary font-medium text-center mb-12 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            (cozy workspaces)
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-700 text-center mb-12 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Great for private practices, storefronts, or small suites.
          </motion.p>

          {/* Services list */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ul className="space-y-4 mb-10">
              {services.map((service, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-4 text-gray-800 bg-white/50 rounded-xl p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: 0.6 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.span 
                    className="text-secondary text-xl font-bold flex-shrink-0 mt-0.5 relative"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    ✓
                    {/* Add a tiny sparkle on hover */}
                    <motion.span
                      className="absolute -top-1 -right-1 text-xs text-primary opacity-0"
                      whileHover={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                        transition: { duration: 0.4, ease: "easeInOut" }
                      }}
                    >
                      ✨
                    </motion.span>
                  </motion.span>
                  <span className="text-base leading-relaxed">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Business convenience message */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border-2 border-primary/20">
              <motion.span 
                className="text-primary text-lg"
                variants={sparkleVariants.dancing}
                animate="dancing"
                style={{ animationDelay: '0.3s' }}
              >
                💼
              </motion.span>
              <span className="text-primary font-semibold">Perfect for busy professionals</span>
              <motion.span 
                className="text-primary text-lg"
                variants={sparkleVariants.twinkling}
                animate="twinkling"
                style={{ animationDelay: '1.1s' }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>

          {/* Transformation indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 text-accent font-medium text-lg mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <motion.span
              variants={sparkleVariants.twinkling}
              animate="twinkling"
              style={{ animationDelay: '0.7s' }}
            >
              ✨
            </motion.span>
            <span>Professional space, sparkling clean</span>
            <motion.span
              variants={sparkleVariants.twinkling}
              animate="twinkling"
              style={{ animationDelay: '1.9s' }}
            >
              ✨
            </motion.span>
          </motion.div>

          {/* Hover decoration */}
          <motion.div
            className="absolute inset-0 border-2 border-secondary/20 rounded-3xl opacity-0"
            whileHover={{
              opacity: 1,
              scale: 1.01,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SmallOffices;