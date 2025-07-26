import { motion } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';

// Contact info card component
const ContactInfoCard = ({ icon, title, content, action, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-gentle transition-all duration-300 text-center group"
      variants={getVariants(scrollVariants.fadeInUp)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <motion.div
        className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="font-serif text-lg font-semibold text-accent mb-2">
        {title}
      </h3>
      <p className="text-gray-800 mb-4">
        {content}
      </p>
      {action && (
        <motion.button
          className="text-primary font-medium hover:text-primary-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action}
        </motion.button>
      )}
    </motion.div>
  );
};

// Testimonial component
const TestimonialCard = ({ testimonial, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-soft"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center mb-4">
        <div className="flex text-secondary text-lg">
          ⭐⭐⭐⭐⭐
        </div>
      </div>
      <p className="text-gray-800 italic mb-4 leading-relaxed">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-sparkle-gradient rounded-full flex items-center justify-center text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-accent">{testimonial.name}</div>
          <div className="text-sm text-gray-800">{testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Main ContactInfo component
const ContactInfo = ({ isInView }) => {
  const testimonials = [
    {
      text: "Southern Sparkle & Scrub transformed our home! They treated our place like family and the attention to detail was incredible. Highly recommend!",
      name: "Sarah Johnson",
      location: "Nashville, TN"
    },
    {
      text: "Professional, courteous, and thorough. They arrived on time, were incredibly polite, and left our home sparkling. True Southern hospitality!",
      name: "Mike Williams", 
      location: "Franklin, TN"
    },
    {
      text: "I've used several cleaning services, but none compare to the care and quality of Southern Sparkle & Scrub. They're now our go-to team!",
      name: "Emma Davis",
      location: "Murfreesboro, TN"
    }
  ];

  return (
    <>
      {/* Contact info cards */}
      <motion.div
        className="space-y-6"
        variants={getVariants(scrollVariants.slideInRight)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <ContactInfoCard
          icon="📞"
          title="Call Us Today"
          content="Speak directly with our friendly team"
          action="(615) 555-CLEAN"
          delay={0.2}
        />
        
        <ContactInfoCard
          icon="📧"
          title="Email Us"
          content="Get a response within 24 hours"
          action="hello@southernsparklescrub.com"
          delay={0.4}
        />
        
        <ContactInfoCard
          icon="📍"
          title="Service Area"
          content="Proudly serving Middle Tennessee families"
          action="Nashville • Franklin • Murfreesboro"
          delay={0.6}
        />
        
        <ContactInfoCard
          icon="⏰"
          title="Availability"
          content="Flexible scheduling to fit your life"
          action="Monday - Saturday, 8am - 6pm"
          delay={0.8}
        />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        className="mb-16"
        variants={getVariants(scrollVariants.fadeInUp)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h3 className="text-3xl font-serif font-semibold text-accent text-center mb-8">
          What Our Neighbors Are Saying
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              delay={index * 0.2}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ContactInfo;