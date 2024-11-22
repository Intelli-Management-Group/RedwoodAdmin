
import React from 'react';


const Skeleton = ({ columns = 5 }) => {
  
  
    return (
        // <tr>
        //         <td><div className="skeleton-box" style={{ width: '20px', height: '20px',}} /></td>
        //         <td><div className="skeleton-box" style={{ width: '50px', height: '50px' }} /></td>
        //         <td><div className="skeleton-box" style={{ width: '150px', height: '20px' }} /></td>
        //         <td><div className="skeleton-box" style={{ width: '100px', height: '20px' }} /></td>
        //         <td><div className="skeleton-box" style={{ width: '80px', height: '30px' }} /></td>
           
        //     </tr>
        <tr>
        {Array(columns)  // Dynamically generate the skeleton cells
          .fill(0)
          .map((_, index) => (
            <td key={index}>
              <div
                className="skeleton-box"
                style={{
                  width: "100%", // Full width of the column
                  height: "20px", // You can adjust the height as needed
                }}
              />
            </td>
          ))}
      </tr>
         )
  };

export default Skeleton;
