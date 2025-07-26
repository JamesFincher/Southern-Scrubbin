import { motion } from 'motion/react';
import { serviceVariants, sparkleVariants, scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';
import ServicesTabs from './ServicesTabs';
import { BackgroundSparkles, RandomSparkle } from '../utils/randomSparkles.jsx';

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


// Main Services Component
const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: "🏠",
      title: "Homes",
      description: "Kitchens, baths, bedrooms, living areas, floors",
      features: [
        "Counters, cabinet fronts, sink & faucet, stovetop",
        "Microwave interior, exterior of appliances",
        "Toilets, tubs/showers, sinks, mirrors",
        "Dust/wipe reachable surfaces, make beds, floors"
      ]
    },
    {
      icon: "🏨",
      title: "Airbnb / Short‑Term Rental",
      description: "Guest‑ready and consistent. I can swap & make beds, lay out towels, wipe kitchen & bath, run/put away dishes, take out trash/recycling, do a simple restock if supplies are on‑site, and send quick after‑clean photos if you'd like.",
      features: [
        "Swap & make beds with fresh linens",
        "Kitchen & bath cleaning",
        "Dishes (run/put away)",
        "Simple restock with on‑site supplies"
      ]
    },
    {
      icon: "🏢",
      title: "Small Offices (cozy workspaces)",
      description: "Great for private practices, storefronts, or small suites. Clear desks & common surfaces (please keep areas reasonably tidy), restrooms, break area, trash/recycling, floors (vac/sweep/mop). After‑hours with key/fob available.",
      features: [
        "Desks & common surfaces",
        "Restrooms & break areas",
        "Trash/recycling removal",
        "Floor care (vacuum/sweep/mop)"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden bg-sparkles" id="services">
      {/* Enhanced background sparkles with random effects */}
      <BackgroundSparkles count={8} className="opacity-40" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '12%', y: '25%' }} 
          className="text-secondary-200 text-xl"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '85%', y: '40%' }} 
          className="text-primary-200 text-lg"
          emoji="⭐"
        />
        <RandomSparkle 
          type="randomDancing" 
          position={{ x: '15%', y: '75%' }} 
          className="text-secondary-300 text-xl"
          emoji="💫"
        />
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '90%', y: '80%' }} 
          className="text-primary-200 text-lg"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '50%', y: '30%' }} 
          className="text-secondary-200 text-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-display font-bold text-accent mb-6"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Our <span className="text-primary">Services</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Professional cleaning services for homes, vacation rentals, and small offices.
          </motion.p>
        </motion.div>

        {/* Service overview with tabs */}
        <ServicesTabs />

        {/* Services grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={getVariants(serviceVariants.container)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.button
            className="btn-secondary text-lg px-12 py-5 sparkle-container mb-8"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Your Quote</span>
          </motion.button>
          
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a 
              href="#details" 
              className="text-primary hover:text-secondary transition-colors duration-300 font-medium"
            >
              See what's included ↓
            </a>
          </motion.div>
          
          <p className="text-gray-800 mt-4 text-sm">
            💯 Satisfaction guaranteed • 🏠 Locally owned • ⚡ Fast response
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;