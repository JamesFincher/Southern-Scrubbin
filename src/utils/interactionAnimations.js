// Southern Sparkle & Scrub Interaction Animations
import { easings } from './easings';

// Service card animations - transformation storytelling
export const serviceVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
  
  card: {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easings.welcome,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easings.gentle,
      },
    },
  },
  
  icon: {
    hidden: { 
      scale: 0,
      rotate: -180 
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: easings.sparkle,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: easings.gentle,
      },
    },
  },
};

// Trust-building micro-interactions
export const trustVariants = {
  button: {
    rest: { 
      scale: 1, 
      boxShadow: "0 4px 25px -2px rgba(0, 175, 175, 0.1)" 
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 40px -10px rgba(245, 183, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: easings.welcome,
      },
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: easings.comfort,
      },
    },
  },
  
  input: {
    rest: { 
      borderColor: "#e5e7eb",
      boxShadow: "0 0 0 0px rgba(0, 175, 175, 0)",
    },
    focus: { 
      borderColor: "#00AFAF",
      boxShadow: "0 0 0 3px rgba(0, 175, 175, 0.1)",
      transition: {
        duration: 0.2,
        ease: easings.gentle,
      },
    },
  },
  
  testimonial: {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easings.southern,
      },
    },
  },
};