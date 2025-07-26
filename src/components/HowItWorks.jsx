import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, getVariants } from '../utils/animations';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "1",
      title: "Reach out.",
      description: "Send the estimate form with your city/ZIP, beds/baths (or office rooms), and what you'd like cleaned.",
      icon: "📝",
      color: "primary"
    },
    {
      number: "2", 
      title: "Plan & schedule.",
      description: "I'll confirm scope, share a clear plan, and set a time.",
      icon: "💬",
      color: "secondary"
    },
    {
      number: "3",
      title: "Clean day.",
      description: "I show up on time, do the work we agreed to, and check that you're happy.",
      icon: "✨",
      color: "accent"
    }
  ];

  return (
    <section className="py-20 bg-white" id="how-it-works">
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
            className="text-5xl md:text-6xl font-display font-bold text-accent mb-6"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            How it <span className="text-primary">works</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Simple, straightforward, and designed around your needs. 
            Getting your home sparkling clean is just three easy steps away.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ 
                  delay: index * 0.2 + 0.3, 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Step number circle */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white relative
                    ${step.color === 'primary' ? 'bg-primary' : 
                      step.color === 'secondary' ? 'bg-secondary' : 'bg-accent'}`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: step.color === 'primary' ? "0 10px 30px -5px rgba(0, 175, 175, 0.4)" :
                               step.color === 'secondary' ? "0 10px 30px -5px rgba(245, 183, 0, 0.4)" :
                               "0 10px 30px -5px rgba(0, 122, 122, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10">{step.number}</span>
                  
                  {/* Sparkle effect for step 3 */}
                  {index === 2 && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-white text-lg opacity-60">✨</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Step icon */}
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Step content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-accent">
                    {step.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Connection arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-10 -right-6 lg:-right-8 text-3xl text-primary opacity-60"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="btn-primary text-lg px-12 py-5 sparkle-container"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Your Free Estimate</span>
          </motion.button>
          
          <p className="text-gray-800 mt-4 text-sm">
            ⚡ Quick response • 📞 Personal service • 🎯 No surprises
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;