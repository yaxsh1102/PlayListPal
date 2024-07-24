import React, { useEffect, useRef, useState } from 'react';

const options = [
  'Straight', 'Gay', 'Lesbian', 'Bisexual', 'Asexual', 'Demisexual', 'Pansexual', 'Queer'
];

const SexualOrientation = ({ isEditingMatchesProfile }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div ref={dropdownRef} className="relative mt-1 b">
      <button 
        onClick={toggleDropdown}
        className={`w-full px-3 py-2 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400 ${!isEditingMatchesProfile && 'cursor-not-allowed'}`} 
        disabled={!isEditingMatchesProfile}
      >
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select orientations...'}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-black border border-gray-500 rounded-md shadow-lg ">
          {options.map(option => (
            <div 
              key={option} 
              className="px-3 py-2 cursor-pointer hover:bg-gray-400" 
              onClick={() => handleOptionChange(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
                disabled={!isEditingMatchesProfile}
              />
              <span className="ml-2 text-black">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SexualOrientation;
