import { motion } from 'motion/react';
import { scrollVariants, sparkleVariants } from '../utils/animations';

// Sparkle component for magical effects
const SparkleIcon = ({ delay = 0, size = "w-6 h-6", className = "" }) => (
  <motion.div
    className={`${size} ${className} text-secondary absolute pointer-events-none`}
    variants={sparkleVariants.twinkling}
    animate="twinkling"
    style={{ 
      animationDelay: `${delay}s`,
    }}
  >
    ✨
  </motion.div>
);

const AirbnbTurns = () => {
  return (
    <motion.section
      id="airbnb-turns" 
      className="py-16 bg-gray-50 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={scrollVariants.container}
    >
      {/* Background sparkles */}
      <motion.div 
        className="absolute top-20 left-16 text-secondary-200 text-xl"
        variants={sparkleVariants.floating}
        animate="floating"
        style={{ animationDelay: '0.5s' }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute top-48 right-20 text-secondary-200 text-lg"
        variants={sparkleVariants.dancing}
        animate="dancing"
        style={{ animationDelay: '1.2s' }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute bottom-48 left-24 text-secondary-200 text-lg"
        variants={sparkleVariants.floating}
        animate="floating"
        style={{ animationDelay: '0.8s' }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute bottom-24 right-16 text-secondary-200 text-xl"
        variants={sparkleVariants.twinkling}
        animate="twinkling"
        style={{ animationDelay: '1.5s' }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute top-36 left-1/2 transform -translate-x-1/2 text-secondary-200 text-sm"
        variants={sparkleVariants.floating}
        animate="floating"
        style={{ animationDelay: '2.1s' }}
      >
        ✨
      </motion.div>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div className="text-center mb-12" variants={scrollVariants.item}>
          <h2 className="text-3xl font-display font-bold text-primary mb-4">
            Airbnb Turnover Cleaning
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fast, reliable cleaning between guests to ensure 5-star reviews
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={scrollVariants.stagger}
        >
          <motion.div variants={scrollVariants.item}>
            <h3 className="text-2xl font-semibold mb-4">Quick Turnaround</h3>
            <p className="text-gray-600 mb-6">
              Same-day cleaning services to get your property guest-ready quickly.
            </p>
            <ul className="space-y-2">
              {[
                "Complete sanitization",
                "Fresh linens & towels",
                "Restocked amenities",
                "Photo documentation"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <motion.span 
                    className="text-primary"
                    variants={scrollVariants.item}
                  >
                    ✓
                  </motion.span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="text-center"
            variants={scrollVariants.item}
          >
            <motion.div 
              className="text-6xl mb-4 relative inline-block"
              variants={scrollVariants.item}
            >
              🏨
              <SparkleIcon delay={0.3} className="top-2 right-2" size="w-4 h-4" />
              <SparkleIcon delay={1.1} className="bottom-2 left-2" size="w-3 h-3" />
            </motion.div>
            <p className="text-gray-600">
              Helping hosts maintain excellent ratings with consistent, thorough cleaning
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AirbnbTurns;