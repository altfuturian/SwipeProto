import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.css';

import { db } from './../../config/Firebase'

import * as tbl from './../constants'

import CATEGORY_LIST from './CategoryList'
import COMMENT_LIST from './CommentList'
import SWIPE_LIST from './SwipeList'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideProfile: true,
            selectedCategories: [],
            activeTab: 'likes',
            commentInput: '',
            activeResource: null,
            categories: [],
            comments: [
                {
                    username: "John Doe 1",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in mauris neque. Maecenas at nisl sit amet augue sollicitudin convallis. Sed et felis maximus, ultrices libero non, mattis diam. ",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)",
                    res_id: "6g5ewhmgo9"
                },
                {
                    username: "John Doe 2",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)",
                    res_id: "6g5ewhmgo9"
                },
                {
                    username: "John Doe 3",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)",
                    res_id: "t9pk85cwp7"
                },
                {
                    username: "John Doe 4",
                    comment: "A whole new world",
                    datetime: "Wed Apr 08 2020 10:56:20 GMT+0800 (China Standard Time)",
                    res_id: "t9pk85cwp7"
                }
            ],
            likes: [
                { category_id: 1, title: "Kimetsu No Yaiba", subtitle: "Demon Slayer", category: "Anime", type: "like" },
                { category_id: 2, title: "Avengers", subtitle: "Endgame", category: "Movie", type: "dislike" }
            ],
            resources: []
        }
    }

    componentDidMount = () => {
        this.funcFetchCategories();
    }

    funcFetchCategories = () => {
        db.collection(tbl.CATEGORIES)
            .get()
            .then((querySnapshot) => {
                let categories = [];
                querySnapshot.forEach(function (doc) {
                    let category = doc.data();
                    category.id = doc.id;
                    categories.push(category)
                });
                this.setState({ categories: categories },
                    () => {
                        this.funcOnGenerateItems();
                    })
            })
    }

    funcFetchResources = (resRef) => {
        resRef
            .get()
            .then((querySnapshot) => {
                let resources = [];
                querySnapshot.forEach(function (doc) {
                    let resource = doc.data();
                    resource.id = doc.id;
                    resources.push(resource)
                });
                this.setState({ 
                    resources: resources,
                    activeResource: resources[resources.length - 1]["id"]
                })
            })
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
        let resRef = db.collection(tbl.RESOURCES);

        if (Array.isArray(this.state.selectedCategories)
            && this.state.selectedCategories.length) {
            let selection = [];
            this.state.selectedCategories.forEach(function (category) {
                selection.push(category.id);
            })
            this.funcFetchResources(resRef.where('categoryid', 'in', selection))
        } else {
            this.funcFetchResources(resRef)
        }
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

    funcActiveResource = (resource) => {
        this.setState({
            activeResource: resource.id
        })
    }

    funcOnSwipeLike = (resource) => {
        console.log("RIGHT", resource);
        this.funcActiveResource(resource);
    }

    funcOnSwipeDisLike = (resource) => {
        console.log("LEFT", resource);
        this.funcActiveResource(resource);
    }

    render() {
        console.log("RENDER")
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
                        <SWIPE_LIST
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

export default (Dashboard);