import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.css';

// Components
import CATEGORY_LIST from './CategoryList'
import COMMENT_LIST from './CommentList'
import CONTENT from './Content'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "hello",
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
                { category_id: 1, title: "Kimetsu No Yaiba", subtitle: "Demon Slayer", category: "Anime", type: "like" },
                { category_id: 2, title: "Avengers", subtitle: "Endgame", category: "Movie", type: "dislike" }
            ],
            resources: [
                {
                    id: "6g5ewhmgo9",
                    title: "Ugh, There's Just Nothing To Do!",
                    subtitle: "April 13, 2020",
                    description: "got bored. made a vid all by my lonesome self. ugh, there's just nothing to do.",
                    res_url: "https://www.youtube.com/embed/KSD2d8uU6Mo",
                    type: "video",
                    liked: false,
                    dislike: false
                },
                {
                    id: "t9pk85cwp7",
                    title: "Drawing EPIC Kimetsu No Yaiba Splash Page! Anime Manga Sketch",
                    subtitle: "July 5, 2019",
                    description: "got bored. made a vid all by my lonesome self. ugh, there's just nothing to do.",
                    res_url: "https://www.youtube.com/embed/fEq5nvvVQ1g?controls=0",
                    type: "video",
                    liked: false,
                    dislike: false
                },
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

    funcOnSwipeLike = (e) => {
        /*
        const resources = [...this.state.resources];;
        let index, newResource;

        for(var i = 0; i < resources.length; i++) {
            if(resources[i]["id"] === e.id) {
                index = i;
                newResource = {
                    ...resources[i],
                    liked: true
                }
                break;
            }
        }
        resources[index] = newResource;

        console.log("HERE", e);
        this.setState({
            resources: resources
        }, () => console.log("RS: ", this.state.resources)
        )
        */
    }

    funcOnSwipeDisLike = (e) => {
        
    }


    render() {
        console.log("VAL: ", this.state.value)
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
                        <CONTENT
                            resources={this.state.resources}
                            funcOnSwipeLike={this.funcOnSwipeLike.bind(this)}
                            funcOnSwipeDisLike={this.funcOnSwipeDisLike.bind(this)}
                        />
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