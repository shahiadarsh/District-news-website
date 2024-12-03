import React from 'react';

const Form = ({ onSubmit, children, darkMode }) => (
  <form
    onSubmit={onSubmit}
    className={`p-6 rounded-lg shadow-md ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    {children}
  </form>
);

export default Form;