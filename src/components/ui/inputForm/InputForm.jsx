import React from 'react';
import { Form } from 'react-bootstrap';

import './InputForm.css';
export function InputForm(props) {

    const {
        label, labelDirection,
        nameInput, placeHolderInput,
        valueInput, onChangeInput,
        type, rows, error, touched,
        disabled, size, accept, col,
        icon,
        ...rest
    } = props;

    const isError = touched && error;
    const currentBorderColor = touched && error ? "red" : "#4DB6AC57";

    return (
        <Form.Group className={`${col} conteiner-input`} >
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
                    <Form.Control
                        className={`input-control-borderless ${labelDirection}`}
                        name={nameInput}
                        type={type}
                        accept={accept}
                        placeholder={placeHolderInput}
                        rows={rows}
                        value={valueInput}
                        onChange={onChangeInput}
                        disabled={disabled}
                        size={size}
                        {...rest}
                    />
                </div>
            </div>

            <Form.Text className="text-danger">
                {isError ?
                    <div className="text-danger mt-1">{error}</div>
                    : null}
            </Form.Text>
        </Form.Group>
    )
}