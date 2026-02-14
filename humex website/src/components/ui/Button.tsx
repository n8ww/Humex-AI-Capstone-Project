import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary:
    'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-transparent',
    secondary:
    'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
    outline:
    'bg-transparent border border-red-500 text-red-500 hover:bg-red-950/30',
    ghost:
    'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white'
  };
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };
  return (
    <motion.button
      whileHover={{
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98
      }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}>

      {children}
    </motion.button>);

}