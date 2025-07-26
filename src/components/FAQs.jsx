import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { scrollVariants, getVariants, easings } from '../utils/animations';

// Individual FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100 hover:border-primary-200 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        ease: easings.southern 
      }}
    >
      {/* Question Button */}
      <motion.button
        className="w-full px-6 py-5 text-left focus:outline-none focus:ring-4 focus:ring-primary-200 group"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(0, 175, 175, 0.02)' }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-medium text-accent group-hover:text-primary transition-colors duration-300 pr-4">
            {faq.question}
          </h3>
          <motion.div
            className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary group-hover:bg-primary-100 transition-colors duration-300"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: easings.gentle }}
          >
            <motion.span
              className="text-xl font-light"
              initial={false}
              animate={{ 
                scale: isOpen ? 1.1 : 1,
                rotate: isOpen ? 90 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              +
            </motion.span>
          </motion.div>
        </div>
      </motion.button>

      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: easings.southern },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: easings.gentle },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div
              className="px-6 pb-6 pt-2"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="border-l-4 border-secondary pl-4">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQs Component
const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Do you bring supplies?",
      answer: "Yes. If you prefer your products, set them out with a note."
    },
    {
      question: "Can you use scent‑free or specific brands?",
      answer: "Absolutely—happy to use yours."
    },
    {
      question: "Do you clean interior windows?",
      answer: "Yes, within safe reach (no tall ladders)."
    },
    {
      question: "Do you handle laundry?",
      answer: "Homes: fold‑only add‑on with your detergent. STRs: on‑site if time allows."
    },
    {
      question: "Do you take recurring cleans?",
      answer: "Yes—weekly, bi‑weekly, or monthly once I know your space."
    },
    {
      question: "Can I get an invoice or receipt?",
      answer: "Yes—by email or text link."
    },
    {
      question: "Need to reschedule?",
      answer: "No problem—please give as much notice as you can."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faqs">
      <div className="max-w-4xl mx-auto px-4">
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
            Got <span className="text-primary">Questions</span>?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Here are answers to the most common questions about our cleaning services. 
            Don't see what you're looking for? Just ask!
          </motion.p>
        </motion.div>

        {/* FAQs List */}
        <motion.div
          className="space-y-4"
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
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-primary-100">
            <h3 className="text-2xl font-display font-semibold text-accent mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-700 mb-6 max-w-lg mx-auto">
              I'm here to help! Get in touch and I'll be happy to answer any questions 
              about your specific cleaning needs.
            </p>
            <motion.button
              className="btn-primary sparkle-container"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get in Touch</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;