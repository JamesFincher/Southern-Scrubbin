import { motion } from 'motion/react';
import { sparkleVariants, scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { CompanyInfo, ServicesNav, ContactDetails, ServiceAreas, FooterLink } from './FooterLinks';

// Main Footer Component
const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-gray-100">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <CompanyInfo isInView={isInView} />
          <ServicesNav isInView={isInView} />
          <ContactDetails isInView={isInView} />
          <ServiceAreas isInView={isInView} />
        </motion.div>
      </div>

      {/* Bottom footer */}
      <motion.div
        className="border-t border-primary-700 py-6"
        variants={getVariants(scrollVariants.fadeInUp)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              className="text-gray-100 text-sm text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              © {currentYear} Southern Sparkle & Scrub. All rights reserved. 
              <br className="md:hidden" />
              <span className="ml-2">Made with 💙 in Tennessee</span>
            </motion.div>

            {/* Legal links */}
            <motion.div
              className="flex gap-6 text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#accessibility">Accessibility</FooterLink>
            </motion.div>
          </div>

          {/* Final sparkle touch */}
          <motion.div
            className="text-center mt-4 text-secondary"
            variants={sparkleVariants.twinkling}
            animate="twinkling"
            style={{ animationDelay: '2s' }}
          >
            ✨ Thank you for choosing Southern Sparkle & Scrub! ✨
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;