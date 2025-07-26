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

// Accordion animations for "What's Included" sections
export const accordionVariants = {
  header: {
    rest: { 
      backgroundColor: "rgba(245, 245, 245, 1)",
      borderColor: "rgba(229, 231, 235, 1)",
      color: "rgba(55, 65, 81, 1)"
    },
    hover: { 
      backgroundColor: "rgba(240, 253, 253, 1)",
      borderColor: "rgba(0, 175, 175, 0.3)",
      color: "rgba(0, 175, 175, 1)",
      transition: {
        duration: 0.2,
        ease: easings.gentle,
      },
    },
    expanded: {
      backgroundColor: "rgba(240, 253, 253, 1)",
      borderColor: "rgba(0, 175, 175, 0.5)",
      color: "rgba(0, 175, 175, 1)",
      transition: {
        duration: 0.3,
        ease: easings.welcome,
      },
    },
  },

  content: {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: easings.comfort,
        },
        opacity: {
          duration: 0.2,
          ease: easings.gentle,
        },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: easings.welcome,
        },
        opacity: {
          duration: 0.3,
          delay: 0.1,
          ease: easings.gentle,
        },
      },
    },
  },

  icon: {
    collapsed: {
      rotateZ: 0,
      transition: {
        duration: 0.3,
        ease: easings.comfort,
      },
    },
    expanded: {
      rotateZ: 180,
      transition: {
        duration: 0.3,
        ease: easings.comfort,
      },
    },
  },

  listItem: {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: easings.welcome,
      },
    },
  },

  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

// Modal/Drawer animations with accessibility support
export const modalVariants = {
  overlay: {
    hidden: { 
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: easings.gentle,
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.2,
        ease: easings.comfort,
      },
    },
  },
  
  drawer: {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: easings.welcome,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: easings.comfort,
      },
    },
  },
  
  content: {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: easings.gentle,
      },
    },
  },
  
  chipContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  },
  
  chip: {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easings.sparkle,
      },
    },
  },
};

// Carousel animations for testimonials and image sliders
export const carouselVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easings.welcome,
      },
    },
  },
  
  slide: {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easings.welcome,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: easings.comfort,
      },
    }),
  },
  
  indicator: {
    inactive: {
      scale: 1,
      backgroundColor: "rgba(156, 163, 175, 1)",
      transition: {
        duration: 0.2,
        ease: easings.gentle,
      },
    },
    active: {
      scale: 1.25,
      backgroundColor: "rgba(0, 175, 175, 1)",
      transition: {
        duration: 0.3,
        ease: easings.welcome,
      },
    },
    hover: {
      backgroundColor: "rgba(107, 114, 128, 1)",
      transition: {
        duration: 0.2,
        ease: easings.gentle,
      },
    },
  },
  
  button: {
    rest: {
      scale: 1,
      backgroundColor: "rgba(0, 175, 175, 0.1)",
      transition: {
        duration: 0.2,
        ease: easings.gentle,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(0, 175, 175, 0.2)",
      transition: {
        duration: 0.2,
        ease: easings.welcome,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: easings.comfort,
      },
    },
  },
};