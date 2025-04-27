import React, { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  as,
  to,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 rounded-md';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const variantStyles = {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 disabled:bg-amber-300',
    secondary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 disabled:bg-indigo-300',
    outline: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-amber-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-300',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;
  
  if (as) {
    const AsComponent = as;
    return (
      <AsComponent
        to={to}
        className={buttonClasses}
        {...props}
      >
        {children}
      </AsComponent>
    );
  }
  
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});

export default Button;