import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { accordionVariants, trustVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';

// About Component with Card Implementation
const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Card text (60 words max for clamp)
  const cardText = "I'm Rebecca, and I handle your cleaning personally. Been at this for years, and I keep things simple: show up on time, do the work right, and respect your space. Got preferences? Just tell me once.";

  // Full expanded content about owner/operator story
  const expandedContent = `I'm Rebecca, born and raised here in East Tennessee. Started this business because I got tired of seeing folks struggle to find reliable cleaning help that actually shows up and does the job right.

Been cleaning professionally for 8+ years—homes, Airbnbs, small offices. I've learned that people just want someone they can count on. Show up when you say you will, clean what needs cleaning, and don't make it complicated.

I keep it small on purpose. Just me, so I can make sure every job gets done the way you want it. No managing a bunch of employees, no wondering who's showing up at your door. When you call, you get me.

Whether it's your house, rental property, or office, I treat every place like it matters. Tell me how you like things done, and that's how I'll do them. Simple as that.`;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="about">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          variants={getVariants(accordionVariants.container)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-accent mb-6"
            variants={getVariants(accordionVariants.listItem)}
          >
            About <span className="text-primary">Southern Sparkle & Scrub</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed"
            variants={getVariants(accordionVariants.listItem)}
          >
            Owner-operated cleaning with a personal touch
          </motion.p>
        </motion.div>

        {/* About card with expandable content */}
        <motion.div
          className="card-sparkle relative max-w-3xl mx-auto"
          variants={getVariants(accordionVariants.listItem)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Owner avatar/icon section */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-sparkle-gradient rounded-2xl flex items-center justify-center text-3xl relative sparkle-container">
              👩‍🔧
              {/* Decorative sparkles */}
              <motion.div
                className="absolute -top-1 -right-1 text-secondary text-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✨
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-semibold text-accent">Meet Rebecca</h3>
              <p className="text-primary font-medium">Owner & Operator</p>
            </div>
          </div>

          {/* Card text content */}
          <div className="text-gray-800 leading-relaxed mb-6">
            <p className="text-lg">
              {cardText}
            </p>
          </div>

          {/* Expandable content with height animation */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={accordionVariants.content}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="overflow-hidden"
                id="about-expanded-content"
              >
                <div className="pt-4 border-t border-gray-100">
                  <div className="space-y-4 text-gray-800 leading-relaxed">
                    {expandedContent.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        variants={accordionVariants.listItem}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Read more/less toggle button */}
          <motion.button
            onClick={toggleExpanded}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium mt-6 focus:outline-none focus:ring-4 focus:ring-primary-200 rounded-lg px-2 py-1"
            variants={trustVariants.button}
            whileHover="hover"
            whileTap="tap"
            aria-expanded={isExpanded}
            aria-controls="about-expanded-content"
            aria-label={isExpanded ? "Read less about Rebecca and Southern Sparkle & Scrub" : "Read more about Rebecca and Southern Sparkle & Scrub"}
          >
            <span>{isExpanded ? "Read less" : "Read more"}</span>
            <motion.span
              variants={accordionVariants.icon}
              animate={isExpanded ? "expanded" : "collapsed"}
              className="text-lg"
            >
              ↓
            </motion.span>
          </motion.button>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-6 mt-6 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-secondary">🏆</span>
              <span>8+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-secondary">🏠</span>
              <span>Locally Owned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-secondary">💯</span>
              <span>Satisfaction Guaranteed</span>
            </div>
          </motion.div>

          {/* Personal commitment statement */}
          <motion.div
            className="text-center mt-6 p-4 bg-sparkle-gradient rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-accent font-medium">
              "You're not dealing with a big company or different people every time. 
              It's just me, and I stand behind my work."
            </p>
            <p className="text-primary text-sm mt-2 font-medium">— Rebecca, Owner</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-20 right-20 text-secondary text-2xl"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16 text-primary text-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💫
        </motion.div>
      </div>
    </section>
  );
};

export default About;