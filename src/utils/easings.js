// Southern Sparkle & Scrub Custom Easing Curves
// Easing functions that feel "Southern comfortable"

export const easings = {
  southern: [0.25, 0.46, 0.45, 0.94],      // Gentle, welcoming motion
  gentle: [0.25, 0.1, 0.25, 1],            // Soft, reassuring
  welcome: [0.165, 0.84, 0.44, 1],         // Inviting, open
  comfort: [0.4, 0, 0.2, 1],               // Stable, trustworthy
  sparkle: [0.68, -0.55, 0.265, 1.55],     // Playful bounce for sparkles
};

// Utility function to check for reduced motion preference
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Reduced motion variants for accessibility
export const reducedMotionVariants = {
  // Simple fade-in for users who prefer reduced motion
  simple: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  },
};

// Utility function to get appropriate variants based on motion preference
export const getVariants = (normalVariants, reducedVariants = reducedMotionVariants.simple) => {
  return shouldReduceMotion() ? reducedVariants : normalVariants;
};