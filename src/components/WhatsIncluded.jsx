import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { accordionVariants, getVariants } from '../utils/animations';

// Individual Accordion Panel Component
const AccordionPanel = ({ title, content, isExpanded, onToggle, panelId }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Accordion Header Button */}
      <motion.button
        className="w-full px-6 py-4 text-left font-medium focus:outline-none focus:ring-2 focus:ring-primary-200 focus:z-10 relative border-b border-gray-200"
        variants={getVariants(accordionVariants.header)}
        initial="rest"
        whileHover="hover"
        animate={isExpanded ? "expanded" : "rest"}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        id={`${panelId}-header`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-serif">{title}</span>
          <motion.div
            variants={getVariants(accordionVariants.icon)}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="text-current"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={`${panelId}-header`}
            variants={getVariants(accordionVariants.content)}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <motion.div
              className="px-6 py-4 bg-gray-50"
              variants={getVariants(accordionVariants.container)}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {content.split(' • ').map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-gray-800"
                    variants={getVariants(accordionVariants.listItem)}
                  >
                    <span className="text-primary text-sm">✓</span>
                    <span className="text-sm">{item.trim()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main What's Included Accordion Component
const WhatsIncluded = () => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const panels = [
    {
      id: 'kitchens',
      title: 'Kitchens',
      content: 'Counters • Sink/faucet • Cabinet fronts • Microwave interior • Appliance exteriors • Floors'
    },
    {
      id: 'bathrooms',
      title: 'Bathrooms',
      content: 'Toilets • Tubs/showers • Sinks/vanity • Mirrors • Floors'
    },
    {
      id: 'bedrooms-living',
      title: 'Bedrooms & Living Areas',
      content: 'Dust reachable surfaces • Tidy • Floors'
    }
  ];

  const togglePanel = (panelId) => {
    setExpandedPanel(expandedPanel === panelId ? null : panelId);
  };

  return (
    <div className="w-full">
      <h4 className="text-xl font-serif font-semibold text-accent mb-4">
        What's Included
      </h4>
      
      <div className="space-y-2">
        {panels.map((panel) => (
          <AccordionPanel
            key={panel.id}
            title={panel.title}
            content={panel.content}
            isExpanded={expandedPanel === panel.id}
            onToggle={() => togglePanel(panel.id)}
            panelId={`whats-included-${panel.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatsIncluded;