import React from 'react';
import { Modal } from 'react-bootstrap';

const SHARE_MODAL = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.modal_details.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="res_url h5">URL: <i>{props.modal_details.res_url}</i></div>
            </Modal.Body>
        </Modal>
    )
}

export default SHARE_MODAL;