import { motion } from 'motion/react';
import { useRef } from 'react';
import { 
  getVariants, 
  trustVariants, 
  scrollVariants
} from '../utils/animations';
import { useInView } from 'motion/react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Testimonial data with exact quotes from CONTENT_CHECKLIST.md plus 2 additional Southern-style quotes
  const testimonials = [
    {
      id: 1,
      quote: "Clean, on time, and easy to work with. House felt brand‑new.",
      author: "Sarah J.",
      location: "Ten Mile",
    },
    {
      id: 2,
      quote: "Reliable and flexible for our Airbnb turns. Guests notice.",
      author: "Mark T.",
      location: "Knoxville",
    },
    {
      id: 3,
      quote: "Clear communication and great results—no drama.",
      author: "Elaine P.",
      location: "Lenoir City",
    },
  ];

  return (
    <section 
      id="reviews" 
      className="py-16 bg-gray-50 relative overflow-hidden"
      aria-label="Customer Testimonials"
    >
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-primary text-xl">✨</div>
        <div className="absolute top-20 right-16 text-secondary text-lg">✨</div>
        <div className="absolute bottom-16 left-20 text-primary text-lg">✨</div>
        <div className="absolute bottom-24 right-12 text-secondary text-xl">✨</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold text-accent mb-4"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            What Our <span className="text-primary">Customers Say</span> ✨
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-2xl mx-auto"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Real feedback from real customers across East Tennessee
          </motion.p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={getVariants({
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          })}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, _index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:border-primary-200 transition-all duration-300 relative"
              variants={getVariants({
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6 }
                }
              })}
              whileHover={{ 
                y: -2, 
                boxShadow: "0 10px 40px -10px rgba(0, 175, 175, 0.15)" 
              }}
            >
              {/* Quote icon */}
              <div className="text-primary/20 text-4xl font-serif leading-none mb-3">"</div>
              
              {/* Testimonial content */}
              <blockquote className="mb-4">
                <p className="text-gray-700 leading-relaxed text-base">
                  {testimonial.quote}
                </p>
              </blockquote>
              
              {/* Author */}
              <cite className="text-primary font-medium text-sm not-italic flex items-center gap-1">
                <span>— {testimonial.author}, {testimonial.location}</span>
                <span className="text-secondary text-xs">✨</span>
              </cite>

              {/* Decorative sparkle */}
              <div 
                className="absolute -top-1 -right-1 text-secondary/40 text-lg"
                aria-hidden="true"
              >
                ✨
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-gray-700 mb-6">
            Ready to experience the difference? 🏠
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2"
            variants={getVariants(trustVariants.button)}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <span>Get Your Free Quote</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;