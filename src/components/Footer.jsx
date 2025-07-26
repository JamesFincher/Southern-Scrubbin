import { motion } from 'motion/react';
import { sparkleVariants } from '../utils/animations';
import { BackgroundSparkles, RandomSparkle } from '../utils/randomSparkles.jsx';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white py-8 overflow-hidden">
      {/* Subtle background sparkles - fewer and lighter for footer */}
      <BackgroundSparkles 
        count={4} 
        className="opacity-20" 
        sparkleEmoji="✨"
      />
      
      {/* Additional positioned sparkles for subtle ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '20%', y: '25%' }} 
          size={0.6}
          className="text-primary-200 opacity-30"
        />
        <RandomSparkle 
          type="randomFloating" 
          position={{ x: '80%', y: '60%' }} 
          size={0.5}
          className="text-secondary-200 opacity-25"
          emoji="⭐"
        />
        <RandomSparkle 
          type="randomTwinkling" 
          position={{ x: '15%', y: '75%' }} 
          size={0.4}
          className="text-primary-300 opacity-20"
          emoji="💫"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Logo with sparkle on hover */}
        <motion.h3 
          className="text-xl font-bold mb-4 relative inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Sparkle Scrub
          {/* Logo sparkle effect on hover */}
          <motion.div
            className="absolute -top-1 -right-2 text-secondary opacity-0 pointer-events-none"
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            ✨
          </motion.div>
        </motion.h3>
        
        {/* Social links with sparkle effects */}
        <div className="flex gap-4 justify-center mb-6">
          <motion.a 
            href="https://facebook.com/sparklescrub" 
            className="relative text-blue-400 hover:text-blue-300 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Facebook
            <motion.div
              className="absolute -top-1 -right-1 text-xs opacity-0 pointer-events-none"
              whileHover={{ opacity: 1, rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              ✨
            </motion.div>
          </motion.a>
          <motion.a 
            href="https://instagram.com/sparklescrub" 
            className="relative text-pink-400 hover:text-pink-300 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Instagram
            <motion.div
              className="absolute -top-1 -right-1 text-xs opacity-0 pointer-events-none"
              whileHover={{ opacity: 1, rotate: -180 }}
              transition={{ duration: 0.4 }}
            >
              ⭐
            </motion.div>
          </motion.a>
          <motion.a 
            href="https://tiktok.com/@sparklescrub" 
            className="relative text-gray-400 hover:text-gray-300 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            TikTok
            <motion.div
              className="absolute -top-1 -right-1 text-xs opacity-0 pointer-events-none"
              whileHover={{ opacity: 1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              💫
            </motion.div>
          </motion.a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © {currentYear} Sparkle Scrub • Knoxville, TN
        </p>
      </div>
    </footer>
  );
};

export default Footer;