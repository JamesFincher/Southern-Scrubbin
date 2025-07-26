import { motion } from 'motion/react';
import { serviceVariants, sparkleVariants, scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';

// Before/After transformation visual
const TransformationStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto mb-16 bg-white rounded-3xl p-8 shadow-soft"
      variants={getVariants(scrollVariants.scaleIn)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-semibold text-accent mb-4">
          The Southern Sparkle Experience
        </h3>
        <p className="text-gray-800 max-w-2xl mx-auto">
          Watch how we transform your home with care, attention to detail, and that special Southern touch.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Before */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl opacity-60">
            🏠
          </div>
          <h4 className="font-display text-lg font-medium text-gray-800 mb-2">Before</h4>
          <p className="text-sm text-gray-800 opacity-80">Your busy life deserves better</p>
        </motion.div>

        {/* Transformation arrow with sparkles */}
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="text-6xl text-primary mb-2">→</div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={sparkleVariants.dancing}
            animate="dancing"
          >
            <span className="text-secondary text-2xl">✨</span>
          </motion.div>
          <p className="text-sm font-medium text-primary">Southern Magic</p>
        </motion.div>

        {/* After */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-sparkle-gradient rounded-2xl flex items-center justify-center text-4xl relative sparkle-container">
            🏡
          </div>
          <h4 className="font-display text-lg font-medium text-primary mb-2">After</h4>
          <p className="text-sm text-accent">Sparkling clean & welcoming</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Services Component
const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: "🍳",
      title: "Kitchen Deep Clean",
      description: "From stovetops to cabinet corners, we make your kitchen the heart of your home again.",
      features: [
        "Appliance deep cleaning inside & out",
        "Countertop sanitizing & polishing", 
        "Cabinet & drawer detailing",
        "Floor mopping & baseboards"
      ]
    },
    {
      icon: "🛁",
      title: "Bathroom Refresh", 
      description: "Transform your bathroom into a sparkling sanctuary with our thorough cleaning approach.",
      features: [
        "Shower & tub scrubbing",
        "Toilet deep cleaning & sanitizing",
        "Mirror & fixture polishing",
        "Tile & grout restoration"
      ]
    },
    {
      icon: "🛋️",
      title: "Living Space Revival",
      description: "Breathe new life into your living areas with our detailed dusting and organization.",
      features: [
        "Furniture dusting & polishing",
        "Carpet vacuuming & spot treatment",
        "Window sill & blind cleaning",
        "Decorative item care"
      ]
    },
    {
      icon: "🛏️",
      title: "Bedroom Sanctuary",
      description: "Create a peaceful retreat with our gentle yet thorough bedroom cleaning service.",
      features: [
        "Bed making & linen refresh",
        "Closet organization assistance",
        "Surface dusting & sanitizing",
        "Floor care & baseboards"
      ]
    },
    {
      icon: "🏠",
      title: "Whole Home Harmony",
      description: "Complete home transformation that brings every room together in perfect cleanliness.",
      features: [
        "Every room thoroughly cleaned",
        "Customized cleaning checklist",
        "Eco-friendly products available",
        "Quality satisfaction guarantee"
      ]
    },
    {
      icon: "✨",
      title: "Special Occasions",
      description: "Preparing for guests? Our special event cleaning ensures your home shines.",
      features: [
        "Pre-party deep cleaning",
        "Post-event cleanup service",
        "Holiday preparation specials",
        "Move-in/move-out cleaning"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-100" id="services">
      <div className="max-w-7xl mx-auto px-4">
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
            Our <span className="text-primary">Sparkle</span> Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Every service is delivered with the care and attention your home deserves, 
            backed by genuine Southern hospitality.
          </motion.p>
        </motion.div>

        {/* Transformation story */}
        <TransformationStory />

        {/* Services grid */}
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
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
          className="text-center mt-16"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.button
            className="btn-secondary text-lg px-12 py-5 sparkle-container"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Schedule Your Cleaning</span>
          </motion.button>
          
          <p className="text-gray-800 mt-4 text-sm">
            🤝 No contracts • 💯 Satisfaction guaranteed • 🏠 Locally owned
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;