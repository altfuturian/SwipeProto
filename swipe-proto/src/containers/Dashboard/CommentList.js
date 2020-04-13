import React from 'react';
import { Row, Col, Container, Card, Button, Form } from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import PROFILE from './Profile';

const LOAD_LIST = ({ list }) => {
    return (
        <Container>
            {list && list.map((comment, index) => {
                return (
                    <Card className="card-comment" key={index}>
                        <Card.Body>
                            <Row>
                                <Col className="col-3">
                                    <div className="comment-avatar"></div>
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

    return (
        <React.Fragment>
            {props.hideProfile ?
                <React.Fragment>
                    <section className="header-comment">
                        <Col>
                            <div>
                                <Row>
                                    <Col className="col-8 align-middle">
                                        <h3> Comment </h3>
                                    </Col>
                                    <Col>
                                        <div
                                            className="user-avatar comment-user-avatar"
                                            onClick={props.funcOnClickProfile.bind(this)}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </section>
                    <section className="content-comment overflow-auto">
                        <LOAD_LIST
                            list={props.comments}
                        />
                    </section>
                    <section className="footer-comment">
                        <Container>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        placeholder="Enter something"
                                        onChange={props.funcOnCommentChange.bind(this)}
                                        value={props.commentInput}
                                    />
                                </Form.Group>
                            </Form>
                                <Button
                                    variant="primary"
                                    className="w-100"
                                    onClick={props.funcOnSubmitComment}> Save Comment
                                </Button>
                        </Container>
                    </section>
                </React.Fragment>
                :
                <PROFILE
                    {...props}
                />
            }

        </React.Fragment>
    )

}

export default COMMENT_LIST;