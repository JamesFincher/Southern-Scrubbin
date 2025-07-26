import { motion } from 'motion/react';
import { scrollVariants, getVariants } from '../utils/animations';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const WhatIClean = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const cleaningAreas = [
    {
      category: "Kitchens",
      items: ["counters", "cabinet fronts", "sink & faucet", "stovetop", "microwave interior", "exterior of appliances", "floors"],
      icon: "🍳"
    },
    {
      category: "Bathrooms", 
      items: ["toilets", "tubs/showers", "sinks", "mirrors", "counters", "floors"],
      icon: "🛁"
    },
    {
      category: "Bedrooms & Living",
      items: ["dust/wipe reachable surfaces", "tidy", "make beds (fresh sheets if left out)", "floors"],
      icon: "🛏️"
    }
  ];

  const addOns = [
    "inside oven", "inside fridge", "baseboards/detail dusting", 
    "interior windows within reach", "light wall spot‑cleaning", 
    "dish wash‑up", "laundry fold (your detergent)"
  ];

  const notOffered = [
    "carpet shampoo/extraction", "pressure washing", "exterior windows", 
    "high‑ladder/roof work", "post‑construction debris", "mold/biohazard/animal waste", 
    "severe hoarding", "active pest issues"
  ];

  return (
    <section className="py-20 bg-white" id="details">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-accent mb-6"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            What's <span className="text-primary">Included</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            variants={getVariants(scrollVariants.fadeInUp)}
          >
            Straightforward cleaning with attention to detail in every area
          </motion.p>
        </motion.div>

        {/* Standard cleaning areas */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={getVariants(scrollVariants.staggerChildren)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cleaningAreas.map((area, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
              variants={getVariants(scrollVariants.fadeInUp)}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{area.icon}</div>
                <h3 className="text-2xl font-display font-semibold text-primary">
                  {area.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {area.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons section */}
        <motion.div
          className="bg-secondary-50 rounded-3xl p-8 mb-12"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-display font-semibold text-accent mb-6 text-center">
            Add‑ons (by request)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, index) => (
              <div key={index} className="flex items-center">
                <span className="text-secondary mr-2">+</span>
                <span className="text-gray-700">{addon}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Not currently offering */}
        <motion.div
          className="bg-gray-100 rounded-3xl p-8"
          variants={getVariants(scrollVariants.fadeInUp)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-display font-semibold text-accent mb-6 text-center">
            Not currently offering
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notOffered.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6 italic">
            Keeping it straightforward and focusing on what I do best
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIClean;