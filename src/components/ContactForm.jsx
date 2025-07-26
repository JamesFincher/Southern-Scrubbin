import { motion } from 'motion/react';
import { useState } from 'react';
import { trustVariants, sparkleVariants, getVariants } from '../utils/animations';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    serviceType: '',
    rooms: '',
    addOns: '',
    preferredDays: '',
    parkingNotes: '',
    // Honeypot field
    website: ''
  });
  const [textOk, setTextOk] = useState(false);
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
    
    // Honeypot spam protection
    if (formData.website) {
      return; // Silently reject spam
    }
    
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
          I've received your request and will get back to you soon. 
          In the meantime, feel free to reach out directly at{' '}
          <span className="text-primary font-medium">(TBD)</span>
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
      {/* Honeypot field - hidden from users */}
      <div className="hidden">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Name *
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

        {/* Mobile input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Mobile *
          </label>
          <motion.input
            type="tel"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="(865) 555-0123"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="textOk"
              checked={textOk}
              onChange={(e) => setTextOk(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="textOk" className="text-sm text-gray-600">
              Text OK?
            </label>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Email *
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

        {/* Address input */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Address/City *
          </label>
          <motion.input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="City or ZIP code"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Service type */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Service Type *
          </label>
          <motion.select
            name="serviceType"
            required
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle bg-white"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          >
            <option value="">Select service type</option>
            <option value="home">Home</option>
            <option value="str">STR/Office</option>
            <option value="office">Office</option>
          </motion.select>
        </motion.div>

        {/* Beds/Baths or rooms */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Beds/Baths (or rooms) *
          </label>
          <motion.input
            type="text"
            name="rooms"
            required
            value={formData.rooms}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="e.g., 3 bed / 2 bath"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>
      </div>

      {/* Add-ons */}
      <motion.div
        variants={getVariants(trustVariants.input)}
        initial="rest"
        whileFocus="focus"
      >
        <label className="block text-sm font-medium text-accent mb-2">
          Add‑ons
        </label>
        <motion.textarea
          name="addOns"
          rows="2"
          value={formData.addOns}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 resize-none focus-sparkle"
          placeholder="Any specific requests (inside oven, baseboards, etc.)"
          variants={getVariants(trustVariants.input)}
          whileFocus="focus"
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Preferred days/times */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Preferred days/times
          </label>
          <motion.input
            type="text"
            name="preferredDays"
            value={formData.preferredDays}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="e.g., Weekday mornings"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>

        {/* Parking/entry notes */}
        <motion.div
          variants={getVariants(trustVariants.input)}
          initial="rest"
          whileFocus="focus"
        >
          <label className="block text-sm font-medium text-accent mb-2">
            Parking/entry notes
          </label>
          <motion.input
            type="text"
            name="parkingNotes"
            value={formData.parkingNotes}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 focus-sparkle"
            placeholder="Special instructions"
            variants={getVariants(trustVariants.input)}
            whileFocus="focus"
          />
        </motion.div>
      </div>

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
            <span className="relative z-10">Request Estimate</span>
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
        <p>🔒 No spam—I only use this info to reply about cleaning.</p>
        <p>📞 Phone: (TBD) • Email: (TBD)</p>
      </div>
    </form>
  );
};

export default ContactForm;