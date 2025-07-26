import { motion } from 'motion/react';
import { useRef } from 'react';
import { serviceVariants, sparkleVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';

// Individual Service Card Component
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="card-sparkle relative group"
      variants={getVariants(serviceVariants.card)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      custom={index}
    >
      {/* Service icon with animation */}
      <motion.div
        className="mb-6 relative"
        variants={getVariants(serviceVariants.icon)}
        whileHover="hover"
      >
        <div className="w-20 h-20 mx-auto bg-sparkle-gradient rounded-2xl flex items-center justify-center text-4xl relative overflow-hidden">
          {service.icon}
          
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
        <motion.div
          className="absolute -top-2 -right-2 text-secondary text-sm"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          ✨
        </motion.div>
      </motion.div>

      {/* Service title */}
      <h3 className="text-2xl font-serif font-semibold text-accent mb-4 group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>

      {/* Service description */}
      <p className="text-gray-800 mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Features list */}
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, idx) => (
          <motion.li
            key={idx}
            className="flex items-center gap-3 text-sm text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
          >
            <span className="text-secondary text-lg">✓</span>
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* Transformation indicator */}
      <motion.div
        className="flex items-center justify-center gap-2 text-primary font-medium text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span>✨</span>
        <span>Transform your space</span>
        <span>✨</span>
      </motion.div>

      {/* Hover decoration */}
      <motion.div
        className="absolute inset-0 border-2 border-secondary/20 rounded-3xl opacity-0"
        whileHover={{
          opacity: 1,
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      />
    </motion.div>
  );
};

export default ServiceCard;