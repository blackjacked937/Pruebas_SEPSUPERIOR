import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalBasic.css";

export function ModalBasic(props) {
  const { show, size, icon, title, subtitle, align, children, onClose } = props;
  const isLeftAligned = align === "left";

  return (
    <Modal className="model-basic" show={show} onHide={onClose} size={size}>
      {title && (
        <Modal.Header
          closeButton
          style={
            isLeftAligned
              ? { borderBottom: "none", padding: "1.5rem 1.5rem 0 1.5rem" }
              : {}
          }>
          {isLeftAligned ? (
            <div
              className="w-100 d-flex align-items-center"
              style={{ gap: "15px" }}>
              {icon && <div className="modal-icon-left">{icon}</div>}
              <div className="d-flex flex-column text-start">
                <h4 className="modal-title-left mb-0">{title}</h4>
                {subtitle && (
                  <span className="modal-subtitle-left mt-1">{subtitle}</span>
                )}
              </div>
            </div>
          ) : (
            <>
              {icon && <div className="iconcolor me-2">{icon}</div>}
              <div className="w-100 fs-5 text-center">{title}</div>
            </>
          )}
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

ModalBasic.defaultProps = {
  size: "sm",
  align: "center",
};
