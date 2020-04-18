/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React from 'react';
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';

const LOAD_LIKES = (props) => {
    return (
        <React.Fragment>
            {props.like_list && props.like_list.map((like) => {
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
                                        <Button
                                            variant="danger"
                                            onClick={props.funcModalShow.bind(this, like, true)}
                                        >See more</Button>
                                    </div>
                                </Card.Body>
                            </Card> : null
                        }
                    </React.Fragment>
                )
            })}
            {!props.consistLike && !props.loadLike ? <div className="text-secondary empty-list"><h4>No Likes available</h4></div> : null}
        </React.Fragment>
    )
}


const LOAD_DISLIKES = (props) => {
    return (
        <React.Fragment>
            {props.like_list && props.like_list.map((like) => {
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
                                        <Button
                                            variant="danger"
                                            onClick={props.funcModalShow.bind(this, like, true)}
                                        >See more</Button>
                                    </div>
                                </Card.Body>
                            </Card> : null
                        }
                    </React.Fragment>
                )
            })}
            {!props.consistDislike && !props.loadLike ? <div className="text-secondary empty-list"><h4>No Dislikes available</h4></div> : null}
        </React.Fragment>
    )
}


const LIKE_LIST = (props) => {
    return (
        <React.Fragment>
            {props.loadLike ?
                <div className="spinner-container">
                    <Spinner variant="primary" animation="border" />
                </div>
                : null
            }
            {props.activeTab === 'likes' ?
                <LOAD_LIKES {...props} />
                :
                <LOAD_DISLIKES {...props} />
            }
        </React.Fragment>
    )
}

export default LIKE_LIST;