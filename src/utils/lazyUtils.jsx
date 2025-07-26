// Performance Optimization Utilities for Southern Sparkle & Scrub
// Lazy loading, component optimization, and memory management utilities
/* eslint-disable react-refresh/only-export-components */

import { lazy, Suspense, memo, useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

// Lazy component loader with error boundary
export const createLazyComponent = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  
  return memo((props) => (
    <Suspense fallback={fallback || <ComponentFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  ));
};

// Default loading fallback component
const ComponentFallback = memo(() => (
  <motion.div
    className="flex items-center justify-center p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center space-x-2 text-primary">
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  </motion.div>
));

ComponentFallback.displayName = 'ComponentFallback';

// Enhanced Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const defaultOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
    ...options
  }), [options]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);
        
        if (intersecting && defaultOptions.triggerOnce && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      defaultOptions
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [defaultOptions, hasIntersected]);

  return [elementRef, isIntersecting || hasIntersected];
};

// Optimized scroll handler with throttling
export const useOptimizedScroll = (callback, _delay = 16) => {
  const timeoutRef = useRef();
  const callbackRef = useRef(callback);

  // Keep callback reference current
  useEffect(() => {
    callbackRef.current = callback;
  });

  const optimizedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      cancelAnimationFrame(timeoutRef.current);
    }
    
    timeoutRef.current = requestAnimationFrame(() => {
      callbackRef.current(...args);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
    };
  }, []);

  return optimizedCallback;
};

// Memory-efficient animation state manager
export const useAnimationState = (initialState = false) => {
  const [isAnimating, setIsAnimating] = useState(initialState);
  const animationRef = useRef();

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const endAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const scheduleAnimation = useCallback((duration = 1000) => {
    startAnimation();
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    animationRef.current = setTimeout(endAnimation, duration);
  }, [startAnimation, endAnimation]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return {
    isAnimating,
    startAnimation,
    endAnimation,
    scheduleAnimation
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const startTimeRef = useRef();
  const renderCountRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    renderCountRef.current += 1;

    return () => {
      if (startTimeRef.current) {
        const duration = performance.now() - startTimeRef.current;
        
        // Only log in development and for slow renders
        if (import.meta.env.DEV && duration > 16) {
          console.warn(`${componentName} render took ${duration.toFixed(2)}ms (render #${renderCountRef.current})`);
        }
      }
    };
  });

  return {
    renderCount: renderCountRef.current,
    logPerformance: (operation, duration) => {
      if (import.meta.env.DEV && duration > 10) {
        console.warn(`${componentName} ${operation} took ${duration.toFixed(2)}ms`);
      }
    }
  };
};

// Debounced resize handler
export const useDebouncedResize = (callback, delay = 250) => {
  const timeoutRef = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  useEffect(() => {
    window.addEventListener('resize', debouncedCallback);
    
    return () => {
      window.removeEventListener('resize', debouncedCallback);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedCallback]);

  return debouncedCallback;
};

// Optimized component memoization helper
export const createMemoComponent = (component, propsAreEqual) => {
  const MemoComponent = memo(component, propsAreEqual);
  MemoComponent.displayName = component.displayName || component.name || 'MemoComponent';
  return MemoComponent;
};

// GPU-optimized transform utilities
export const gpuOptimizedTransforms = {
  // Use transform3d to trigger GPU acceleration
  translateX: (x) => `translate3d(${x}px, 0, 0)`,
  translateY: (y) => `translate3d(0, ${y}px, 0)`,
  translate: (x, y) => `translate3d(${x}px, ${y}px, 0)`,
  scale: (scale) => `scale3d(${scale}, ${scale}, 1)`,
  rotate: (deg) => `rotateZ(${deg}deg)`,
  
  // Performance-optimized animation configs
  springConfig: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
  },
  
  easeConfig: {
    type: "tween",
    ease: [0.25, 0.8, 0.25, 1],
    duration: 0.6
  }
};

// Cleanup utility for component unmounting
export const useCleanup = (cleanupFunctions = []) => {
  const cleanupRef = useRef(cleanupFunctions);

  useEffect(() => {
    cleanupRef.current = cleanupFunctions;
  });

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, []);

  const addCleanup = useCallback((cleanup) => {
    cleanupRef.current.push(cleanup);
  }, []);

  return addCleanup;
};

export default {
  createLazyComponent,
  useIntersectionObserver,
  useOptimizedScroll,
  useAnimationState,
  usePerformanceMonitor,
  useDebouncedResize,
  createMemoComponent,
  gpuOptimizedTransforms,
  useCleanup
};