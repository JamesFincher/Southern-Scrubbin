import { motion } from 'motion/react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';
import { BackgroundSparkles, RandomSparkle } from '../utils/randomSparkles';
import { useInView } from 'motion/react';
import { useRef } from 'react';

// Geographic indicator component
const GeographicPin = () => (
  <motion.div
    className="relative w-16 h-16 mx-auto mb-6"
    variants={getVariants(scrollVariants.scaleIn)}
  >
    {/* Map pin icon */}
    <div className="w-full h-full bg-sparkle-gradient rounded-full flex items-center justify-center text-3xl relative">
      📍
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary opacity-20"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [0.3, 0.1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
    
    {/* Enhanced sparkle accents */}
    <motion.div
      className="absolute -top-2 -right-2 text-secondary text-xl"
      variants={sparkleVariants.twinkling}
      animate="twinkling"
    >
      ✨
    </motion.div>
    
    {/* Additional sparkles around the pin */}
    <RandomSparkle 
      type="randomFloating" 
      position={{ x: '-10px', y: '10px' }} 
      className="text-primary text-sm"
      emoji="⭐"
    />
    <RandomSparkle 
      type="randomDancing" 
      position={{ x: '60px', y: '20px' }} 
      className="text-secondary text-lg"
      emoji="💫"
    />
    <RandomSparkle 
      type="randomTwinkling" 
      position={{ x: '10px', y: '-15px' }} 
      className="text-primary text-xs"
    />
  </motion.div>
);

// Coverage area visual
const CoverageArea = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="max-w-2xl mx-auto mb-12 bg-white rounded-3xl p-8 shadow-soft"
      variants={getVariants(scrollVariants.scaleIn)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="text-center">
        <GeographicPin />
        
        <h3 className="text-2xl font-display font-semibold text-accent mb-4">
          Ten Mile & Knoxville Area
        </h3>
        
        <div className="relative max-w-md mx-auto">
          {/* Coverage circle visualization */}
          <motion.div
            className="relative w-48 h-48 mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Outer coverage ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary-200 opacity-30"></div>
            
            {/* Inner coverage ring */}
            <div className="absolute inset-4 rounded-full border-2 border-primary-300 opacity-50"></div>
            
            {/* Center point - Knoxville */}
            <div className="absolute inset-1/2 w-4 h-4 -ml-2 -mt-2 bg-primary rounded-full flex items-center justify-center">
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            
            {/* Distance labels */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-primary font-medium">
              Ten Mile
            </div>
            
            {/* Sparkles around the coverage area */}
            <RandomSparkle 
              type="randomTwinkling" 
              position={{ x: '15%', y: '15%' }} 
              className="text-secondary text-xs"
            />
            <RandomSparkle 
              type="randomFloating" 
              position={{ x: '85%', y: '25%' }} 
              className="text-primary text-sm"
              emoji="⭐"
            />
            <RandomSparkle 
              type="randomDancing" 
              position={{ x: '20%', y: '80%' }} 
              className="text-secondary text-xs"
              emoji="💫"
            />
            <RandomSparkle 
              type="randomTwinkling" 
              position={{ x: '75%', y: '75%' }} 
              className="text-primary text-xs"
            />
          </motion.div>
          
          <motion.p
            className="text-gray-800 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Our reliable service area ensures we can maintain consistent timing 
            and quality for every appointment.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

// Main ServiceArea Component
const ServiceArea = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-southern-gradient relative overflow-hidden" id="service-area">
      {/* Enhanced background sparkles with random effects */}
      <BackgroundSparkles count={6} className="opacity-30" />
      
      {/* Additional random sparkles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '15%', y: '20%' }} 
          className="text-secondary/40 text-xl"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '85%', y: '35%' }} 
          className="text-primary/40 text-lg"
          emoji="⭐"
        />
        <RandomSparkle 
          type="randomDancing" 
          position={{ x: '20%', y: '70%' }} 
          className="text-secondary/50 text-xl"
          emoji="💫"
        />
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '90%', y: '75%' }} 
          className="text-primary/40 text-lg"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '10%', y: '50%' }} 
          className="text-secondary/30 text-sm"
        />
        <RandomSparkle 
          type="randomDancing" 
          position={{ x: '75%', y: '15%' }} 
          className="text-primary/50 text-lg"
          emoji="✨"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
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
            Service <span className="text-primary">Area</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed mb-8"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Serving Ten Mile, Knoxville, and surrounding areas.
            Add your ZIP in the estimate request and I'll get you scheduled.
          </motion.p>
        </motion.div>

        {/* Coverage visualization */}
        <CoverageArea />

        {/* Flexibility message */}
        <motion.div
          className="text-center"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-soft border-l-4 border-secondary"
            variants={getVariants(scrollVariants.slideInLeft)}
          >
            <div className="flex items-start gap-4">
              <div className="text-secondary text-2xl mt-1">💡</div>
              <div className="text-left">
                <h4 className="font-display text-lg font-medium text-accent mb-2">
                  Outside Our Usual Range?
                </h4>
                <p className="text-gray-800 text-sm leading-relaxed">
                  If you're just outside that range, feel free to ask; I can 
                  sometimes travel a bit for larger jobs.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-800 opacity-80"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            <div className="flex items-center gap-2 relative">
              <span className="text-primary text-lg">🚗</span>
              <span className="text-sm font-medium">Reliable local service</span>
              <RandomSparkle 
                type="randomTwinkling" 
                position={{ x: '0px', y: '-25px' }} 
                className="text-primary text-xs"
              />
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 relative">
              <span className="text-secondary text-lg">⏰</span>
              <span className="text-sm font-medium">On-time guarantee</span>
              <RandomSparkle 
                type="randomFloating" 
                position={{ x: '2px', y: '-20px' }} 
                className="text-secondary text-xs"
                emoji="⭐"
              />
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 relative">
              <span className="text-accent text-lg">🏠</span>
              <span className="text-sm font-medium">Ten Mile-based</span>
              <RandomSparkle 
                type="randomDancing" 
                position={{ x: '1px', y: '-22px' }} 
                className="text-accent text-xs"
                emoji="💫"
              />
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            className="mt-10"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            <motion.button
              className="btn-primary text-lg px-10 py-4 sparkle-container relative"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="relative z-10">Check My Availability</span>
              <RandomSparkle 
                type="randomTwinkling" 
                position={{ x: '95%', y: '10%' }} 
                className="text-white text-sm"
                emoji="✨"
              />
            </motion.button>
            
            <p className="text-gray-800 mt-4 text-sm">
              📞 Quick response • 🗺️ Local knowledge • 🤝 Personal service
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;