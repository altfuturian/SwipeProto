/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { useState } from 'react';
import { Row, Col, Container, Card, Button, Form, Image, Spinner } from 'react-bootstrap';
import TimeAgo from 'react-timeago';

const LOAD_LIST = ({ list }) => {
    return (
        <Container>
            {list && list.map((comment, index) => {
                return (
                    <Card className="card-comment" key={index}>
                        <Card.Body>
                            <Row>
                                <Col className="col-3 text-center">
                                    <Image
                                        src="https://cdn4.iconfinder.com/data/icons/logos-3/426/react_js-512.png"
                                        alt="avatar"
                                    />
                                </Col>
                                <Col className="pl-0">
                                    <Card.Title>{comment.username}</Card.Title>
                                    <Card.Subtitle><TimeAgo date={comment.datetime} /></Card.Subtitle>
                                    <Card.Text>{comment.comment}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
    )
}

const COMMENT_LIST = (props) => {
    const [comment, setComment] = useState('');
    return (
        <React.Fragment>
            <section className="header-comment">
                <Col>
                    <div>
                        <Row>
                            <Col className="col-8 align-middle">
                                <h3> Comment </h3>
                            </Col>
                            <Col className="text-right">
                                {!props.anonymous ?
                                    <div className="comment-user-profile">
                                        <Image
                                            onClick={props.funcOnClickProfile.bind(this)}
                                            src="https://cdn4.iconfinder.com/data/icons/logos-3/426/react_js-512.png"
                                            alt="avatar"
                                        />
                                    </div> : null
                                }
                            </Col>
                        </Row>
                    </div>
                </Col>
            </section>
            <section className="content-comment overflow-auto">
                {props.isLoading || props.loadCategory ?
                    <div className="spinner-container">
                        <Spinner variant="primary" animation="border" />
                    </div>
                    : null
                }
                {props.comment_list.length > 0 ?
                    <LOAD_LIST
                        list={props.comment_list}
                    />
                    : <React.Fragment>
                        {!props.isLoading && !props.loadCategory ?
                            <div className="text-secondary empty-list"><h4>No comments available</h4></div> : null
                        }
                    </React.Fragment>
                }
            </section>
            <section className="footer-comment">
                <div className="align-items-center justify-content-center">
                    <Form>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Enter something"
                                onChange={(ev) => setComment(ev.target.value)}
                                value={comment}
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        variant="primary"
                        className="w-100"
                        disabled={props.isLoading || !props.top_res || props.anonymous}
                        onClick={() => {
                            props.funcOnSubmitComment(comment);
                            setComment('');
                        }}> Save Comment
                    </Button>
                </div>
            </section>
        </React.Fragment>
    )

}

export default COMMENT_LIST;