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
            selectedCategories: [],
            activeTab: 'likes',
            commentInput: '',
            categories: [
                { id: 0, name: "Hello darkness my old friend" },
                { id: 1, name: "two" },
                { id: 2, name: "three" },
                { id: 3, name: "four" },
                { id: 4, name: "five" },
                { id: 5, name: "six" }
            ],
            comments: [
                {
                    username: "John Doe 1",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in mauris neque. Maecenas at nisl sit amet augue sollicitudin convallis. Sed et felis maximus, ultrices libero non, mattis diam. ",
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
            ],
            likes: [
                {category_id: 1, title: "Kimetsu No Yaiba", subtitle: "Demon Slayer", category: "Anime", type: "like"},
                {category_id: 2, title: "Avengers", subtitle: "Endgame", category: "Movie", type: "dislike"}
            ]
        }
    }

    funcOnSelectCategory = (category) => {
        const selectedCategories = this.state.selectedCategories;

        if (selectedCategories.includes(category)) {
            const newSelection = selectedCategories
                .filter(selectedCategory => selectedCategory.id !== category.id);

            this.setState({
                selectedCategories: newSelection
            })
        } else {
            this.setState({
                selectedCategories: [...this.state.selectedCategories, category]
            });
        }

    }

    funcOnGenerateItems = () => {
        console.log("GENERATED!");
    }

    funcOnCommentChange = (ev) => {
        this.setState({
            commentInput: ev.target.value
        })
    }

    funcOnSubmitComment = () => {
        console.log("COMMENT: ", this.state.commentInput)
    }

    funcOnClickProfile = () => {
        this.setState({
            hideProfile: !this.state.hideProfile
        });
    }

    funcOnChangeTab = (e) => {
        this.setState({
            activeTab: e
        })
    }


    render() {
        return (
            <section className="main-container">
                <Row>
                    <Col className="col-3 m-0 category">
                        <CATEGORY_LIST
                            categories={this.state.categories}
                            funcOnSelectCategory={this.funcOnSelectCategory.bind(this)}
                            selectedCategories={this.state.selectedCategories}
                            funcOnGenerateItems={this.funcOnGenerateItems.bind(this)}
                        />
                    </Col>
                    <Col className="content">
                        <Content />
                    </Col>
                    <Col className="col-3 comment">
                        <COMMENT_LIST
                            {...this.state}
                            funcOnCommentChange={this.funcOnCommentChange.bind(this)}
                            funcOnSubmitComment={this.funcOnSubmitComment.bind(this)}
                            funcOnClickProfile={this.funcOnClickProfile.bind(this)}
                            funcOnChangeTab={this.funcOnChangeTab.bind(this)}
                        />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default Dashboard;