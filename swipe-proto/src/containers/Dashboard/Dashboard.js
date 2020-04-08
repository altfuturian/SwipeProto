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
            categories: [
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
                }
            ]
        }
    }



    render() {
        return (
            <div >
                <Row className="main-container">
                    <Col className="col-3 m-0 category">
                        <CATEGORY_LIST
                            categories={this.state.categories}
                        />
                    </Col>
                    <Col>
                        <Content />
                    </Col>
                    <Col className="col-3 comment">
                        <COMMENT_LIST 
                            comments={this.state.comments}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;