
import React from 'react';


const Button = ({ text, onClick, className, style, type = ""}) => {
  return (
    <button 
      type={type ? type : "button"} 
      className={`btn ${className}`} 
      onClick={onClick} 
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
