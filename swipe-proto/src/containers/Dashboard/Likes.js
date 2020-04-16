import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const LOAD_LIKES = ({ like_list }) => {
    return (
        <React.Fragment>
            {like_list && like_list.map((like) => {
                return (
                    <React.Fragment key={like.id}>
                        {like.status === "like" ?
                            <Card key={like.id} className="card-like">
                                <Card.Body>
                                    <Row>
                                        <Col className="col-8">
                                            <div className="category">{like.category}</div>
                                            <Card.Title>
                                                {like.title}
                                            </Card.Title>
                                            <Card.Subtitle>{like.subtitle}</Card.Subtitle>
                                        </Col>
                                        <Col>
                                            <i className="fa fa-share" />
                                        </Col>
                                    </Row>
                                    <div className="w-100 text-right">
                                        <Button variant="danger">See more</Button>
                                    </div>
                                </Card.Body>
                            </Card> : null
                        }
                    </React.Fragment>
                )
            })}
            {like_list.length === 0 ? <div className="text-secondary empty-list"><h4>No Likes available</h4></div> : null}
        </React.Fragment>
    )
}


const LOAD_DISLIKES = ({ like_list }) => {
    return (
        <React.Fragment>
            {like_list && like_list.map((like) => {
                return (
                    <React.Fragment key={like.category_id}>
                        {like.status === "dislike" ?
                            <Card key={like.category_id} className="card-like">
                                <Card.Body>
                                    <Row>
                                        <Col className="col-8">
                                            <div className="category">{like.category}</div>
                                            <Card.Title>
                                                {like.title}
                                            </Card.Title>
                                            <Card.Subtitle>{like.subtitle}</Card.Subtitle>
                                        </Col>
                                        <Col>
                                            <i className="fa fa-share" />
                                        </Col>
                                    </Row>
                                    <div className="w-100 text-right">
                                        <Button variant="danger">See more</Button>
                                    </div>
                                </Card.Body>
                            </Card> : null
                        }
                    </React.Fragment>
                )
            })}
            {like_list.length === 0 ? <div className="text-secondary empty-list"><h4>No Dislikes available</h4></div> : null}
        </React.Fragment>
    )
}


const LIKES = (props) => {
    return (
        <section className="content-like">
            <Container className="overflow-auto">
                {props.activeTab === 'likes' ?
                    <LOAD_LIKES {...props} />
                    :
                    <LOAD_DISLIKES {...props} />
                }
            </Container>
        </section>
    )
}

export default LIKES;