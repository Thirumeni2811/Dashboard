import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#121312] px-3 py-2 text-sm font-semibold text-[#FEFBD8]"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          Project 1
          <svg
            className="-mr-1 h-5 w-5 text-[#FEFBD8]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 left-0 xs:left-1/2 xs:-translate-x-1/2 z-10 mt-2.5 w-52 origin-top-right divide-y divide-[#FEFBD8] rounded-md bg-[#121312] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <p
              className="block px-4 py-2 text-sm text-[#FEFBD8]"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-4"
            >
              Your Projects
            </p>
          </div>
          <div className="py-1" role="none">
            <Link
              to='/overview'
              className="block px-4 py-2 text-sm text-[#FEFBD8]"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Project 1
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-[#FEFBD8]"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Project 2
            </Link>
          </div>
          <div className="py-1" role="none">
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-[#FEFBD8]"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Project 3
            </Link>

            <Link
              href="#"
              className="block px-4 py-2 text-sm text-[#FEFBD8]"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
            >
              Project 4
            </Link>
          </div>
          <div className="py-1" role="none">
            <button
              className=" px-4 py-2 text-sm text-[#FEFBD8] flex items-center"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-6"
            >
              <AddIcon className='-mt-1 mr-1'/>
              New Project
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;
