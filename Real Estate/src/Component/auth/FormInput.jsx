import React from 'react';

const FormInput = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  icon,
  required,
  autoComplete,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          className={`block w-full ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2.5 border ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;