import { motion } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

// Main Contact Component
const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-southern-gradient" id="contact">
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
            className="text-5xl md:text-6xl font-serif font-bold text-accent mb-6"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Let's Get <span className="text-primary">Started</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Ready to experience the Southern Sparkle difference? 
            Get your free quote today and see why Tennessee families trust us with their homes.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact form */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-soft"
            variants={getVariants(scrollVariants.slideInLeft)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-serif font-semibold text-accent mb-6">
              Request Your Free Quote
            </h3>
            <ContactForm />
          </motion.div>

          {/* Contact info */}
          <ContactInfo isInView={isInView} />
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-block bg-white rounded-2xl p-8 shadow-soft"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
              Ready for a sparkling home?
            </h3>
            <p className="text-gray-800 mb-6">
              Join hundreds of satisfied Tennessee families who trust us with their homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📞 Call Now
              </motion.button>
              <motion.button
                className="btn-secondary px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 Get Quote
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;