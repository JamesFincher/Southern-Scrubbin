// Random Sparkle Utilities for Southern Sparkle & Scrub
/* eslint-disable react-refresh/only-export-components */
import { motion } from 'motion/react';
import { memo, useMemo } from 'react';
import { sparkleVariants } from './animations';
import { useIntersectionObserver, gpuOptimizedTransforms } from './lazyUtils.jsx';

// Generate random sparkle components for background ambiance (memoized for performance)
const sparkleTypes = ['randomTwinkling', 'randomFloating', 'randomDancing'];

export const generateRandomSparkles = (count = 6) => {
  // Use a seed-based approach for consistent but random sparkles
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

// Optimized Random sparkle component with custom positioning
export const RandomSparkle = memo(({ 
  type = 'randomTwinkling', 
  delay = 0, 
  size = 1,
  className = '',
  position = { x: '50%', y: '50%' },
  emoji = '✨',
  lazy = false
}) => {
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '100px',
    triggerOnce: false
  });

  // Memoize variants to prevent unnecessary recalculations
  const customVariants = useMemo(() => {
    const variants = sparkleVariants[type] || sparkleVariants.randomTwinkling;
    
    return {
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
  }, [type, delay]);

  // GPU-optimized styles
  const optimizedStyle = useMemo(() => ({
    left: position.x,
    top: position.y,
    fontSize: `${size}rem`,
    willChange: 'transform, opacity',
    transform: gpuOptimizedTransforms.translate(0, 0), // Force GPU layer
  }), [position.x, position.y, size]);

  // Don't render if lazy loading is enabled and component isn't visible
  if (lazy && !isVisible) {
    return <div ref={elementRef} className="absolute pointer-events-none" style={{ left: position.x, top: position.y }} />;
  }

  return (
    <motion.div
      ref={elementRef}
      className={`absolute pointer-events-none select-none ${className}`}
      style={optimizedStyle}
      variants={customVariants}
      animate={isVisible ? type : false}
      initial={{ opacity: 0 }}
    >
      {emoji}
    </motion.div>
  );
});

RandomSparkle.displayName = 'RandomSparkle';

// Optimized Background sparkle container component
export const BackgroundSparkles = memo(({ 
  count = 8, 
  className = '',
  sparkleEmoji = '✨',
  lazy = true
}) => {
  // Memoize sparkle generation to prevent recalculation on every render
  const sparkles = useMemo(() => generateRandomSparkles(count), [count]);

  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px',
    triggerOnce: false
  });

  return (
    <div 
      ref={elementRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {(lazy ? isVisible : true) && sparkles.map((sparkle) => (
        <RandomSparkle
          key={sparkle.id}
          type={sparkle.type}
          delay={sparkle.delay}
          size={sparkle.size}
          position={{ x: `${sparkle.x}%`, y: `${sparkle.y}%` }}
          emoji={sparkleEmoji}
          className="text-primary/30"
          lazy={lazy}
        />
      ))}
    </div>
  );
});

BackgroundSparkles.displayName = 'BackgroundSparkles';

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