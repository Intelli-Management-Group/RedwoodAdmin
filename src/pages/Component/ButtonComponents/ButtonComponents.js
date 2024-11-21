
import React from 'react';


const Button = ({ text, disabled, onClick, className, style, type = ""}) => {
  return (
    <button 
      type={type ? type : "button"} 
      className={`btn ${className}`} 
      onClick={onClick} 
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
