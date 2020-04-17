/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React from 'react';
import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import LIKE_LIST from './LikeList';

const PROFILE = (props) => {
    console.log("PROF: ", props.user)
    let likeTab = "tab-nav d-flex align-items-center";
    let dislikeTab = "tab-nav d-flex align-items-center";

    if (props.activeTab === 'likes') {
        likeTab = likeTab.concat(' tab-active');
    } else {
        dislikeTab = dislikeTab.concat(' tab-active');
    }

    return (
        <React.Fragment>
            <div className="header-profile">
                <Container className="container-profile">
                    <div onClick={props.funcOnClickProfile.bind(this)} className="back-profile">
                        <i className="fa fa-arrow-left" />
                    </div>
                    <div className="content-user">
                        <div className="profile-user-avatar">
                            <Image
                                src="https://cdn4.iconfinder.com/data/icons/logos-3/426/react_js-512.png"
                                alt="avatar"
                            />
                        </div>
                        <h5>{props.user_info.username}</h5>
                        <Button variant="link">Logout</Button> 
                    </div>
                </Container>
            </div>
            <div>
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
            </div>
            <div className="content-profile">
                <LIKE_LIST
                    {...props}
                    type={props.activeTab}
                />
            </div>
        </React.Fragment>
    )
}

export default PROFILE;