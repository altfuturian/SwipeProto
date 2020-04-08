import React from 'react';
import { Col, Container, Card } from 'react-bootstrap';

const LOAD_LIST = ({ list }) => {
    console.log(list)
    return (
        <Container>
            {list && list.map((comment, index) => {
                return (
                    <Card key={index}>
                        <Card.Body>
                            <Card.Title>{comment.username}</Card.Title>
                            <Card.Subtitle>{comment.datetime}</Card.Subtitle>
                            <Card.Text>{comment.comment}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
    )
}

const COMMENT_LIST = ({ comments }) => {
    console.log(comments)
    return (
        <React.Fragment>
            <section className="header-comment">
                <Col>
                    <div>
                        <Container>
                            <h3> Comments </h3>
                        </Container>
                    </div>
                </Col>
            </section>
            <LOAD_LIST
                list={comments}
            />
        </React.Fragment>
    )

}

export default COMMENT_LIST;