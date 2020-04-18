import React from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';

const LIKE_MODAL = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            className="modal-like"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {!props.modalReady ?
                <div className="spinner-container">
                    <Spinner variant="primary" animation="border" />
                </div>
                :
                <React.Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {props.modal_details.category}
                        </Modal.Title>
                    </Modal.Header>
                    {props.modal_details.type === "video" ?
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe
                                title={props.modal_details.title}
                                className="embed-responsive-item"
                                src={props.modal_details.res_url}
                            />
                        </div> : null
                    }
                    {props.modal_details.type === "image" ?
                        <Image
                            className="img-responsive img-fluid"
                            variant="top"
                            src={props.modal_details.res_url}
                        /> : null
                    }
                    <Modal.Body>
                        <div className="title h5">{props.modal_details.title}</div>
                        <div className="subtitle text-secondary mb-2 text-muted h6">{props.modal_details.subtitle}</div>
                        <p
                            className={props.modal_details.type === "article" ? "text modal-article" : "text"}
                        >{props.modal_details.description}</p>
                    </Modal.Body>
                </React.Fragment>
            }
        </Modal>
    )
}

export default LIKE_MODAL;