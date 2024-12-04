import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  touched?: boolean | undefined;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  touched = false, 
  children, 
  required 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {children}
      {touched && error && (
        <p className="mt-1 text-sm text-red-600 transition-all">
          {error.message}
        </p>
      )}
    </div>
  );
};