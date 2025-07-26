import { motion } from 'motion/react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';

// Social media link component
const SocialLink = ({ href, icon, label, delay = 0 }) => (
  <motion.a
    href={href}
    aria-label={label}
    className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 group"
    whileHover={{ 
      scale: 1.1, 
      y: -2,
      boxShadow: "0 8px 25px rgba(0, 175, 175, 0.3)"
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <span className="text-xl group-hover:scale-110 transition-transform duration-200">
      {icon}
    </span>
  </motion.a>
);

// Footer link component with hover animation
export const FooterLink = ({ href, children, delay = 0 }) => (
  <motion.a
    href={href}
    className="text-gray-100 hover:text-white transition-colors duration-200 relative group"
    whileHover={{ x: 5 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
    <motion.div
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"
    />
  </motion.a>
);

// Service area badge
const ServiceBadge = ({ area, delay = 0 }) => (
  <motion.div
    className="bg-primary-800 text-gray-100 px-3 py-1 rounded-full text-sm hover:bg-primary-700 transition-colors duration-200"
    whileHover={{ scale: 1.05, y: -2 }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
  >
    {area}
  </motion.div>
);

// Company info section
export const CompanyInfo = ({ isInView }) => (
  <motion.div
    className="lg:col-span-1"
    variants={getVariants(scrollVariants.slideInLeft)}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
  >
    {/* Logo */}
    <motion.div 
      className="mb-6"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-16 h-16 mb-4">
        <svg 
          viewBox="0 0 64 64" 
          className="w-full h-full text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 30 L32 10 L54 30 L49 30 L49 25 L15 25 L15 30 Z" 
                className="fill-white" />
          <rect x="15" y="25" width="34" height="29" 
                className="fill-primary-100 stroke-white stroke-1" />
          <rect x="27.5" y="39" width="9" height="15" 
                className="fill-white stroke-primary stroke-1" />
          <rect x="20" y="32.5" width="6" height="5" 
                className="fill-accent stroke-white stroke-1" />
          <rect x="38" y="32.5" width="6" height="5" 
                className="fill-accent stroke-white stroke-1" />
        </svg>
        
        {/* Floating sparkle */}
        <motion.div
          className="absolute -top-1 -right-1 text-secondary text-sm"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
        >
          ✨
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-serif font-bold text-white mb-2">
        Southern Sparkle & Scrub
      </h3>
    </motion.div>
    
    <p className="text-gray-100 mb-6 leading-relaxed">
      Bringing Southern hospitality and sparkling results to Tennessee homes since 2020. 
      Licensed, insured, and locally owned.
    </p>
    
    {/* Certifications/badges */}
    <div className="flex flex-wrap gap-2 mb-6">
      <motion.div
        className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        🏠 Licensed & Insured
      </motion.div>
      <motion.div
        className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        🌱 Eco-Friendly Options
      </motion.div>
    </div>

    {/* Social links */}
    <div className="flex gap-3">
      <SocialLink href="#" icon="📧" label="Email" delay={0.1} />
      <SocialLink href="#" icon="📱" label="Facebook" delay={0.2} />
      <SocialLink href="#" icon="📷" label="Instagram" delay={0.3} />
      <SocialLink href="#" icon="⭐" label="Google Reviews" delay={0.4} />
    </div>
  </motion.div>
);

// Services navigation section
export const ServicesNav = ({ isInView }) => (
  <motion.div
    variants={getVariants(scrollVariants.fadeInUp)}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    transition={{ delay: 0.2 }}
  >
    <h4 className="text-xl font-serif font-semibold text-white mb-6">
      Our Services
    </h4>
    <nav className="space-y-3">
      <FooterLink href="#services" delay={0.1}>Kitchen Deep Clean</FooterLink>
      <FooterLink href="#services" delay={0.2}>Bathroom Refresh</FooterLink>
      <FooterLink href="#services" delay={0.3}>Living Space Revival</FooterLink>
      <FooterLink href="#services" delay={0.4}>Bedroom Sanctuary</FooterLink>
      <FooterLink href="#services" delay={0.5}>Whole Home Harmony</FooterLink>
      <FooterLink href="#services" delay={0.6}>Special Occasions</FooterLink>
    </nav>
  </motion.div>
);

// Contact information section
export const ContactDetails = ({ isInView }) => (
  <motion.div
    variants={getVariants(scrollVariants.fadeInUp)}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    transition={{ delay: 0.4 }}
  >
    <h4 className="text-xl font-serif font-semibold text-white mb-6">
      Get In Touch
    </h4>
    <div className="space-y-4">
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-secondary text-lg">📞</span>
        <div>
          <div className="font-medium text-white">Call Us</div>
          <a 
            href="tel:6155552532" 
            className="text-gray-100 hover:text-white transition-colors duration-200"
          >
            (615) 555-CLEAN
          </a>
        </div>
      </motion.div>
      
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-secondary text-lg">📧</span>
        <div>
          <div className="font-medium text-white">Email Us</div>
          <a 
            href="mailto:hello@southernsparklescrub.com" 
            className="text-gray-100 hover:text-white transition-colors duration-200"
          >
            hello@southernsparklescrub.com
          </a>
        </div>
      </motion.div>
      
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-secondary text-lg">⏰</span>
        <div>
          <div className="font-medium text-white">Hours</div>
          <div className="text-gray-100">Mon-Sat: 8am-6pm</div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Service areas section
export const ServiceAreas = ({ isInView }) => (
  <motion.div
    variants={getVariants(scrollVariants.slideInRight)}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    transition={{ delay: 0.6 }}
  >
    <h4 className="text-xl font-serif font-semibold text-white mb-6">
      Service Areas
    </h4>
    <p className="text-gray-100 mb-4">
      Proudly serving Middle Tennessee families with reliable, professional cleaning services.
    </p>
    <div className="flex flex-wrap gap-2 mb-6">
      <ServiceBadge area="Nashville" delay={0.1} />
      <ServiceBadge area="Franklin" delay={0.2} />
      <ServiceBadge area="Murfreesboro" delay={0.3} />
      <ServiceBadge area="Brentwood" delay={0.4} />
      <ServiceBadge area="Smyrna" delay={0.5} />
      <ServiceBadge area="Antioch" delay={0.6} />
    </div>
    
    {/* Quick stats */}
    <motion.div
      className="bg-primary-800 rounded-xl p-4"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-secondary">500+</div>
          <div className="text-xs text-gray-100">Happy Families</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-secondary">4.9★</div>
          <div className="text-xs text-gray-100">Average Rating</div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);