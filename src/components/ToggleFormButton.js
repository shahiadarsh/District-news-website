import React from 'react';

const ToggleFormButton = ({ onClick, showForm, showText, hideText, className }) => (
  <button
    onClick={onClick}
    className={`${className} px-4 py-2 rounded transition duration-200 mb-4`}
  >
    {showForm ? hideText : showText}
  </button>
);
export default ToggleFormButton;