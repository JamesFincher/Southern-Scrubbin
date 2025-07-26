import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { scrollVariants, getVariants, easings } from '../utils/animations';
import { BackgroundSparkles, RandomSparkle } from '../utils/randomSparkles';

// Individual FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle, globalIndex }) => {
  const contentRef = useRef(null);
  const questionId = `faq-question-${globalIndex}`;
  const answerId = `faq-answer-${globalIndex}`;
  
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
        id={questionId}
        className="w-full px-6 py-5 text-left focus:outline-none focus:ring-4 focus:ring-primary-200 group min-h-[44px]"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={answerId}
        whileHover={{ backgroundColor: 'rgba(0, 175, 175, 0.02)' }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-medium text-accent group-hover:text-primary transition-colors duration-300 pr-4">
            {faq.question}
          </h3>
          <motion.div
            className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary group-hover:bg-primary-100 transition-colors duration-300 relative overflow-hidden"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: easings.gentle }}
            whileHover={{ scale: 1.05 }}
            aria-hidden="true"
          >
            {/* Interactive sparkle on hover */}
            <RandomSparkle
              type="randomTwinkling"
              delay={index * 0.2}
              size={0.5}
              position={{ x: '50%', y: '50%' }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              emoji="✨"
            />
            
            <motion.span
              className="text-xl font-light relative z-10"
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
            id={answerId}
            ref={contentRef}
            role="region"
            aria-labelledby={questionId}
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
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Top 5 FAQs - exact copy from CONTENT_CHECKLIST.md lines 30-34
  const topFAQs = [
    {
      question: "Do you bring supplies?",
      answer: "Yes. If you prefer certain brands, tell me."
    },
    {
      question: "Scent‑free options?",
      answer: "Yes—just let me know."
    },
    {
      question: "Recurring cleans?",
      answer: "Yes: weekly, bi‑weekly, or monthly."
    },
    {
      question: "Interior windows?",
      answer: "Reachable only; it's an add‑on."
    },
    {
      question: "Invoices/receipts?",
      answer: "Yes—emailed."
    }
  ];

  // Additional FAQs (Q6-10) - created for "See All FAQs" expansion
  const additionalFAQs = [
    {
      question: "What are your rates?",
      answer: "Rates vary by size and frequency. I'll give you a clear quote after seeing your space."
    },
    {
      question: "How far do you travel?",
      answer: "I serve Ten Mile, Lenoir City, and surrounding Knoxville areas."
    },
    {
      question: "Do you handle move-out cleans?",
      answer: "Yes—deep cleans for move-outs are available with advance notice."
    },
    {
      question: "Can you work around my schedule?",
      answer: "Absolutely. I offer flexible scheduling including evenings and weekends."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "I'll make it right. Your satisfaction is guaranteed—just let me know."
    }
  ];

  // Combine FAQs based on showAllFAQs state
  const displayedFAQs = showAllFAQs ? [...topFAQs, ...additionalFAQs] : topFAQs;

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleShowAllToggle = () => {
    setShowAllFAQs(!showAllFAQs);
    // Close any open FAQ when toggling view
    setOpenIndex(null);
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden" id="faqs">
      {/* Background Sparkles */}
      <BackgroundSparkles 
        count={6} 
        className="opacity-20" 
        sparkleEmoji="✨" 
      />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 relative"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header sparkles */}
          <RandomSparkle
            type="randomFloating"
            delay={0.5}
            size={0.8}
            position={{ x: '15%', y: '20%' }}
            className="text-primary/40"
            emoji="❓"
          />
          <RandomSparkle
            type="randomDancing"
            delay={1.2}
            size={0.6}
            position={{ x: '85%', y: '30%' }}
            className="text-secondary/50"
            emoji="✨"
          />
          
          <motion.h2
            className="text-5xl md:text-6xl font-display font-bold text-accent mb-6 relative z-10"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Got <span className="text-primary relative">
              Questions
              <RandomSparkle
                type="randomTwinkling"
                delay={2}
                size={0.4}
                position={{ x: '105%', y: '10%' }}
                className="text-primary/60"
                emoji="✨"
              />
            </span>?
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
          {displayedFAQs.map((faq, index) => (
            <FAQItem
              key={`${showAllFAQs ? 'all' : 'top'}-${index}`}
              faq={faq}
              index={index}
              globalIndex={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* See All FAQs Toggle */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            onClick={handleShowAllToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleShowAllToggle();
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-white rounded-xl shadow-soft hover:shadow-gentle border border-primary-100 hover:border-primary-200 transition-all duration-300 group min-h-[44px] focus:outline-none focus:ring-4 focus:ring-primary-200"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: 'rgba(240, 253, 253, 1)' 
            }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={showAllFAQs}
            aria-label={showAllFAQs ? 'Show fewer FAQs' : 'Show all FAQs'}
          >
            <motion.span
              className="text-primary font-medium mr-2"
              initial={false}
              animate={{ 
                color: showAllFAQs ? '#007A7A' : '#00AFAF'
              }}
            >
              {showAllFAQs ? 'Show Less' : 'See All FAQs'}
            </motion.span>
            
            <motion.div
              className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center relative overflow-hidden"
              animate={{ 
                rotate: showAllFAQs ? 180 : 0,
                backgroundColor: showAllFAQs ? 'rgba(0, 122, 122, 0.1)' : 'rgba(0, 175, 175, 0.1)'
              }}
              transition={{ duration: 0.3, ease: easings.gentle }}
            >
              {/* Interactive sparkle on hover */}
              <RandomSparkle
                type="randomTwinkling"
                delay={0}
                size={0.5}
                position={{ x: '50%', y: '50%' }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                emoji="✨"
              />
              
              <motion.span
                className="text-sm font-light text-primary relative z-10"
                initial={false}
                animate={{ 
                  scale: showAllFAQs ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {showAllFAQs ? '−' : '+'}
              </motion.span>
            </motion.div>
          </motion.button>
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
              className="btn-primary sparkle-container relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button sparkles on hover */}
              <RandomSparkle
                type="randomTwinkling"
                delay={0}
                size={0.7}
                position={{ x: '20%', y: '30%' }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/80"
                emoji="✨"
              />
              <RandomSparkle
                type="randomDancing"
                delay={0.3}
                size={0.5}
                position={{ x: '80%', y: '70%' }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/60"
                emoji="✨"
              />
              
              <span className="relative z-10">Get in Touch</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;