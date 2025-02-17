import React from "react";
import './CustomLoader.css'; // Import custom loader styles

const CustomLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="custom-loader"></div>
    </div>
  );
};

export default CustomLoader;
