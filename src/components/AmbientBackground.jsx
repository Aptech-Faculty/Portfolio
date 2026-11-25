import { motion } from 'motion/react';

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Architectural Grid Layer */}
      <div className="absolute inset-0 bg-architectural-grid opacity-90 dark:opacity-75" />

      {/* Drifting Soft Cobalt & Sky Atmospheric Orbs (prominent in Light Mode, restrained in Dark Mode) */}
      <motion.div
        animate={{
          x: [0, 48, -24, 0],
          y: [0, -32, 24, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-blue-400/20 dark:bg-blue-600/12 blur-3xl will-change-transform"
      />

      <motion.div
        animate={{
          x: [0, -56, 30, 0],
          y: [0, 40, -28, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[18%] -right-28 w-[560px] h-[560px] rounded-full bg-sky-300/25 dark:bg-blue-500/10 blur-3xl will-change-transform"
      />

      <motion.div
        animate={{
          x: [0, 36, -36, 0],
          y: [0, -26, 20, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-12%] left-[25%] w-[480px] h-[480px] rounded-full bg-indigo-300/18 dark:bg-blue-700/10 blur-3xl will-change-transform"
      />

      {/* Subtle Sweeping Architectural Grid Beams (compositor-only translate + opacity) */}
      <motion.div
        animate={{
          x: ['-20%', '120%'],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
        className="absolute top-36 left-0 h-px w-64 bg-gradient-to-r from-transparent via-blue-500/45 dark:via-blue-400/35 to-transparent will-change-transform"
      />

      <motion.div
        animate={{
          x: ['120%', '-20%'],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
          repeatDelay: 2,
        }}
        className="absolute top-[62%] left-0 h-px w-72 bg-gradient-to-r from-transparent via-sky-500/40 dark:via-blue-400/25 to-transparent will-change-transform"
      />

      <motion.div
        animate={{
          y: ['-20%', '120%'],
          opacity: [0, 0.55, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'linear',
          delay: 1.5,
          repeatDelay: 3,
        }}
        className="absolute top-0 left-[28%] w-px h-56 bg-gradient-to-b from-transparent via-blue-500/35 dark:via-blue-400/25 to-transparent will-change-transform"
      />
    </div>
  );
}
