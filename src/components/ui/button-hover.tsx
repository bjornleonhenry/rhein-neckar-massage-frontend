import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonHoverProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function ButtonHover({
  children,
  className,
  variant = 'primary',
  disabled = false,
  onClick,
  type = 'button'
}: ButtonHoverProps) {
  const baseStyles = "relative overflow-hidden font-semibold transition-all duration-300 transform shadow-lg text-center";

  const variants = {
    primary: disabled ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-rose-600 text-white hover:bg-rose-700 hover:scale-105 cursor-pointer",
    secondary: disabled ? "border-2 border-gray-600 text-gray-400 cursor-not-allowed" : "border-2 border-rose-600 text-rose-400 hover:bg-rose-600 hover:text-white cursor-pointer"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], className)}
      whileHover={disabled ? {} : {
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      onClick={disabled ? undefined : onClick}
    >
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
