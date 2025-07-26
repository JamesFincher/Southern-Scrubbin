import { motion } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, sparkleVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import { BackgroundSparkles, RandomSparkle } from '../utils/randomSparkles.jsx';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 bg-gray-100 overflow-hidden" id="about">
      {/* Background floating sparkles */}
      <BackgroundSparkles count={6} className="opacity-50" />
      
      {/* Additional positioned sparkles for ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '10%', y: '25%' }} 
          className="text-secondary-200 text-sm"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '85%', y: '20%' }} 
          className="text-primary-200 text-lg"
          emoji="⭐"
        />
        <RandomSparkle 
          type="randomDancing" 
          position={{ x: '15%', y: '75%' }} 
          className="text-secondary-300 text-base"
        />
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '90%', y: '65%' }} 
          className="text-primary-200 text-sm"
          emoji="💫"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '75%', y: '85%' }} 
          className="text-secondary-200 text-lg"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="relative text-3xl md:text-4xl font-display font-bold text-accent mb-8">
            About <span className="text-primary">(owner‑operated)</span>
            {/* Interactive sparkles around title */}
            <RandomSparkle 
              type="randomTwinkling" 
              position={{ x: '100%', y: '10%' }} 
              size={0.7}
              className="text-primary"
            />
            <RandomSparkle 
              type="randomDancing" 
              position={{ x: '-5%', y: '50%' }} 
              size={0.8}
              className="text-secondary"
            />
          </h2>
          
          <div className="relative bg-white rounded-3xl p-8 shadow-soft max-w-2xl mx-auto sparkle-container">
            {/* Interactive sparkles around the content card */}
            <RandomSparkle 
              type="randomFloating" 
              position={{ x: '95%', y: '15%' }} 
              size={0.6}
              className="text-primary-300"
            />
            <RandomSparkle 
              type="randomTwinkling" 
              position={{ x: '5%', y: '20%' }} 
              size={0.7}
              className="text-secondary-300"
            />
            <RandomSparkle 
              type="randomDancing" 
              position={{ x: '90%', y: '85%' }} 
              size={0.8}
              className="text-primary-200"
            />
            
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Hi—I'm the person who'll be cleaning your place. I keep communication straightforward, show up when I say I will, and make sure the basics are done right every time.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              If you have special preferences (products or routines), tell me once and I'll stick to them.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;