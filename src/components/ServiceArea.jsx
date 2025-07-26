import { motion } from 'motion/react';
import { scrollVariants, getVariants } from '../utils/animations';
import { BackgroundSparkles, RandomSparkle } from '../utils/randomSparkles';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import MapModal from './MapModal';

// Main ServiceArea Component
const ServiceArea = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  return (
    <section className="py-20 bg-southern-gradient relative overflow-hidden" id="area">
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
          className="text-center"
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
            Based in Ten Mile; I serve Knoxville and nearby areas. Add your ZIP in the estimate request.
          </motion.p>

          {/* See map button */}
          <motion.button
            onClick={openMapModal}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-soft hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sparkle-container relative"
            variants={getVariants(scrollVariants.fadeInUp)}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px -5px rgba(0, 175, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            aria-label="View service area map"
          >
            <span className="text-2xl" aria-hidden="true">🗺️</span>
            <span className="font-medium text-lg">See map</span>
            
            {/* Button sparkles */}
            <RandomSparkle 
              type="randomTwinkling" 
              position={{ x: '95%', y: '10%' }} 
              className="text-secondary text-sm"
              emoji="✨"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Map Modal */}
      <MapModal 
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
      />
    </section>
  );
};

export default ServiceArea;