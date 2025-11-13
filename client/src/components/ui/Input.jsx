import React from 'react';
import { cn } from '../../lib/utils';

// Basic input for demo
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Input;