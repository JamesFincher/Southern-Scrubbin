import { motion } from 'motion/react';
import { useState } from 'react';
import { trustVariants, sparkleVariants, getVariants } from '../utils/animations';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center text-white text-3xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          ✓
        </motion.div>
        <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
          Thank you kindly!
        </h3>
        <p className="text-gray-800 mb-6">
          We've received your request and will get back to you within 24 hours. 
          In the meantime, feel free to call us at{' '}
          <span className="text-primary font-medium">(615) 555-CLEAN</span>
        </p>
        <motion.div
          className="text-secondary text-2xl"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
        >
          ✨ Looking forward to serving you! ✨
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Full Name *
          </label>
          <motion.input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="Your name"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>

        {/* Email input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Email Address *
          </label>
          <motion.input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="your.email@example.com"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Phone Number
          </label>
          <motion.input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="(615) 555-0123"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>

        {/* Service selection */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Service Needed
          </label>
          <motion.select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle bg-white"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          >
            <option value="">Select a service</option>
            <option value="kitchen">Kitchen Deep Clean</option>
            <option value="bathroom">Bathroom Refresh</option>
            <option value="living">Living Space Revival</option>
            <option value="bedroom">Bedroom Sanctuary</option>
            <option value="whole-home">Whole Home Harmony</option>
            <option value="special">Special Occasions</option>
          </motion.select>
        </motion.div>
      </div>

      {/* Message textarea */}
      <motion.div
        variants={getVariants(trustVariants.input)}
        initial="rest"
        whileFocus="focus"
      >
        <label className="block text-sm font-medium text-accent mb-2">
          Tell us about your cleaning needs
        </label>
        <motion.textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 resize-none focus-sparkle"
          placeholder="Describe your home, any specific needs, or questions you might have..."
          variants={getVariants(trustVariants.input)}
          whileFocus="focus"
        />
      </motion.div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg py-4 relative overflow-hidden"
        variants={getVariants(trustVariants.button)}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        {isSubmitting ? (
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Sending your request...
          </motion.div>
        ) : (
          <>
            <span className="relative z-10">Get Your Free Quote</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              whileHover={{
                opacity: [0, 0.3, 0],
                x: [-100, 100],
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
            />
          </>
        )}
      </motion.button>

      {/* Trust indicators */}
      <div className="text-center text-sm text-gray-800 mt-4">
        <p>🔒 Your information is secure and never shared</p>
        <p>📞 Prefer to call? <span className="text-primary font-medium">(615) 555-CLEAN</span></p>
      </div>
    </form>
  );
};

export default ContactForm;