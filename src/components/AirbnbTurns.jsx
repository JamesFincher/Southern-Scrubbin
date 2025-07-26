import { motion } from 'motion/react';
import { scrollVariants } from '../utils/animations';

const AirbnbTurns = () => {
  return (
    <motion.section
      id="airbnb-turns" 
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={scrollVariants.container}
    >
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
                  <span className="text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="text-center"
            variants={scrollVariants.item}
          >
            <div className="text-6xl mb-4">🏨</div>
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