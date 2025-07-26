import { motion } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-gray-100" id="about">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8">
            About <span className="text-primary">(owner‑operated)</span>
          </h2>
          <div className="bg-white rounded-3xl p-8 shadow-soft max-w-2xl mx-auto">
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