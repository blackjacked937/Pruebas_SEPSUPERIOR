import React from 'react';
import { Form } from 'react-bootstrap';
import './SelectForm.css';

export function SelectForm(props) {
    const {
        label, labelDirection,
        name, value, onChange,
        options, error, touched,
        disabled, size, col,
        icon,
        placeholder,
        ...rest
    } = props;

    const isError = touched && error;
    const currentBorderColor = isError ? "red" : "#4DB6AC57";

    return (
        <Form.Group className={`${col} conteiner-input`}>
            {label && <Form.Label className={labelDirection}>{label}</Form.Label>}
            <div className="center">
                <div
                    className="custom-input-wrapper"
                    style={{ borderColor: currentBorderColor }}
                >
                    {icon && (
                        <div className="custom-icon-block">
                            {icon}
                        </div>
                    )}
                    <Form.Select
                        className={`input-control-borderless ${labelDirection}`}
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        size={size}
                        {...rest}
                    >
                        <option value="">
                            {placeholder || "Seleccione una opción..."}
                        </option>
                        {options && options.map((opt, index) => (
                            <option key={opt.id || opt.value || index} value={opt.id || opt.value}>
                                {opt.opcion || opt.label}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </div>

            <Form.Text className="text-danger">
                {isError ?
                    <div className="text-danger mt-1">{error}</div>
                    : null}
            </Form.Text>
        </Form.Group>
    );
}