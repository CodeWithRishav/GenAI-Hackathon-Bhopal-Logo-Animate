import React from 'react';
import { motion, Variants } from 'framer-motion';

// Colors extracted from the logo image
const COLORS = {
  googleBlue: '#4285F4',
  googleRed: '#EA4335',
  googleYellow: '#FBBC04',
  googleGreen: '#34A853',
  textGrey: '#5f6368',
  genOrange: '#F9AB00',
  genGreen: '#34A853',
  genBlue: '#4285F4',
};

// --- Performance Optimized Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Increased from 0.05 to 0.12 for slower sequence
      delayChildren: 0.2,
      when: "beforeChildren"
    },
  },
};

const letterVariants: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0, 
    scale: 0.8,
    // Performance: Removed 'filter: blur' to ensure high FPS on all devices
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,    // Increased damping for less jitter
      stiffness: 100, // Reduced from 200 to 100 for slower movement
      mass: 1.2       // Increased mass for a "heavier", more luxurious feel
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120, // Reduced from 260
      damping: 15,
      mass: 1
    },
  },
};

const floatAnimation: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 6, // Slower float (was 4)
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const spinAnimation: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20, // Slower spin (was 12)
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// --- Optimized SVG Components ---
// Using memo to prevent re-renders of static SVGs if parent re-renders

const SparkleStar = React.memo(({ color, className }: { color: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
));

const GeminiSparkle = React.memo(({ color, className }: { color: string; className?: string }) => (
  <svg viewBox="0 0 100 100" fill={color} className={className}>
    <path d="M50 0 C50 0 60 35 100 50 C60 65 50 100 50 100 C50 100 40 65 0 50 C40 35 50 0 50 0 Z" />
  </svg>
));

const RedCircleO = React.memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="50" fill={COLORS.googleRed} />
    <path d="M5 50 A 45 45 0 0 0 95 50 C 95 65 95 65 95 50" fill="none" stroke="white" strokeWidth="0" />
    <path d="M 10 45 Q 50 90 90 45" fill="white" />
  </svg>
));

const BlueAsterisk = React.memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill={COLORS.googleBlue} className={className}>
    <path d="M12 2L14.5 8.5L21 6.5L17 12L21 17.5L14.5 15.5L12 22L9.5 15.5L3 17.5L7 12L3 6.5L9.5 8.5L12 2Z" />
     <circle cx="12" cy="12" r="3" fill="white" />
  </svg>
));

// Helper for Letters to reduce boilerplate
const Letter = ({ children, color }: { children: React.ReactNode, color: string }) => (
    <motion.span 
        variants={letterVariants} 
        className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight" 
        style={{ 
          color, 
          display: 'inline-block', 
          willChange: 'transform, opacity',
          textShadow: '0 2px 10px rgba(0,0,0,0.12)' // Subtle premium shadow
        }}
    >
        {children}
    </motion.span>
);

// Variant for smaller text
const LetterSmall = ({ children, color }: { children: React.ReactNode, color: string }) => (
    <motion.span 
        variants={letterVariants} 
        className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight" 
        style={{ 
          color, 
          display: 'inline-block', 
          willChange: 'transform, opacity',
          textShadow: '0 2px 10px rgba(0,0,0,0.12)' // Subtle premium shadow
        }}
    >
        {children}
    </motion.span>
);

export const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center select-none cursor-default relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ROW 1: GenAI Hackathon */}
      <div className="flex flex-wrap justify-center items-end leading-none gap-x-3 gap-y-4">
        
        {/* "GenAI" Group */}
        <div className="flex items-baseline">
            <Letter color={COLORS.genOrange}>G</Letter>
            <Letter color={COLORS.genGreen}>e</Letter>
            <Letter color={COLORS.genBlue}>n</Letter>
            
            {/* AI */}
            <div className="flex items-baseline relative ml-[2px]">
              <Letter color={COLORS.genOrange}>A</Letter>
              
              <div className="relative flex flex-col justify-end">
                  <Letter color={COLORS.genOrange}>I</Letter>
                  
                  {/* Blue Sparkle on 'I' */}
                  <motion.div 
                    variants={iconVariants}
                    className="absolute -top-3 -right-4 sm:-top-4 sm:-right-5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 z-10"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <motion.div variants={floatAnimation} animate="animate" className="w-full h-full">
                       <SparkleStar color={COLORS.googleBlue} />
                    </motion.div>
                  </motion.div>
              </div>
            </div>
        </div>

        {/* "Hackathon" Group */}
        <div className="flex items-baseline">
          <LetterSmall color={COLORS.textGrey}>H</LetterSmall>
          
          {/* 'a' replaced by Green Sparkle */}
          <motion.div 
            variants={iconVariants} 
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-0.5 mb-1 self-center"
            style={{ willChange: 'transform, opacity' }}
          >
             <GeminiSparkle color={COLORS.genGreen} />
          </motion.div>

          <LetterSmall color={COLORS.textGrey}>c</LetterSmall>
          <LetterSmall color={COLORS.textGrey}>k</LetterSmall>
          <LetterSmall color={COLORS.textGrey}>a</LetterSmall>
          <LetterSmall color={COLORS.textGrey}>t</LetterSmall>
          <LetterSmall color={COLORS.textGrey}>h</LetterSmall>
          
          {/* 'o' replaced by Red Circle */}
          <motion.div 
            variants={iconVariants} 
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-0.5 self-center mb-2"
            style={{ willChange: 'transform, opacity' }}
          >
            <RedCircleO />
          </motion.div>
          
          <LetterSmall color={COLORS.textGrey}>n</LetterSmall>
        </div>
      </div>

      {/* ROW 2: Bhopal */}
      <div className="flex items-baseline mt-1 sm:mt-2">
        <LetterSmall color={COLORS.textGrey}>B</LetterSmall>
        <LetterSmall color={COLORS.textGrey}>h</LetterSmall>
        
        {/* 'o' replaced by Blue Asterisk */}
        <motion.div 
            variants={iconVariants} 
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-1 self-center"
            style={{ willChange: 'transform, opacity' }}
        >
             <motion.div 
                variants={spinAnimation} 
                animate="animate" 
                className="w-full h-full"
                style={{ willChange: 'transform' }} // Hint for the spinning element
            >
                <BlueAsterisk />
             </motion.div>
        </motion.div>

        <LetterSmall color={COLORS.textGrey}>p</LetterSmall>
        <LetterSmall color={COLORS.textGrey}>a</LetterSmall>
        <LetterSmall color={COLORS.textGrey}>l</LetterSmall>
      </div>

    </motion.div>
  );
};