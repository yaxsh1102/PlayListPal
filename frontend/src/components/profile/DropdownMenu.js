import React from 'react';

const DropdownMenu = ({ visible, onClose, options, dropdownRef }) => {
  if (!visible) return null;

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              option.onClick();
              onClose();
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;