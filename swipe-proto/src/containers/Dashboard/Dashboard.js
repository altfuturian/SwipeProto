import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.css';

// Components
import CATEGORY_LIST from './CategoryList'
import COMMENT_LIST from './CommentList'
import Content from './Content'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideProfile: true,
            categories: [
                { name: "one" },
                { name: "two" },
                { name: "three" },
                { name: "four" },
                { name: "five" },
                { name: "six" },
                { name: "seven" },
                { name: "one" },
                { name: "two" },
                { name: "three" },
                { name: "four" },
                { name: "five" },
                { name: "six" },
                { name: "seven" },
                { name: "one" },
                { name: "two" },
                { name: "three" },
                { name: "four" },
                { name: "five" },
                { name: "six" },
                { name: "seven" },
                { name: "one" },
                { name: "two" },
                { name: "three" },
                { name: "four" },
                { name: "five" },
                { name: "six" },
                { name: "seven" }
            ],
            comments: [
                {
                    username: "John Doe 1",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)"
                },
                {
                    username: "John Doe 2",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)"
                },
                {
                    username: "John Doe 3",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)"
                },
                {
                    username: "John Doe 4",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)"
                }
            ]
        }
    }

    funcOnClickProfile = () => {
        this.setState({
            hideProfile: !this.state.hideProfile
        });
    }


    render() {
        return (
            <section className="main-container">
                <Row>
                    <Col className="col-3 m-0 category">
                        <CATEGORY_LIST
                            categories={this.state.categories}
                        />
                    </Col>
                    <Col className="content">
                        <Content />
                    </Col>
                    <Col className="col-3 comment">
                        <COMMENT_LIST
                            hideProfile={this.state.hideProfile}
                            comments={this.state.comments}
                            funcOnClickProfile={this.funcOnClickProfile.bind(this)}
                        />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default Dashboard;