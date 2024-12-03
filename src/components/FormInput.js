import React from 'react';

const FormInput = ({ label, id, value, onChange, type = 'text', required = false, darkMode, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
      }`}
      required={required}
      {...props}
    />
  </div>
);

export default FormInput;