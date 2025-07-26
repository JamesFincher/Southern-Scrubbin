import { motion } from 'motion/react';
import { useRef } from 'react';
import { scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';

const SuppliesPreferences = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-white" id="supplies">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-6">
            Supplies & preferences
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
            I bring standard, safe household cleaners and tools. If you have products you prefer—stone‑safe sprays, fragrance‑free, etc.—leave them out with a note and I'll use those.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SuppliesPreferences;