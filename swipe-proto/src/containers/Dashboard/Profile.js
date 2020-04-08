import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import LIKES from './Likes';
import DISLIKES from './Dislikes';

const PROFILE = (props) => {
    return (
        <React.Fragment>
            <section className="header-profile">
                <Container className="container-profile">
                    <div onClick={props.funcOnClickProfile.bind(this)} className="back-profile">Back</div>
                    <div className="content-user">
                        <div className="profile-user-avatar" />
                        <h5>User name</h5>
                    </div>
                </Container>
            </section>
            <section className="content-profile">
                <Tabs defaultActiveKey="like" id="tab">
                    <Tab eventKey="like" title="Like" className="w-50">
                        <LIKES />
                    </Tab>
                    <Tab eventKey="dislike" title="Dislikes" className="w-50">
                        <DISLIKES />
                    </Tab>
                </Tabs>
            </section>
        </React.Fragment>
    )
}

export default PROFILE;