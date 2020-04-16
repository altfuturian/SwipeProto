import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import LIKES from './Likes';

const PROFILE = (props) => {
    let likeTab = "tab-nav d-flex align-items-center";
    let dislikeTab = "tab-nav d-flex align-items-center";

    if (props.activeTab === 'likes') {
        likeTab = likeTab.concat(' tab-active');
    } else {
        dislikeTab = dislikeTab.concat(' tab-active');
    }

    return (
        <React.Fragment>
            <section className="header-profile">
                <Container className="container-profile">
                    <div onClick={props.funcOnClickProfile.bind(this)} className="back-profile">
                        <i className="fa fa-arrow-left" />
                    </div>
                    <div className="content-user">
                        <div className="profile-user-avatar" />
                        <h5>{props.user.username}</h5>
                    </div>
                </Container>
            </section>
            <section className="content-profile">
                <Row className="tab">
                    <Col
                        className={likeTab}
                        onClick={props.funcOnChangeTab.bind(this, 'likes')}>
                        <Container className="nav-tab">Likes</Container>
                    </Col>
                    <Col
                        className={dislikeTab}
                        onClick={props.funcOnChangeTab.bind(this, 'dislikes')}>
                        <Container className="nav-tab">Dislikes</Container>
                    </Col>
                </Row>
                <LIKES
                    {...props}
                    type={props.activeTab}
                />
            </section>
        </React.Fragment>
    )
}

export default PROFILE;