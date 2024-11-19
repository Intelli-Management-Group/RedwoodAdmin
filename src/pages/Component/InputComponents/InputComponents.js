import React from 'react';

const Input = ({ label, id, type, value, onChange, name, error, required }) => {
    return (
        <div className="col-md-12 mt-4">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                className={`form-control ${error ? "is-invalid" : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
            {error && (
                <span className="invalid-feedback" role="alert">
                    <strong>{error}</strong>
                </span>
            )}
        </div>
    );
};

export default Input;
