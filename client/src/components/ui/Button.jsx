import React from 'react';
import { cn } from '../../lib/utils'; // Import the cn utility

// Basic button for demo
const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'w-full px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className // Allows overriding styles
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Button;