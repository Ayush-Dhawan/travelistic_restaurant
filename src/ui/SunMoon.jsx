import React from 'react';
import './SunMoon.css'
import { useDarkModeContext } from '../contexts/DarkmodeContext';

export default function SunMoon() {
    const { isDarkMode, toggleDarkMode } = useDarkModeContext();

    const handleToggle = () => {
      toggleDarkMode(); // Toggle dark mode when the checkbox is clicked
    };

  return (
    <div className="switch">
      <input type="checkbox" className="switch__input" id="Switch" checked={!isDarkMode} 
        onChange={handleToggle} />
      <label className="switch__label" htmlFor="Switch">
        <span className="switch__indicator"></span>
        <span className="switch__decoration"></span>
      </label>
    </div>
  );
}