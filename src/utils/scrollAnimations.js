// Southern Sparkle & Scrub Scroll-Triggered Animations
import { easings } from './easings';

// Scroll-triggered animations
export const scrollVariants = {
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 60 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easings.welcome,
      },
    },
  },
  
  slideInLeft: {
    hidden: { 
      opacity: 0, 
      x: -60 
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
  
  slideInRight: {
    hidden: { 
      opacity: 0, 
      x: 60 
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
  
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easings.sparkle,
      },
    },
  },
};

// Wave animation for decorative elements
export const waveVariants = {
  gentle: {
    d: [
      "M0,100 Q150,50 300,100 T600,100 V150 H0 Z",
      "M0,100 Q150,120 300,100 T600,100 V150 H0 Z",
      "M0,100 Q150,80 300,100 T600,100 V150 H0 Z",
    ],
    transition: {
      duration: 4,
      ease: easings.southern,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Progress and loading animations
export const progressVariants = {
  loading: {
    scaleX: [0, 1],
    transition: {
      duration: 1.5,
      ease: easings.comfort,
    },
  },
  
  success: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.8,
      ease: easings.welcome,
    },
  },
};