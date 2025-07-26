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

  // Random sparkle variants for truly random twinkling
  randomTwinkling: {
    opacity: [0.3, 1, 0.6, 0.9, 0.4],
    scale: [0.7, 1.3, 0.9, 1.1, 0.8],
    rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
    transition: {
      duration: () => 1.5 + Math.random() * 2.5, // 1.5s to 4s
      ease: easings.sparkle,
      repeat: Infinity,
      repeatType: "loop",
      delay: () => Math.random() * 2, // 0-2s random delay
    },
  },

  randomFloating: {
    y: [0, -20 + Math.random() * 10, -5 + Math.random() * 10, 0],
    x: [0, -10 + Math.random() * 20, 5 - Math.random() * 10, 0],
    scale: [0.9, 1.2 + Math.random() * 0.3, 1.0, 0.9],
    transition: {
      duration: () => 2.5 + Math.random() * 3, // 2.5s to 5.5s
      ease: easings.gentle,
      repeat: Infinity,
      repeatType: "loop",
      delay: () => Math.random() * 3, // 0-3s random delay
    },
  },

  randomDancing: {
    y: [0, -15 - Math.random() * 10, -5 + Math.random() * 5, 0],
    rotate: [0, 10 + Math.random() * 15, -10 - Math.random() * 15, 0],
    scale: [1, 1.1 + Math.random() * 0.2, 0.95, 1],
    transition: {
      duration: () => 3 + Math.random() * 2, // 3s to 5s
      ease: easings.southern,
      repeat: Infinity,
      repeatType: "loop",
      delay: () => Math.random() * 4, // 0-4s random delay
    },
  },
};