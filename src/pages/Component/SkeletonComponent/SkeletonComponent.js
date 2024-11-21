
import React from 'react';


const Skeleton = ({ type = "text", width, height }) => {
  
  
    return (
    <tr>
             <td><div className="skeleton-box" style={{ width: '20px', height: '20px',}} /></td>
             <td><div className="skeleton-box" style={{ width: '50px', height: '50px' }} /></td>
             <td><div className="skeleton-box" style={{ width: '150px', height: '20px' }} /></td>
             <td><div className="skeleton-box" style={{ width: '100px', height: '20px' }} /></td>
             <td><div className="skeleton-box" style={{ width: '80px', height: '30px' }} /></td>
         </tr>
         )
  };

export default Skeleton;
