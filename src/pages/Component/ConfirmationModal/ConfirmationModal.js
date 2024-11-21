import React from "react";
import "./ConfirmationDialog.css"; // Styles for centering and appearance
import Button from "../ButtonComponents/ButtonComponents";

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
                    <Button
                        text="Confirm"
                        onClick={onConfirm}
                        className="btn-primary"
                        type="submit"
                    />
                     <Button
                        text="Cancel"
                        onClick={onCancel}
                        className="btn btn-secondary"
                        type="submit"
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
