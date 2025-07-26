import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, getVariants, sparkleVariants } from '../utils/animations';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "1",
      title: "Reach out:",
      description: "Send the estimate form with ZIP and what you need.",
      icon: "📝",
      color: "primary"
    },
    {
      number: "2", 
      title: "Plan:",
      description: "I confirm scope and set a time.",
      icon: "💬",
      color: "secondary"
    },
    {
      number: "3",
      title: "Clean day:",
      description: "I do the work we agreed—no drama, no shortcuts.",
      icon: "✨",
      color: "accent"
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden" id="how">
      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating background sparkles using mix of regular and random variants */}
        <motion.div
          className="absolute top-20 left-[10%] text-primary text-2xl opacity-60"
          variants={sparkleVariants.randomTwinkling}
          animate="randomTwinkling"
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-[15%] text-secondary text-lg opacity-50"
          variants={sparkleVariants.randomFloating}
          animate="randomFloating"
        >
          ⭐
        </motion.div>
        
        <motion.div
          className="absolute top-40 left-[25%] text-accent text-xl opacity-40"
          variants={sparkleVariants.floating}
          animate="floating"
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-[20%] text-primary text-lg opacity-50"
          variants={sparkleVariants.randomDancing}
          animate="randomDancing"
        >
          💫
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-[15%] text-secondary text-xl opacity-40"
          variants={sparkleVariants.twinkling}
          animate="twinkling"
        >
          ⭐
        </motion.div>

        <motion.div
          className="absolute top-60 right-[8%] text-accent text-lg opacity-45"
          variants={sparkleVariants.dancing}
          animate="dancing"
        >
          ✨
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 relative"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-display font-bold text-accent mb-6 relative"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            How it <span className="text-primary relative">
              works
              {/* Sparkle on "works" */}
              <motion.span
                className="absolute -top-2 -right-4 text-secondary text-2xl opacity-70"
                variants={sparkleVariants.randomTwinkling}
                animate="randomTwinkling"
              >
                ✨
              </motion.span>
            </span>
            
            {/* Header sparkles */}
            <motion.div
              className="absolute -top-4 left-1/4 text-primary text-xl opacity-50"
              variants={sparkleVariants.randomFloating}
              animate="randomFloating"
            >
              ⭐
            </motion.div>
            
            <motion.div
              className="absolute -top-6 right-1/4 text-accent text-lg opacity-40"
              variants={sparkleVariants.dancing}
              animate="dancing"
            >
              💫
            </motion.div>
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
          {/* Stepper Component */}
          <ol 
            className="stepper-container grid md:grid-cols-3 gap-8 md:gap-12"
            role="list"
            aria-label="How it works - 3 steps to get your space cleaned"
          >
            {steps.map((step, index) => (
              <motion.li
                key={index}
                className="relative text-center"
                role="listitem"
                aria-current={index === 0 ? "step" : undefined}
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
                  className={`step-circle sparkle-container ${step.color}
                    ${step.color === 'primary' ? 'bg-primary' : 
                      step.color === 'secondary' ? 'bg-secondary' : 'bg-accent'}`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: step.color === 'primary' ? "0 10px 30px -5px rgba(0, 175, 175, 0.4)" :
                               step.color === 'secondary' ? "0 10px 30px -5px rgba(245, 183, 0, 0.4)" :
                               "0 10px 30px -5px rgba(0, 122, 122, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Step ${step.number}: ${step.title} ${step.description}`}
                >
                  <span className="relative z-10">{step.number}</span>
                  
                  {/* Interactive sparkles around the circle */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-white text-sm opacity-70"
                    variants={sparkleVariants.randomTwinkling}
                    animate="randomTwinkling"
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-1 -left-2 text-white text-xs opacity-60"
                    variants={sparkleVariants.twinkling}
                    animate="twinkling"
                  >
                    ⭐
                  </motion.div>
                  
                  {/* Enhanced sparkle effect for step 3 */}
                  {index === 2 && (
                    <>
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
                      
                      <motion.div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-50"
                        variants={sparkleVariants.randomFloating}
                        animate="randomFloating"
                      >
                        💫
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {/* Step icon */}
                <motion.div
                  className="text-4xl mb-4 relative"
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
                  <span className="relative z-10">{step.icon}</span>
                  
                  {/* Icon sparkles */}
                  {step.icon === "✨" ? (
                    // Extra sparkles for the cleaning step
                    <>
                      <motion.div
                        className="absolute -top-2 -right-3 text-primary text-lg opacity-60"
                        variants={sparkleVariants.randomDancing}
                        animate="randomDancing"
                      >
                        💫
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-2 -left-3 text-secondary text-sm opacity-50"
                        variants={sparkleVariants.randomTwinkling}
                        animate="randomTwinkling"
                      >
                        ⭐
                      </motion.div>
                    </>
                  ) : (
                    // Subtle sparkles for other icons
                    <motion.div
                      className="absolute -top-1 -right-2 text-accent text-sm opacity-40"
                      variants={sparkleVariants.twinkling}
                      animate="twinkling"
                    >
                      ✨
                    </motion.div>
                  )}
                </motion.div>

                {/* Step content */}
                <div className="step-content">
                  <h3 className="step-title">
                    {step.title}
                  </h3>
                  <p className="step-description">
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
                    aria-hidden="true"
                  >
                    →
                  </motion.div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="btn-primary text-lg px-12 py-5 sparkle-container relative"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 50px -10px rgba(0, 175, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Your Free Estimate</span>
            
            {/* Button sparkles */}
            <motion.div
              className="absolute -top-3 -right-3 text-secondary text-lg opacity-80"
              variants={sparkleVariants.randomTwinkling}
              animate="randomTwinkling"
            >
              ✨
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-3 text-accent text-sm opacity-60"
              variants={sparkleVariants.randomFloating}
              animate="randomFloating"
            >
              ⭐
            </motion.div>
          </motion.button>
          
          {/* CTA area sparkles */}
          <motion.div
            className="absolute -top-8 left-1/3 text-primary text-xl opacity-40"
            variants={sparkleVariants.dancing}
            animate="dancing"
          >
            💫
          </motion.div>
          
          <motion.div
            className="absolute -top-6 right-1/3 text-secondary text-lg opacity-50"
            variants={sparkleVariants.randomDancing}
            animate="randomDancing"
          >
            ✨
          </motion.div>
          
          <p className="text-gray-800 mt-4 text-sm">
            ⚡ Quick response • 📞 Personal service • 🎯 No surprises
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;