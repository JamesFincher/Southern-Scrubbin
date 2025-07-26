// Southern Sparkle & Scrub Hero Section Animations
import { easings } from './easings';

// Hero section animations - telling the story of welcome
export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easings.southern,
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  },
  
  logo: {
    hidden: { 
      scale: 0.8, 
      opacity: 0, 
      y: 20 
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: easings.welcome,
      },
    },
  },
  
  // Typography reveals with Southern charm
  southern: {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: easings.gentle,
      },
    },
  },
  
  sparkleAndScrub: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easings.southern,
        delay: 0.3,
      },
    },
  },
  
  tagline: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easings.comfort,
        delay: 0.6,
      },
    },
  },
  
  cta: {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easings.welcome,
        delay: 0.9,
      },
    },
  },
};

// Sparkle animation variants for magical cleaning transformation
export const sparkleVariants = {
  floating: {
    y: [0, -10, 0],
    x: [0, 5, 0],
    scale: [1, 1.1, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      ease: easings.gentle,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
  
  twinkling: {
    opacity: [0.4, 1, 0.4],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      ease: easings.sparkle,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
  
  dancing: {
    y: [0, -15, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 4,
      ease: easings.southern,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};