import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const LOAD_LIKES = ({ likes }) => {
    console.log("LIKE TAB")
    return (
        <React.Fragment>
            {likes && likes.map((like) => {
                return (
                    <React.Fragment key={like.category_id}>
                        {like.type === "like" ?
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
        </React.Fragment>
    )
}


const LOAD_DISLIKES = ({ likes }) => {
    return (
        <React.Fragment>
            {likes && likes.map((like) => {
                return (
                    <React.Fragment key={like.category_id}>
                        {like.type === "dislike" ?
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
        </React.Fragment>
    )
}


const LIKES = (props) => {
    console.log(props)
    return (
        <section className="content-like">
            <Container className="overflow-auto">
                {props.type === 'likes' ?
                    <LOAD_LIKES {...props} />
                    :
                    <LOAD_DISLIKES {...props} />
                }
            </Container>
        </section>
    )
}

export default LIKES;