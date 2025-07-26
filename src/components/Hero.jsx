import { motion } from 'motion/react';
import { heroVariants, sparkleVariants, getVariants } from '../utils/animations';

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

// Cleaning supplies icon with sparkles
const CleaningIcon = () => (
  <motion.div 
    className="relative mb-8 sparkle-container"
    variants={getVariants(heroVariants.logo)}
  >
    {/* Main cleaning supplies icon */}
    <div className="relative w-28 h-28 mx-auto mb-4">
      <svg 
        viewBox="0 0 120 120" 
        className="w-full h-full text-primary fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Spray bottle */}
        <rect x="45" y="40" width="16" height="35" 
              className="fill-primary-200 stroke-primary stroke-2" rx="2" />
        
        {/* Spray bottle trigger */}
        <path d="M61 50 L70 55 L68 60 L59 55 Z" 
              className="fill-primary" />
        
        {/* Spray bottle top */}
        <rect x="48" y="35" width="10" height="8" 
              className="fill-primary" rx="1" />
        
        {/* Cleaning cloth/sponge */}
        <ellipse cx="80" cy="60" rx="12" ry="8" 
                 className="fill-secondary-200 stroke-secondary stroke-2" />
        
        {/* Brush */}
        <rect x="25" y="65" width="20" height="6" 
              className="fill-primary-300 stroke-primary stroke-1" rx="3" />
        <rect x="28" y="71" width="14" height="12" 
              className="fill-primary-100 stroke-primary stroke-1" rx="1" />
        
        {/* Cleaning spray effect */}
        <motion.g
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="75" cy="45" r="2" className="fill-primary-300" opacity="0.6" />
          <circle cx="78" cy="42" r="1.5" className="fill-primary-300" opacity="0.5" />
          <circle cx="80" cy="47" r="1" className="fill-primary-300" opacity="0.4" />
        </motion.g>
      </svg>
      
      {/* Animated sparkles around cleaning supplies */}
      <SparkleIcon delay={0} className="top-1 right-2" size="w-4 h-4" />
      <SparkleIcon delay={0.7} className="top-6 left-1" size="w-3 h-3" />
      <SparkleIcon delay={1.2} className="bottom-4 right-0" size="w-5 h-5" />
      <SparkleIcon delay={1.8} className="bottom-1 left-4" size="w-4 h-4" />
    </div>
  </motion.div>
);

// Main Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-southern-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating background sparkles */}
        <motion.div 
          className="absolute top-20 left-10 text-secondary-200 text-2xl"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '0.5s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-secondary-200 text-xl"
          variants={sparkleVariants.floating}  
          animate="floating"
          style={{ animationDelay: '1.5s' }}
        >
          ⭐
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-20 text-secondary-200 text-lg"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '2.5s' }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-10 text-secondary-200 text-xl"
          variants={sparkleVariants.floating}
          animate="floating"
          style={{ animationDelay: '3s' }}
        >
          💫
        </motion.div>
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={getVariants(heroVariants.container)}
        initial="hidden"
        animate="visible"
      >
        {/* Cleaning icon with sparkles */}
        <CleaningIcon />

        {/* Company name - clean, professional look */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 leading-none"
          variants={getVariants(heroVariants.southern)}
        >
          Sparkle Scrub
        </motion.h1>

        {/* Subheading - owner-operated emphasis */}
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-body mb-8 leading-tight"
          variants={getVariants(heroVariants.sparkleAndScrub)}
        >
          Owner‑operated cleaning for Knoxville and nearby communities (generally within ~10 miles).
        </motion.h2>

        {/* Value proposition - personal touch */}
        <motion.p
          className="text-lg md:text-xl text-gray-700 font-body mb-10 max-w-3xl mx-auto leading-relaxed"
          variants={getVariants(heroVariants.tagline)}
        >
          One set of hands, done right—without the fuss.
        </motion.p>

        {/* Call-to-action button - prominent and trustworthy */}
        <motion.div
          variants={getVariants(heroVariants.cta)}
        >
          <motion.button
            className="btn-primary text-lg md:text-xl px-10 py-4 md:px-14 md:py-6 sparkle-container relative overflow-hidden font-semibold"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px -10px rgba(245, 183, 0, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Button text */}
            <span className="relative z-10">Request a quick estimate</span>
            
            {/* Button sparkle effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              whileHover={{
                opacity: [0, 0.3, 0],
                x: [-100, 100],
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
            />
          </motion.button>
        </motion.div>

        {/* Trust indicators - updated per spec */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-gray-700 opacity-90"
          variants={getVariants(heroVariants.tagline)}
        >
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">✓</span>
            <span className="text-sm md:text-base font-medium">Reliable</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">📅</span>
            <span className="text-sm md:text-base font-medium">Flexible scheduling</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">🐕</span>
            <span className="text-sm md:text-base font-medium">Pet‑friendly</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">💬</span>
            <span className="text-sm md:text-base font-medium">Straightforward communication</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={getVariants(heroVariants.cta)}
        animate={{
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;