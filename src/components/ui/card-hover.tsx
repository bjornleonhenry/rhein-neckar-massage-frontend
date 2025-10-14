import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardHoverProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function CardHover({
  children,
  className,
  intensity = 'medium'
}: CardHoverProps) {
  const intensityValues = {
    low: { scale: 1.01, rotate: 0 },
    medium: { scale: 1.03, rotate: 0 },
    high: { scale: 1.05, rotate: 0 }
  };

  return (
    <motion.div
      className={cn("relative overflow-visible", className)}
      whileHover={{
        // Keep hover subtle: only scale slightly and avoid heavy 3D transforms
        scale: intensityValues[intensity].scale
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        // avoid forcing preserve-3d which can cause blurry rendering on some GPUs
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {children}
        <motion.div
          className="absolute top-0 left-0 h-full w-2/5 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
          initial={{ x: '-80%' }}
          whileHover={{ x: '80%' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
