import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assuming you're using Font Awesome

const Button = ({
  text,
  disabled,
  onClick,
  className,
  style,
  type = "",
  icon, // New prop for the icon
  iconSize = "lg" // Optional size prop for the icon
}) => {
  return (
    <button 
      type={type ? type : "button"} 
      className={`btn ${className}`} 
      onClick={onClick} 
      style={style}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} size={iconSize} />} {/* Render icon if provided */}
      {text && <span>{text}</span>} {/* Render text if provided */}
    </button>
  );
};

export default Button;
