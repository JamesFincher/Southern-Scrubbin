// Random Sparkle Utilities for Southern Sparkle & Scrub
import { motion } from 'motion/react';
import { sparkleVariants } from './animations';

// Generate random sparkle components for background ambiance
export const generateRandomSparkles = (count = 6) => {
  const sparkleTypes = ['randomTwinkling', 'randomFloating', 'randomDancing'];
  const sparkles = [];

  for (let i = 0; i < count; i++) {
    const randomType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
    const randomDelay = Math.random() * 3;
    const randomSize = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    
    sparkles.push({
      id: `sparkle-${i}`,
      type: randomType,
      delay: randomDelay,
      size: randomSize,
      x: Math.random() * 100, // 0-100% position
      y: Math.random() * 100,
    });
  }

  return sparkles;
};

// Random sparkle component with custom positioning
export const RandomSparkle = ({ 
  type = 'randomTwinkling', 
  delay = 0, 
  size = 1,
  className = '',
  position = { x: '50%', y: '50%' },
  emoji = '✨'
}) => {
  const variants = sparkleVariants[type] || sparkleVariants.randomTwinkling;
  
  // Create variant with specific delay
  const customVariants = {
    ...variants,
    transition: {
      ...variants.transition,
      delay: typeof variants.transition.delay === 'function' 
        ? variants.transition.delay() + delay 
        : delay,
      duration: typeof variants.transition.duration === 'function'
        ? variants.transition.duration()
        : variants.transition.duration,
    }
  };

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        left: position.x,
        top: position.y,
        fontSize: `${size}rem`,
        willChange: 'transform, opacity',
      }}
      variants={customVariants}
      animate={type}
      initial={{ opacity: 0 }}
    >
      {emoji}
    </motion.div>
  );
};

// Background sparkle container component
export const BackgroundSparkles = ({ 
  count = 8, 
  className = '',
  sparkleEmoji = '✨'
}) => {
  const sparkles = generateRandomSparkles(count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <RandomSparkle
          key={sparkle.id}
          type={sparkle.type}
          delay={sparkle.delay}
          size={sparkle.size}
          position={{ x: `${sparkle.x}%`, y: `${sparkle.y}%` }}
          emoji={sparkleEmoji}
          className="text-primary/30"
        />
      ))}
    </div>
  );
};

// CSS class name generator for random sparkle animations
export const getRandomSparkleClass = () => {
  const sparkleClasses = [
    'animate-sparkle-random-1',
    'animate-sparkle-random-2', 
    'animate-sparkle-random-3',
    'animate-sparkle-random-4',
    'animate-sparkle-random-5',
  ];
  
  return sparkleClasses[Math.floor(Math.random() * sparkleClasses.length)];
};

// Float class name generator
export const getRandomFloatClass = () => {
  const floatClasses = [
    'animate-float-random-1',
    'animate-float-random-2',
    'animate-float-random-3',
  ];
  
  return floatClasses[Math.floor(Math.random() * floatClasses.length)];
};

// Utility to create random timing for animations
export const getRandomTiming = (baseDelay = 0, maxVariation = 2) => {
  return baseDelay + (Math.random() * maxVariation);
};

// Generate staggered animation delays for multiple elements
export const generateStaggeredDelays = (count, baseDelay = 0, stagger = 0.1) => {
  return Array.from({ length: count }, (_, i) => 
    baseDelay + (i * stagger) + (Math.random() * 0.5)
  );
};