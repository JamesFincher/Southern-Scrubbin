import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';

// Example implementation using the new CSS classes
const TabbedServices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const services = [
    {
      id: 'homes',
      icon: '🏠',
      title: 'Homes',
      subtitle: 'Complete residential cleaning services',
      description: 'I provide thorough, reliable home cleaning that covers all the essential areas. Every visit includes kitchens, bathrooms, bedrooms, living areas, and floors—all cleaned with attention to detail and Southern hospitality.',
      features: [
        'Counters, cabinet fronts, sink & faucet, stovetop',
        'Microwave interior, exterior of appliances',
        'Toilets, tubs/showers, sinks, mirrors',
        'Dust/wipe reachable surfaces, make beds, floors',
        'Trash removal and light tidying'
      ]
    },
    {
      id: 'airbnb',
      icon: '🏨',
      title: 'Airbnb / STR',
      subtitle: 'Guest-ready turnovers for short-term rentals',
      description: 'Specialized cleaning for vacation rentals and short-term properties. I ensure your guests arrive to a spotless, welcoming space every time with consistent, reliable service.',
      features: [
        'Swap & make beds with fresh linens',
        'Complete kitchen & bathroom cleaning',
        'Run/put away dishes and kitchen cleanup',
        'Simple restock with on-site supplies',
        'Quick photo confirmation if requested'
      ]
    },
    {
      id: 'offices',
      icon: '🏢',
      title: 'Small Offices',
      subtitle: 'Professional workspace cleaning',
      description: 'Perfect for private practices, storefronts, or small office suites. I work around your schedule with after-hours cleaning using key/fob access to keep your workspace professional and welcoming.',
      features: [
        'Clear desks & common surfaces',
        'Restrooms & break area maintenance',
        'Trash/recycling removal',
        'Floor care (vacuum/sweep/mop)',
        'After-hours service available'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden" id="services">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
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
            Professional cleaning services tailored to your needs
          </motion.p>
        </motion.div>

        {/* Tabbed Services Container */}
        <motion.div
          className="services-tabs max-w-5xl mx-auto"
          variants={getVariants(scrollVariants.scaleIn)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Tab Navigation */}
          <div className="tab-nav" role="tablist">
            {services.map((service, index) => (
              <button
                key={service.id}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`panel-${service.id}`}
                id={`tab-${service.id}`}
              >
                <div className="tab-button-content">
                  <span className="tab-button-icon">{service.icon}</span>
                  <span className="tab-button-text">{service.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="service-tab-panel"
                role="tabpanel"
                id={`panel-${services[activeTab].id}`}
                aria-labelledby={`tab-${services[activeTab].id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Service Header */}
                <div className="service-tab-header">
                  <div className="service-icon-container">
                    <span className="service-icon">{services[activeTab].icon}</span>
                    
                    {/* Sparkle effects */}
                    <motion.div
                      className="absolute -top-2 -right-2 text-secondary text-sm"
                      variants={sparkleVariants.twinkling}
                      animate="twinkling"
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -left-1 text-primary text-xs"
                      variants={sparkleVariants.floating}
                      animate="floating"
                      style={{ animationDelay: '0.5s' }}
                    >
                      ⭐
                    </motion.div>
                  </div>
                  
                  <h3 className="service-tab-title">{services[activeTab].title}</h3>
                  <p className="service-tab-subtitle">{services[activeTab].subtitle}</p>
                </div>

                {/* Service Content Grid */}
                <div className="service-features-grid has-description">
                  {/* Description */}
                  <div className="service-description">
                    <h4 className="service-description-title">What's Included</h4>
                    <p className="service-description-text">
                      {services[activeTab].description}
                    </p>
                    
                    {/* Call to action */}
                    <div className="service-cta-text">
                      <span>✨</span>
                      <span>Professional & reliable service</span>
                      <span>✨</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="service-features-list">
                    <h4 className="service-features-title">Service Details</h4>
                    {services[activeTab].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="service-feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (index * 0.1), duration: 0.4 }}
                      >
                        <span className="service-feature-icon">✓</span>
                        <span className="service-feature-text">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="service-cta">
                  <div className="service-cta-text">
                    <span>💯</span>
                    <span>Satisfaction guaranteed • Locally owned • Fast response</span>
                    <span>💯</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Get Quote Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="btn-secondary text-lg px-12 py-5 sparkle-container"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Your Quote</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TabbedServices;