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

// Logo component with house and sparkles
const LogoWithSparkles = () => (
  <motion.div 
    className="relative mb-8 sparkle-container"
    variants={getVariants(heroVariants.logo)}
  >
    {/* Main house icon - simplified SVG representation */}
    <div className="relative w-32 h-32 mx-auto mb-4">
      {/* House outline */}
      <svg 
        viewBox="0 0 128 128" 
        className="w-full h-full text-primary fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* House roof */}
        <path d="M20 60 L64 20 L108 60 L98 60 L98 50 L30 50 L30 60 Z" 
              className="fill-primary" />
        
        {/* House body */}
        <rect x="30" y="50" width="68" height="58" 
              className="fill-primary-100 stroke-primary stroke-2" />
        
        {/* Door */}
        <rect x="55" y="78" width="18" height="30" 
              className="fill-primary stroke-primary-600 stroke-1" />
        
        {/* Window */}
        <rect x="40" y="65" width="12" height="10" 
              className="fill-white stroke-primary stroke-1" />
        <rect x="76" y="65" width="12" height="10" 
              className="fill-white stroke-primary stroke-1" />
        
        {/* Wave swoosh under house */}
        <motion.path 
          d="M15 105 Q40 95 65 105 T115 105" 
          className="stroke-primary-300 stroke-2 fill-none"
          variants={sparkleVariants.dancing}
          animate="dancing"
        />
      </svg>
      
      {/* Animated sparkles around the house */}
      <SparkleIcon delay={0} className="top-2 right-2" />
      <SparkleIcon delay={0.5} className="top-4 left-0" size="w-4 h-4" />
      <SparkleIcon delay={1} className="bottom-8 right-4" size="w-5 h-5" />
      <SparkleIcon delay={1.5} className="bottom-2 left-6" />
      <SparkleIcon delay={2} className="top-8 right-8" size="w-3 h-3" />
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
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={getVariants(heroVariants.container)}
        initial="hidden"
        animate="visible"
      >
        {/* Logo with sparkles */}
        <LogoWithSparkles />

        {/* Company name with split animation */}
        <div className="mb-6">
          {/* "Southern" - elegant serif */}
          <motion.h1
            className="font-display text-6xl md:text-8xl font-bold text-primary mb-2 leading-none"
            variants={getVariants(heroVariants.southern)}
          >
            Southern
          </motion.h1>
          
          {/* "Sparkle & Scrub" - modern sans-serif */}
          <motion.h1
            className="font-sans text-4xl md:text-6xl font-semibold text-accent mb-4 leading-tight"
            variants={getVariants(heroVariants.sparkleAndScrub)}
          >
            Sparkle & Scrub
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-gray-800 font-body mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={getVariants(heroVariants.tagline)}
        >
          Polished with Southern hospitality
        </motion.p>

        {/* Call-to-action button */}
        <motion.div
          variants={getVariants(heroVariants.cta)}
        >
          <motion.button
            className="btn-primary text-lg px-12 py-5 sparkle-container relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 50px -10px rgba(245, 183, 0, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Button text */}
            <span className="relative z-10">Get Your Free Quote</span>
            
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

        {/* Trust indicators */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-800 opacity-80"
          variants={getVariants(heroVariants.tagline)}
        >
          <div className="flex items-center gap-2">
            <span className="text-secondary text-lg">⭐⭐⭐⭐⭐</span>
            <span className="text-sm font-medium">Trusted by 500+ Tennessee families</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">🏠</span>
            <span className="text-sm font-medium">Licensed • Insured • Local</span>
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