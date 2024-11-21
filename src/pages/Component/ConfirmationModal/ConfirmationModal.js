import React from "react";
import "./ConfirmationDialog.css"; // Styles for centering and appearance

const ConfirmationDialog = ({ 
    isVisible, 
    title, 
    message, 
    onConfirm, 
    onCancel 
}) => {
    if (!isVisible) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h4 className="dialog-title">{title}</h4>
                <p className="dialog-message">{message}</p>
                <div className="dialog-actions">
                    <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
                    <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
