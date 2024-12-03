import React from 'react';

const FormTextArea = ({ label, id, value, onChange, required = false, darkMode, rows = 4, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
      }`}
      rows={rows}
      required={required}
      {...props}
    ></textarea>
  </div>
);

export default FormTextArea;