import React from 'react';

export const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
  >
    {children}
  </button>
);
